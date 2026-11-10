#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> t;

void sua(int i, long long v) {                     // a[i] = v, i từ 0
    for (t[i += n] = v; i > 1; i /= 2) t[i / 2] = min(t[i], t[i ^ 1]);
}
long long hoi(int l, int r) {                      // min trên [l, r), i từ 0
    long long kq = LLONG_MAX;
    for (l += n, r += n; l < r; l /= 2, r /= 2) {
        if (l & 1) kq = min(kq, t[l++]);
        if (r & 1) kq = min(kq, t[--r]);
    }
    return kq;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    t.assign(2 * n, LLONG_MAX);
    for (int i = 0; i < n; i++) cin >> t[n + i];
    for (int i = n - 1; i >= 1; i--) t[i] = min(t[2 * i], t[2 * i + 1]);   // dựng cây
    while (q--) {
        int loai, a;
        long long b;
        cin >> loai >> a >> b;
        if (loai == 1) sua(a - 1, b);
        else cout << hoi(a - 1, b) << '\n';        // [a, b] từ 1 → [a-1, b) từ 0
    }
}
