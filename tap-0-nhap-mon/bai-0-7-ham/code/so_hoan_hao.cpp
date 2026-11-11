#include <bits/stdc++.h>
using namespace std;
int tong_uoc_nho_hon(int x) {
    int s = 0;
    for (int d = 1; d < x; d++)
        if (x % d == 0) s += d;
    return s;
}
int main() {
    int n;
    cin >> n;
    for (int x = 1; x <= n; x++)
        if (tong_uoc_nho_hon(x) == x) cout << x << '\n';
}
