#include <bits/stdc++.h>
using namespace std;
vector<long long> a;

long long giai(int l, int r, long long nen) {     // số bước để các ô l..r từ "nen" lên đúng a[i]
    long long kq = 0;
    int i = l;
    while (i <= r) {
        if (a[i] == nen) { i++; continue; }        // ô đã xong, nó chia đoạn
        int j = i;
        long long m = a[i];
        while (j + 1 <= r && a[j + 1] > nen) { j++; m = min(m, a[j]); }
        kq += 1 + giai(i, j, m);                   // 1 bước phủ [i..j] lên cao m, rồi đệ quy
        i = j + 1;
    }
    return kq;
}

int main() {
    // Khi thi: bật hai dòng freopen cho XAYTUONG.INP / XAYTUONG.OUT
    int n;
    cin >> n;
    a.resize(n);
    for (auto &x : a) cin >> x;
    cout << giai(0, n - 1, 0) << '\n';
}
