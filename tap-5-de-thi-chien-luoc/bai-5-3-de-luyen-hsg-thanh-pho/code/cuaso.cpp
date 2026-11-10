#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("CUASO.INP", "r", stdin);
    freopen("CUASO.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k; long long d;
    cin >> n >> k >> d;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    deque<int> mx, mn;              // chỉ số; a giảm dần trong mx, tăng dần trong mn
    int dem = 0;
    for (int i = 0; i < n; i++) {
        while (!mx.empty() && a[mx.back()] <= a[i]) mx.pop_back();
        while (!mn.empty() && a[mn.back()] >= a[i]) mn.pop_back();
        mx.push_back(i); mn.push_back(i);
        if (mx.front() <= i - k) mx.pop_front();
        if (mn.front() <= i - k) mn.pop_front();
        if (i >= k - 1 && a[mx.front()] - a[mn.front()] <= d) dem++;
    }
    cout << dem << '\n';
}
