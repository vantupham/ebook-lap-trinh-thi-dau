#include <bits/stdc++.h>
using namespace std;

int tong_chu_so(int n) {
    int s = 0;
    while (n > 0) { s += n % 10; n /= 10; }
    return s;
}

bool la_doi_xung(int n) {
    int goc = n, dao = 0;
    while (n > 0) { dao = dao * 10 + n % 10; n /= 10; }
    return dao == goc;
}

bool may_man(int n) {
    return la_doi_xung(n) && tong_chu_so(n) % 3 == 0;
}

int main() {
    int a, b;
    cin >> a >> b;
    int dem = 0;
    for (int n = a; n <= b; n++)
        if (may_man(n)) dem++;
    cout << dem << '\n';
}
