#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("GIUXE.INP", "r", stdin);
    freopen("GIUXE.OUT", "w", stdout);
    int n, q;
    scanf("%d %d", &n, &q);
    set<int> trong;
    for (int i = 1; i <= n; i++) trong.insert(trong.end(), i);   // chèn ở cuối: nhanh
    while (q--) {
        int t, x;
        scanf("%d %d", &t, &x);
        if (t == 1) {
            auto it = trong.lower_bound(x);       // chỗ trống đầu tiên >= x
            if (it == trong.end()) puts("-1");
            else { printf("%d\n", *it); trong.erase(it); }
        } else trong.insert(x);                   // chỗ x trống trở lại
    }
}
