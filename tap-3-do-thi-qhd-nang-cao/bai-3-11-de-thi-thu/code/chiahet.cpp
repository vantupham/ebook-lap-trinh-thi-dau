#include <bits/stdc++.h>
using namespace std;
string s;
int k;
long long nho[20][100];
long long dem_tu(int i, int du, bool bam) {
    if (i == (int)s.size()) return du == 0;
    if (!bam && nho[i][du] != -1) return nho[i][du];
    int gh = bam ? s[i] - '0' : 9;
    long long kq = 0;
    for (int d = 0; d <= gh; d++) kq += dem_tu(i + 1, (du + d) % k, bam && d == gh);
    if (!bam) nho[i][du] = kq;
    return kq;
}
long long dem(long long N) {                        // số x trong [0, N] có tổng chữ số chia hết k
    if (N < 0) return 0;
    s = to_string(N);
    memset(nho, -1, sizeof nho);
    return dem_tu(0, 0, true);
}
int main() {
    freopen("CHIAHET.INP", "r", stdin);
    freopen("CHIAHET.OUT", "w", stdout);
    long long a, b;
    cin >> a >> b >> k;
    cout << dem(b) - dem(a - 1) << '\n';
}
