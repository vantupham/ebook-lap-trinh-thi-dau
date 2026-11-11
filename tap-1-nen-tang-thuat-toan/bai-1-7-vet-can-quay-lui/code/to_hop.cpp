#include <bits/stdc++.h>
using namespace std;
int n, k;
vector<int> chon;
void thu(int bat_dau) {
    if ((int)chon.size() == k) {
        for (int i = 0; i < k; i++) cout << chon[i] << (i + 1 < k ? ' ' : '\n');
        return;
    }
    for (int v = bat_dau; v <= n; v++) {
        chon.push_back(v);
        thu(v + 1);
        chon.pop_back();
    }
}
int main() {
    cin >> n >> k;
    thu(1);
}
