#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int main() {
    int n;
    ll x;
    cin >> n >> x;
    vector<ll> s(n + 1), F(n + 1);
    for (int i = 1; i <= n; i++) cin >> s[i];
    for (int i = 1; i <= n; i++) cin >> F[i];
    F[0] = x;
    vector<ll> dp(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        dp[i] = LLONG_MAX;
        for (int j = 0; j < i; j++) dp[i] = min(dp[i], dp[j] + s[i] * F[j]);
    }
    cout << dp[n] << '\n';
}
