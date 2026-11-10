# Bài 4.6 – Luồng cực đại

> **Tập 4** · Cần biết trước: bài 2.7 (BFS) · Thời lượng: khoảng 2 giờ đọc, 10 giờ thực hành

**Học xong bài này, em sẽ:** tìm **luồng cực đại** từ nguồn s tới đích t bằng thuật toán Dinic; dùng định lý **lát cắt nhỏ nhất = luồng cực đại**; đưa bài **cặp ghép hai phía** về luồng.

**Dấu hiệu nhận biết:** "chuyển nhiều nhất bao nhiêu… qua mạng có giới hạn"; "ghép nhiều nhất bao nhiêu cặp"; "cắt ít nhất bao nhiêu để tách…"; n nhỏ (vài trăm tới vài nghìn).

---

## 1. Bài toán mở màn: Tốc độ tải

Mạng có n máy tính và m đường truyền **một chiều**; đường từ a tới b truyền được tối đa c MB/giây. Từ máy 1 tới máy n tải được nhanh nhất bao nhiêu MB/giây? (n ≤ 500, m ≤ 1000, c ≤ 10⁹; bài [Download Speed](https://cses.fi/problemset/task/1694))

| Vào | Ra |
| --- | --- |
| `4 5`<br>`1 2 3`<br>`2 4 2`<br>`1 3 4`<br>`3 4 5`<br>`4 1 3` | `6` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Tham lam: tìm một đường từ 1 tới n còn dư khả năng, đẩy hết mức có thể, lặp lại. Có khi nào đẩy "sai đường" làm chặn mất luồng tốt hơn không? Làm sao để **rút lại** một phần luồng đã đẩy?

<details>
<summary>Đáp án</summary>

Có thể chặn sai. Cách sửa: mỗi cạnh a → b có một **cạnh ngược** b → a với khả năng bằng lượng luồng đang đi qua a → b. Đẩy luồng theo cạnh ngược nghĩa là "rút lại" luồng đã đẩy. Với cạnh ngược, tham lam "tìm đường còn dư rồi đẩy" luôn cho kết quả tối ưu.

</details>

---

## 2. Dinic

Lặp lại tới khi không còn đường từ s tới t:

1. **BFS** trên các cạnh còn dư để tính "tầng" (khoảng cách) của mỗi đỉnh từ s.
2. **DFS** chỉ đi từ tầng k sang tầng k + 1, đẩy luồng cho tới khi bị chặn ("luồng chặn"). Con trỏ `it[u]` nhớ cạnh nào của u đã dùng hết để không thử lại.

Độ phức tạp xấu nhất O(n²·m), thực tế rất nhanh; với đồ thị cặp ghép hai phía là O(m·√n).

```cpp
// file: dinic.cpp
#include <bits/stdc++.h>
using namespace std;
struct Canh { int toi; long long con; };               // con = khả năng còn dư
vector<Canh> E;
vector<vector<int>> g;
vector<int> tang, it;

void them(int a, int b, long long c) {
    g[a].push_back(E.size()); E.push_back({b, c});
    g[b].push_back(E.size()); E.push_back({a, 0});    // cạnh ngược, ban đầu 0; cạnh i và i^1 là một cặp
}
bool bfs(int s, int t) {
    fill(tang.begin(), tang.end(), -1);
    queue<int> q; q.push(s); tang[s] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int id : g[u]) if (E[id].con > 0 && tang[E[id].toi] == -1) { tang[E[id].toi] = tang[u] + 1; q.push(E[id].toi); }
    }
    return tang[t] != -1;
}
long long dfs(int u, int t, long long f) {
    if (u == t) return f;
    for (int &i = it[u]; i < (int)g[u].size(); i++) {
        int id = g[u][i], v = E[id].toi;
        if (E[id].con > 0 && tang[v] == tang[u] + 1) {
            long long d = dfs(v, t, min(f, E[id].con));
            if (d > 0) { E[id].con -= d; E[id ^ 1].con += d; return d; }
        }
    }
    return 0;
}
int main() {
    int n, m;
    cin >> n >> m;
    g.assign(n + 1, {}); tang.assign(n + 1, -1); it.assign(n + 1, 0);
    for (int i = 0; i < m; i++) { int a, b; long long c; cin >> a >> b >> c; them(a, b, c); }
    long long luong = 0;
    while (bfs(1, n)) {
        fill(it.begin(), it.end(), 0);
        while (long long f = dfs(1, n, LLONG_MAX)) luong += f;
    }
    cout << luong << '\n';
}
```

Đệ quy trong `dfs` sâu tối đa n tầng (n ≤ vài nghìn): an toàn.

---

## 3. Lát cắt nhỏ nhất và cặp ghép

- **Lát cắt:** chia đỉnh thành hai phía, s ở một phía, t ở phía kia; chi phí = tổng khả năng các cạnh đi từ phía s sang phía t. **Lát cắt nhỏ nhất bằng luồng cực đại.** Sau Dinic, các đỉnh BFS còn tới được từ s tạo thành phía s ([Police Chase](https://cses.fi/problemset/task/1695)).
- **Cặp ghép hai phía** (ví dụ ghép học sinh với đề tài): thêm nguồn s nối tới mọi học sinh, mọi đề tài nối tới đích t, mỗi cạnh khả năng 1. Luồng cực đại = số cặp ghép nhiều nhất ([School Dance](https://cses.fi/problemset/task/1696)).

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: quên cạnh ngược**, hoặc lưu sai cặp. Cách lưu `id` và `id ^ 1` bảo đảm hai cạnh của một cặp luôn đứng cạnh nhau.

> [!WARNING]
> **Bẫy 2: không reset `it` mỗi pha.** Sau mỗi lần BFS phải đặt lại con trỏ cạnh.

> [!WARNING]
> **Bẫy 3: đường truyền hai chiều.** Cạnh vô hướng khả năng c: thêm a → b khả năng c **và** b → a khả năng c.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Download Speed](https://cses.fi/problemset/task/1694) | CSES 1694 | Đúng mục 2 |
| Luyện | [Police Chase](https://cses.fi/problemset/task/1695) | CSES 1695 | Lát cắt nhỏ nhất |
| Luyện | [School Dance](https://cses.fi/problemset/task/1696) | CSES 1696 | Cặp ghép hai phía |
| Thử thách | [Distinct Routes](https://cses.fi/problemset/task/1711) | CSES 1711 | Luồng + in các đường đi |

**Checkpoint:** viết Dinic không nhìn sách trong 10 phút; AC School Dance.
