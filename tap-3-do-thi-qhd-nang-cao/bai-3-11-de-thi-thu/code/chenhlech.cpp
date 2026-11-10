#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> mn, mx;
void sua(int i, long long v) {
    i += n; mn[i] = mx[i] = v;
    for (; i > 1; i /= 2) { mn[i / 2] = min(mn[i], mn[i ^ 1]); mx[i / 2] = max(mx[i], mx[i ^ 1]); }
}
long long hoi(int l, int r) {                       // [l, r), từ 0
    long long a = LLONG_MAX, b = LLONG_MIN;
    for (l += n, r += n; l < r; l /= 2, r /= 2) {
        if (l & 1) { a = min(a, mn[l]); b = max(b, mx[l]); l++; }
        if (r & 1) { --r; a = min(a, mn[r]); b = max(b, mx[r]); }
    }
    return b - a;
}
int main() {
    freopen("CHENHLECH.INP", "r", stdin);
    freopen("CHENHLECH.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    mn.assign(2 * n, LLONG_MAX); mx.assign(2 * n, LLONG_MIN);
    for (int i = 0; i < n; i++) { cin >> mn[n + i]; mx[n + i] = mn[n + i]; }
    for (int i = n - 1; i >= 1; i--) { mn[i] = min(mn[2 * i], mn[2 * i + 1]); mx[i] = max(mx[2 * i], mx[2 * i + 1]); }
    while (q--) {
        int t, a; long long b;
        cin >> t >> a >> b;
        if (t == 1) sua(a - 1, b);
        else cout << hoi(a - 1, b) << '\n';
    }
}
