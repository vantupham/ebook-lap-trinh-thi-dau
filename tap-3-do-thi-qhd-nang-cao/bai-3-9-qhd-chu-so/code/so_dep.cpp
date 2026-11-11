#include <bits/stdc++.h>
using namespace std;
string s;
long long nho[20][11];                              // nho[i][truoc] khi bam = false, bat_dau = true
long long dem_tu(int i, int truoc, bool bam, bool bat_dau) {
    if (i == (int)s.size()) return 1;               // đã viết xong một số hợp lệ (kể cả số 0)
    if (!bam && bat_dau && nho[i][truoc] != -1) return nho[i][truoc];
    int gioi_han = bam ? s[i] - '0' : 9;
    long long kq = 0;
    for (int d = 0; d <= gioi_han; d++) {
        if (bat_dau && d == truoc) continue;         // hai chữ số liền nhau bằng nhau
        bool bd = bat_dau || d != 0;
        kq += dem_tu(i + 1, bd ? d : 10, bam && d == gioi_han, bd);
    }
    if (!bam && bat_dau) nho[i][truoc] = kq;
    return kq;
}
long long dem(long long N) {                        // số số đẹp trong [0, N]
    if (N < 0) return 0;
    s = to_string(N);
    memset(nho, -1, sizeof nho);
    return dem_tu(0, 10, true, false);
}
int main() {
    long long a, b;
    cin >> a >> b;
    cout << dem(b) - dem(a - 1) << '\n';
}
