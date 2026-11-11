#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    int N = 1;
    while (N < n) N *= 2;                          // làm tròn lên lũy thừa của 2
    vector<long long> t(2 * N, 0);                 // phần thừa có 0 phòng
    for (int i = 0; i < n; i++) cin >> t[N + i];
    for (int i = N - 1; i >= 1; i--) t[i] = max(t[2 * i], t[2 * i + 1]);
    for (int j = 0; j < m; j++) {
        long long r;
        cin >> r;
        int kq = 0;
        if (t[1] >= r) {
            int x = 1;
            while (x < N) x = (t[2 * x] >= r) ? 2 * x : 2 * x + 1;   // ưu tiên bên trái
            kq = x - N + 1;
            t[x] -= r;
            for (x /= 2; x >= 1; x /= 2) t[x] = max(t[2 * x], t[2 * x + 1]);
        }
        cout << kq << (j + 1 == m ? '\n' : ' ');
    }
}
