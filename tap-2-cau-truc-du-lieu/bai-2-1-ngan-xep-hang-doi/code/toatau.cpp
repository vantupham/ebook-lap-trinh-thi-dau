#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("TOATAU.INP", "r", stdin);
    freopen("TOATAU.OUT", "w", stdout);
    int n;
    scanf("%d", &n);
    vector<int> st;
    st.reserve(n);
    int ke = 1;
    bool ok = true;
    for (int i = 0; i < n; i++) {
        int p;
        scanf("%d", &p);
        if (!ok) continue;
        while (ke <= p) st.push_back(ke++);        // đưa vào tới khi gặp p
        if (st.back() != p) ok = false;            // p bị chặn bên dưới
        else st.pop_back();
    }
    puts(ok ? "YES" : "NO");
}
