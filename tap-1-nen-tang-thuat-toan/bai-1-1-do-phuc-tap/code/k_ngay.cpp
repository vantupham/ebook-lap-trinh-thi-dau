#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k;
    cin >> n >> k;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    long long s = 0;
    for (int i = 0; i < k; i++) s += a[i];
    long long best = s;
    for (int i = k; i < n; i++) {
        s = s + a[i] - a[i - k];
        best = max(best, s);
    }
    cout << best << '\n';
}
