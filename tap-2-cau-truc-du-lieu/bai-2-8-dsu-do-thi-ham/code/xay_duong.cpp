#include <bits/stdc++.h>
using namespace std;
vector<int> cha, sz;
int tim(int u) { while (cha[u] != u) { cha[u] = cha[cha[u]]; u = cha[u]; } return u; }
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    cha.resize(n + 1); sz.assign(n + 1, 1);
    iota(cha.begin(), cha.end(), 0);
    int so_nhom = n, lon_nhat = 1;
    while (m--) {
        int u, v;
        cin >> u >> v;
        u = tim(u); v = tim(v);
        if (u != v) {
            if (sz[u] < sz[v]) swap(u, v);
            cha[v] = u; sz[u] += sz[v];
            so_nhom--;
            lon_nhat = max(lon_nhat, sz[u]);
        }
        cout << so_nhom << ' ' << lon_nhat << '\n';
    }
}
