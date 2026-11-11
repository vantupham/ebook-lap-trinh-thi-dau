#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<int> mau(n + 1, -1);
    bool ok = true;
    for (int s = 1; s <= n && ok; s++) {
        if (mau[s] != -1) continue;
        mau[s] = 0;
        queue<int> q;
        q.push(s);
        while (!q.empty() && ok) {
            int u = q.front(); q.pop();
            for (int v : adj[u]) {
                if (mau[v] == -1) { mau[v] = 1 - mau[u]; q.push(v); }
                else if (mau[v] == mau[u]) { ok = false; break; }
            }
        }
    }
    cout << (ok ? "YES" : "NO") << '\n';
}
