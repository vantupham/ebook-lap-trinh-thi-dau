#include <bits/stdc++.h>
using namespace std;
vector<int> cha, sz;

int tim(int u) {                               // trưởng nhóm của u, có nén đường
    while (cha[u] != u) {
        cha[u] = cha[cha[u]];                  // nhảy cóc: rút ngắn đường đi
        u = cha[u];
    }
    return u;
}

void gop(int u, int v) {
    u = tim(u); v = tim(v);
    if (u == v) return;
    if (sz[u] < sz[v]) swap(u, v);             // nhóm nhỏ nhập vào nhóm lớn
    cha[v] = u;
    sz[u] += sz[v];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    cha.resize(n + 1); sz.assign(n + 1, 1);
    iota(cha.begin(), cha.end(), 0);           // cha[u] = u
    while (q--) {
        int t, u, v;
        cin >> t >> u;
        if (t == 1) { cin >> v; gop(u, v); }
        else if (t == 2) { cin >> v; cout << (tim(u) == tim(v) ? "YES" : "NO") << '\n'; }
        else cout << sz[tim(u)] << '\n';
    }
}
