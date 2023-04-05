import java.util.*;
import java.io.*;
public class main {
    public static void main(String[] args) throws IOException {
        BufferedReader bfr = new BufferedReader(new InputStreamReader(System.in));
        int t = 1;
        while(t > 0){
            String[] line1 = bfr.readLine().split(" ");
            int n = Integer.parseInt(line1[0]);
            int t = Integer.parseInt(line1[1]);
            String[] line2 = bfr.readLine().split(" ");
            int[] time = new int[line2.length];
            int sum = 0;
            for(int i=0;i<line2.length;i++) {
                time[i] = Integer.parseInt(line2[i]);
                sum += time[i];
            }
            int i = 0;
            int j = arr.length - 1;
            while(i <= j) {
                if(sum > t) {
                    if(time[i] > time[j]) {
                        i++;
                        sum -= time[i];
                    } else {
                        j--;
                        sum -= time[j];
                    }
                } else {
                    System.out.println(j - i + 1);
                }
            }
            t--;
        }
    }
}