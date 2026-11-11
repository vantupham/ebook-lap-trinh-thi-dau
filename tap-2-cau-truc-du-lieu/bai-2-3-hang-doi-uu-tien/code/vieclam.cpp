#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("VIECLAM.INP", "r", stdin);
    freopen("VIECLAM.OUT", "w", stdout);
    int n;
    scanf("%d", &n);
    vector<pair<long long, long long>> v(n);          // (hạn, lương)
    for (auto &[d, p] : v) scanf("%lld %lld", &d, &p);
    sort(v.begin(), v.end());
    priority_queue<long long, vector<long long>, greater<long long>> nhan;   // lương các việc đang nhận
    long long tong = 0;
    for (auto [d, p] : v) {
        nhan.push(p); tong += p;
        if ((long long)nhan.size() > d) { tong -= nhan.top(); nhan.pop(); }   // thừa việc: bỏ việc rẻ nhất
    }
    printf("%lld\n", tong);
}
