#include <bits/stdc++.h>
using namespace std;
const int MAX = 1000000;
int main() {
    freopen("DEMNT.INP", "r", stdin);
    freopen("DEMNT.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<bool> nt(MAX + 1, true);
    nt[0] = nt[1] = false;
    for (long long p = 2; p * p <= MAX; p++)
        if (nt[p])
            for (long long k = p * p; k <= MAX; k += p) nt[k] = false;
    vector<int> dem(MAX + 1, 0);              // dem[i] = số số nguyên tố trong [1, i]
    for (int i = 1; i <= MAX; i++) dem[i] = dem[i - 1] + (nt[i] ? 1 : 0);
    int t;
    cin >> t;
    while (t--) {
        int l, r;
        cin >> l >> r;
        cout << dem[r] - dem[l - 1] << '\n';
    }
}
