#include <bits/stdc++.h>
using namespace std;
vector<int> cha;
int tim(int u) { while (cha[u] != u) u = cha[u] = cha[cha[u]]; return u; }
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<array<long long, 3>> e(m);               // {chi phí, a, b}
    for (auto &[c, a, b] : e) cin >> a >> b >> c;
    sort(e.begin(), e.end());
    cha.resize(n + 1);
    iota(cha.begin(), cha.end(), 0);
    long long tong = 0;
    int da_noi = 0;
    for (auto [c, a, b] : e) {
        int x = tim(a), y = tim(b);
        if (x == y) continue;
        cha[x] = y;
        tong += c;
        da_noi++;
    }
    if (da_noi == n - 1) cout << tong << '\n';
    else cout << "IMPOSSIBLE\n";
}
