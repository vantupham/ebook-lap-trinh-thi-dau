#include <bits/stdc++.h>
using namespace std;
struct Nut { long long tong, tien, hau, tot; };
Nut gop(const Nut &L, const Nut &R) {
    return {L.tong + R.tong,
            max(L.tien, L.tong + R.tien),
            max(R.hau, R.tong + L.hau),
            max({L.tot, R.tot, L.hau + R.tien})};
}
Nut la(long long x) { long long d = max(0LL, x); return {x, d, d, d}; }
int main() {
    freopen("TONGMAX.INP", "r", stdin);
    freopen("TONGMAX.OUT", "w", stdout);
    int n, q;
    scanf("%d %d", &n, &q);
    int N = 1;
    while (N < n) N *= 2;
    vector<Nut> t(2 * N, {0, 0, 0, 0});
    for (int i = 0; i < n; i++) { long long x; scanf("%lld", &x); t[N + i] = la(x); }
    for (int i = N - 1; i >= 1; i--) t[i] = gop(t[2 * i], t[2 * i + 1]);
    while (q--) {
        int k; long long x;
        scanf("%d %lld", &k, &x);
        int i = N + k - 1;
        t[i] = la(x);
        for (i /= 2; i >= 1; i /= 2) t[i] = gop(t[2 * i], t[2 * i + 1]);
        printf("%lld\n", t[1].tot);
    }
}
