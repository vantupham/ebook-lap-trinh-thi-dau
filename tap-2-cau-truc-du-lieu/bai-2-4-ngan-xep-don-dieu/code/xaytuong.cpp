#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("XAYTUONG.INP", "r", stdin);
    freopen("XAYTUONG.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> st = {0};   // ngăn xếp các "nấc độ cao", đáy là mặt đất 0
    long long ans = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        while (st.back() > x) st.pop_back();       // các nấc cao hơn x đã kết thúc
        if (st.back() < x) { st.push_back(x); ans++; }  // mở một nấc mới
    }
    cout << ans << '\n';
}
