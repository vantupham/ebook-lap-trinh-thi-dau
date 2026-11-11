#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k;
    cin >> n >> k;
    vector<int> p(n + 1);
    for (int i = 1; i <= n; i++) cin >> p[i];
    int cur = 1;
    for (int t = 0; t < k; t++) cur = p[cur];
    cout << cur << '\n';
}
