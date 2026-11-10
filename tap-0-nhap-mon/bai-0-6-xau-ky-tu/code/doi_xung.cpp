#include <bits/stdc++.h>
using namespace std;
int main() {
    string s, t;
    getline(cin, s);                 // đọc cả dòng, kể cả dấu cách
    for (char ch : s)
        if (isalnum((unsigned char)ch)) t += tolower(ch);
    bool ok = true;
    int n = t.size();
    for (int i = 0; i < n / 2; i++)
        if (t[i] != t[n - 1 - i]) { ok = false; break; }
    cout << (ok ? "YES" : "NO") << '\n';
}
