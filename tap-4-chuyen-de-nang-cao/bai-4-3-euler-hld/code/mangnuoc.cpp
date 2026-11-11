#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> tg, no;
void ap(int x, int l, int r, long long v) { tg[x] += v * (r - l + 1); no[x] += v; }
void day(int x, int l, int r) {
    if (!no[x]) return;
    int m = (l + r) / 2;
    ap(2 * x, l, m, no[x]); ap(2 * x + 1, m + 1, r, no[x]); no[x] = 0;
}
void cong(int x, int l, int r, int ql, int qr, long long v) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { ap(x, l, r, v); return; }
    day(x, l, r);
    int m = (l + r) / 2;
    cong(2 * x, l, m, ql, qr, v); cong(2 * x + 1, m + 1, r, ql, qr, v);
    tg[x] = tg[2 * x] + tg[2 * x + 1];
}
long long hoi(int x, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return tg[x];
    day(x, l, r);
    int m = (l + r) / 2;
    return hoi(2 * x, l, m, ql, qr) + hoi(2 * x + 1, m + 1, r, ql, qr);
}
int main() {
    freopen("MANGNUOC.INP", "r", stdin);
    freopen("MANGNUOC.OUT", "w", stdout);
    int q;
    scanf("%d %d", &n, &q);
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld", &a[i]);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) { int x, y; scanf("%d %d", &x, &y); adj[x].push_back(y); adj[y].push_back(x); }
    vector<int> vao(n + 1), ra(n + 1), cha(n + 1, 0), it(n + 1, 0);
    int t = 0;
    vector<int> st = {1};
    vao[1] = ++t;
    while (!st.empty()) {
        int u = st.back();
        if (it[u] < (int)adj[u].size()) {
            int v = adj[u][it[u]++];
            if (v == cha[u]) continue;
            cha[v] = u; vao[v] = ++t; st.push_back(v);
        } else { ra[u] = t; st.pop_back(); }
    }
    tg.assign(4 * n, 0); no.assign(4 * n, 0);
    for (int u = 1; u <= n; u++) cong(1, 1, n, vao[u], vao[u], a[u]);
    while (q--) {
        int tp, u;
        scanf("%d %d", &tp, &u);
        if (tp == 1) { long long v; scanf("%lld", &v); cong(1, 1, n, vao[u], ra[u], v); }
        else printf("%lld\n", hoi(1, 1, n, vao[u], ra[u]));
    }
}
