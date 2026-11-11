#include <bits/stdc++.h>
using namespace std;
int main() {
    long long m, vi_tri = 0;
    string s;
    cin >> m >> s;
    for (char lenh : s) {
        if (lenh == 'L' && vi_tri > 0) vi_tri--;
        else if (lenh == 'R' && vi_tri < m) vi_tri++;
    }
    cout << vi_tri << '\n';
}
