#include <bits/stdc++.h>
using namespace std;
string s;
pair<long long, long long> nho[20];
bool co[20];
pair<long long, long long> tu(int i, bool bam) {   // (số lượng, tổng chữ số)
    if (i == (int)s.size()) return {1, 0};
    if (!bam && co[i]) return nho[i];
    int gh = bam ? s[i] - '0' : 9;
    long long c = 0, t = 0;
    for (int d = 0; d <= gh; d++) {
        auto [c2, t2] = tu(i + 1, bam && d == gh);
        c += c2;
        t += d * c2 + t2;
    }
    if (!bam) { co[i] = true; nho[i] = {c, t}; }
    return {c, t};
}
long long tong(long long N) {
    if (N < 0) return 0;
    s = to_string(N);
    memset(co, 0, sizeof co);
    return tu(0, true).second;
}
int main() {
    long long a, b;
    cin >> a >> b;
    cout << tong(b) - tong(a - 1) << '\n';
}
