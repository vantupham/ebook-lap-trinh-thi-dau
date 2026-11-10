#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("NHAMAY.INP", "r", stdin);
    freopen("NHAMAY.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; long long m;
    cin >> n >> m;
    vector<long long> t(n);
    for (auto &x : t) cin >> x;
    // làm được(T) = Σ T / tᵢ >= m ; tìm T nhỏ nhất
    long long lo = 1, hi = *min_element(t.begin(), t.end()) * m;   // một máy nhanh nhất làm hết là đủ
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2, sp = 0;
        for (long long x : t) { sp += mid / x; if (sp >= m) break; }   // dừng sớm để không tràn
        if (sp >= m) hi = mid; else lo = mid + 1;
    }
    cout << lo << '\n';
}
