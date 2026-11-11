#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> t;
void cong(int i, long long v) { for (; i <= n; i += i & -i) t[i] += v; }
long long tong(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; }
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    t.assign(n + 1, 0);
    while (q--) {
        int loai;
        cin >> loai;
        if (loai == 1) {
            int l, r; long long u;
            cin >> l >> r >> u;
            cong(l, u); cong(r + 1, -u);
        } else {
            int k;
            cin >> k;
            cout << a[k] + tong(k) << '\n';
        }
    }
}
