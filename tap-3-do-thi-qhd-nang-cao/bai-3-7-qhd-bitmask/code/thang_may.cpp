#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    long long x;
    cin >> n >> x;
    vector<long long> w(n);
    for (auto &v : w) cin >> v;
    int full = 1 << n;
    vector<pair<int, long long>> dp(full, {INT_MAX, 0});   // (số chuyến, kg chuyến cuối)
    dp[0] = {1, 0};
    for (int mask = 0; mask < full; mask++) {
        if (dp[mask].first == INT_MAX) continue;
        auto [k, cur] = dp[mask];
        for (int i = 0; i < n; i++) {
            if (mask >> i & 1) continue;
            pair<int, long long> moi = (cur + w[i] <= x) ? make_pair(k, cur + w[i])
                                                         : make_pair(k + 1, w[i]);
            dp[mask | 1 << i] = min(dp[mask | 1 << i], moi);   // so cặp: chuyến trước, kg sau
        }
    }
    cout << dp[full - 1].first << '\n';
}
