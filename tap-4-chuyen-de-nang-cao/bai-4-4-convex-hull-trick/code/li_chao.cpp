#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int MX = 1000000;
struct Line { ll m, b; ll at(ll x) const { return m * x + b; } };
vector<Line> t;
void them(int x, int l, int r, Line d) {
    int m = (l + r) / 2;
    if (d.at(m) < t[x].at(m)) swap(t[x], d);
    if (l == r) return;
    if (d.at(l) < t[x].at(l)) them(2 * x, l, m, d);
    else if (d.at(r) < t[x].at(r)) them(2 * x + 1, m + 1, r, d);
}
ll hoi(int x, int l, int r, int X) {
    ll kq = t[x].at(X);
    if (l == r) return kq;
    int m = (l + r) / 2;
    return min(kq, X <= m ? hoi(2 * x, l, m, X) : hoi(2 * x + 1, m + 1, r, X));
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    ll x;
    cin >> n >> x;
    vector<ll> s(n), f(n);
    for (auto &v : s) cin >> v;
    for (auto &v : f) cin >> v;
    t.assign(4 * MX + 4, {0, (ll)4e18});
    them(1, 1, MX, {x, 0});
    ll dp = 0;
    for (int i = 0; i < n; i++) {
        dp = hoi(1, 1, MX, s[i]);
        them(1, 1, MX, {f[i], dp});
    }
    cout << dp << '\n';
}
