#include <bits/stdc++.h>
using namespace std;
int n, LOG;
vector<int> t;
void cong(int i, int v) { for (; i <= n; i += i & -i) t[i] += v; }
int thu_k(int p) {                                  // chỉ số nhỏ nhất có tong = p
    int vt = 0;
    for (int j = LOG; j >= 0; j--) {
        int nx = vt + (1 << j);
        if (nx <= n && t[nx] < p) { vt = nx; p -= t[nx]; }
    }
    return vt + 1;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> n;
    LOG = __lg(n);
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    t.assign(n + 1, 0);
    for (int i = 1; i <= n; i++) cong(i, 1);
    for (int k = 0; k < n; k++) {
        int p;
        cin >> p;
        int i = thu_k(p);
        cout << a[i] << (k + 1 == n ? '\n' : ' ');
        cong(i, -1);
    }
}
