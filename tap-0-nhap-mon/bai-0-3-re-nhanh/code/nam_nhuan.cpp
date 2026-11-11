#include <bits/stdc++.h>
using namespace std;
int main() {
    long long y;
    cin >> y;
    if (y % 400 == 0) cout << "YES";
    else if (y % 100 == 0) cout << "NO";
    else if (y % 4 == 0) cout << "YES";
    else cout << "NO";
    cout << '\n';
}
