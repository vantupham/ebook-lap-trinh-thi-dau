#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<long long> raw(n);
    for (auto &v : raw) cin >> v;
    vector<long long> b = raw;
    sort(b.begin(), b.end());
    b.erase(unique(b.begin(), b.end()), b.end());
    vector<int> x(n);
    for (int i = 0; i < n; i++) x[i] = lower_bound(b.begin(), b.end(), raw[i]) - b.begin();
    int B = max(1, (int)sqrt(n));
    vector<array<int, 3>> qs(q);
    for (int i = 0; i < q; i++) { cin >> qs[i][0] >> qs[i][1]; qs[i][0]--; qs[i][1]--; qs[i][2] = i; }
    sort(qs.begin(), qs.end(), [&](const array<int, 3> &a, const array<int, 3> &c) {
        if (a[0] / B != c[0] / B) return a[0] / B < c[0] / B;
        return a[1] < c[1];
    });
    vector<long long> dem(b.size(), 0), kq(q);
    long long cap = 0;
    int L = 0, R = -1;
    auto them = [&](int i) { cap += dem[x[i]]; dem[x[i]]++; };
    auto bot = [&](int i) { dem[x[i]]--; cap -= dem[x[i]]; };
    for (auto [l, r, id] : qs) {
        while (R < r) them(++R);
        while (L > l) them(--L);
        while (R > r) bot(R--);
        while (L < l) bot(L++);
        kq[id] = cap;
    }
    for (auto v : kq) cout << v << '\n';
}
