#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; long long x;
    cin >> n >> x;
    vector<long long> a(n);
    for (auto &v : a) cin >> v;
    sort(a.begin(), a.end());
    int l = 0, r = n - 1;
    long long dem = 0;
    while (l < r) {
        if (a[l] + a[r] <= x) { dem += r - l; l++; }
        else r--;
    }
    cout << dem << '\n';
}
