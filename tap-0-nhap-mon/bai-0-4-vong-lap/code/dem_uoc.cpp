#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, dem = 0;
    cin >> n;
    for (int d = 1; d <= n; d++)
        if (n % d == 0) dem++;
    cout << dem << '\n';
}
