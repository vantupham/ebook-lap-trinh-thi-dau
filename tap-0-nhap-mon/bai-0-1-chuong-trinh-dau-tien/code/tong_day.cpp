#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    long long s = 0;              // tổng có thể rất lớn, xem bài 0.2
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        s += x;
    }
    cout << s << '\n';
}
