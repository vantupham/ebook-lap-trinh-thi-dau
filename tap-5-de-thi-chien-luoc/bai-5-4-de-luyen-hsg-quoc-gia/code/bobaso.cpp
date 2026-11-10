#include <bits/stdc++.h>
using namespace std;
struct Fenwick {
    int n; vector<long long> t;
    Fenwick(int n) : n(n), t(n + 1, 0) {}
    void cong(int i, long long v) { for (; i <= n; i += i & -i) t[i] += v; }
    long long tong(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; }
};
int main() {
    freopen("BOBASO.INP", "r", stdin);
    freopen("BOBASO.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    vector<long long> v = a;                       // nén giá trị về 1..k
    sort(v.begin(), v.end()); v.erase(unique(v.begin(), v.end()), v.end());
    int k = v.size();
    vector<int> b(n);
    for (int i = 0; i < n; i++) b[i] = lower_bound(v.begin(), v.end(), a[i]) - v.begin() + 1;
    vector<long long> trai(n), phai(n);            // số phần tử nhỏ hơn bên trái, lớn hơn bên phải
    Fenwick L(k), R(k);
    for (int i = 0; i < n; i++) { trai[i] = L.tong(b[i] - 1); L.cong(b[i], 1); }
    for (int i = n - 1; i >= 0; i--) { phai[i] = (n - 1 - i) - R.tong(b[i]); R.cong(b[i], 1); }
    long long kq = 0;
    for (int i = 0; i < n; i++) kq += trai[i] * phai[i];
    cout << kq << '\n';
}
