#include <bits/stdc++.h>
using namespace std;
int main() {
    string s;
    int q;
    cin >> s >> q;
    int n = s.size();
    vector<int> p(n + 1, 0);
    for (int i = 1; i <= n; i++) p[i] = p[i - 1] + (s[i - 1] == 'A' ? 1 : -1);
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << (p[r] == p[l - 1] ? "YES" : "NO") << '\n';
    }
}
