#include <bits/stdc++.h>
using namespace std;
int main() {
    long long n, g, k;
    cin >> n >> g >> k;
    cout << max(0LL, n * g - k) << '\n';
}
