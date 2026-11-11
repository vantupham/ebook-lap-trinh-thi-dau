#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<vector<pair<int, long long>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int a, b; long long c;
        cin >> a >> b >> c;
        adj[a].push_back({b, c});
    }
    const long long VC = LLONG_MAX;
    vector<array<long long, 2>> d(n + 1, {VC, VC});
    priority_queue<tuple<long long, int, int>, vector<tuple<long long, int, int>>, greater<>> pq;
    d[1][0] = 0;
    pq.push({0, 1, 0});
    while (!pq.empty()) {
        auto [du, u, k] = pq.top(); pq.pop();
        if (du > d[u][k]) continue;
        for (auto [v, w] : adj[u]) {
            if (du + w < d[v][k]) { d[v][k] = du + w; pq.push({d[v][k], v, k}); }
            if (k == 0 && du + w / 2 < d[v][1]) { d[v][1] = du + w / 2; pq.push({d[v][1], v, 1}); }
        }
    }
    cout << min(d[n][0], d[n][1]) << '\n';
}
