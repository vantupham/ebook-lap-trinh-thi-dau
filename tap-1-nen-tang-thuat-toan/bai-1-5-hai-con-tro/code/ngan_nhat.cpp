#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; long long S;
    cin >> n >> S;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    long long tong = 0;
    int l = 0, best = n + 1;
    for (int r = 0; r < n; r++) {
        tong += a[r];
        while (tong >= S) { best = min(best, r - l + 1); tong -= a[l++]; }
    }
    cout << (best <= n ? best : 0) << '\n';
}
