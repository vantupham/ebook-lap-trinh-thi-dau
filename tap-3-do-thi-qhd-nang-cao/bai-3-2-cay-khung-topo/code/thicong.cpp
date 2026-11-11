#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("THICONG.INP", "r", stdin);
    freopen("THICONG.OUT", "w", stdout);
    int n, m;
    scanf("%d %d", &n, &m);
    vector<long long> t(n + 1), bat_dau(n + 1, 0);   // bat_dau[i]: sớm nhất được bắt đầu
    for (int i = 1; i <= n; i++) scanf("%lld", &t[i]);
    vector<vector<int>> adj(n + 1);
    vector<int> vao(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        vao[b]++;
    }
    queue<int> q;
    for (int i = 1; i <= n; i++) if (vao[i] == 0) q.push(i);
    int da_xep = 0;
    long long ans = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        da_xep++;
        long long xong = bat_dau[u] + t[u];
        ans = max(ans, xong);
        for (int v : adj[u]) {
            bat_dau[v] = max(bat_dau[v], xong);
            if (--vao[v] == 0) q.push(v);
        }
    }
    printf("%lld\n", da_xep == n ? ans : -1LL);
}
