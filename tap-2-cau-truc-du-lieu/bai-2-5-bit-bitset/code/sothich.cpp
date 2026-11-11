#include <bits/stdc++.h>
using namespace std;
const int MAXM = 2000;
int main() {
    freopen("SOTHICH.INP", "r", stdin);
    freopen("SOTHICH.OUT", "w", stdout);
    int n, m;
    cin >> n >> m;
    vector<bitset<MAXM>> s(n);
    for (int i = 0; i < n; i++) {
        string t;
        cin >> t;
        for (int j = 0; j < m; j++)
            if (t[j] == '1') s[i][j] = 1;
    }
    long long dem = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if ((s[i] & s[j]).any()) dem++;
    cout << dem << '\n';
}
