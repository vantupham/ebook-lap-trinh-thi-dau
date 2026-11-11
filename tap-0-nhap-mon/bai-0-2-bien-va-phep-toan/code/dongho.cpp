#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("DONGHO.INP", "r", stdin);
    freopen("DONGHO.OUT", "w", stdout);
    long long h, m, s, t;
    cin >> h >> m >> s >> t;
    long long x = (3600 * h + 60 * m + s + t) % 86400;
    cout << x / 3600 << ' ' << x % 3600 / 60 << ' ' << x % 60 << '\n';
}
