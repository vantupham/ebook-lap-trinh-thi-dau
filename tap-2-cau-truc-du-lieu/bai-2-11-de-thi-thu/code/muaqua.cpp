#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("MUAQUA.INP", "r", stdin);
    freopen("MUAQUA.OUT", "w", stdout);
    int n;
    long long x;
    cin >> n >> x;
    vector<long long> c(n), v(n);
    long long tongv = 0;
    for (int i = 0; i < n; i++) { cin >> c[i] >> v[i]; tongv += v[i]; }
    if (x <= 100000) {                               // cái túi theo tiền
        vector<long long> dp(x + 1, 0);
        for (int i = 0; i < n; i++)
            for (long long j = x; j >= c[i]; j--) dp[j] = max(dp[j], dp[j - c[i]] + v[i]);
        cout << dp[x] << '\n';
    } else {                                         // cái túi theo điểm vui
        const long long VC = LLONG_MAX / 4;
        vector<long long> f(tongv + 1, VC);
        f[0] = 0;
        for (int i = 0; i < n; i++)
            for (long long s = tongv; s >= v[i]; s--)
                if (f[s - v[i]] != VC) f[s] = min(f[s], f[s - v[i]] + c[i]);
        long long kq = 0;
        for (long long s = 0; s <= tongv; s++) if (f[s] <= x) kq = s;
        cout << kq << '\n';
    }
}
