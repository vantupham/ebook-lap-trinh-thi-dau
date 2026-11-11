#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("DAYCAU.INP", "r", stdin);
    freopen("DAYCAU.OUT", "w", stdout);
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<pair<int, int>>> adj(n + 1);           // (đỉnh kề, chỉ số cạnh)
    for (int i = 0; i < m; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back({b, i});
        adj[b].push_back({a, i});
    }
    vector<int> vao(n + 1, -1), thap(n + 1), it(n + 1, 0), canh_cha(n + 1, -1), cha(n + 1, 0);
    int t = 0, cau = 0;
    for (int s = 1; s <= n; s++) {
        if (vao[s] != -1) continue;
        vao[s] = thap[s] = t++;
        vector<int> st = {s};
        while (!st.empty()) {
            int u = st.back();
            if (it[u] < (int)adj[u].size()) {
                auto [v, id] = adj[u][it[u]++];
                if (id == canh_cha[u]) continue;
                if (vao[v] == -1) { vao[v] = thap[v] = t++; canh_cha[v] = id; cha[v] = u; st.push_back(v); }
                else thap[u] = min(thap[u], vao[v]);    // cạnh ngược
            } else {
                st.pop_back();
                int p = cha[u];
                if (p) {
                    thap[p] = min(thap[p], thap[u]);
                    if (thap[u] > vao[p]) cau++;
                }
            }
        }
    }
    printf("%d\n", cau);
}
