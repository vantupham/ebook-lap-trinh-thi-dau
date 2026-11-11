#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<long long> st;                 // vector dùng như ngăn xếp
    string tk;
    while (cin >> tk) {
        if (tk == "+" || tk == "-" || tk == "*") {
            long long b = st.back(); st.pop_back();   // toán hạng phải
            long long a = st.back(); st.pop_back();   // toán hạng trái
            st.push_back(tk == "+" ? a + b : tk == "-" ? a - b : a * b);
        } else st.push_back(stoll(tk));
    }
    cout << st.back() << '\n';
}
