#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("QUANCO.INP", "r", stdin);
    freopen("QUANCO.OUT", "w", stdout);
    int n, m, k;
    scanf("%d %d %d", &n, &m, &k);
    vector<vector<int>> ke(n + 1);
    vector<int> vao(n + 1, 0);
    for (int i = 0; i < m; i++) { int u, v; scanf("%d %d", &u, &v); ke[u].push_back(v); vao[v]++; }
    vector<int> thu_tu, q;
    for (int u = 1; u <= n; u++) if (vao[u] == 0) q.push_back(u);
    for (size_t i = 0; i < q.size(); i++) {
        int u = q[i]; thu_tu.push_back(u);
        for (int v : ke[u]) if (--vao[v] == 0) q.push_back(v);
    }
    vector<int> g(n + 1, 0), dau(n + 2, 0);
    for (int i = n - 1; i >= 0; i--) {
        int u = thu_tu[i];
        for (int v : ke[u]) if (g[v] <= (int)ke[u].size()) dau[g[v]] = u;
        int mex = 0;
        while (dau[mex] == u) mex++;
        g[u] = mex;
    }
    int x = 0;
    for (int i = 0; i < k; i++) { int c; scanf("%d", &c); x ^= g[c]; }
    printf("%s\n", x ? "AN" : "BINH");
}
