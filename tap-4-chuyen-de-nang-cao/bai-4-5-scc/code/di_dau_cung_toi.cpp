#include <bits/stdc++.h>
using namespace std;
int n;
bool du(const vector<vector<int>> &g) {
    vector<bool> t(n + 1, false);
    queue<int> q;
    q.push(1); t[1] = true;
    int dem = 1;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : g[u]) if (!t[v]) { t[v] = true; dem++; q.push(v); }
    }
    return dem == n;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int m;
    cin >> n >> m;
    vector<vector<int>> g(n + 1), rg(n + 1);
    for (int i = 0; i < m; i++) { int a, b; cin >> a >> b; g[a].push_back(b); rg[b].push_back(a); }
    cout << (du(g) && du(rg) ? "YES" : "NO") << '\n';
}
