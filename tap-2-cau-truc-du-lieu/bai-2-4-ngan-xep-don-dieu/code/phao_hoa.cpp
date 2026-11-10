#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> h(n + 1);
    for (int i = 1; i <= n; i++) cin >> h[i];
    vector<int> st;               // ngăn xếp chứa CHỈ SỐ các tòa còn "hữu ích"
    for (int i = 1; i <= n; i++) {
        // Loại các tòa không cao hơn tòa i: chúng không bao giờ chặn được ai nữa
        while (!st.empty() && h[st.back()] <= h[i]) st.pop_back();
        int ans = st.empty() ? 0 : st.back();
        cout << ans << (i == n ? '\n' : ' ');
        st.push_back(i);
    }
}
