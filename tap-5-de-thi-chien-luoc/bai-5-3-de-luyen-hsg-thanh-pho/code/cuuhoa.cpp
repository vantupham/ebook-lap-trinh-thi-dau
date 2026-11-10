#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("CUUHOA.INP", "r", stdin);
    freopen("CUUHOA.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int r, c;
    cin >> r >> c;
    vector<string> g(r);
    for (auto &s : g) cin >> s;
    vector<vector<int>> d(r, vector<int>(c, -1));
    queue<pair<int, int>> q;
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) if (g[i][j] == 'F') { d[i][j] = 0; q.push({i, j}); }
    int dx[] = {1, -1, 0, 0}, dy[] = {0, 0, 1, -1};
    while (!q.empty()) {                // BFS nhiều nguồn: mọi trạm vào hàng đợi từ đầu
        auto [x, y] = q.front(); q.pop();
        for (int k = 0; k < 4; k++) {
            int u = x + dx[k], v = y + dy[k];
            if (u < 0 || v < 0 || u >= r || v >= c || g[u][v] == '#' || d[u][v] != -1) continue;
            d[u][v] = d[x][y] + 1; q.push({u, v});
        }
    }
    int kq = 0;
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) if (g[i][j] == '.') {
        if (d[i][j] == -1) { cout << -1 << '\n'; return 0; }
        kq = max(kq, d[i][j]);
    }
    cout << kq << '\n';
}
