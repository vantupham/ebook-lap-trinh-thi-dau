#include <bits/stdc++.h>
using namespace std;
int main() {
    long long n; cin >> n;
    long long lo = 1, hi = n;                    // bất biến: lo <= x <= hi
    while (lo < hi) {
        long long mid = (lo + hi + 1) / 2;       // làm tròn lên để hỏi "x >= mid?"
        cout << "? " << mid << endl;             // endl = xuống dòng + flush
        int r; cin >> r;
        if (r == 1) lo = mid; else hi = mid - 1;
    }
    cout << "! " << lo << endl;
}
