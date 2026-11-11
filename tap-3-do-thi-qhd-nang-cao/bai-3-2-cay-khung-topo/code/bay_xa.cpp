#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    vector<int> vao(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        vao[b]++;
    }
    const int AM = INT_MIN;                       // chưa tới được
    vector<int> g(n + 1, AM);
    g[1] = 1;
    queue<int> q;
    for (int i = 1; i <= n; i++) if (vao[i] == 0) q.push(i);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (g[u] != AM) g[v] = max(g[v], g[u] + 1);
            if (--vao[v] == 0) q.push(v);
        }
    }
    if (g[n] == AM) cout << "IMPOSSIBLE\n";
    else cout << g[n] << '\n';
}
