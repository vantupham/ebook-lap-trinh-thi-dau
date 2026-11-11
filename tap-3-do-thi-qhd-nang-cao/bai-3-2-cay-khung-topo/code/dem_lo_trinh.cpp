#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    const long long MOD = 1e9 + 7;
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
    queue<int> q;
    for (int i = 1; i <= n; i++) if (vao[i] == 0) q.push(i);
    vector<long long> f(n + 1, 0);
    f[1] = 1;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            f[v] = (f[v] + f[u]) % MOD;
            if (--vao[v] == 0) q.push(v);
        }
    }
    cout << f[n] << '\n';
}
