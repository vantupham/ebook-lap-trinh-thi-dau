#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("KHACNHAU.INP", "r", stdin);
    freopen("KHACNHAU.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<bool> co(1000001, false);
    int kq = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (!co[x]) { co[x] = true; kq++; }
    }
    cout << kq << '\n';
}
