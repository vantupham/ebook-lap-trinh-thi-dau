#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("MOTCHIEU.INP", "r", stdin);
    freopen("MOTCHIEU.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<vector<int>> g(n + 1), gr(n + 1);
    vector<pair<int, int>> e(m);
    for (auto &[u, v] : e) { cin >> u >> v; g[u].push_back(v); gr[v].push_back(u); }
    // Kosaraju lặp: lượt 1 lấy thứ tự kết thúc trên g
    vector<int> thu_tu, it(n + 1, 0);
    vector<char> tham(n + 1, 0);
    for (int s = 1; s <= n; s++) {
        if (tham[s]) continue;
        vector<int> st = {s}; tham[s] = 1;
        while (!st.empty()) {
            int u = st.back();
            if (it[u] < (int)g[u].size()) {
                int v = g[u][it[u]++];
                if (!tham[v]) { tham[v] = 1; st.push_back(v); }
            } else { thu_tu.push_back(u); st.pop_back(); }
        }
    }
    // lượt 2 trên đồ thị ngược, theo thứ tự kết thúc giảm dần
    vector<int> tp(n + 1, -1);
    int c = 0;
    for (int i = n - 1; i >= 0; i--) {
        int s = thu_tu[i];
        if (tp[s] != -1) continue;
        vector<int> st = {s}; tp[s] = c;
        while (!st.empty()) {
            int u = st.back(); st.pop_back();
            for (int v : gr[u]) if (tp[v] == -1) { tp[v] = c; st.push_back(v); }
        }
        c++;
    }
    if (c == 1) { cout << 0 << '\n'; return 0; }
    vector<char> co_vao(c, 0), co_ra(c, 0);
    for (auto [u, v] : e) if (tp[u] != tp[v]) { co_ra[tp[u]] = 1; co_vao[tp[v]] = 1; }
    int nguon = 0, dich = 0;
    for (int i = 0; i < c; i++) { nguon += !co_vao[i]; dich += !co_ra[i]; }
    cout << max(nguon, dich) << '\n';
}
