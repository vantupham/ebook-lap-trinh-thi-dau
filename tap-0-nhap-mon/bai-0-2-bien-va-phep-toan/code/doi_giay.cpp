#include <bits/stdc++.h>
using namespace std;
int main() {
    long long t;
    cin >> t;
    long long h = t / 3600, du = t % 3600;
    long long m = du / 60, s = du % 60;
    cout << h << ' ' << m << ' ' << s << '\n';
}
