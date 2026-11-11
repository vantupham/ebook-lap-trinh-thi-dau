#include <bits/stdc++.h>
using namespace std;
int main() {
    long long n;
    cin >> n;
    long long lo = 0, hi = 1000000001;
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        if (mid * mid > n) hi = mid;
        else lo = mid + 1;
    }
    cout << lo - 1 << '\n';
}
