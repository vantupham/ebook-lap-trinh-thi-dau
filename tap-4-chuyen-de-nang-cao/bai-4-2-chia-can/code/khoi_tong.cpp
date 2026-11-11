#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    int B = max(1, (int)sqrt(n));
    vector<long long> a(n), kh((n + B - 1) / B, 0);
    for (int i = 0; i < n; i++) { cin >> a[i]; kh[i / B] += a[i]; }
    while (q--) {
        int t; long long x, y;
        cin >> t >> x >> y;
        if (t == 1) { int i = x - 1; kh[i / B] += y - a[i]; a[i] = y; }
        else {
            int l = x - 1, r = y - 1;
            long long s = 0;
            while (l <= r && l % B != 0) s += a[l++];
            while (l + B - 1 <= r) { s += kh[l / B]; l += B; }
            while (l <= r) s += a[l++];
            cout << s << '\n';
        }
    }
}
