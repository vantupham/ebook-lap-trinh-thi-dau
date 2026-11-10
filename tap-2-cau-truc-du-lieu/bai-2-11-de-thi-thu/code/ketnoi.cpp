#include <bits/stdc++.h>
using namespace std;
vector<int> cha;
vector<long long> sz;
int tim(int u) {
    while (cha[u] != u) { cha[u] = cha[cha[u]]; u = cha[u]; }
    return u;
}
int main() {
    freopen("KETNOI.INP", "r", stdin);
    freopen("KETNOI.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    cha.resize(n + 1); sz.assign(n + 1, 1);
    iota(cha.begin(), cha.end(), 0);
    long long cap = 0;
    while (m--) {
        int u, v;
        cin >> u >> v;
        u = tim(u); v = tim(v);
        if (u != v) {
            if (sz[u] < sz[v]) swap(u, v);
            cap += sz[u] * sz[v];
            cha[v] = u;
            sz[u] += sz[v];
        }
        cout << cap << '\n';
    }
}
