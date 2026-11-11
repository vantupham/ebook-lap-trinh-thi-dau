#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> dem(1001, 0);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        dem[x]++;
    }
    long long doi = 0;
    for (int k = 1; k <= 1000; k++) doi += dem[k] / 2;
    cout << doi << '\n';
}
