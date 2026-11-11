#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> w(n + 1);
    for (int v = 1; v <= n; v++) cin >> w[v];
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<int> cha(n + 1, 0), thu_tu = {1};
    cha[1] = -1;
    for (int k = 0; k < (int)thu_tu.size(); k++) {
        int u = thu_tu[k];
        for (int v : adj[u]) if (v != cha[u]) { cha[v] = u; thu_tu.push_back(v); }
    }
    vector<long long> chon(n + 1, 0), khong(n + 1, 0);
    for (int k = n - 1; k >= 0; k--) {
        int v = thu_tu[k];
        chon[v] += w[v];
        if (cha[v] > 0) {
            chon[cha[v]] += khong[v];
            khong[cha[v]] += max(chon[v], khong[v]);
        }
    }
    cout << max(chon[1], khong[1]) << '\n';
}
