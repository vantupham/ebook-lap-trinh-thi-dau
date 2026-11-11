#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("LAPDEN.INP", "r", stdin);
    freopen("LAPDEN.OUT", "w", stdout);
    int n;
    scanf("%d", &n);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int x, y;
        scanf("%d %d", &x, &y);
        adj[x].push_back(y);
        adj[y].push_back(x);
    }
    vector<int> cha(n + 1, 0), thu_tu = {1};
    cha[1] = -1;
    for (int k = 0; k < (int)thu_tu.size(); k++) {
        int u = thu_tu[k];
        for (int v : adj[u]) if (v != cha[u]) { cha[v] = u; thu_tu.push_back(v); }
    }
    const long long VC = 1e9;
    vector<long long> a(n + 1), b(n + 1), c(n + 1);
    for (int k = n - 1; k >= 0; k--) {
        int v = thu_tu[k];
        long long sa = 1, sb = 0, sc = 0, them = VC;
        bool co_den = false;
        for (int u : adj[v]) {
            if (u == cha[v]) continue;
            sa += min({a[u], b[u], c[u]});
            sb += min(a[u], b[u]);
            if (a[u] <= b[u]) co_den = true;
            else them = min(them, a[u] - b[u]);
            sc += b[u];
        }
        a[v] = sa;
        b[v] = co_den ? sb : (them >= VC ? VC : sb + them);   // lá: không có con nào để nhờ
        c[v] = min(sc, VC);
    }
    printf("%lld\n", min(a[1], b[1]));
}
