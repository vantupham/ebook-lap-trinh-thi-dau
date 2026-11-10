#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<bool> nt(n + 1, true);
    nt[0] = nt[1] = false;
    for (long long p = 2; p * p <= n; p++)
        if (nt[p])
            for (long long k = p * p; k <= n; k += p) nt[k] = false;
    cout << count(nt.begin(), nt.end(), true) << '\n';
}
