#include <bits/stdc++.h>
using namespace std;
const long long VC = LLONG_MAX / 4;
vector<vector<pair<int, long long>>> adj;
vector<long long> dijkstra(int src, int n) {
    vector<long long> d(n + 1, VC);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    d[src] = 0; pq.push({0, src});
    while (!pq.empty()) {
        auto [du, u] = pq.top(); pq.pop();
        if (du > d[u]) continue;
        for (auto [v, w] : adj[u]) if (d[u] + w < d[v]) { d[v] = d[u] + w; pq.push({d[v], v}); }
    }
    return d;
}
int main() {
    freopen("GIAOHANG.INP", "r", stdin);
    freopen("GIAOHANG.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m, s;
    cin >> n >> m >> s;
    vector<int> kho(s);
    for (auto &x : kho) cin >> x;
    adj.assign(n + 1, {});
    for (int i = 0; i < m; i++) {
        int u, v; long long w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    auto d1 = dijkstra(1, n), dn = dijkstra(n, n);
    long long kq = VC;
    for (int w : kho) if (d1[w] < VC && dn[w] < VC) kq = min(kq, d1[w] + dn[w]);
    cout << (kq == VC ? -1 : kq) << '\n';
}
