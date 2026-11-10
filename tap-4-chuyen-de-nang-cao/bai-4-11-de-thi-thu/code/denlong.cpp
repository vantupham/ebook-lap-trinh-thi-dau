#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> sum_, gan;   // gan = giá trị gán chờ đẩy xuống, -1 nếu không có
void ap(int x, int l, int r, long long v) { sum_[x] = v * (r - l + 1); gan[x] = v; }
void day(int x, int l, int r) {
    if (gan[x] < 0) return;
    int m = (l + r) / 2;
    ap(2 * x, l, m, gan[x]); ap(2 * x + 1, m + 1, r, gan[x]);
    gan[x] = -1;
}
void dung(int x, int l, int r, const vector<long long> &a) {
    if (l == r) { sum_[x] = a[l]; return; }
    int m = (l + r) / 2;
    dung(2 * x, l, m, a); dung(2 * x + 1, m + 1, r, a);
    sum_[x] = sum_[2 * x] + sum_[2 * x + 1];
}
void gan_doan(int x, int l, int r, int u, int v, long long val) {
    if (v < l || r < u) return;
    if (u <= l && r <= v) { ap(x, l, r, val); return; }
    day(x, l, r);
    int m = (l + r) / 2;
    gan_doan(2 * x, l, m, u, v, val); gan_doan(2 * x + 1, m + 1, r, u, v, val);
    sum_[x] = sum_[2 * x] + sum_[2 * x + 1];
}
long long tong(int x, int l, int r, int u, int v) {
    if (v < l || r < u) return 0;
    if (u <= l && r <= v) return sum_[x];
    day(x, l, r);
    int m = (l + r) / 2;
    return tong(2 * x, l, m, u, v) + tong(2 * x + 1, m + 1, r, u, v);
}
int main() {
    freopen("DENLONG.INP", "r", stdin);
    freopen("DENLONG.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    sum_.assign(4 * n, 0); gan.assign(4 * n, -1);
    dung(1, 1, n, a);
    while (q--) {
        int t, l, r; cin >> t >> l >> r;
        if (t == 1) { long long v; cin >> v; gan_doan(1, 1, n, l, r, v); }
        else cout << tong(1, 1, n, l, r) << '\n';
    }
}
