#include <bits/stdc++.h>
using namespace std;
const long long VC = LLONG_MAX;
int n, m;
vector<vector<pair<int, long long>>> adj;

vector<long long> dijkstra(int s) {
    vector<long long> d(n + 1, VC);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    d[s] = 0;
    pq.push({0, s});
    while (!pq.empty()) {
        auto [du, u] = pq.top(); pq.pop();
        if (du > d[u]) continue;
        for (auto [v, w] : adj[u])
            if (du + w < d[v]) { d[v] = du + w; pq.push({d[v], v}); }
    }
    return d;
}

int main() {
    freopen("HENGAP.INP", "r", stdin);
    freopen("HENGAP.OUT", "w", stdout);
    scanf("%d %d", &n, &m);
    adj.assign(n + 1, {});
    for (int i = 0; i < m; i++) {
        int a, b; long long c;
        scanf("%d %d %lld", &a, &b, &c);
        adj[a].push_back({b, c});
        adj[b].push_back({a, c});
    }
    vector<long long> dA = dijkstra(1), dB = dijkstra(n);
    long long best = VC;
    for (int v = 1; v <= n; v++)
        if (dA[v] != VC && dB[v] != VC) best = min(best, max(dA[v], dB[v]));
    printf("%lld\n", best == VC ? -1LL : best);
}
