#include <bits/stdc++.h>
using namespace std;
int main() {
    const long long MOD = 1e9 + 7;
    int n;
    cin >> n;
    vector<long long> dp(n + 1, 0);
    dp[0] = 1;
    for (int s = 1; s <= n; s++)
        for (int k = 1; k <= 6 && k <= s; k++)
            dp[s] = (dp[s] + dp[s - k]) % MOD;
    cout << dp[n] << '\n';
}
