#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; long long x;
    cin >> n >> x;
    vector<long long> w(n);
    for (auto &v : w) cin >> v;
    sort(w.begin(), w.end());
    int l = 0, r = n - 1, thuyen = 0;
    while (l <= r) {
        if (l < r && w[l] + w[r] <= x) l++;
        r--; thuyen++;
    }
    cout << thuyen << '\n';
}
