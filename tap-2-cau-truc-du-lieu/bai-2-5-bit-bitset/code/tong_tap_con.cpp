#include <bits/stdc++.h>
using namespace std;
bitset<1000001> duoc;
int main() {
    int n, S;
    cin >> n >> S;
    duoc[0] = 1;
    for (int i = 0; i < n; i++) {
        int a;
        cin >> a;
        duoc |= duoc << a;
    }
    cout << (duoc[S] ? "YES" : "NO") << '\n';
}
