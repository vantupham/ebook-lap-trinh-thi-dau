#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("BOCSOI.INP", "r", stdin);
    freopen("BOCSOI.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    cin >> n >> k;
    vector<int> a(n), p(k);
    for (auto &x : a) cin >> x;
    for (auto &x : p) cin >> x;
    int M = *max_element(a.begin(), a.end());
    vector<int> g(M + 1, 0);
    vector<int> thay(k + 2, -1);          // thay[v] = i nghĩa là giá trị v xuất hiện khi tính g[i]
    for (int i = 1; i <= M; i++) {
        for (int x : p) if (x <= i && g[i - x] <= k) thay[g[i - x]] = i;
        int mex = 0;
        while (thay[mex] == i) mex++;
        g[i] = mex;
    }
    int x = 0;
    for (int v : a) x ^= g[v];
    cout << (x ? "AN" : "BAO") << '\n';
}
