package utils;

/* This class is taken from the Pal-Project: http://www.cebl.auckland.ac.nz/pal-project/ */

/**
 * This does a Fisher Exact test.  The Fisher's Exact test procedure calculates an exact probability value
 * for the relationship between two dichotomous variables, as found in a two by two crosstable. The program
 * calculates the difference between the data observed and the data expected, considering the given marginal
 * and the assumptions of the model of independence. It works in exactly the same way as the Chi-square test
 * for independence; however, the Chi-square gives only an estimate of the true probability value, an estimate
 * which might not be very accurate if the marginal is very uneven or if there is a small value (less than five)
 * in one of the cells.
 * <p>
 * It uses an array of factorials initialized at the beginning to provide speed.
 * There could be better ways to do this.
 *
 * @author Ed Buckler
 * @version $Id: FisherExact.java,v 1
 */

public class FastFisher {
    final int maxSize;
    private final double[] f;

    /**
     * constructor for FisherExact table
     *
     * @param maxSize is the maximum sum that will be encountered by the table (a+b+c+d)
     */
    public FastFisher(int maxSize) {
        this.maxSize = maxSize;
        f = new double[maxSize + 1];
        f[0] = 0.0;
        for (int i = 1; i <= this.maxSize; i++) {
            f[i] = f[i - 1] + Math.log(i);
        }
    }

    public static double exp20(double x) {
        x = 1.0 + x / 1048576;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        x *= x;
        return x;
    }

    /**
     * calculates the P-value for this specific state
     *
     * @param a a, b, c, d are the four cells in a 2x2 matrix
     * @param b
     * @param c
     * @param d
     * @return the P-value
     */

    public final double getP3(int a, int b, int c, int d, double same) {
        return exp20(same - (f[a] + f[b] + f[c] + f[d]));
    }

    /**
     * Calculates the right-tail P-value for the Fisher Exact test.
     *
     * @param a a, b, c, d are the four cells in a 2x2 matrix
     * @param b
     * @param c
     * @param d
     * @return one-tailed P-value (right-tail)
     */
    public final double getRightTailedP(int a, int b, int c, int d) {
        int min, i;
        int n = a + b + c + d;
        if (n > maxSize) {
            return Double.NaN;
        }
        double p = 0;
        double same = f[a + b] + f[c + d] + f[a + c] + f[b + d] - f[n];
        p += getP3(a, b, c, d, same);
        min = Math.min(c, b);
        for (i = 0; i < min; i++) {
            p += getP3(++a, --b, --c, ++d, same);
        }
        return p;
    }
}


