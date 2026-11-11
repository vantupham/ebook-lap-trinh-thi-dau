#include <bits/stdc++.h>
using namespace std;
int n; long long k; vector<long long> a;
bool du(long long L) {
    long long s = 0;
    for (long long x : a) { s += x / L; if (s >= k) return true; }
    return false;
}
int main() {
    cin >> n >> k;
    a.resize(n);
    for (auto &x : a) cin >> x;
    long long lo = 1, hi = *max_element(a.begin(), a.end()) + 1;
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        if (!du(mid)) hi = mid;
        else lo = mid + 1;
    }
    cout << lo - 1 << '\n';
}
