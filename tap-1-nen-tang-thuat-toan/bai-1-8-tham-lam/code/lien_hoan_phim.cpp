#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<pair<long long, long long>> p(n);     // (kết thúc, bắt đầu) để sort theo kết thúc
    for (auto &[b, a] : p) cin >> a >> b;
    sort(p.begin(), p.end());
    long long ranh = 0;
    int dem = 0;
    for (auto [b, a] : p)
        if (a >= ranh) { dem++; ranh = b; }
    cout << dem << '\n';
}
