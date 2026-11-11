#include <bits/stdc++.h>
using namespace std;
int main() {
    long long n;
    cin >> n;
    int dem = 0;
    for (long long d = 1; d * d <= n; d++)
        if (n % d == 0) dem += (d * d == n) ? 1 : 2;
    cout << dem << '\n';
}
