#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> mn, no;
void ap(int x, long long v) { mn[x] += v; no[x] += v; }
void day(int x) { if (no[x]) { ap(2 * x, no[x]); ap(2 * x + 1, no[x]); no[x] = 0; } }
void dung(int x, int l, int r, const vector<long long> &a) {
    if (l == r) { mn[x] = a[l]; return; }
    int m = (l + r) / 2;
    dung(2 * x, l, m, a); dung(2 * x + 1, m + 1, r, a);
    mn[x] = min(mn[2 * x], mn[2 * x + 1]);
}
void cong(int x, int l, int r, int ql, int qr, long long v) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { ap(x, v); return; }
    day(x);
    int m = (l + r) / 2;
    cong(2 * x, l, m, ql, qr, v); cong(2 * x + 1, m + 1, r, ql, qr, v);
    mn[x] = min(mn[2 * x], mn[2 * x + 1]);
}
long long hoi(int x, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return LLONG_MAX;
    if (ql <= l && r <= qr) return mn[x];
    day(x);
    int m = (l + r) / 2;
    return min(hoi(2 * x, l, m, ql, qr), hoi(2 * x + 1, m + 1, r, ql, qr));
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    mn.assign(4 * n, 0); no.assign(4 * n, 0);
    dung(1, 1, n, a);
    while (q--) {
        int t, l, r;
        cin >> t >> l >> r;
        if (t == 1) { long long v; cin >> v; cong(1, 1, n, l, r, v); }
        else cout << hoi(1, 1, n, l, r) << '\n';
    }
}
