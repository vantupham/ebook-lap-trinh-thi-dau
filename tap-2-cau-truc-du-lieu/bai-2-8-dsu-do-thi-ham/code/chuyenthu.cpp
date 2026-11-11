#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("CHUYENTHU.INP", "r", stdin);
    freopen("CHUYENTHU.OUT", "w", stdout);
    int n;
    scanf("%d", &n);
    vector<int> p(n + 1), kq(n + 1, 0), vitri(n + 1, -1);   // vitri: chỉ số trên đường đi hiện tại
    for (int i = 1; i <= n; i++) scanf("%d", &p[i]);
    vector<int> duong;
    for (int s = 1; s <= n; s++) {
        if (kq[s]) continue;
        duong.clear();
        int x = s;
        while (!kq[x] && vitri[x] == -1) { vitri[x] = duong.size(); duong.push_back(x); x = p[x]; }
        int het = duong.size();
        if (!kq[x]) {                                       // x nằm trên đường hiện tại: tìm thấy vòng
            int dau = vitri[x], dai = het - dau;
            for (int k = dau; k < het; k++) kq[duong[k]] = dai;
            het = dau;
        }
        for (int k = het - 1; k >= 0; k--) kq[duong[k]] = kq[p[duong[k]]] + 1;
        for (int y : duong) vitri[y] = -1;
    }
    for (int i = 1; i <= n; i++) printf("%d%c", kq[i], i == n ? '\n' : ' ');
}
