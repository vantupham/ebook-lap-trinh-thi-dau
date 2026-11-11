#include <bits/stdc++.h>
using namespace std;
int n;
void sinh(string s) {
    if ((int)s.size() == n) { cout << s << '\n'; return; }
    sinh(s + "0");
    if (s.empty() || s.back() != '1') sinh(s + "1");
}
int main() {
    cin >> n;
    sinh("");
}
