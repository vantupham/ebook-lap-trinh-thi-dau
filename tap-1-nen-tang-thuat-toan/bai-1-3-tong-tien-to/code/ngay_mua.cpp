#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<int> c(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        c[i] = c[i - 1] + (x > 0);
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << c[r] - c[l - 1] << '\n';
    }
}
