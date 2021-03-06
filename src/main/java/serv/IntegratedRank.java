package serv;

import java.util.HashSet;

public class IntegratedRank implements Comparable<IntegratedRank> {
    String tf = "";
    double score;
    int rank;
    String lib = "";
    String query_name = "";
    HashSet<String> genes;

    public IntegratedRank(String tf, double score, String lib, String query_name, HashSet<String> genes) {
        this.tf = tf;
        this.score = score;
        this.lib = lib;
        this.query_name = query_name;
        this.genes = genes;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public double getScore() {
        return this.score;
    }

    @Override
    public int compareTo(IntegratedRank i) {
        double compares = i.getScore() - this.score;

        if (compares < 0) {
            return 1;
        } else if (compares > 0) {
            return -1;
        } else {
            return 0;
        }
    }
}
