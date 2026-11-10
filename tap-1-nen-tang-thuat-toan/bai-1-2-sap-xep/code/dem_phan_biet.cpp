#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    sort(a.begin(), a.end());
    int dem = 0;
    for (int i = 0; i < n; i++)
        if (i == 0 || a[i] != a[i - 1]) dem++;
    cout << dem << '\n';
}
