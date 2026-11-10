#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    cin >> n >> k;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    deque<int> dq;                                   // chỉ số, giá trị tăng dần
    vector<long long> kq;
    for (int i = 0; i < n; i++) {
        while (!dq.empty() && a[dq.back()] >= a[i]) dq.pop_back();
        dq.push_back(i);
        if (dq.front() <= i - k) dq.pop_front();     // ra khỏi cửa sổ [i-k+1, i]
        if (i >= k - 1) kq.push_back(a[dq.front()]);
    }
    for (size_t i = 0; i < kq.size(); i++) cout << kq[i] << (i + 1 == kq.size() ? '\n' : ' ');
}
