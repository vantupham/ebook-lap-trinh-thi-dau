#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> tong, no;

void ap(int x, int l, int r, long long v) {         // cộng v vào cả đoạn của nút x
    tong[x] += v * (r - l + 1);
    no[x] += v;
}
void day(int x, int l, int r) {                     // đẩy nợ xuống hai con
    if (no[x] == 0) return;
    int m = (l + r) / 2;
    ap(2 * x, l, m, no[x]);
    ap(2 * x + 1, m + 1, r, no[x]);
    no[x] = 0;
}
void cong(int x, int l, int r, int ql, int qr, long long v) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { ap(x, l, r, v); return; }   // phủ trọn: ghi nợ, dừng
    day(x, l, r);
    int m = (l + r) / 2;
    cong(2 * x, l, m, ql, qr, v);
    cong(2 * x + 1, m + 1, r, ql, qr, v);
    tong[x] = tong[2 * x] + tong[2 * x + 1];
}
long long hoi(int x, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return tong[x];
    day(x, l, r);
    int m = (l + r) / 2;
    return hoi(2 * x, l, m, ql, qr) + hoi(2 * x + 1, m + 1, r, ql, qr);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    tong.assign(4 * n, 0); no.assign(4 * n, 0);
    for (int i = 1; i <= n; i++) { long long a; cin >> a; cong(1, 1, n, i, i, a); }
    while (q--) {
        int t, l, r;
        cin >> t >> l >> r;
        if (t == 1) { long long v; cin >> v; cong(1, 1, n, l, r, v); }
        else cout << hoi(1, 1, n, l, r) << '\n';
    }
}
