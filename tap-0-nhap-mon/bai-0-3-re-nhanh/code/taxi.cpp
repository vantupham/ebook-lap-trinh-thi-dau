#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("TAXI.INP", "r", stdin);
    freopen("TAXI.OUT", "w", stdout);
    long long d, tien;
    cin >> d;
    if (d == 1) tien = 15000;
    else if (d <= 30) tien = 15000 + (d - 1) * 12000;
    else tien = 15000 + 29 * 12000 + (d - 30) * 10000;
    cout << tien << '\n';
}
