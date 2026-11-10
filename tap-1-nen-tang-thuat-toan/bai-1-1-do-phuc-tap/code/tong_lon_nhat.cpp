#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    long long cur = 0, best = LLONG_MIN;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        cur = (i == 0) ? x : max(x, cur + x);
        best = max(best, cur);
    }
    cout << best << '\n';
}
