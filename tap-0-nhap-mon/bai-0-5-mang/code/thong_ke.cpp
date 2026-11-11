#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> dem(11, 0);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        dem[x]++;
    }
    int cao = 10;
    while (dem[cao] == 0) cao--;
    cout << cao << ' ' << dem[cao] << '\n';
    int tot = 0;
    for (int k = 0; k <= 10; k++)
        if (dem[k] > dem[tot]) tot = k;
    cout << tot << '\n';
}
