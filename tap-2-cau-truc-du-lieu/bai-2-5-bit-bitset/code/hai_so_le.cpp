#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    long long x = 0, nhom[63] = {0};
    for (int i = 0; i < n; i++) {
        long long a;
        cin >> a;
        x ^= a;
        for (int k = 0; k < 63; k++)
            if (a >> k & 1) nhom[k] ^= a;
    }
    int k = __builtin_ctzll(x);              // vị trí bit 1 thấp nhất của x
    long long p = nhom[k], q = x ^ p;
    if (p > q) swap(p, q);
    cout << p << ' ' << q << '\n';
}
