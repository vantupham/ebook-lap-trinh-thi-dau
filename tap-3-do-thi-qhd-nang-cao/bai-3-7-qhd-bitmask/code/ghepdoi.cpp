#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("GHEPDOI.INP", "r", stdin);
    freopen("GHEPDOI.OUT", "w", stdout);
    int N;
    scanf("%d", &N);
    vector<vector<int>> s(N, vector<int>(N));
    for (auto &r : s) for (auto &v : r) scanf("%d", &v);
    int full = (1 << N) - 1;
    vector<int> dp(1 << N, -1);
    dp[0] = 0;
    for (int mask = 0; mask < full; mask++) {
        if (dp[mask] < 0) continue;
        int i = __builtin_ctz(~mask);                     // bạn nhỏ nhất chưa có cặp
        for (int j = i + 1; j < N; j++) {
            if (mask >> j & 1) continue;
            int t = mask | 1 << i | 1 << j;
            dp[t] = max(dp[t], dp[mask] + s[i][j]);
        }
    }
    printf("%d\n", dp[full]);
}
