#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<ll, ll> P;
ll cross(P o, P a, P b) { return (a.first - o.first) * (b.second - o.second) - (a.second - o.second) * (b.first - o.first); }
int main() {
    int n; scanf("%d", &n);
    vector<P> p(n);
    for (auto &q : p) scanf("%lld %lld", &q.first, &q.second);
    sort(p.begin(), p.end());
    vector<P> h;
    for (int lan = 0; lan < 2; lan++) {
        size_t goc = h.size();
        for (int i = 0; i < n; i++) {
            while (h.size() >= goc + 2 && cross(h[h.size() - 2], h.back(), p[i]) <= 0) h.pop_back();
            h.push_back(p[i]);
        }
        h.pop_back();                      // điểm cuối là điểm đầu của nửa kia
        reverse(p.begin(), p.end());
    }
    ll s = 0;
    for (size_t i = 0; i < h.size(); i++) { size_t j = (i + 1) % h.size(); s += h[i].first * h[j].second - h[j].first * h[i].second; }
    printf("%d %lld\n", (int)h.size(), llabs(s));
}
