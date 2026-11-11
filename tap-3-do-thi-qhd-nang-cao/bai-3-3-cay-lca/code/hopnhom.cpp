#include <bits/stdc++.h>
using namespace std;
const int LOG = 18;
int n, q;
vector<vector<int>> up;
vector<int> sau;

int lca(int a, int b) {
    if (sau[a] < sau[b]) swap(a, b);
    int k = sau[a] - sau[b];
    for (int j = 0; j < LOG; j++) if (k >> j & 1) a = up[j][a];
    if (a == b) return a;
    for (int j = LOG - 1; j >= 0; j--)
        if (up[j][a] != up[j][b]) { a = up[j][a]; b = up[j][b]; }
    return up[0][a];
}
long long kc(int a, int b) { return sau[a] + sau[b] - 2 * sau[lca(a, b)]; }

int main() {
    freopen("HOPNHOM.INP", "r", stdin);
    freopen("HOPNHOM.OUT", "w", stdout);
    scanf("%d %d", &n, &q);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    up.assign(LOG, vector<int>(n + 1, 0));
    sau.assign(n + 1, -1);
    queue<int> bq;
    sau[1] = 0; bq.push(1);
    while (!bq.empty()) {
        int u = bq.front(); bq.pop();
        for (int v : adj[u]) if (sau[v] < 0) { sau[v] = sau[u] + 1; up[0][v] = u; bq.push(v); }
    }
    for (int j = 1; j < LOG; j++)
        for (int v = 1; v <= n; v++) up[j][v] = up[j - 1][up[j - 1][v]];
    while (q--) {
        int a, b, c;
        scanf("%d %d %d", &a, &b, &c);
        printf("%lld\n", (kc(a, b) + kc(b, c) + kc(c, a)) / 2);
    }
}
