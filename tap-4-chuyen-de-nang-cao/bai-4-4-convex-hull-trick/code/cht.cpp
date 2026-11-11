#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
struct Line { ll m, b; ll at(ll x) const { return m * x + b; } };
bool thua(const Line &l1, const Line &l2, const Line &l3) {   // l2 không bao giờ là thấp nhất
    return (__int128)(l3.b - l1.b) * (l1.m - l2.m) <= (__int128)(l2.b - l1.b) * (l1.m - l3.m);
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    ll x;
    cin >> n >> x;
    vector<ll> s(n), f(n);
    for (auto &v : s) cin >> v;
    for (auto &v : f) cin >> v;
    deque<Line> dq;
    dq.push_back({x, 0});                              // j = 0: hệ số ban đầu x, thời gian 0
    ll dp = 0;
    for (int i = 0; i < n; i++) {
        while (dq.size() >= 2 && dq[1].at(s[i]) <= dq[0].at(s[i])) dq.pop_front();
        dp = dq[0].at(s[i]);
        Line moi = {f[i], dp};
        while (dq.size() >= 2 && thua(dq[dq.size() - 2], dq.back(), moi)) dq.pop_back();
        dq.push_back(moi);
    }
    cout << dp << '\n';                                // dp của màn n
}
