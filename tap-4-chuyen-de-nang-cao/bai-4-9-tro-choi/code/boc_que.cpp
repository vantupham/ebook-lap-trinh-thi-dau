#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k; cin >> n >> k;
    vector<int> p(k);
    for (int &x : p) cin >> x;
    vector<char> thang(n + 1, 0);
    string kq;
    for (int i = 1; i <= n; i++) {
        for (int x : p) if (x <= i && !thang[i - x]) { thang[i] = 1; break; }
        kq += thang[i] ? 'W' : 'L';
    }
    cout << kq << '\n';
}
