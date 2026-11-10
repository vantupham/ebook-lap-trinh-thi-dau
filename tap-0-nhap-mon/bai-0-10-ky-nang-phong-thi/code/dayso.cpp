#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("DAYSO.INP", "r", stdin);
    freopen("DAYSO.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    long long tong = 0;
    int chan = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        if (x > 0) tong += x;
        if (x % 2 == 0) chan++;
    }
    cout << tong << ' ' << chan << '\n';
}
