#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<pair<int, string>> a(n);          // (−điểm, tên)
    for (auto &[d, ten] : a) {
        cin >> ten >> d;
        d = -d;
    }
    sort(a.begin(), a.end());
    int hang = 0;
    for (int i = 0; i < n; i++) {
        if (i == 0 || a[i].first != a[i - 1].first) hang = i + 1;   // điểm khác bạn trước
        cout << hang << ' ' << a[i].second << ' ' << -a[i].first << '\n';
    }
}
