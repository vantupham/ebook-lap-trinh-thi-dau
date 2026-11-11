#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int n; cin >> n;
        long long x = 0;
        for (int i = 1; i <= n; i++) { long long p; cin >> p; if (i % 2 == 0) x ^= p; }
        cout << (x ? "first" : "second") << '\n';
    }
}
