#include <bits/stdc++.h>
using namespace std;
int main() {
    string t, p;
    cin >> t >> p;
    string s = p + '#' + t;
    int n = s.size(), m = p.size();
    vector<int> pi(n, 0);
    int dem = 0;
    for (int i = 1; i < n; i++) {
        int k = pi[i - 1];
        while (k > 0 && s[i] != s[k]) k = pi[k - 1];   // lùi về đoạn khớp ngắn hơn
        if (s[i] == s[k]) k++;
        pi[i] = k;
        if (k == m) dem++;
    }
    cout << dem << '\n';
}
