#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<int> x(n);
    vector<long long> raw(n);
    for (auto &v : raw) cin >> v;
    vector<long long> b = raw;                         // nén giá trị về 0..n-1
    sort(b.begin(), b.end());
    b.erase(unique(b.begin(), b.end()), b.end());
    for (int i = 0; i < n; i++) x[i] = lower_bound(b.begin(), b.end(), raw[i]) - b.begin();
    int B = max(1, (int)sqrt(n));
    vector<array<int, 3>> qs(q);                       // {l, r, chỉ số}, từ 0
    for (int i = 0; i < q; i++) { cin >> qs[i][0] >> qs[i][1]; qs[i][0]--; qs[i][1]--; qs[i][2] = i; }
    sort(qs.begin(), qs.end(), [&](const array<int, 3> &a, const array<int, 3> &c) {
        if (a[0] / B != c[0] / B) return a[0] / B < c[0] / B;
        return a[1] < c[1];
    });
    vector<int> dem(b.size(), 0), kq(q);
    int khac = 0, L = 0, Rr = -1;                       // đoạn hiện tại [L, Rr], ban đầu rỗng
    auto them = [&](int i) { if (dem[x[i]]++ == 0) khac++; };
    auto bot = [&](int i) { if (--dem[x[i]] == 0) khac--; };
    for (auto [l, r, id] : qs) {
        while (Rr < r) them(++Rr);
        while (L > l) them(--L);
        while (Rr > r) bot(Rr--);
        while (L < l) bot(L++);
        kq[id] = khac;
    }
    for (int v : kq) cout << v << '\n';
}
