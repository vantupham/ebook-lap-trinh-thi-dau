#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("NOIBAT.INP", "r", stdin);
    freopen("NOIBAT.OUT", "w", stdout);
    int n, q, K;
    scanf("%d %d %d", &n, &q, &K);
    vector<long long> raw(n);
    for (auto &v : raw) scanf("%lld", &v);
    vector<long long> b = raw;
    sort(b.begin(), b.end());
    b.erase(unique(b.begin(), b.end()), b.end());
    vector<int> x(n);
    for (int i = 0; i < n; i++) x[i] = lower_bound(b.begin(), b.end(), raw[i]) - b.begin();
    int B = max(1, (int)sqrt(n));
    vector<array<int, 3>> qs(q);
    for (int i = 0; i < q; i++) { scanf("%d %d", &qs[i][0], &qs[i][1]); qs[i][0]--; qs[i][1]--; qs[i][2] = i; }
    sort(qs.begin(), qs.end(), [&](const array<int, 3> &a, const array<int, 3> &c) {
        if (a[0] / B != c[0] / B) return a[0] / B < c[0] / B;
        return (a[0] / B) & 1 ? a[1] > c[1] : a[1] < c[1];   // mẹo: khối lẻ đi ngược, nhanh hơn
    });
    vector<int> dem(b.size(), 0), kq(q);
    int noi = 0, L = 0, R = -1;
    auto them = [&](int i) { if (++dem[x[i]] == K) noi++; };
    auto bot = [&](int i) { if (dem[x[i]]-- == K) noi--; };
    for (auto [l, r, id] : qs) {
        while (R < r) them(++R);
        while (L > l) them(--L);
        while (R > r) bot(R--);
        while (L < l) bot(L++);
        kq[id] = noi;
    }
    for (int v : kq) printf("%d\n", v);
}
