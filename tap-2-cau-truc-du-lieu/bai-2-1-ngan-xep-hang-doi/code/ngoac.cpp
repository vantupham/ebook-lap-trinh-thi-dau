#include <bits/stdc++.h>
using namespace std;
int main() {
    string s;
    cin >> s;
    stack<char> st;
    bool ok = true;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else {
            char mo = (c == ')') ? '(' : (c == ']') ? '[' : '{';
            if (st.empty() || st.top() != mo) { ok = false; break; }
            st.pop();
        }
    }
    if (!st.empty()) ok = false;          // còn ngoặc mở chưa đóng
    cout << (ok ? "YES" : "NO") << '\n';
}
