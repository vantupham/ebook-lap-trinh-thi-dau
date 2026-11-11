#include <bits/stdc++.h>
using namespace std;
int main() {
    string s;
    cin >> s;
    int dem[26] = {0};
    for (char ch : s) dem[ch - 'a']++;
    int tot = 0;
    for (int k = 0; k < 26; k++)
        if (dem[k] > dem[tot]) tot = k;
    cout << char('a' + tot) << ' ' << dem[tot] << '\n';
}
