#include <bits/stdc++.h>
using namespace std;
int main() {
    long long n;          // giá trị có thể vượt 10⁹ giữa chừng (xem bẫy 2)
    cin >> n;
    int buoc = 0;
    while (n != 1) {
        if (n % 2 == 0) n /= 2;
        else n = 3 * n + 1;
        buoc++;
    }
    cout << buoc << '\n';
}
