#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    int dv = n % 10, ch = n / 10 % 10, tr = n / 100;
    cout << dv * 100 + ch * 10 + tr << '\n';
}
