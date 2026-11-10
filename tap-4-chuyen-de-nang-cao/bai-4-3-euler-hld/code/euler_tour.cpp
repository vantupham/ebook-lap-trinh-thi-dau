#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> fw;
void cong(int i, long long v) { for (; i <= n; i += i & -i) fw[i] += v; }
long long tong(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += fw[i]; return s; }

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    vector<long long> val(n + 1);
    for (int i = 1; i <= n; i++) cin >> val[i];
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) { int a, b; cin >> a >> b; adj[a].push_back(b); adj[b].push_back(a); }
    vector<int> vao(n + 1), ra(n + 1), cha(n + 1, 0), it(n + 1, 0);
    int t = 0;
    vector<int> st = {1};                             // DFS bằng ngăn xếp
    vao[1] = ++t;
    while (!st.empty()) {
        int u = st.back();
        if (it[u] < (int)adj[u].size()) {
            int v = adj[u][it[u]++];
            if (v == cha[u]) continue;
            cha[v] = u; vao[v] = ++t; st.push_back(v);
        } else { ra[u] = t; st.pop_back(); }
    }
    fw.assign(n + 1, 0);
    auto them = [&](int s, long long d) { cong(vao[s], d); cong(ra[s] + 1, -d); };   // + d cho cả cây con
    for (int s = 1; s <= n; s++) them(s, val[s]);
    while (q--) {
        int tp, s;
        cin >> tp >> s;
        if (tp == 1) { long long x; cin >> x; them(s, x - val[s]); val[s] = x; }
        else cout << tong(vao[s]) << '\n';
    }
}
