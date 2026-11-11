#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    sort(a.begin(), a.end());
    long long best = LLONG_MAX;
    for (int i = 1; i < n; i++) best = min(best, a[i] - a[i - 1]);
    cout << best << '\n';
}
