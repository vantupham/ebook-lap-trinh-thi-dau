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
        if (gan_nhat.count(k) && gan_nhat[k] >= l) l = gan_nhat[k] + 1;
        gan_nhat[k] = r;
        best = max(best, r - l + 1);
    }
    cout << best << '\n';
}
