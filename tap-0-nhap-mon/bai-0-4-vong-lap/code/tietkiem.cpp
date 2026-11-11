#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("TIETKIEM.INP", "r", stdin);
    freopen("TIETKIEM.OUT", "w", stdout);
    long long a, b, p;
    cin >> a >> b >> p;
    int thang = 0;
    while (a < b) {
        a += a * p / 100;
        thang++;
    }
    cout << thang << '\n';
}
