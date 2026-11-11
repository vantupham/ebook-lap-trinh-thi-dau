#include <bits/stdc++.h>
using namespace std;
const long long P = 1000000007;
long long luy_thua(long long a, long long b) {
    long long kq = 1; a %= P;
    while (b > 0) { if (b & 1) kq = kq * a % P; a = a * a % P; b >>= 1; }
    return kq;
}
int main() {
    long long n, m;
    cin >> n >> m;
    int N = n + m;
    vector<long long> gt(N + 1);
    gt[0] = 1;
    for (int i = 1; i <= N; i++) gt[i] = gt[i - 1] * i % P;
    long long a = m + n - 1, b = n - 1;
    cout << gt[a] * luy_thua(gt[b], P - 2) % P * luy_thua(gt[a - b], P - 2) % P << '\n';
}
