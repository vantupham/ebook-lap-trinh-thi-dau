#include <bits/stdc++.h>
using namespace std;
int n, k; vector<long long> w;
bool du(long long C) {
    int chuyen = 1; long long dang = 0;
    for (long long x : w) {
        if (dang + x > C) { chuyen++; dang = 0; }
        dang += x;
    }
    return chuyen <= k;
}
int main() {
    freopen("CHOHANG.INP", "r", stdin);
    freopen("CHOHANG.OUT", "w", stdout);
    cin >> n >> k;
    w.resize(n);
    for (auto &x : w) cin >> x;
    long long lo = *max_element(w.begin(), w.end()), hi = accumulate(w.begin(), w.end(), 0LL);
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        if (du(mid)) hi = mid;
        else lo = mid + 1;
    }
    cout << lo << '\n';
}
