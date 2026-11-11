#include <bits/stdc++.h>
using namespace std;
struct Canh { int toi; long long con; };
vector<Canh> E;
vector<vector<int>> g;
vector<int> tang, it;
void them(int a, int b, long long c) {
    g[a].push_back(E.size()); E.push_back({b, c});
    g[b].push_back(E.size()); E.push_back({a, 0});
}
bool bfs(int s, int t) {
    fill(tang.begin(), tang.end(), -1);
    queue<int> q; q.push(s); tang[s] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int id : g[u]) if (E[id].con > 0 && tang[E[id].toi] == -1) { tang[E[id].toi] = tang[u] + 1; q.push(E[id].toi); }
    }
    return tang[t] != -1;
}
long long dfs(int u, int t, long long f) {
    if (u == t) return f;
    for (int &i = it[u]; i < (int)g[u].size(); i++) {
        int id = g[u][i], v = E[id].toi;
        if (E[id].con > 0 && tang[v] == tang[u] + 1) {
            long long d = dfs(v, t, min(f, E[id].con));
            if (d > 0) { E[id].con -= d; E[id ^ 1].con += d; return d; }
        }
    }
    return 0;
}
int main() {
    freopen("CAULACBO.INP", "r", stdin);
    freopen("CAULACBO.OUT", "w", stdout);
    int n, m, k;
    scanf("%d %d %d", &n, &m, &k);
    int s = 0, t = n + m + 1;
    g.assign(t + 1, {}); tang.assign(t + 1, -1); it.assign(t + 1, 0);
    for (int j = 1; j <= m; j++) { long long c; scanf("%lld", &c); them(n + j, t, c); }
    for (int i = 1; i <= n; i++) them(s, i, 1);
    for (int e = 0; e < k; e++) { int i, j; scanf("%d %d", &i, &j); them(i, n + j, 1); }
    long long luong = 0;
    while (bfs(s, t)) {
        fill(it.begin(), it.end(), 0);
        while (long long f = dfs(s, t, LLONG_MAX)) luong += f;
    }
    printf("%lld\n", luong);
}
