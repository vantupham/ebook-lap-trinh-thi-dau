#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("TRAMSAC.INP", "r", stdin);
    freopen("TRAMSAC.OUT", "w", stdout);
    long long D, K; int n;
    cin >> D >> K >> n;
    vector<long long> x(n + 2);
    x[0] = 0;
    for (int i = 1; i <= n; i++) cin >> x[i];
    x[n + 1] = D;
    long long cho_sac = 0; int lan = 0;
    for (int i = 1; i <= n + 1; i++) {
        if (x[i] - cho_sac > K) {
            if (x[i - 1] == cho_sac || x[i] - x[i - 1] > K) { cout << -1 << '\n'; return 0; }
            cho_sac = x[i - 1];
            lan++;
        }
    }
    cout << lan << '\n';
}
