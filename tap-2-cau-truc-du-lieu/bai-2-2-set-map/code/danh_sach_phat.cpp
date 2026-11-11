#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    map<long long, int> gan_nhat;          // mã bài -> vị trí xuất hiện gần nhất
    int l = 0, best = 0;
    for (int r = 0; r < n; r++) {
        long long k;
        cin >> k;
        auto it = gan_nhat.find(k);
        if (it != gan_nhat.end() && it->second >= l) l = it->second + 1;
        gan_nhat[k] = r;
        best = max(best, r - l + 1);
    }
    cout << best << '\n';
}
