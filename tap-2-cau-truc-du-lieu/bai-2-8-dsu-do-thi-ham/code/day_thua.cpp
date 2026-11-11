#include <bits/stdc++.h>
using namespace std;
vector<int> cha;
int tim(int u) { while (cha[u] != u) { cha[u] = cha[cha[u]]; u = cha[u]; } return u; }
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    cha.resize(n + 1);
    iota(cha.begin(), cha.end(), 0);
    int dau = 0;
    for (int i = 1; i <= m; i++) {
        int u, v;
        cin >> u >> v;
        u = tim(u); v = tim(v);
        if (u == v) { if (!dau) dau = i; }
        else cha[u] = v;            // ở đây chỉ cần nén đường là đủ nhanh
    }
    cout << dau << '\n';
}
