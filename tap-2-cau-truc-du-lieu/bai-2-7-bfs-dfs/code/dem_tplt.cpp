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
    vector<bool> tham(n + 1, false);
    int dem = 0;
    for (int s = 1; s <= n; s++) {
        if (tham[s]) continue;
        dem++;                                  // thành phần mới
        stack<int> st;                          // DFS bằng ngăn xếp, tránh đệ quy quá sâu
        st.push(s);
        tham[s] = true;
        while (!st.empty()) {
            int u = st.top(); st.pop();
            for (int v : adj[u])
                if (!tham[v]) { tham[v] = true; st.push(v); }
        }
    }
    cout << dem << '\n';
}
