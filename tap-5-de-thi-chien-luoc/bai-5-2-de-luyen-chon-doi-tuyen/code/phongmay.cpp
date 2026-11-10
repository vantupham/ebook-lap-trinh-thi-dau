#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("PHONGMAY.INP", "r", stdin);
    freopen("PHONGMAY.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<pair<long long, long long>> lop(n);          // (kết thúc, bắt đầu)
    for (auto &[e, s] : lop) cin >> s >> e;
    sort(lop.begin(), lop.end());
    long long het = LLONG_MIN; int dem = 0;
    for (auto [e, s] : lop) if (s >= het) { dem++; het = e; }   // chọn lớp kết thúc sớm nhất còn xếp được
    cout << dem << '\n';
}
