#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;
int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> vao(n);                    // vao[u]: các v có chuyến bay v -> u
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        vao[b - 1].push_back(a - 1);
    }
    vector<vector<int>> dp(1 << n, vector<int>(n, 0));
    dp[1][0] = 1;                                      // chỉ mới ở thành phố 1
    for (int mask = 3; mask < (1 << n); mask++) {
        if (!(mask & 1)) continue;                     // phải chứa thành phố 1
        if ((mask >> (n - 1) & 1) && mask != (1 << n) - 1) continue;   // n chỉ ở cuối
        for (int u = 1; u < n; u++) {
            if (!(mask >> u & 1)) continue;
            int truoc = mask ^ (1 << u);               // tập trước khi tới u
            long long s = 0;
            for (int v : vao[u]) if (truoc >> v & 1) s += dp[truoc][v];
            dp[mask][u] = s % MOD;
        }
    }
    cout << dp[(1 << n) - 1][n - 1] << '\n';
}
