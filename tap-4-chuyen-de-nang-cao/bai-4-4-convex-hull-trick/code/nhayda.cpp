#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
struct Line { ll m, b; ll at(ll x) const { return m * x + b; } };
bool thua(const Line &l1, const Line &l2, const Line &l3) {
    return (__int128)(l3.b - l1.b) * (l1.m - l2.m) <= (__int128)(l2.b - l1.b) * (l1.m - l3.m);
}
int main() {
    freopen("NHAYDA.INP", "r", stdin);
    freopen("NHAYDA.OUT", "w", stdout);
    int n;
    ll C;
    scanf("%d %lld", &n, &C);
    vector<ll> h(n);
    for (auto &v : h) scanf("%lld", &v);
    deque<Line> dq;
    dq.push_back({-2 * h[0], h[0] * h[0]});            // hòn 1: dp = 0
    ll dp = 0;
    for (int i = 1; i < n; i++) {
        while (dq.size() >= 2 && dq[1].at(h[i]) <= dq[0].at(h[i])) dq.pop_front();
        dp = dq[0].at(h[i]) + h[i] * h[i] + C;
        Line moi = {-2 * h[i], dp + h[i] * h[i]};
        while (dq.size() >= 2 && thua(dq[dq.size() - 2], dq.back(), moi)) dq.pop_back();
        dq.push_back(moi);
    }
    printf("%lld\n", dp);
}
