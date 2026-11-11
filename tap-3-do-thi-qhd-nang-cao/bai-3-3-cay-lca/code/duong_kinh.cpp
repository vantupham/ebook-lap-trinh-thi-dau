#include <bits/stdc++.h>
using namespace std;
int n;
vector<vector<int>> adj;
vector<int> bfs(int s) {
    vector<int> d(n + 1, -1);
    queue<int> q;
    d[s] = 0; q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) if (d[v] < 0) { d[v] = d[u] + 1; q.push(v); }
    }
    return d;
}
int main() {
    cin >> n;
    adj.assign(n + 1, {});
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<int> d1 = bfs(1);
    int u = max_element(d1.begin(), d1.end()) - d1.begin();
    vector<int> d2 = bfs(u);
    cout << *max_element(d2.begin(), d2.end()) << '\n';
}
