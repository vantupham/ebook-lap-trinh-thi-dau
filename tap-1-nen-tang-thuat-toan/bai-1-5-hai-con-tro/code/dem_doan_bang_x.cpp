#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long x;
    cin >> n >> x;
    vector<long long> a(n);
    for (auto &v : a) cin >> v;
    long long tong = 0, dem = 0;
    int l = 0;
    for (int r = 0; r < n; r++) {
        tong += a[r];
        while (tong > x) tong -= a[l++];
        if (tong == x) dem++;          // với mỗi r có tối đa một l phù hợp
    }
    cout << dem << '\n';
}
