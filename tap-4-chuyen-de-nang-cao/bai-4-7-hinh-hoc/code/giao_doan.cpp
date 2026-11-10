#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
struct P { ll x, y; };
ll cross(P o, P a, P b) { return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x); }
int dau(ll v) { return (v > 0) - (v < 0); }
bool tren_doan(P a, P b, P c) {          // c nằm trên đoạn ab?
    return cross(a, b, c) == 0 && min(a.x, b.x) <= c.x && c.x <= max(a.x, b.x)
                               && min(a.y, b.y) <= c.y && c.y <= max(a.y, b.y);
}
bool cat(P a, P b, P c, P d) {
    if (tren_doan(a, b, c) || tren_doan(a, b, d) || tren_doan(c, d, a) || tren_doan(c, d, b)) return true;
    return dau(cross(a, b, c)) * dau(cross(a, b, d)) < 0 && dau(cross(c, d, a)) * dau(cross(c, d, b)) < 0;
}
int main() {
    int t; cin >> t;
    while (t--) {
        P a, b, c, d;
        cin >> a.x >> a.y >> b.x >> b.y >> c.x >> c.y >> d.x >> d.y;
        cout << (cat(a, b, c, d) ? "YES" : "NO") << '\n';
    }
}
