#include <bits/stdc++.h>
using namespace std;
int main() {
    int m, n;
    cin >> m >> n;
    vector<int> dem(m + 1, 0);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        dem[x]++;
    }
    int tot = 1;
    for (int k = 2; k <= m; k++)
        if (dem[k] > dem[tot]) tot = k;
    cout << tot << '\n';
}
