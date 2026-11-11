#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<pair<long long, long long>> viec(n);
    for (auto &[t, d] : viec) cin >> t >> d;
    sort(viec.begin(), viec.end());
    long long f = 0, diem = 0;
    for (auto [t, d] : viec) { f += t; diem += d - f; }
    cout << diem << '\n';
}
