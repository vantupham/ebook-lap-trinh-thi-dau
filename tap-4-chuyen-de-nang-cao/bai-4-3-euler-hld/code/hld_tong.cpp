#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> fw;
void cong(int i, long long v) { for (i++; i <= n; i += i & -i) fw[i] += v; }       // vị trí từ 0
long long tong(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += fw[i]; return s; }   // tổng [0, i)
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    vector<long long> val(n + 1);
    for (int i = 1; i <= n; i++) cin >> val[i];
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) { int a, b; cin >> a >> b; adj[a].push_back(b); adj[b].push_back(a); }
    vector<int> cha(n + 1, 0), sau(n + 1, 0), sz(n + 1, 1), nang(n + 1, 0), dau(n + 1), vt(n + 1), bfs = {1};
    for (int k = 0; k < (int)bfs.size(); k++)
        for (int v : adj[bfs[k]]) if (v != cha[bfs[k]]) { cha[v] = bfs[k]; sau[v] = sau[bfs[k]] + 1; bfs.push_back(v); }
    for (int k = n - 1; k > 0; k--) {
        int u = bfs[k], p = cha[u];
        sz[p] += sz[u];
        if (nang[p] == 0 || sz[u] > sz[nang[p]]) nang[p] = u;
    }
    int t = 0;
    vector<int> st = {1};
    while (!st.empty()) {
        int h = st.back(); st.pop_back();
        for (int u = h; u != 0; u = nang[u]) {
            dau[u] = h; vt[u] = t++;
            for (int v : adj[u]) if (v != cha[u] && v != nang[u]) st.push_back(v);
        }
    }
    fw.assign(n + 1, 0);
    for (int u = 1; u <= n; u++) cong(vt[u], val[u]);
    while (q--) {
        int tp, a, b;
        cin >> tp >> a >> b;
        if (tp == 1) { cong(vt[a], b - val[a]); val[a] = b; continue; }
        long long kq = 0;
        while (dau[a] != dau[b]) {
            if (sau[dau[a]] < sau[dau[b]]) swap(a, b);
            kq += tong(vt[a] + 1) - tong(vt[dau[a]]);
            a = cha[dau[a]];
        }
        if (sau[a] > sau[b]) swap(a, b);
        kq += tong(vt[b] + 1) - tong(vt[a]);
        cout << kq << '\n';
    }
}
