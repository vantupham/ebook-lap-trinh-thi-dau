#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    multiset<long long> ve;
    for (int i = 0; i < n; i++) { long long h; cin >> h; ve.insert(h); }
    while (m--) {
        long long t;
        cin >> t;
        auto it = ve.upper_bound(t);              // vé đầu tiên > t
        if (it == ve.begin()) { cout << -1 << '\n'; continue; }
        --it;                                     // vé đắt nhất <= t
        cout << *it << '\n';
        ve.erase(it);                             // xóa đúng một vé (xóa theo iterator)
    }
}
