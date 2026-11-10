#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    queue<int> q;
    for (int i = 1; i <= n; i++) q.push(i);
    vector<int> loai;
    while (!q.empty()) {
        q.push(q.front()); q.pop();      // bỏ qua: đưa xuống cuối hàng
        loai.push_back(q.front()); q.pop();
    }
    for (int i = 0; i < n; i++) cout << loai[i] << (i + 1 == n ? '\n' : ' ');
}
