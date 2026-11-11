#include <bits/stdc++.h>
using namespace std;
int main() {
    string s, kq;
    getline(cin, s);
    for (int i = 0; i < (int)s.size(); i++)
        if (s[i] != ' ' && (i == 0 || s[i - 1] == ' '))
            kq += toupper(s[i]);
    cout << kq << '\n';
}
