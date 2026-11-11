#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> thich;
vector<int> khop;
vector<bool> tham;
bool thu(int u) {
    for (int v : thich[u]) if (!tham[v]) {
        tham[v] = true;
        if (khop[v] == -1 || thu(khop[v])) { khop[v] = u; return true; }
    }
    return false;
}
int main() {
    int a, b, k;
    cin >> a >> b >> k;
    thich.assign(a + 1, {});
    for (int i = 0; i < k; i++) { int x, y; cin >> x >> y; thich[x].push_back(y); }
    khop.assign(b + 1, -1);
    int dem = 0;
    for (int u = 1; u <= a; u++) {
        tham.assign(b + 1, false);
        if (thu(u)) dem++;
    }
    cout << dem << '\n';
}
