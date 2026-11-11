#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("ECHNHAY.INP", "r", stdin);
    freopen("ECHNHAY.OUT", "w", stdout);
    int n, K;
    scanf("%d %d", &n, &K);
    vector<long long> h(n);
    for (auto &v : h) scanf("%lld", &v);
    vector<long long> dp(n, LLONG_MAX);
    dp[0] = 0;
    for (int i = 1; i < n; i++)
        for (int j = max(0, i - K); j < i; j++)
            dp[i] = min(dp[i], dp[j] + llabs(h[i] - h[j]));
    printf("%lld\n", dp[n - 1]);
}
