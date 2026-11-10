#include <bits/stdc++.h>
using namespace std;
int main() {
    // Khi thi: bật freopen cho TAUNGAM.INP / TAUNGAM.OUT
    int R, C, M;
    cin >> R >> C >> M;
    vector<string> g(R);
    for (auto &row : g) cin >> row;
    string s;
    cin >> s;
    vector<vector<char>> co(R, vector<char>(C, 0));
    for (int i = 0; i < R; i++)
        for (int j = 0; j < C; j++) co[i][j] = (g[i][j] == '.');
    string huong = "EWSN";
    int di[] = {0, 0, 1, -1}, dj[] = {1, -1, 0, 0};
    for (char ch : s) {
        vector<vector<char>> moi(R, vector<char>(C, 0));
        for (int i = 0; i < R; i++)
            for (int j = 0; j < C; j++) {
                if (!co[i][j]) continue;
                for (int h = 0; h < 4; h++) {
                    if (ch != '?' && ch != huong[h]) continue;
                    int ni = i + di[h], nj = j + dj[h];
                    if (ni >= 0 && ni < R && nj >= 0 && nj < C && g[ni][nj] == '.') moi[ni][nj] = 1;
                }
            }
        co = moi;
    }
    int dem = 0;
    for (auto &row : co)
        for (char x : row) dem += x;
    cout << dem << '\n';
}
