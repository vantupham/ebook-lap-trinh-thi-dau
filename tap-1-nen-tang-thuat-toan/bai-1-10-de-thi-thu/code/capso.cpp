#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("CAPSO.INP", "r", stdin);
    freopen("CAPSO.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long X;
    cin >> n >> X;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    sort(a.begin(), a.end());
    long long dem = 0;
    int r = n - 1;
    for (int l = 0; l < n; l++) {
        while (r > l && a[l] + a[r] > X) r--;
        if (r <= l) break;
        dem += r - l;
    }
    cout << dem << '\n';
}
