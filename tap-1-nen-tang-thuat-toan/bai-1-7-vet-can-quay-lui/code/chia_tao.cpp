#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<long long> p(n);
    for (auto &x : p) cin >> x;
    long long tong_ca = accumulate(p.begin(), p.end(), 0LL), best = tong_ca;
    for (int mask = 0; mask < (1 << n); mask++) {
        long long s = 0;
        for (int i = 0; i < n; i++)
            if (mask >> i & 1) s += p[i];
        best = min(best, llabs(tong_ca - 2 * s));
    }
    cout << best << '\n';
}
