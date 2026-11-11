#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("HOCBONG.INP", "r", stdin);
    freopen("HOCBONG.OUT", "w", stdout);
    int n, k;
    cin >> n >> k;
    vector<long long> d(n);
    for (auto &x : d) cin >> x;
    sort(d.rbegin(), d.rend());
    long long m = d[k - 1];
    int dem = 0;
    for (auto x : d) if (x >= m) dem++;
    cout << dem << '\n';
}
