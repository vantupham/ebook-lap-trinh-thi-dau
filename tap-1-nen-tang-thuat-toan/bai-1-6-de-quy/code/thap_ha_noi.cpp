#include <bits/stdc++.h>
using namespace std;
vector<pair<int, int>> buoc;

void chuyen(int n, int tu, int toi, int tg) {   // chuyển n đĩa từ cọc tu sang cọc toi, qua cọc tg
    if (n == 0) return;                          // cơ sở
    chuyen(n - 1, tu, tg, toi);                  // n-1 đĩa sang cọc trung gian
    buoc.push_back({tu, toi});                   // đĩa lớn nhất
    chuyen(n - 1, tg, toi, tu);                  // n-1 đĩa từ trung gian sang đích
}

int main() {
    int n;
    cin >> n;
    chuyen(n, 1, 3, 2);
    cout << buoc.size() << '\n';
    for (auto [a, b] : buoc) cout << a << ' ' << b << '\n';
}
