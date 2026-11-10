#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> seg;                                 // cây phân đoạn max, dạng vòng lặp (bài 3.5)
void sua(int i, long long v) { for (seg[i += n] = v; i > 1; i /= 2) seg[i / 2] = max(seg[i], seg[i ^ 1]); }
long long hoi(int l, int r) {                         // max trên [l, r)
    long long kq = LLONG_MIN;
    for (l += n, r += n; l < r; l /= 2, r /= 2) {
        if (l & 1) kq = max(kq, seg[l++]);
        if (r & 1) kq = max(kq, seg[--r]);
    }
    return kq;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    vector<long long> val(n + 1);
    for (int i = 1; i <= n; i++) cin >> val[i];
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) { int a, b; cin >> a >> b; adj[a].push_back(b); adj[b].push_back(a); }
    vector<int> cha(n + 1, 0), sau(n + 1, 0), sz(n + 1, 1), nang(n + 1, 0), dau(n + 1), vt(n + 1), bfs = {1};
    for (int k = 0; k < (int)bfs.size(); k++)
        for (int v : adj[bfs[k]]) if (v != cha[bfs[k]]) { cha[v] = bfs[k]; sau[v] = sau[bfs[k]] + 1; bfs.push_back(v); }
    for (int k = n - 1; k > 0; k--) {                 // kích thước cây con và con nặng
        int u = bfs[k], p = cha[u];
        sz[p] += sz[u];
        if (nang[p] == 0 || sz[u] > sz[nang[p]]) nang[p] = u;
    }
    int t = 0;
    vector<int> st = {1};
    while (!st.empty()) {                             // mỗi chuỗi nặng nhận các vị trí liên tiếp
        int h = st.back(); st.pop_back();
        for (int u = h; u != 0; u = nang[u]) {
            dau[u] = h; vt[u] = t++;
            for (int v : adj[u]) if (v != cha[u] && v != nang[u]) st.push_back(v);
        }
    }
    seg.assign(2 * n, LLONG_MIN);
    for (int u = 1; u <= n; u++) sua(vt[u], val[u]);
    while (q--) {
        int tp, a, b;
        cin >> tp >> a >> b;
        if (tp == 1) { sua(vt[a], b); continue; }
        long long kq = LLONG_MIN;
        while (dau[a] != dau[b]) {                    // nhảy chuỗi có đầu sâu hơn
            if (sau[dau[a]] < sau[dau[b]]) swap(a, b);
            kq = max(kq, hoi(vt[dau[a]], vt[a] + 1));
            a = cha[dau[a]];
        }
        if (sau[a] > sau[b]) swap(a, b);
        kq = max(kq, hoi(vt[a], vt[b] + 1));          // cùng chuỗi: một đoạn
        cout << kq << '\n';
    }
}
