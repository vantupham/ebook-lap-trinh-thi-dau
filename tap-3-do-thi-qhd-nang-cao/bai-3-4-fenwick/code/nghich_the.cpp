#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> t;
void cong(int i, long long v) { for (; i <= n; i += i & -i) t[i] += v; }
long long tong(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; }

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    vector<long long> b = a;                       // nén giá trị về 1..n
    sort(b.begin(), b.end());
    b.erase(unique(b.begin(), b.end()), b.end());
    t.assign(n + 1, 0);
    long long dem = 0;
    for (int j = 0; j < n; j++) {
        int r = lower_bound(b.begin(), b.end(), a[j]) - b.begin() + 1;
        dem += j - tong(r);                        // đã gặp j số, trừ đi số <= a[j]
        cong(r, 1);
    }
    cout << dem << '\n';
}
