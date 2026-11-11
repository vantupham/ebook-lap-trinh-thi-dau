#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    map<long long, long long> dem;
    long long ans = 0;
    for (int j = 0; j < n; j++) {
        long long x;
        cin >> x;
        ans += dem[x];
        dem[x]++;
    }
    cout << ans << '\n';
}
