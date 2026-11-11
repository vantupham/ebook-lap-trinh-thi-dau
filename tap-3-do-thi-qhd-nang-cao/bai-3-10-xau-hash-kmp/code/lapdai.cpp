#include <bits/stdc++.h>
using namespace std;
const long long M1 = 1000000007, M2 = 998244353, B = 131;
int n;
string s;
vector<long long> h1, h2, p1, p2;
unsigned long long ma(int l, int r) {
    long long x = ((h1[r] - h1[l] * p1[r - l]) % M1 + M1) % M1;
    long long y = ((h2[r] - h2[l] * p2[r - l]) % M2 + M2) % M2;
    return (unsigned long long)x << 32 | (unsigned long long)y;
}
bool co_lap(int L) {                                     // có đoạn dài L xuất hiện >= 2 lần?
    vector<unsigned long long> v;
    v.reserve(n - L + 1);
    for (int i = 0; i + L <= n; i++) v.push_back(ma(i, i + L));
    sort(v.begin(), v.end());
    for (size_t i = 1; i < v.size(); i++) if (v[i] == v[i - 1]) return true;
    return false;
}
int main() {
    freopen("LAPDAI.INP", "r", stdin);
    freopen("LAPDAI.OUT", "w", stdout);
    cin >> s;
    n = s.size();
    h1.assign(n + 1, 0); h2.assign(n + 1, 0); p1.assign(n + 1, 1); p2.assign(n + 1, 1);
    for (int i = 0; i < n; i++) {
        h1[i + 1] = (h1[i] * B + s[i]) % M1;
        h2[i + 1] = (h2[i] * B + s[i]) % M2;
        p1[i + 1] = p1[i] * B % M1;
        p2[i + 1] = p2[i] * B % M2;
    }
    int lo = 0, hi = n - 1;                              // đáp án trong [0, n-1]
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        if (co_lap(mid)) lo = mid; else hi = mid - 1;
    }
    printf("%d\n", lo);
}
