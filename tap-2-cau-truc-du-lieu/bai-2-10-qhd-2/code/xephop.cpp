#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("XEPHOP.INP", "r", stdin);
    freopen("XEPHOP.OUT", "w", stdout);
    int n;
    scanf("%d", &n);
    vector<pair<long long, long long>> b(n);
    for (auto &[w, h] : b) scanf("%lld %lld", &w, &h);
    sort(b.begin(), b.end(), [](const auto &x, const auto &y) {
        return x.first != y.first ? x.first < y.first : x.second > y.second;   // w tăng, h giảm
    });
    vector<long long> tails;
    for (auto [w, h] : b) {
        auto it = lower_bound(tails.begin(), tails.end(), h);
        if (it == tails.end()) tails.push_back(h);
        else *it = h;
    }
    printf("%d\n", (int)tails.size());
}
