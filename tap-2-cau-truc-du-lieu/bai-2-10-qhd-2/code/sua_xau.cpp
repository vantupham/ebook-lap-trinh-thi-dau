#include <bits/stdc++.h>
using namespace std;
int main() {
    string s, t;
    cin >> s >> t;
    int n = s.size(), m = t.size();
    vector<vector<int>> d(n + 1, vector<int>(m + 1));
    for (int i = 0; i <= n; i++) d[i][0] = i;
    for (int j = 0; j <= m; j++) d[0][j] = j;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            d[i][j] = (s[i - 1] == t[j - 1]) ? d[i - 1][j - 1]
                      : 1 + min({d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]});
    cout << d[n][m] << '\n';
}
