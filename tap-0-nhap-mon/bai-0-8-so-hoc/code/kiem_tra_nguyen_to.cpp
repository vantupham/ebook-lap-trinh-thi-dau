#include <bits/stdc++.h>
using namespace std;
bool la_nguyen_to(long long n) {
    if (n < 2) return false;
    for (long long d = 2; d * d <= n; d++)
        if (n % d == 0) return false;
    return true;
}
int main() {
    long long n;
    cin >> n;
    cout << (la_nguyen_to(n) ? "YES" : "NO") << '\n';
}
