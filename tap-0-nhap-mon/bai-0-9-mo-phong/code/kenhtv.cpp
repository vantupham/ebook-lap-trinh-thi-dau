#include <bits/stdc++.h>
using namespace std;
int main() {
    // Khi thi: bỏ // ở hai dòng dưới
    // freopen("KENHTV.INP", "r", stdin);
    // freopen("KENHTV.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m, p;
    cin >> n >> m >> p;
    vector<int> sau(m + 1, 0);
    for (int i = 1; i <= n; i++) {
        int a, b;
        cin >> a >> b;
        if (sau[b] == 0) sau[b] = a;    // người nhỏ tuổi hơn được ghi trước
    }
    vector<bool> da_gap(m + 1, false);
    int cur = p, doi = 0;
    while (sau[cur] != 0) {
        if (da_gap[cur]) { doi = -1; break; }
        da_gap[cur] = true;
        cur = sau[cur];
        doi++;
    }
    cout << doi << '\n';
}
