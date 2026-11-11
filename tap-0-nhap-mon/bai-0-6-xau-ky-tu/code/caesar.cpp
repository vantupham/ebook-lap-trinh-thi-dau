#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("CAESAR.INP", "r", stdin);
    freopen("CAESAR.OUT", "w", stdout);
    long long k;
    string s;
    cin >> k;
    cin.ignore();                    // bỏ ký tự xuống dòng sau k
    getline(cin, s);
    if (!s.empty() && s.back() == '\r') s.pop_back();
    k %= 26;
    for (char &ch : s) {
        if ('a' <= ch && ch <= 'z') ch = 'a' + (ch - 'a' + k) % 26;
        else if ('A' <= ch && ch <= 'Z') ch = 'A' + (ch - 'A' + k) % 26;
    }
    cout << s << '\n';
}
