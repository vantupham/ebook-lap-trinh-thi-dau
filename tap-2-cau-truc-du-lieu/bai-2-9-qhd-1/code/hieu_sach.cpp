#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, x;
    cin >> n >> x;
    vector<int> h(n), s(n);
    for (auto &v : h) cin >> v;
    for (auto &v : s) cin >> v;
    vector<int> dp(x + 1, 0);
    for (int i = 0; i < n; i++)
        for (int j = x; j >= h[i]; j--)             // giảm dần: mỗi cuốn dùng tối đa một lần
            dp[j] = max(dp[j], dp[j - h[i]] + s[i]);
    cout << dp[x] << '\n';
}
