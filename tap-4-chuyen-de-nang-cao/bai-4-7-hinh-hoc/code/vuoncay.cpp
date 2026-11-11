#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int main() {
    freopen("VUONCAY.INP", "r", stdin);
    freopen("VUONCAY.OUT", "w", stdout);
    int n; scanf("%d", &n);
    vector<ll> x(n), y(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &x[i], &y[i]);
    ll s2 = 0, b = 0;
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        s2 += x[i] * y[j] - x[j] * y[i];
        b += __gcd(llabs(x[j] - x[i]), llabs(y[j] - y[i]));
    }
    s2 = llabs(s2);
    printf("%lld\n", (s2 - b + 2) / 2);
}
