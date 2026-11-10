#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> q;
    set<long long> s;
    while (q--) {
        char op;
        long long x;
        cin >> op >> x;
        if (op == '+') s.insert(x);
        else if (op == '-') s.erase(x);
        else {
            auto it = s.lower_bound(x);            // phần tử đầu tiên >= x
            cout << (it == s.end() ? -1 : *it) << '\n';
        }
    }
}
