#include <bits/stdc++.h>
using namespace std;
int n;
vector<int> dem, lat;
void ap(int x, int l, int r) { dem[x] = (r - l + 1) - dem[x]; lat[x] ^= 1; }
void day(int x, int l, int r) {
    if (!lat[x]) return;
    int m = (l + r) / 2;
    ap(2 * x, l, m); ap(2 * x + 1, m + 1, r);
    lat[x] = 0;
}
void dao(int x, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { ap(x, l, r); return; }
    day(x, l, r);
    int m = (l + r) / 2;
    dao(2 * x, l, m, ql, qr); dao(2 * x + 1, m + 1, r, ql, qr);
    dem[x] = dem[2 * x] + dem[2 * x + 1];
}
int hoi(int x, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return dem[x];
    day(x, l, r);
    int m = (l + r) / 2;
    return hoi(2 * x, l, m, ql, qr) + hoi(2 * x + 1, m + 1, r, ql, qr);
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    dem.assign(4 * n, 0); lat.assign(4 * n, 0);
    while (q--) {
        int t, l, r;
        cin >> t >> l >> r;
        if (t == 1) dao(1, 1, n, l, r);
        else cout << hoi(1, 1, n, l, r) << '\n';
    }
}
