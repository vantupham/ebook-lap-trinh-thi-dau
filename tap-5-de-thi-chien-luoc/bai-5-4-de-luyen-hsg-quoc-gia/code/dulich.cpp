#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("DULICH.INP", "r", stdin);
    freopen("DULICH.OUT", "w", stdout);
    int n;
    cin >> n;
    vector<vector<long long>> c(n, vector<long long>(n));
    for (auto &row : c) for (auto &x : row) cin >> x;
    const long long VC = LLONG_MAX / 4;
    // f[mask][u] = chi phí nhỏ nhất đi qua đúng tập mask (chứa đỉnh 0), đang đứng ở u
    vector<vector<long long>> f(1 << n, vector<long long>(n, VC));
    f[1][0] = 0;
    for (int mask = 1; mask < (1 << n); mask++) {
        if (!(mask & 1)) continue;
        for (int u = 0; u < n; u++) {
            if (f[mask][u] == VC) continue;
            for (int v = 0; v < n; v++) if (!(mask >> v & 1))
                f[mask | 1 << v][v] = min(f[mask | 1 << v][v], f[mask][u] + c[u][v]);
        }
    }
    cout << *min_element(f[(1 << n) - 1].begin(), f[(1 << n) - 1].end()) << '\n';
}
