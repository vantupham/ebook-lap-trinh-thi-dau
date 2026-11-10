#include <bits/stdc++.h>
using namespace std;
const int LOG = 18;                                  // 2^18 > 2·10^5
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<vector<int>> con(n + 1);
    vector<vector<int>> up(LOG, vector<int>(n + 1, 0));
    for (int v = 2; v <= n; v++) {
        cin >> up[0][v];
        con[up[0][v]].push_back(v);
    }
    vector<int> sau(n + 1, 0);                       // độ sâu, tính bằng BFS từ gốc
    queue<int> bq;
    bq.push(1);
    while (!bq.empty()) {
        int u = bq.front(); bq.pop();
        for (int v : con[u]) { sau[v] = sau[u] + 1; bq.push(v); }
    }
    for (int j = 1; j < LOG; j++)
        for (int v = 1; v <= n; v++) up[j][v] = up[j - 1][up[j - 1][v]];
    while (q--) {
        int a, b;
        cin >> a >> b;
        if (sau[a] < sau[b]) swap(a, b);
        int k = sau[a] - sau[b];
        for (int j = 0; j < LOG; j++) if (k >> j & 1) a = up[j][a];   // đưa về cùng độ sâu
        if (a != b) {
            for (int j = LOG - 1; j >= 0; j--)
                if (up[j][a] != up[j][b]) { a = up[j][a]; b = up[j][b]; }
            a = up[0][a];
        }
        cout << a << '\n';
    }
}
