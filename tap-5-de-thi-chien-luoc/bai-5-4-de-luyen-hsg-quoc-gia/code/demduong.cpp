#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1e9 + 7, VC = LLONG_MAX / 4;
int main() {
    freopen("DEMDUONG.INP", "r", stdin);
    freopen("DEMDUONG.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<vector<pair<int, long long>>> adj(n + 1);
    for (int i = 0; i < m; i++) { int u, v; long long w; cin >> u >> v >> w; adj[u].push_back({v, w}); adj[v].push_back({u, w}); }
    vector<long long> d(n + 1, VC), cach(n + 1, 0);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    d[1] = 0; cach[1] = 1; pq.push({0, 1});
    while (!pq.empty()) {
        auto [du, u] = pq.top(); pq.pop();
        if (du > d[u]) continue;            // khi lấy u ra lần đầu, cach[u] đã đủ
        for (auto [v, w] : adj[u]) {
            if (d[u] + w < d[v]) { d[v] = d[u] + w; cach[v] = cach[u]; pq.push({d[v], v}); }
            else if (d[u] + w == d[v]) cach[v] = (cach[v] + cach[u]) % MOD;
        }
    }
    if (d[n] == VC) cout << -1 << '\n';
    else cout << d[n] << ' ' << cach[n] << '\n';
}
