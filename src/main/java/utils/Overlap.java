package utils;

import java.util.HashSet;

public class Overlap implements Comparable<Overlap> {
    public final int overlap;
    public final double pval;
    public int id = 0;
    public final String libset_name;
    public final String lib_name;
    public final String query_name;
    public final String lib_tf;
    public final int setsize;
    public final double oddsratio;
    public int rank = 0;
    public double scaledRank = 0;
    public double fdr = 0;
    public final HashSet<String> genes;

    public Overlap(String libset_name, int overlap, double pval, int setsize, double odds, String lib_name, String query_name, HashSet<String> genes) {
        this.pval = pval;
        this.overlap = overlap;
        this.libset_name = libset_name;
        this.query_name = query_name;
        this.setsize = setsize;
        this.oddsratio = odds;
        this.lib_name = lib_name;
        this.lib_tf = before(this.libset_name);
        this.genes = genes;
    }

    private static String before(String value) {
        int posA = value.indexOf('_');
        if (posA == -1) {
            return value;
        }
        return value.substring(0, posA);
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public void setFDR(double fdr) {
        this.fdr = fdr;
    }

    public void setScaledRank(double sc) {
        this.scaledRank = sc;
    }

    @Override
    public int compareTo(Overlap o) {
        double comparep = o.getPval() - this.pval;
        if (comparep < 0) {
            return 1;
        } else if (comparep > 0) {
            return -1;
        } else {
            return 0;
        }
    }

    public double getPval() {
        return this.pval;
    }

    public String getLibTF() {
        return this.lib_tf;
    }

}
