#include <bits/stdc++.h>
using namespace std;
vector<int> dung_sa(const string &s, vector<int> &rk) {
    int n = s.size();
    vector<int> sa(n), tmp(n);
    rk.assign(n, 0);
    for (int i = 0; i < n; i++) { sa[i] = i; rk[i] = s[i]; }
    for (int k = 1; ; k <<= 1) {
        auto cmp = [&](int a, int b) {
            if (rk[a] != rk[b]) return rk[a] < rk[b];
            int ra = a + k < n ? rk[a + k] : -1, rb = b + k < n ? rk[b + k] : -1;
            return ra < rb;
        };
        sort(sa.begin(), sa.end(), cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++) tmp[sa[i]] = tmp[sa[i - 1]] + cmp(sa[i - 1], sa[i]);
        rk = tmp;
        if (rk[sa[n - 1]] == n - 1) break;
    }
    return sa;
}
vector<int> dung_lcp(const string &s, const vector<int> &sa, const vector<int> &rk) {
    int n = s.size();
    vector<int> lcp(n, 0);
    for (int i = 0, h = 0; i < n; i++) {
        if (rk[i] == 0) { h = 0; continue; }
        int j = sa[rk[i] - 1];
        while (i + h < n && j + h < n && s[i + h] == s[j + h]) h++;
        lcp[rk[i]] = h;
        if (h > 0) h--;
    }
    return lcp;
}
int main() {
    freopen("MATKHAU.INP", "r", stdin);
    freopen("MATKHAU.OUT", "w", stdout);
    string s; int L, R;
    cin >> s >> L >> R;
    int n = s.size();
    vector<int> rk;
    vector<int> sa = dung_sa(s, rk), lcp = dung_lcp(s, sa, rk);
    long long kq = 0;
    for (int r = 0; r < n; r++) {
        int tu = max(L, lcp[r] + 1), den = min(R, n - sa[r]);
        if (den >= tu) kq += den - tu + 1;
    }
    cout << kq << '\n';
}
