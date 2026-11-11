#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int n; cin >> n;
        long long x = 0;
        for (int i = 0; i < n; i++) { long long a; cin >> a; x ^= a; }
        cout << (x != 0 ? "first" : "second") << '\n';
    }
}
