#include <bits/stdc++.h>
using namespace std;
const int MAXC = 512;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int R, C, M;
    cin >> R >> C >> M;
    vector<bitset<MAXC>> trong(R), cu(R);
    for (int i = 0; i < R; i++) {
        string row;
        cin >> row;
        for (int j = 0; j < C; j++)
            if (row[j] == '.') trong[i][j] = 1;
        cu[i] = trong[i];                      // ban đầu: mọi ô nước
    }
    string s;
    cin >> s;
    vector<bitset<MAXC>> moi(R);
    for (char ch : s) {
        for (int i = 0; i < R; i++) {
            bitset<MAXC> b;
            if (ch == 'E' || ch == '?') b |= cu[i] << 1;
            if (ch == 'W' || ch == '?') b |= cu[i] >> 1;
            if ((ch == 'S' || ch == '?') && i > 0) b |= cu[i - 1];
            if ((ch == 'N' || ch == '?') && i + 1 < R) b |= cu[i + 1];
            moi[i] = b & trong[i];
        }
        swap(cu, moi);
    }
    long long dem = 0;
    for (int i = 0; i < R; i++) dem += cu[i].count();
    cout << dem << '\n';
}
