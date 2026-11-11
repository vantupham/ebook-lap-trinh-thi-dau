#include <bits/stdc++.h>
using namespace std;
const int LOG = 18;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<vector<int>> up(LOG, vector<int>(n + 1, 0));
    vector<int> sau(n + 1, -1);
    queue<int> bq;
    sau[1] = 0; bq.push(1);
    while (!bq.empty()) {
        int u = bq.front(); bq.pop();
        for (int v : adj[u]) if (sau[v] < 0) { sau[v] = sau[u] + 1; up[0][v] = u; bq.push(v); }
    }
    for (int j = 1; j < LOG; j++)
        for (int v = 1; v <= n; v++) up[j][v] = up[j - 1][up[j - 1][v]];
    auto lca = [&](int a, int b) {
        if (sau[a] < sau[b]) swap(a, b);
        int k = sau[a] - sau[b];
        for (int j = 0; j < LOG; j++) if (k >> j & 1) a = up[j][a];
        if (a == b) return a;
        for (int j = LOG - 1; j >= 0; j--)
            if (up[j][a] != up[j][b]) { a = up[j][a]; b = up[j][b]; }
        return up[0][a];
    };
    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << sau[a] + sau[b] - 2 * sau[lca(a, b)] << '\n';
    }
}
