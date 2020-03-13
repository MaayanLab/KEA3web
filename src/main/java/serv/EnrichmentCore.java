package serv;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import utils.*;

import javax.servlet.RequestDispatcher;
import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.math.BigDecimal;
import java.math.MathContext;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Servlet implementation class Test
 */
@WebServlet("/api/*")
public class EnrichmentCore extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private int hitCount;
    static GeneDict dict = null;
    static HashSet<GenesetLibrary> libraries = new HashSet<>();
    static HashMap<String, String> lib_descriptions = new HashMap<>();
    static Enrichment enrich = null;
    static RankAggregate aggregate = null;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public EnrichmentCore() {
        super();
    }

    /**
     * @see Servlet#init(ServletConfig)
     * <p>
     * Initializes class variables
     */

    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        //initialize dictionary object
        try {
            EnrichmentCore.dict = new GeneDict("WEB-INF/dict/hgnc_symbols.txt", this);
        } catch (IOException e) {
            e.printStackTrace();
        }

        //initialize enrichment object
        EnrichmentCore.enrich = new Enrichment();
        EnrichmentCore.aggregate = new RankAggregate();

        //get gmt file paths
        String libdir = "WEB-INF/tflibs/";
        String[] lib_files = new File(getServletContext().getRealPath(libdir)).list();

        assert lib_files != null;
        for (String lib : lib_files) {
            if (!lib.equals(".DS_Store")) {
                try {
                    EnrichmentCore.libraries.add(new GenesetLibrary(libdir + lib, dict, true, this));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        //get library description paths
        String libdesc = "WEB-INF/lib_descriptions/";
        String[] lib_desc_files = new File(getServletContext().getRealPath(libdesc)).list();
        assert lib_desc_files != null;
        for (String lib_desc : lib_desc_files) {
            if (!lib_desc.equals(".DS_Store")) {
                String desc_name = (libdesc + lib_desc).replaceAll(".*/lib_descriptions/", "").split("_")[0];
                InputStream file = this.getServletContext().getResourceAsStream(libdesc + lib_desc);
                BufferedReader br = new BufferedReader(new InputStreamReader(file));
                try {
                    EnrichmentCore.lib_descriptions.put(desc_name, br.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private void enrichmentResults(String[] genes, String query_name, HttpServletResponse response) throws IOException {
        genes = toUpper(genes);

        Query q = new Query(genes, EnrichmentCore.dict);

        //compute enrichment for each library
        HashMap<String, ArrayList<Overlap>> results = new HashMap<>();
        double size;
        double r;
        int d;

        for (GenesetLibrary lib : EnrichmentCore.libraries) {
            ArrayList<Overlap> enrichResult = enrich.calculateEnrichment(q.dictMatch, lib.mappableSymbols, lib.name, query_name);
            Collections.shuffle(enrichResult, new Random(4));
            Collections.sort(enrichResult);
            computeFDR(enrichResult);

            //where multiple library gene sets correspond to the same TF, take only the best
            //performing gene set and remove the rest from the list
            HashSet<String> lib_tfs = new HashSet<>();
            ArrayList<Integer> duplicated_tf_idx = new ArrayList<>();
            d = 0;

            for (Overlap o : enrichResult) {
                if (lib_tfs.contains(o.getLibTF())) {
                    duplicated_tf_idx.add(d);
                } else {
                    lib_tfs.add(o.getLibTF());
                }
                d++;
            }
            duplicated_tf_idx.sort(Collections.reverseOrder());

            for (Integer dupe : duplicated_tf_idx) {
                int duplicated = dupe;
                enrichResult.remove(duplicated);
            }

            //set ranks of remaining results
            r = 1;
            size = enrichResult.size();
            for (Overlap o : enrichResult) {
                o.setRank((int) r);
                o.setScaledRank(r / size);
                r++;
            }
            results.put(lib.name, enrichResult);
        }

        ArrayList<IntegratedRank> top_rank = aggregate.topRank(results, query_name);
        ArrayList<IntegratedRank> borda = aggregate.bordaCount(results, query_name);

        HashMap<String, ArrayList<IntegratedRank>> integrated_results = new HashMap<>();
        integrated_results.put("topRank", top_rank);
        integrated_results.put("meanRank", borda);

        String json = resultsToJSON(results, integrated_results);

        //respond to request
        response.setContentType("application/json");
        response.getWriter().write(json);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        String query_name = "user_query";

        String pathInfo = request.getPathInfo();
        if (pathInfo.matches("^/enrich/.*")) {
            StringBuilder jb = new StringBuilder();
            String line = null;
            try {
                BufferedReader reader = request.getReader();
                while ((line = reader.readLine()) != null)
                    jb.append(line);
            } catch (Exception e) { /*report an error*/ }
            try {
                JSONObject jsonObject = new JSONObject(jb.toString());
                if (jsonObject.has("query_name")) {
                    query_name = jsonObject.getString("query_name");
                }

                JSONArray genesJson = jsonObject.getJSONArray("gene_set");
                String[] genes = new String[genesJson.length()];
                for (int i = 0; i < genesJson.length(); i++)
                    genes[i] = genesJson.getString(i);

                enrichmentResults(genes, query_name, response);
            } catch (JSONException e) {
                throw new IOException("Error parsing JSON request string");
            }
        }
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        String pathInfo = request.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/index.jsp") || pathInfo.equals("/")) {
            RequestDispatcher rd = getServletContext().getRequestDispatcher("/index.jsp");
            PrintWriter out = response.getWriter();
            out.write("index.jsp URL");
            rd.include(request, response);
        } else if (pathInfo.matches("^/submissions/.*")) {
            response.setContentType("text/plain");
            response.getWriter().write(Integer.toString(this.hitCount));
        } else if (pathInfo.matches("^/enrich/.*")) {
            String query_name = "user query";
            String truncPathInfo = pathInfo.replace("/enrich/", "");
            String[] genes;
            Pattern p = Pattern.compile("(.*)/qid/(.*)");
            Matcher m = p.matcher(truncPathInfo);

            // if our pattern matches the URL extract groups
            if (m.find()) {
                String gene_identifiers = m.group(1);
                genes = gene_identifiers.split(",");
                query_name = m.group(2);
            } else {    // enrichment over all geneset libraries
                genes = truncPathInfo.split(",");
            }
            enrichmentResults(genes, query_name, response);
        } else if (pathInfo.matches("^/main/.*")) {
            PrintWriter out = response.getWriter();
            out.write(Integer.toString(this.hitCount));
        } else if (pathInfo.matches("^/libdescriptions/.*")) {
            StringBuilder json = new StringBuilder("{");
            for (String l : lib_descriptions.keySet()) {
                json.append("\"").append(l).append("\":[");
                json.append("\"").append(lib_descriptions.get(l)).append("\"],");
            }
            json.append("}");

            //remove trailing comma
            json = new StringBuilder(json.toString().replaceAll("],}", "]}"));
            response.getWriter().write(json.toString());
        } else {
            PrintWriter out = response.getWriter();
            response.setHeader("Content-Type", "application/json");
            String json = "{\"error\": \"api endpoint not supported\", \"endpoint:\" : \"" + pathInfo + "\"}";
            out.write(json);
        }
    }

    public String resultsToJSON(HashMap<String, ArrayList<Overlap>> results, HashMap<String, ArrayList<IntegratedRank>> integ) {
        StringBuilder json = new StringBuilder("{");
        for (String key : integ.keySet()) {
            json.append("\"").append("Integrated--").append(key).append("\":[");
            ArrayList<IntegratedRank> integ_results = integ.get(key);
            for (IntegratedRank i : integ_results) {
                String entry = "{\"Query Name\":" + "\"" + i.query_name + "\"" + ",";
                entry = entry + "\"Rank\":" + "\"" + i.rank + "\"" + ",";
                entry = entry + "\"TF\":" + "\"" + i.tf + "\"" + ",";
                entry = entry + "\"Score\":" + "\"" + sigDig(i.score, 4) + "\"" + ",";
                entry = entry + "\"Library\":" + "\"" + i.lib.replace("--", " ") + "\"" + ",";
                entry = entry + "\"Overlapping_Genes\":" + "\"" + set2String(i.genes) + "\"},";
                json.append(entry);
            }
            json = new StringBuilder(json.toString().replaceAll(",$", ""));
            json.append("],");
        }
        for (String key : results.keySet()) {
            json.append("\"").append(key).append("\":[");
            ArrayList<Overlap> libresults = results.get(key);
            for (Overlap o : libresults) {
                String entry = "{\"Query Name\":" + "\"" + o.query_name + "\"" + ",";
                entry = entry + "\"Rank\":" + "\"" + o.rank + "\"" + ",";
                entry = entry + "\"Scaled Rank\":" + "\"" + sigDig(o.scaledRank, 4) + "\"" + ",";
                entry = entry + "\"Set_name\":" + "\"" + o.libset_name + "\"" + ",";
                entry = entry + "\"TF\":" + "\"" + o.lib_tf + "\"" + ",";
                entry = entry + "\"Intersect\":" + "\"" + o.overlap + "\"" + ",";
                entry = entry + "\"Set length\":" + "\"" + o.setsize + "\"" + ",";
                entry = entry + "\"FET p-value\":" + "\"" + sigDig(o.pval, 4) + "\"" + ",";
                entry = entry + "\"FDR\":" + "\"" + sigDig(o.fdr, 3) + "\"" + ",";
                entry = entry + "\"Odds Ratio\":" + "\"" + sigDig(o.oddsratio, 4) + "\"" + ",";
                entry = entry + "\"Library\":" + "\"" + o.lib_name + "\"" + ",";
                entry = entry + "\"Overlapping_Genes\":" + "\"" + set2String(o.genes) + "\"},";
                json.append(entry);
            }
            json = new StringBuilder(json.toString().replaceAll(",$", ""));
            json.append("],");
        }
        json = new StringBuilder(json.toString().replaceAll(",$", ""));
        json.append("}");
        return json.toString();
    }

    private static double sigDig(double d, int n) {
        if (Double.isNaN(d) || Double.isInfinite(d)) {
            return Double.NaN;
        }
        BigDecimal bd = new BigDecimal(d);
        bd = bd.round(new MathContext(n));
        return (bd.doubleValue());
    }

    private static String[] toUpper(String[] genes) {
        for (int i = 0; i < genes.length; i++) { //why doesn't i start at 0? come back to this.
            genes[i] = genes[i].toUpperCase();
        }
        return (genes);
    }

    private static String set2String(HashSet<String> stringset) {
        return (String.join(",", stringset));
    }

    private void computeFDR(ArrayList<Overlap> over) {
        Collections.sort(over);
        double[] pvals = new double[over.size()];
        int i = 0;
        for (Overlap o : over) {
            pvals[i] = o.getPval();
            i++;
        }

        BenjaminiHochberg bh = new BenjaminiHochberg(pvals);
        bh.calculate();
        double[] adj_pvals = bh.getAdjustedPvalues();
        int j = 0;
        for (Overlap o : over) {
            o.setFDR(adj_pvals[j]);
            j++;
        }
    }
}



