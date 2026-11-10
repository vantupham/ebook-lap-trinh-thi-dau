#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    vector<int> vao(n + 1, 0);                     // số môn phải học trước
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        vao[b]++;
    }
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 1; i <= n; i++) if (vao[i] == 0) pq.push(i);
    vector<int> thu_tu;
    while (!pq.empty()) {
        int u = pq.top(); pq.pop();
        thu_tu.push_back(u);
        for (int v : adj[u]) if (--vao[v] == 0) pq.push(v);
    }
    if ((int)thu_tu.size() < n) { cout << "IMPOSSIBLE\n"; return 0; }   // còn môn kẹt trong chu trình
    for (int i = 0; i < n; i++) cout << thu_tu[i] << (i + 1 == n ? '\n' : ' ');
}
