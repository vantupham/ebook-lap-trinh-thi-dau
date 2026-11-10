#include <bits/stdc++.h>
using namespace std;
const long long M1 = 1000000007, M2 = 998244353, B = 131;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    int q;
    cin >> s >> q;
    int n = s.size();
    vector<long long> h1(n + 1, 0), h2(n + 1, 0), p1(n + 1, 1), p2(n + 1, 1);
    for (int i = 0; i < n; i++) {
        h1[i + 1] = (h1[i] * B + s[i]) % M1;
        h2[i + 1] = (h2[i] * B + s[i]) % M2;
        p1[i + 1] = p1[i] * B % M1;
        p2[i + 1] = p2[i] * B % M2;
    }
    auto ma = [&](int l, int r) {                      // mã của s[l..r-1], dùng HAI modulo
        long long x = ((h1[r] - h1[l] * p1[r - l]) % M1 + M1) % M1;
        long long y = ((h2[r] - h2[l] * p2[r - l]) % M2 + M2) % M2;
        return make_pair(x, y);
    };
    while (q--) {
        int a, b, c, d;
        cin >> a >> b >> c >> d;
        bool bang = (b - a == d - c) && ma(a - 1, b) == ma(c - 1, d);
        cout << (bang ? "YES" : "NO") << '\n';
    }
}
