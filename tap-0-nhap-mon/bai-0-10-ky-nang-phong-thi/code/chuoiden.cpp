#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("CHUOIDEN.INP", "r", stdin);
    freopen("CHUOIDEN.OUT", "w", stdout);
    string s;
    cin >> s;
    int n = s.size(), best = 0, so_doan = 0, cur = 0;
    for (int i = 0; i < n; i++) {
        cur = (i > 0 && s[i] == s[i - 1]) ? cur + 1 : 1;
        bool het_doan = (i == n - 1 || s[i + 1] != s[i]);   // đoạn kết thúc tại i
        if (het_doan) {
            if (cur > best) { best = cur; so_doan = 1; }
            else if (cur == best) so_doan++;
        }
    }
    cout << best << ' ' << so_doan << '\n';
}
