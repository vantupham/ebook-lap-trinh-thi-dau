#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    long long cur = a[0], best = a[0];
    for (int i = 1; i < n; i++) {
        cur = min(a[i], cur + a[i]);
        best = min(best, cur);
    }
    cout << best << '\n';
}
