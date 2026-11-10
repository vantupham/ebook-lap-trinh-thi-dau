#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<int> cha(n + 1, 0), thu_tu;               // thứ tự BFS từ gốc 1
    thu_tu.reserve(n);
    thu_tu.push_back(1);
    cha[1] = -1;
    for (int k = 0; k < (int)thu_tu.size(); k++) {
        int u = thu_tu[k];
        for (int v : adj[u]) if (v != cha[u]) { cha[v] = u; thu_tu.push_back(v); }
    }
    vector<long long> f(n + 1, 0), g(n + 1, 0);
    for (int k = n - 1; k >= 0; k--) {               // duyệt ngược: con trước cha
        int v = thu_tu[k];
        for (int c : adj[v]) if (c != cha[v]) f[v] += g[c];
        g[v] = f[v];
        for (int c : adj[v]) if (c != cha[v]) g[v] = max(g[v], f[v] - g[c] + f[c] + 1);
    }
    cout << g[1] << '\n';
}
