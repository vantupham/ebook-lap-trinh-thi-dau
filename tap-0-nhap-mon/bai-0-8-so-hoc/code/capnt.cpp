#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("CAPNT.INP", "r", stdin);
    freopen("CAPNT.OUT", "w", stdout);
    int n;
    cin >> n;
    vector<char> nt(n + 3, 1);
    nt[0] = nt[1] = 0;
    for (long long p = 2; p * p <= n; p++)
        if (nt[p])
            for (long long k = p * p; k <= n + 2; k += p) nt[k] = 0;
    int dem = 0;
    for (int q = 2; q + 2 <= n; q++)
        if (nt[q] && nt[q + 2]) dem++;
    cout << dem << '\n';
}
