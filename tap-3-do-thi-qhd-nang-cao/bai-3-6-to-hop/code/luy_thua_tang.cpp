#include <bits/stdc++.h>
using namespace std;
const long long P = 1000000007;
long long luy_thua(long long a, long long b, long long m) {
    long long kq = 1 % m;
    a %= m;
    while (b > 0) {
        if (b & 1) kq = kq * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return kq;
}
int main() {
    int n;
    cin >> n;
    while (n--) {
        long long a, b, c;
        cin >> a >> b >> c;
        long long mu = luy_thua(b, c, P - 1);
        cout << luy_thua(a, mu, P) << '\n';
    }
}
