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
    t.assign(n + 1, 0);
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) { cin >> a[i]; cong(i, a[i]); }
    while (q--) {
        int loai;
        cin >> loai;
        if (loai == 1) {
            int k; long long u;
            cin >> k >> u;
            cong(k, u - a[k]);                     // đặt giá trị = cộng thêm phần chênh lệch
            a[k] = u;
        } else {
            int l, r;
            cin >> l >> r;
            cout << tong(r) - tong(l - 1) << '\n';
        }
    }
}
