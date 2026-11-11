#include <bits/stdc++.h>
using namespace std;
void doi_neu_lon(long long &a, long long &b) {
    if (a > b) { long long t = a; a = b; b = t; }
}
int main() {
    long long x, y, z;
    cin >> x >> y >> z;
    doi_neu_lon(x, y);
    doi_neu_lon(y, z);
    doi_neu_lon(x, y);
    cout << x << ' ' << y << ' ' << z << '\n';
}
