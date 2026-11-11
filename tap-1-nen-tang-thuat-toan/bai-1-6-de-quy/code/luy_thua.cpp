#include <bits/stdc++.h>
using namespace std;
long long luy_thua(long long a, long long b, long long m) {
    if (b == 0) return 1 % m;
    if (b % 2 == 0) { long long t = luy_thua(a, b / 2, m); return t * t % m; }
    return a * luy_thua(a, b - 1, m) % m;
}
int main() {
    long long a, b, m;
    cin >> a >> b >> m;
    cout << luy_thua(a, b, m) << '\n';
}
