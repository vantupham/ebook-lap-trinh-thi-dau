#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("MUABAN.INP", "r", stdin);
    freopen("MUABAN.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    long long thap, lai = 0;
    cin >> thap;
    for (int i = 1; i < n; i++) {
        long long x;
        cin >> x;
        lai = max(lai, x - thap);
        thap = min(thap, x);
    }
    cout << lai << '\n';
}
