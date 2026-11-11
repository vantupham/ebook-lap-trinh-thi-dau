#include <bits/stdc++.h>
using namespace std;
string s;
long long nho[20][10];
long long dem_tu(int i, int truoc, bool bam) {
    if (i == (int)s.size()) return 1;
    if (!bam && nho[i][truoc] != -1) return nho[i][truoc];
    int gioi_han = bam ? s[i] - '0' : 9;
    long long kq = 0;
    for (int d = truoc; d <= gioi_han; d++)
        kq += dem_tu(i + 1, d, bam && d == gioi_han);
    if (!bam) nho[i][truoc] = kq;
    return kq;
}
long long dem(long long N) {
    if (N < 0) return 0;
    s = to_string(N);
    memset(nho, -1, sizeof nho);
    return dem_tu(0, 0, true);
}
int main() {
    long long a, b;
    cin >> a >> b;
    cout << dem(b) - dem(a - 1) << '\n';
}
