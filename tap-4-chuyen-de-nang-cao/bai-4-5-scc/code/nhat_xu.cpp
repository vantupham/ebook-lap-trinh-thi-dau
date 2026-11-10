#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<long long> k(n + 1);
    for (int i = 1; i <= n; i++) cin >> k[i];
    vector<vector<int>> g(n + 1), rg(n + 1);
    for (int i = 0; i < m; i++) { int a, b; cin >> a >> b; g[a].push_back(b); rg[b].push_back(a); }
    // Bước 1: thứ tự hoàn thành, DFS bằng ngăn xếp
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
    // Bước 2: DFS trên đồ thị đảo theo thứ tự hoàn thành ngược
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
    // Nén và QHĐ: SCC đánh số theo thứ tự tô-pô 0, 1, ..., c-1
    vector<long long> xu(c, 0), dp(c, 0);
    for (int u = 1; u <= n; u++) xu[comp[u]] += k[u];
    vector<vector<int>> cg(c);
    for (int u = 1; u <= n; u++) for (int v : g[u]) if (comp[u] != comp[v]) cg[comp[u]].push_back(comp[v]);
    long long kq = 0;
    for (int x = 0; x < c; x++) dp[x] = xu[x];
    for (int x = 0; x < c; x++) {                     // theo thứ tự tô-pô: x xong trước khi đẩy đi
        kq = max(kq, dp[x]);
        for (int y : cg[x]) dp[y] = max(dp[y], dp[x] + xu[y]);
    }
    cout << kq << '\n';
}
