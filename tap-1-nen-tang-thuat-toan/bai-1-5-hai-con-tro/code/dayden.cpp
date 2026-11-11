#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("DAYDEN.INP", "r", stdin);
    freopen("DAYDEN.OUT", "w", stdout);
    int n, k;
    string s;
    cin >> n >> k >> s;
    int hong = 0, l = 0, best = 0;
    for (int r = 0; r < n; r++) {
        if (s[r] == '0') hong++;
        while (hong > k) { if (s[l] == '0') hong--; l++; }
        best = max(best, r - l + 1);
    }
    cout << best << '\n';
}
