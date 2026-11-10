#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long S;
    cin >> n >> S;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    long long tong = 0;
    int l = 0, best = 0;
    for (int r = 0; r < n; r++) {
        tong += a[r];
        while (tong > S) tong -= a[l++];    // đẩy l tới khi cửa sổ hợp lệ
        best = max(best, r - l + 1);        // nếu a[r] > S thì l = r + 1, độ dài 0
    }
    cout << best << '\n';
}
