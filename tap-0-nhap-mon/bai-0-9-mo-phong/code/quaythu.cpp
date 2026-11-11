#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("QUAYTHU.INP", "r", stdin);
    freopen("QUAYTHU.OUT", "w", stdout);
    int n;
    cin >> n;
    long long ranh = 0;
    for (int i = 0; i < n; i++) {
        long long t, d;
        cin >> t >> d;
        ranh = max(ranh, t) + d;
    }
    cout << ranh << '\n';
}
