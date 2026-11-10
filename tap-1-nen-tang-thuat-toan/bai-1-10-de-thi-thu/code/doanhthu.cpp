#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("DOANHTHU.INP", "r", stdin);
    freopen("DOANHTHU.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    long long K;
    cin >> n >> K >> q;
    vector<long long> p(n + 1, 0);
    vector<int> d(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        p[i] = p[i - 1] + x;
        d[i] = d[i - 1] + (x >= K);
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << p[r] - p[l - 1] << ' ' << d[r] - d[l - 1] << '\n';
    }
}
