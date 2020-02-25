package serv;

import utils.Overlap;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.*;

public class RankAggregate {
    public ArrayList<IntegratedRank> topRank(HashMap<String, ArrayList<Overlap>> orig, String query_name) {
        ArrayList<IntegratedRank> integ = new ArrayList<>();
        HashMap<String, Double> tf_ranks = new HashMap<>();
        HashMap<String, String> tf_libs = new HashMap<>();
        HashMap<String, HashSet<String>> tf_genes = new HashMap<>();

        for (String lib : orig.keySet()) {
            for (Overlap o : orig.get(lib)) {
                if (!tf_ranks.containsKey(o.lib_tf)) {
                    tf_ranks.put(o.lib_tf, o.scaledRank);
                    tf_libs.put(o.lib_tf, o.lib_name + "," + sigDig(o.scaledRank, 4));
                    tf_genes.put(o.lib_tf, new HashSet<>(o.genes));
                } else {
                    double r = tf_ranks.get(o.lib_tf);

                    if (tf_ranks.get(o.lib_tf) > o.scaledRank) {
                        tf_ranks.put(o.lib_tf, o.scaledRank);
                        tf_libs.put(o.lib_tf, o.lib_name + "," + sigDig(o.scaledRank, 4));
                        tf_genes.put(o.lib_tf, new HashSet<>(o.genes));
                    }
                }
            }
        }

        for (String tf : tf_ranks.keySet()) {
            integ.add(new IntegratedRank(tf, tf_ranks.get(tf), tf_libs.get(tf), query_name, tf_genes.get(tf)));
        }
        integ = sortRank(integ);
        return integ;
    }

    public ArrayList<IntegratedRank> bordaCount(HashMap<String, ArrayList<Overlap>> orig, String query_name) {
        ArrayList<IntegratedRank> integ = new ArrayList<>();
        HashMap<String, Double> tf_scores = new HashMap<>();
        HashMap<String, Integer> tf_numlibs = new HashMap<>();
        HashMap<String, String> tf_libinfo = new HashMap<>();
        HashMap<String, HashSet<String>> tf_genes = new HashMap<>();

        for (String lib : orig.keySet()) {
            for (Overlap o : orig.get(lib)) {
                if (!tf_scores.containsKey(o.lib_tf)) {
                    tf_scores.put(o.lib_tf, (double) o.rank);
                    tf_numlibs.put(o.lib_tf, 1);
                    tf_genes.put(o.lib_tf, new HashSet<>(o.genes));
                    tf_libinfo.put(o.lib_tf, o.lib_name + "," + o.rank);
                } else {
                    double score = tf_scores.get(o.lib_tf);
                    int count = tf_numlibs.get(o.lib_tf);
                    HashSet<String> overlap_genes = new HashSet<>(tf_genes.get(o.lib_tf));

                    overlap_genes.addAll(new HashSet<>(o.genes));
                    count++;
                    String libinfo = tf_libinfo.get(o.lib_tf);
                    tf_libinfo.put(o.lib_tf, o.lib_name + "," + o.rank + ";" + libinfo);
                    tf_scores.put(o.lib_tf, o.rank + score);
                    tf_numlibs.put(o.lib_tf, count);
                    tf_genes.put(o.lib_tf, overlap_genes);
                }
            }
        }

        for (String tf : tf_scores.keySet()) {
            double score = tf_scores.get(tf) / tf_numlibs.get(tf);
            integ.add(new IntegratedRank(tf, score, tf_libinfo.get(tf), query_name, tf_genes.get(tf)));
        }
        integ = sortRank(integ);
        return (integ);
    }

    private static double sigDig(double d, int n) {
        if (Double.isNaN(d) || Double.isInfinite(d)) {
            return Double.NaN;
        }
        BigDecimal bd = new BigDecimal(d);
        bd = bd.round(new MathContext(n));
        return (bd.doubleValue());
    }

    private ArrayList<IntegratedRank> sortRank(ArrayList<IntegratedRank> integ) {
        Collections.shuffle(integ, new Random(4));
        Collections.sort(integ);

        int rank = 1;
        for (IntegratedRank ir : integ) {
            ir.rank = rank;
            rank++;
        }
        return (integ);
    }
}
