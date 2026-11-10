#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    long long best = LLONG_MIN;
    for (int l = 0; l < n; l++) {
        long long s = 0;
        for (int r = l; r < n; r++) {
            s += a[r];                  // tổng đoạn [l, r] = tổng [l, r-1] + a[r]
            best = max(best, s);
        }
    }
    cout << best << '\n';
}
