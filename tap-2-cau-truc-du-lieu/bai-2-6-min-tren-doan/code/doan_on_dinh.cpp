#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long k;
    cin >> n >> k;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    deque<int> mx, mn;                 // mx: giá trị giảm dần, mn: tăng dần
    int l = 0, best = 0;
    for (int r = 0; r < n; r++) {
        while (!mx.empty() && a[mx.back()] <= a[r]) mx.pop_back();
        while (!mn.empty() && a[mn.back()] >= a[r]) mn.pop_back();
        mx.push_back(r); mn.push_back(r);
        while (a[mx.front()] - a[mn.front()] > k) {
            l++;
            while (mx.front() < l) mx.pop_front();
            while (mn.front() < l) mn.pop_front();
        }
        best = max(best, r - l + 1);
    }
    cout << best << '\n';
}
