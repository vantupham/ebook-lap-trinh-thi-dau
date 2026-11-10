#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<bool> co(n + 1, false);
    for (int i = 0; i < n - 1; i++) {
        int x;
        cin >> x;
        co[x] = true;
    }
    for (int v = 1; v <= n; v++)
        if (!co[v]) { cout << v << '\n'; break; }
}
