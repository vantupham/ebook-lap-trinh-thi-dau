#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, s;
    cin >> n >> s;
    vector<int> sau(n + 1);
    for (int i = 1; i <= n; i++) cin >> sau[i];
    vector<int> buoc(n + 1, -1);
    int x = s, t = 0;
    while (buoc[x] == -1) { buoc[x] = t; x = sau[x]; t++; }
    cout << buoc[x] << ' ' << t - buoc[x] << '\n';
}
