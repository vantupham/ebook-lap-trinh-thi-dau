#include <bits/stdc++.h>
using namespace std;
const long long P = 1000000007;
const int N = 1000000;
long long luy_thua(long long a, long long b) {
    long long kq = 1;
    a %= P;
    while (b > 0) {
        if (b & 1) kq = kq * a % P;
        a = a * a % P;
        b >>= 1;
    }
    return kq;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<long long> gt(N + 1), ngd(N + 1);
    gt[0] = 1;
    for (int i = 1; i <= N; i++) gt[i] = gt[i - 1] * i % P;
    ngd[N] = luy_thua(gt[N], P - 2);                  // Fermat: x^(p-2) là nghịch đảo của x
    for (int i = N; i >= 1; i--) ngd[i - 1] = ngd[i] * i % P;
    int q;
    cin >> q;
    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << gt[a] * ngd[b] % P * ngd[a - b] % P << '\n';
    }
}
