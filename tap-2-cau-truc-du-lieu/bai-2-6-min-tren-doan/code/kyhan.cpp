#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("KYHAN.INP", "r", stdin);
    freopen("KYHAN.OUT", "w", stdout);
    int n, A, B;
    scanf("%d %d %d", &n, &A, &B);
    vector<long long> p(n + 1, 0);
    for (int i = 1; i <= n; i++) { long long x; scanf("%lld", &x); p[i] = p[i - 1] + x; }
    deque<int> dq;                                   // chỉ số j, p[j] tăng dần
    long long best = LLONG_MIN;
    for (int r = A; r <= n; r++) {
        int j = r - A;                               // chỉ số mới được phép
        while (!dq.empty() && p[dq.back()] >= p[j]) dq.pop_back();
        dq.push_back(j);
        if (dq.front() < r - B) dq.pop_front();      // quá xa: đoạn dài hơn B
        best = max(best, p[r] - p[dq.front()]);
    }
    printf("%lld\n", best);
}
