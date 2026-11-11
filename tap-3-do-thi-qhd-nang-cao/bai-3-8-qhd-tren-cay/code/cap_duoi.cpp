#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<int> cha(n + 1, 0);
    vector<vector<int>> con(n + 1);
    for (int v = 2; v <= n; v++) { cin >> cha[v]; con[cha[v]].push_back(v); }
    vector<int> thu_tu = {1};
    for (int k = 0; k < (int)thu_tu.size(); k++)
        for (int c : con[thu_tu[k]]) thu_tu.push_back(c);
    vector<int> sz(n + 1, 1);
    for (int k = n - 1; k >= 1; k--) {
        int v = thu_tu[k];
        sz[cha[v]] += sz[v];
    }
    for (int v = 1; v <= n; v++) cout << sz[v] - 1 << (v == n ? '\n' : ' ');
}
