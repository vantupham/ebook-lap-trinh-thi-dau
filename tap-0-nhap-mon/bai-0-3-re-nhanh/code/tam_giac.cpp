#include <bits/stdc++.h>
using namespace std;
int main() {
    long long x[3];
    cin >> x[0] >> x[1] >> x[2];
    sort(x, x + 3);                       // x[0] <= x[1] <= x[2]
    long long a = x[0], b = x[1], c = x[2];
    if (a + b <= c) cout << "KHONG";
    else if (a == c) cout << "DEU";
    else if (a * a + b * b == c * c) cout << "VUONG";
    else if (a == b || b == c) cout << "CAN";
    else cout << "THUONG";
    cout << '\n';
}
