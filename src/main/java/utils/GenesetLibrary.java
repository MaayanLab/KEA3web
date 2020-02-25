package utils;

import serv.EnrichmentCore;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.HashSet;

public class GenesetLibrary {
    public String name;
    public HashMap<String, HashSet<String>> allSymbols;
    public HashMap<String, HashSet<String>> mappableSymbols;
    public HashMap<String, short[]> encoded;
    public HashSet<String> symbolsNotFound;

    /**
     * constructor reads flat GMT file and generates short encoding from dictionary
     *
     * @throws IOException
     */
    public GenesetLibrary(String gmtfilename, GeneDict dict, boolean removeGeneWeights, EnrichmentCore ec) throws IOException {
        this.allSymbols = LoadGenesetLib(gmtfilename, removeGeneWeights, ec);
        this.name = gmtfilename.replaceAll(".*/tflibs/", "").split(".gmt")[0];    // modify library name
        this.mappableSymbols = getMappableSymbols(this.allSymbols, dict);
        this.symbolsNotFound = getUnmappableSymbols(this.allSymbols, dict);
        this.encoded = EncodeLibrary(this.mappableSymbols, dict);
    }

    public static HashMap<String, HashSet<String>> LoadGenesetLib(String gmtfilename, boolean removeGeneWeights, EnrichmentCore ec) throws IOException {
        HashMap<String, HashSet<String>> genesetlib = new HashMap<>();

        InputStream file = ec.getServletContext().getResourceAsStream(gmtfilename);
        BufferedReader br = new BufferedReader(new InputStreamReader(file));
        String st;
        while ((st = br.readLine()) != null) {

            String[] tokens = st.split("\\t");
            HashSet<String> set = new HashSet<>();

            String geneset_name = tokens[0];
            for (int x = 1; x < tokens.length; x++) {
                String gene = tokens[x];
                if (removeGeneWeights) {
                    set.add(RemoveGeneWeight(gene));
                } else {
                    set.add(gene);
                }
            }
            genesetlib.put(geneset_name, set);
        }
        br.close();
        return (genesetlib);
    }

    public static HashMap<String, short[]> EncodeLibrary(HashMap<String, HashSet<String>> lib, GeneDict dict) {
        HashMap<String, short[]> encoded_lib = new HashMap<>();
        for (String set_name : lib.keySet()) {
            HashSet<String> geneset = lib.get(set_name);
            short[] encoded_geneset = new short[geneset.size()];
            int i = 0;
            for (String gene : geneset) {
                encoded_geneset[i] = dict.encode.get(gene);
                i++;
            }
            encoded_lib.put(set_name, encoded_geneset);
        }
        return (encoded_lib);
    }

    public static HashMap<String, HashSet<String>> getMappableSymbols(HashMap<String, HashSet<String>> lib, GeneDict dict) {
        HashMap<String, HashSet<String>> mappableLib = new HashMap<>();
        for (String set_name : lib.keySet()) {
            HashSet<String> mappable = new HashSet<>();
            for (String gene : lib.get(set_name)) {
                if (dict.encode.containsKey(gene.toUpperCase())) {
                    mappable.add(gene.toUpperCase());
                }
            }
            mappableLib.put(set_name, mappable);
        }
        return (mappableLib);
    }

    public static HashSet<String> getUnmappableSymbols(HashMap<String, HashSet<String>> lib, GeneDict dict) {
        HashSet<String> unmappable = new HashSet<>();
        for (String set_name : lib.keySet()) {
            for (String gene : lib.get(set_name)) {
                if (!dict.encode.containsKey(gene.toUpperCase())) {
                    unmappable.add(gene.toUpperCase());
                }
            }
        }
        return (unmappable);
    }

    public static String RemoveGeneWeight(String gene) {
        return (gene.split(",")[0]);
    }
}
