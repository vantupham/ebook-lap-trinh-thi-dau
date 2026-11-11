#include <bits/stdc++.h>
using namespace std;
int main() {
    const long long MOD = 1e9 + 7;
    int n;
    cin >> n;
    vector<string> g(n);
    for (auto &r : g) cin >> r;
    vector<vector<long long>> dp(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) {
            if (g[i][j] == '*') { dp[i][j] = 0; continue; }
            if (i == 0 && j == 0) { dp[i][j] = 1; continue; }
            long long v = 0;
            if (i > 0) v += dp[i - 1][j];
            if (j > 0) v += dp[i][j - 1];
            dp[i][j] = v % MOD;
        }
    cout << dp[n - 1][n - 1] << '\n';
}
