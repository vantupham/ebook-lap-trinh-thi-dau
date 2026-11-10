#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("TRAMXE.INP", "r", stdin);
    freopen("TRAMXE.OUT", "w", stdout);
    int R, C;
    cin >> R >> C;
    vector<string> g(R);
    for (auto &row : g) cin >> row;
    vector<vector<int>> d(R, vector<int>(C, -1));
    queue<pair<int, int>> q;
    for (int i = 0; i < R; i++)
        for (int j = 0; j < C; j++)
            if (g[i][j] == 'T') { d[i][j] = 0; q.push({i, j}); }
    int di[] = {1, -1, 0, 0}, dj[] = {0, 0, 1, -1};
    while (!q.empty()) {
        auto [i, j] = q.front(); q.pop();
        for (int h = 0; h < 4; h++) {
            int ni = i + di[h], nj = j + dj[h];
            if (ni < 0 || ni >= R || nj < 0 || nj >= C || g[ni][nj] == '#' || d[ni][nj] != -1) continue;
            d[ni][nj] = d[i][j] + 1;
            q.push({ni, nj});
        }
    }
    int kq = 0;
    for (int i = 0; i < R; i++)
        for (int j = 0; j < C; j++)
            if (g[i][j] == '.') {
                if (d[i][j] == -1) { cout << -1 << '\n'; return 0; }
                kq = max(kq, d[i][j]);
            }
    cout << kq << '\n';
}
