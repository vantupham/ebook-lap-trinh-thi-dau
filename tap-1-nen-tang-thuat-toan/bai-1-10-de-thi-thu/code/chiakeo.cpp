#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> w;
long long s[3], best = LLONG_MAX;

void chia(int i) {
    if (i == n) {
        best = min(best, max({s[0], s[1], s[2]}) - min({s[0], s[1], s[2]}));
        return;
    }
    for (int b = 0; b < 3; b++) {
        if (i == 0 && b > 0) break;      // gói đầu luôn cho bạn 0
        s[b] += w[i];
        chia(i + 1);
        s[b] -= w[i];
    }
}

int main() {
    freopen("CHIAKEO.INP", "r", stdin);
    freopen("CHIAKEO.OUT", "w", stdout);
    cin >> n;
    w.resize(n);
    for (auto &x : w) cin >> x;
    chia(0);
    cout << best << '\n';
}
