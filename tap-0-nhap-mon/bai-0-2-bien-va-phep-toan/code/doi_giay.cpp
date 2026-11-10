#include <bits/stdc++.h>
using namespace std;
int main() {
    long long t;
    cin >> t;
    cout << t / 3600 << ' ' << t % 3600 / 60 << ' ' << t % 60 << '\n';
}
