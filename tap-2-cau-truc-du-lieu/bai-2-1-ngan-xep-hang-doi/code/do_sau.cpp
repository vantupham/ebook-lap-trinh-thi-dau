#include <bits/stdc++.h>
using namespace std;
int main() {
    string s;
    cin >> s;
    int d = 0, best = 0;
    for (char c : s) {
        if (c == '(') { d++; best = max(best, d); }
        else d--;
    }
    cout << best << '\n';
}
