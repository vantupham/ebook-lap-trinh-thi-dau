#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("LANGNHUA.INP", "r", stdin);
    freopen("LANGNHUA.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<long long> d(n + 2, 0);
    while (q--) {
        int l, r; long long v;
        cin >> l >> r >> v;
        d[l] += v; d[r + 1] -= v;
    }
    long long cur = 0, best = -1; int dem = 0;
    for (int i = 1; i <= n; i++) {
        cur += d[i];
        if (cur > best) { best = cur; dem = 1; }
        else if (cur == best) dem++;
    }
    cout << best << ' ' << dem << '\n';
}
