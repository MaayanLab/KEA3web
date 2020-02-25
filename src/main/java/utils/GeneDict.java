package utils;

import serv.EnrichmentCore;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;

public class GeneDict {
    public final HashMap<String, Short> encode = new HashMap<>();
    public HashMap<Short, String> decode;

    public GeneDict(String hgnc_filename, EnrichmentCore c) throws IOException {
        InputStream file = c.getServletContext().getResourceAsStream(hgnc_filename);
        BufferedReader br = new BufferedReader(new InputStreamReader(file));
        String st;

        short value = Short.MIN_VALUE;
        while ((st = br.readLine()) != null) {
            this.encode.put(st.toUpperCase(), value);
            value++;
        }
        System.out.println(value);
        br.close();
        this.decode = ReverseDict(this.encode);
    }

    public static HashMap<Short, String> ReverseDict(HashMap<String, Short> dict) {
        HashMap<Short, String> revdict = new HashMap<>();
        for (String key : dict.keySet()) {
            revdict.put(dict.get(key), key);
        }
        return (revdict);
    }
}

