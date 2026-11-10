#include <bits/stdc++.h>
using namespace std;
int n;
long long t;
vector<long long> k;

bool du(long long T) {                 // trong T giây có làm đủ t sản phẩm không?
    long long s = 0;
    for (long long x : k) {
        s += T / x;
        if (s >= t) return true;       // dừng sớm, tránh tràn số
    }
    return false;
}

int main() {
    cin >> n >> t;
    k.resize(n);
    for (auto &x : k) cin >> x;
    long long lo = 0, hi = *min_element(k.begin(), k.end()) * t;
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        if (du(mid)) hi = mid;
        else lo = mid + 1;
    }
    cout << lo << '\n';
}
