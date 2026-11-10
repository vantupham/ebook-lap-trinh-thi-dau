#include <bits/stdc++.h>
using namespace std;
struct Canh { int toi; long long con; };               // con = khả năng còn dư
vector<Canh> E;
vector<vector<int>> g;
vector<int> tang, it;

void them(int a, int b, long long c) {
    g[a].push_back(E.size()); E.push_back({b, c});
    g[b].push_back(E.size()); E.push_back({a, 0});    // cạnh ngược, ban đầu 0; cạnh i và i^1 là một cặp
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
    int n, m;
    cin >> n >> m;
    g.assign(n + 1, {}); tang.assign(n + 1, -1); it.assign(n + 1, 0);
    for (int i = 0; i < m; i++) { int a, b; long long c; cin >> a >> b >> c; them(a, b, c); }
    long long luong = 0;
    while (bfs(1, n)) {
        fill(it.begin(), it.end(), 0);
        while (long long f = dfs(1, n, LLONG_MAX)) luong += f;
    }
    cout << luong << '\n';
}
