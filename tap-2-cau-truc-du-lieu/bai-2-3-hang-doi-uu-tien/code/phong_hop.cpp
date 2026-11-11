#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<pair<long long, long long>> a(n);
    for (auto &[s, e] : a) cin >> s >> e;
    sort(a.begin(), a.end());                       // theo giờ bắt đầu
    priority_queue<long long, vector<long long>, greater<long long>> ket_thuc;
    size_t best = 0;
    for (auto [s, e] : a) {
        if (!ket_thuc.empty() && ket_thuc.top() <= s) ket_thuc.pop();   // dùng lại phòng
        ket_thuc.push(e);
        best = max(best, ket_thuc.size());
    }
    cout << best << '\n';
}
