#include <bits/stdc++.h>
using namespace std;
int main() {
    string s;
    cin >> s;
    bool co_hoa = false, co_thuong = false, co_so = false;
    for (char ch : s) {
        if ('A' <= ch && ch <= 'Z') co_hoa = true;
        else if ('a' <= ch && ch <= 'z') co_thuong = true;
        else if ('0' <= ch && ch <= '9') co_so = true;
    }
    if (s.size() >= 8 && co_hoa && co_thuong && co_so) cout << "MANH\n";
    else cout << "YEU\n";
}
