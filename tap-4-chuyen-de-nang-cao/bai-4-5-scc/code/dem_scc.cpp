#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<vector<int>> g(n + 1), rg(n + 1);
    for (int i = 0; i < m; i++) { int a, b; cin >> a >> b; g[a].push_back(b); rg[b].push_back(a); }
    vector<int> xong, it(n + 1, 0);
    vector<bool> tham(n + 1, false);
    for (int s = 1; s <= n; s++) {
        if (tham[s]) continue;
        vector<int> st = {s};
        tham[s] = true;
        while (!st.empty()) {
            int u = st.back();
            if (it[u] < (int)g[u].size()) {
                int v = g[u][it[u]++];
                if (!tham[v]) { tham[v] = true; st.push_back(v); }
            } else { xong.push_back(u); st.pop_back(); }
        }
    }
    vector<int> comp(n + 1, -1);
    int c = 0;
    for (int i = n - 1; i >= 0; i--) {
        int s = xong[i];
        if (comp[s] != -1) continue;
        vector<int> st = {s};
        comp[s] = c;
        while (!st.empty()) {
            int u = st.back(); st.pop_back();
            for (int v : rg[u]) if (comp[v] == -1) { comp[v] = c; st.push_back(v); }
        }
        c++;
    }
    vector<int> sz(c, 0);
    for (int u = 1; u <= n; u++) sz[comp[u]]++;
    cout << c << ' ' << *max_element(sz.begin(), sz.end()) << '\n';
}
