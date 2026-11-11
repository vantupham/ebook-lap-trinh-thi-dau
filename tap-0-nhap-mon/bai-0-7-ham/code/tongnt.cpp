#include <bits/stdc++.h>
using namespace std;
int tong_chu_so(int x) {
    int s = 0;
    while (x > 0) { s += x % 10; x /= 10; }
    return s;
}
bool la_nguyen_to(int k) {
    if (k < 2) return false;
    for (int d = 2; d < k; d++)
        if (k % d == 0) return false;
    return true;
}
int main() {
    freopen("TONGNT.INP", "r", stdin);
    freopen("TONGNT.OUT", "w", stdout);
    int a, b, dem = 0;
    cin >> a >> b;
    for (int x = a; x <= b; x++)
        if (la_nguyen_to(tong_chu_so(x))) dem++;
    cout << dem << '\n';
}
