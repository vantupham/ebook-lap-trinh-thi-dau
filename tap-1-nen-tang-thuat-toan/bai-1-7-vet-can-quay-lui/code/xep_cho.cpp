#include <bits/stdc++.h>
using namespace std;
int n;
long long dem = 0;
vector<int> ghe;
vector<bool> da_ngoi;

void xep(int k) {
    if (k == n) { dem++; return; }
    for (int v = 1; v <= n; v++) {
        if (da_ngoi[v]) continue;
        if (k > 0 && abs(v - ghe[k - 1]) == 1) continue;   // cắt nhánh
        ghe[k] = v; da_ngoi[v] = true;
        xep(k + 1);
        da_ngoi[v] = false;                                 // quay lui
    }
}

int main() {
    cin >> n;
    ghe.assign(n, 0);
    da_ngoi.assign(n + 1, false);
    xep(0);
    cout << dem << '\n';
}
