#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m, q;
    cin >> n >> m >> q;
    const long long VC = LLONG_MAX / 4;              // đủ lớn, cộng hai lần không tràn
    vector<vector<long long>> d(n + 1, vector<long long>(n + 1, VC));
    for (int i = 1; i <= n; i++) d[i][i] = 0;
    for (int i = 0; i < m; i++) {
        int a, b; long long c;
        cin >> a >> b >> c;
        d[a][b] = min(d[a][b], c);                   // có thể có nhiều đường giữa a, b
        d[b][a] = min(d[b][a], c);
    }
    for (int k = 1; k <= n; k++)                     // k PHẢI là vòng ngoài cùng
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << (d[a][b] >= VC ? -1 : d[a][b]) << '\n';
    }
}
