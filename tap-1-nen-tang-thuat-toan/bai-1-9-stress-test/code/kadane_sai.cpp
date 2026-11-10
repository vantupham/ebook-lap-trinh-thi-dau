#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    long long cur = 0, best = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        cur = max(x, cur + x);
        best = max(best, cur);
    }
    cout << best << '\n';
}
