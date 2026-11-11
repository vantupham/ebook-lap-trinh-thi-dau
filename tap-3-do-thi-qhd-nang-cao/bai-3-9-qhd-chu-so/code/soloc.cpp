#include <bits/stdc++.h>
using namespace std;
string s;
int K;
long long nho[20][21];
long long tu(int i, int dem6, bool bam) {
    if (dem6 > K) return 0;
    if (i == (int)s.size()) return dem6 == K;
    if (!bam && nho[i][dem6] != -1) return nho[i][dem6];
    int gh = bam ? s[i] - '0' : 9;
    long long kq = 0;
    for (int d = 0; d <= gh; d++) {
        if (d == 4) continue;
        kq += tu(i + 1, dem6 + (d == 6), bam && d == gh);
    }
    if (!bam) nho[i][dem6] = kq;
    return kq;
}
long long dem(long long N) {
    if (N < 0) return 0;
    s = to_string(N);
    memset(nho, -1, sizeof nho);
    return tu(0, 0, true);
}
int main() {
    freopen("SOLOC.INP", "r", stdin);
    freopen("SOLOC.OUT", "w", stdout);
    long long a, b;
    scanf("%lld %lld %d", &a, &b, &K);
    printf("%lld\n", dem(b) - dem(a - 1));
}
