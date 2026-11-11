#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> mx, no;
void ap(int x, long long v) { mx[x] += v; no[x] += v; }
void day(int x) { if (no[x]) { ap(2 * x, no[x]); ap(2 * x + 1, no[x]); no[x] = 0; } }
void cong(int x, int l, int r, int ql, int qr, long long v) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { ap(x, v); return; }
    day(x);
    int m = (l + r) / 2;
    cong(2 * x, l, m, ql, qr, v); cong(2 * x + 1, m + 1, r, ql, qr, v);
    mx[x] = max(mx[2 * x], mx[2 * x + 1]);
}
long long hoi(int x, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return LLONG_MIN;
    if (ql <= l && r <= qr) return mx[x];
    day(x);
    int m = (l + r) / 2;
    return max(hoi(2 * x, l, m, ql, qr), hoi(2 * x + 1, m + 1, r, ql, qr));
}
int main() {
    freopen("DATPHONG.INP", "r", stdin);
    freopen("DATPHONG.OUT", "w", stdout);
    long long C;
    int q;
    scanf("%d %lld %d", &n, &C, &q);
    mx.assign(4 * n, 0); no.assign(4 * n, 0);
    while (q--) {
        int l, r; long long k;
        scanf("%d %d %lld", &l, &r, &k);
        if (hoi(1, 1, n, l, r) + k <= C) { cong(1, 1, n, l, r, k); puts("YES"); }
        else puts("NO");
    }
}
