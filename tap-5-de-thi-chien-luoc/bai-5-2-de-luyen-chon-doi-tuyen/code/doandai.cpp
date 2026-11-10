#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("DOANDAI.INP", "r", stdin);
    freopen("DOANDAI.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; long long s;
    cin >> n >> s;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    long long tong = 0; int l = 0, best = 0;
    for (int r = 0; r < n; r++) {
        tong += a[r];
        while (tong > s) tong -= a[l++];       // đoạn [l, r] luôn có tổng <= s (l có thể vượt r)
        best = max(best, r - l + 1);
    }
    cout << best << '\n';
}
