#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<pair<long long, int>> cap(n);
    for (int i = 0; i < n; i++) { cin >> cap[i].first; cap[i].second = i + 1; }
    sort(cap.begin(), cap.end());
    for (auto [t, sbd] : cap) cout << sbd << ' ';
    cout << '\n';
}
