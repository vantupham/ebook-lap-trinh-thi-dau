#include <bits/stdc++.h>
using namespace std;
const long long P = 1000000007;
vector<long long> gt, ngd;
long long luy_thua(long long a, long long b) {
    long long kq = 1; a %= P;
    while (b > 0) { if (b & 1) kq = kq * a % P; a = a * a % P; b >>= 1; }
    return kq;
}
long long C(int n, int k) { return (k < 0 || k > n) ? 0 : gt[n] * ngd[k] % P * ngd[n - k] % P; }
long long duong(int r1, int c1, int r2, int c2) {           // số đường đi phải/xuống
    if (r2 < r1 || c2 < c1) return 0;
    return C((r2 - r1) + (c2 - c1), r2 - r1);
}
int main() {
    freopen("DUONGDI.INP", "r", stdin);
    freopen("DUONGDI.OUT", "w", stdout);
    int n, m;
    scanf("%d %d", &n, &m);
    int N = 2 * n;
    gt.assign(N + 1, 1); ngd.assign(N + 1, 1);
    for (int i = 1; i <= N; i++) gt[i] = gt[i - 1] * i % P;
    ngd[N] = luy_thua(gt[N], P - 2);
    for (int i = N; i >= 1; i--) ngd[i - 1] = ngd[i] * i % P;
    vector<pair<int, int>> b(m);
    for (auto &[r, c] : b) scanf("%d %d", &r, &c);
    sort(b.begin(), b.end());
    b.push_back({n, n});                                     // "bẫy" cuối là đích
    vector<long long> f(b.size());
    for (size_t i = 0; i < b.size(); i++) {
        f[i] = duong(1, 1, b[i].first, b[i].second);
        for (size_t j = 0; j < i; j++)
            f[i] = (f[i] - f[j] * duong(b[j].first, b[j].second, b[i].first, b[i].second) % P + P) % P;
    }
    printf("%lld\n", f.back());
}
