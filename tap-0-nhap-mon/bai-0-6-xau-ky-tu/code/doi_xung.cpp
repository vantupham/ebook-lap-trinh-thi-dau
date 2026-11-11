#include <bits/stdc++.h>
using namespace std;
int main() {
    string s, t;
    getline(cin, s);                 // đọc cả dòng, kể cả dấu cách
    for (char ch : s)
        if (isalnum((unsigned char)ch)) t += tolower(ch);
    bool ok = true;
    int i = 0, j = (int)t.size() - 1;
    while (i < j) {                  // hai chỉ số đi vào giữa
        if (t[i] != t[j]) { ok = false; break; }
        i++; j--;
    }
    cout << (ok ? "YES" : "NO") << '\n';
}
