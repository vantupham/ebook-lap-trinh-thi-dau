#include <bits/stdc++.h>
using namespace std;
int m;
vector<int> t;
void cong(int i) { for (; i <= m; i += i & -i) t[i]++; }
int tong(int i) { int s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; }
int main() {
    freopen("DEMDIEM.INP", "r", stdin);
    freopen("DEMDIEM.OUT", "w", stdout);
    int n, q;
    scanf("%d %d", &n, &q);
    vector<pair<long long, long long>> p(n);
    for (auto &[x, y] : p) scanf("%lld %lld", &x, &y);
    vector<array<long long, 3>> hoi(q);             // {X, Y, số thứ tự}
    for (int i = 0; i < q; i++) { scanf("%lld %lld", &hoi[i][0], &hoi[i][1]); hoi[i][2] = i; }
    vector<long long> ys;
    for (auto &[x, y] : p) ys.push_back(y);
    sort(ys.begin(), ys.end());
    ys.erase(unique(ys.begin(), ys.end()), ys.end());
    m = ys.size();
    t.assign(m + 1, 0);
    sort(p.begin(), p.end());
    sort(hoi.begin(), hoi.end());
    vector<int> kq(q);
    int k = 0;
    for (auto [X, Y, id] : hoi) {
        while (k < n && p[k].first <= X) {
            cong(lower_bound(ys.begin(), ys.end(), p[k].second) - ys.begin() + 1);
            k++;
        }
        kq[id] = tong(upper_bound(ys.begin(), ys.end(), Y) - ys.begin());   // số y <= Y
    }
    for (int i = 0; i < q; i++) printf("%d\n", kq[i]);
}
