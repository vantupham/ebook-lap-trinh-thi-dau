#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n), dem(11, 0);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        dem[a[i]]++;
    }
    int cao = *max_element(a.begin(), a.end());
    cout << cao << ' ' << dem[cao] << '\n';
    int tot = 0;
    for (int k = 0; k < 11; k++)
        if (dem[k] > dem[tot]) tot = k;
    cout << tot << '\n';
}
