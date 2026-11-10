#include <bits/stdc++.h>
using namespace std;
long long ucln(long long a, long long b) {
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}
int main() {
    long long a, b;
    cin >> a >> b;
    cout << a / ucln(a, b) * b << '\n';   // chia trước để giá trị trung gian nhỏ hơn
}
