#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    long long x = 0;
    for (int i = 0; i < n; i++) {
        long long a;
        cin >> a;
        x ^= a;
    }
    cout << x << '\n';
}
