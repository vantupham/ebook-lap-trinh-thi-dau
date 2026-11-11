#include <bits/stdc++.h>
using namespace std;
int main() {
    string s;
    cin >> s;
    int n = s.size();
    vector<int> pi(n, 0);
    for (int i = 1; i < n; i++) {
        int k = pi[i - 1];
        while (k > 0 && s[i] != s[k]) k = pi[k - 1];
        if (s[i] == s[k]) k++;
        pi[i] = k;
    }
    vector<int> ds;
    for (int k = pi[n - 1]; k > 0; k = pi[k - 1]) ds.push_back(k);
    reverse(ds.begin(), ds.end());
    for (size_t i = 0; i < ds.size(); i++) cout << ds[i] << (i + 1 == ds.size() ? "" : " ");
    cout << '\n';
}
