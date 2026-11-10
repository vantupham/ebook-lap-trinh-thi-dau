#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    int LOG = 1;
    while ((1 << LOG) <= n) LOG++;
    vector<vector<long long>> sp(LOG, vector<long long>(n));
    for (auto &x : sp[0]) cin >> x;
    for (int j = 1; j < LOG; j++)
        for (int i = 0; i + (1 << j) <= n; i++)
            sp[j][i] = min(sp[j - 1][i], sp[j - 1][i + (1 << (j - 1))]);
    while (q--) {
        int l, r;
        cin >> l >> r;
        l--; r--;                                   // về chỉ số từ 0
        int k = __lg(r - l + 1);                    // 2^k <= độ dài
        cout << min(sp[k][l], sp[k][r - (1 << k) + 1]) << '\n';
    }
}
