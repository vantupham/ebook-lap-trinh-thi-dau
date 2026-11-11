#include <bits/stdc++.h>
using namespace std;
int n; long long B, best = 0;
vector<long long> c, v;
void thu(int i, long long gia, long long diem) {
    if (i == n) { best = max(best, diem); return; }
    if (gia + c[i] <= B) thu(i + 1, gia + c[i], diem + v[i]);
    thu(i + 1, gia, diem);
}
int main() {
    freopen("CHONQUA.INP", "r", stdin);
    freopen("CHONQUA.OUT", "w", stdout);
    cin >> n >> B;
    c.resize(n); v.resize(n);
    for (int i = 0; i < n; i++) cin >> c[i] >> v[i];
    thu(0, 0, 0);
    cout << best << '\n';
}
