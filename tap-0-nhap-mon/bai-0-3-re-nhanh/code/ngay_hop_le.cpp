#include <bits/stdc++.h>
using namespace std;
int main() {
    long long d, m, y;
    cin >> d >> m >> y;
    bool nhuan = y % 400 == 0 || (y % 4 == 0 && y % 100 != 0);
    int toi_da;
    if (m < 1 || m > 12) toi_da = 0;
    else if (m == 2) toi_da = nhuan ? 29 : 28;
    else if (m == 4 || m == 6 || m == 9 || m == 11) toi_da = 30;
    else toi_da = 31;
    cout << (1 <= d && d <= toi_da ? "YES" : "NO") << '\n';
}
