#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("TOANHA.INP", "r", stdin);
    freopen("TOANHA.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> h(n);
    for (auto &x : h) cin >> x;
    vector<int> st;                 // chỉ số các tòa chưa tìm được tòa cao hơn bên phải
    long long kq = 0;
    for (int j = 0; j < n; j++) {
        while (!st.empty() && h[st.back()] < h[j]) { kq += j - st.back(); st.pop_back(); }
        st.push_back(j);
    }
    cout << kq << '\n';
}
