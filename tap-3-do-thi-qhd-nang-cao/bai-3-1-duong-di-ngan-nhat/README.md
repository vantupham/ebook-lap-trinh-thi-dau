# Bài 3.1 – Đường đi ngắn nhất

> **Tập 3** · Cần biết trước: bài 2.3 (hàng đợi ưu tiên), 2.7 (BFS) · Thời lượng: khoảng 90 phút đọc, 8 giờ thực hành

**Học xong bài này, em sẽ:**

- tìm đường đi ngắn nhất từ một đỉnh khi cạnh có **độ dài khác nhau** (không âm) bằng Dijkstra, O((n + m) log n);
- tìm đường đi ngắn nhất giữa **mọi cặp** đỉnh bằng Floyd–Warshall, O(n³);
- biết khi nào hai thuật toán này **sai** và cần thuật toán khác.

---

## 1. Bài toán mở màn: Xe buýt nhanh nhất

Thành phố có n trạm và m tuyến xe **một chiều**; tuyến từ a tới b mất c phút. Từ trạm 1, đi tới mỗi trạm mất ít nhất bao nhiêu phút? In −1 cho trạm không tới được. (n ≤ 10⁵, m ≤ 2·10⁵, c ≤ 10⁹)

| Vào | Ra |
| --- | --- |
| `3 4`<br>`1 2 6`<br>`1 3 2`<br>`3 2 3`<br>`1 3 4` | `0 5 2` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** BFS (bài 2.7) đếm số **cạnh**, không phải tổng **độ dài**. Ở ví dụ, đi thẳng 1 → 2 chỉ một cạnh nhưng mất 6 phút; đi 1 → 3 → 2 mất 5 phút. Trong các trạm chưa chốt, trạm nào chắc chắn đã biết khoảng cách đúng?

<details>
<summary>Đáp án</summary>

Trạm có khoảng cách tạm thời **nhỏ nhất**. Mọi đường khác tới nó phải đi qua một trạm chưa chốt có khoảng cách lớn hơn hoặc bằng, rồi cộng thêm cạnh không âm, nên không thể ngắn hơn. Đó là ý của **Dijkstra**.

</details>

---

## 2. Dijkstra

```text
d[1] ← 0, mọi d khác ← ∞; đưa (0, 1) vào heap nhỏ nhất
trong khi heap không rỗng:
    lấy (du, u) nhỏ nhất ra
    nếu du > d[u]: bỏ qua (đây là bản cũ, đã có đường tốt hơn)
    với mỗi cạnh u → v dài w:
        nếu d[u] + w < d[v]: d[v] ← d[u] + w; đưa (d[v], v) vào heap
```

| Bước | Lấy ra | Cập nhật | d[1] d[2] d[3] |
| :---: | --- | --- | --- |
| 0 | | | 0 ∞ ∞ |
| 1 | trạm 1 (0) | d[2] = 6, d[3] = 2 (cạnh 1→3 dài 4 không tốt hơn) | 0 6 2 |
| 2 | trạm 3 (2) | d[2] = 2 + 3 = 5 | 0 5 2 |
| 3 | trạm 2 (5) | | 0 5 2 |
| 4 | trạm 2 (6) | bản cũ, bỏ qua | |

```cpp
// file: dijkstra.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<vector<pair<int, long long>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int a, b; long long c;
        cin >> a >> b >> c;
        adj[a].push_back({b, c});
    }
    const long long VC = LLONG_MAX;
    vector<long long> d(n + 1, VC);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    d[1] = 0;
    pq.push({0, 1});
    while (!pq.empty()) {
        auto [du, u] = pq.top(); pq.pop();
        if (du > d[u]) continue;                       // bản cũ
        for (auto [v, w] : adj[u])
            if (d[u] + w < d[v]) { d[v] = d[u] + w; pq.push({d[v], v}); }
    }
    for (int i = 1; i <= n; i++) cout << (d[i] == VC ? -1 : d[i]) << (i == n ? '\n' : ' ');
}
```

---

## 3. Floyd–Warshall: mọi cặp đỉnh

Khi n nhỏ (≤ 500) và có nhiều câu hỏi "từ a tới b ngắn nhất bao nhiêu", tính sẵn cho **mọi cặp**: d[i][j] lúc đầu là độ dài cạnh trực tiếp. Lần lượt cho phép đi qua đỉnh trung gian k = 1, 2, …, n:

**d[i][j] = min(d[i][j], d[i][k] + d[k][j])**

Bài [Shortest Routes II](https://cses.fi/problemset/task/1672): n đỉnh, m đường **hai chiều**, q câu hỏi.

| Vào | Ra |
| --- | --- |
| `4 3 5`<br>`1 2 5`<br>`1 3 9`<br>`2 3 3`<br>`1 2`<br>`2 1`<br>`1 3`<br>`1 4`<br>`3 2` | `5`<br>`5`<br>`8`<br>`-1`<br>`3` |

```cpp
// file: floyd.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m, q;
    cin >> n >> m >> q;
    const long long VC = LLONG_MAX / 4;              // đủ lớn, cộng hai lần không tràn
    vector<vector<long long>> d(n + 1, vector<long long>(n + 1, VC));
    for (int i = 1; i <= n; i++) d[i][i] = 0;
    for (int i = 0; i < m; i++) {
        int a, b; long long c;
        cin >> a >> b >> c;
        d[a][b] = min(d[a][b], c);                   // có thể có nhiều đường giữa a, b
        d[b][a] = min(d[b][a], c);
    }
    for (int k = 1; k <= n; k++)                     // k PHẢI là vòng ngoài cùng
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << (d[a][b] >= VC ? -1 : d[a][b]) << '\n';
    }
}
```

---

## 4. Chọn thuật toán nào?

| Tình huống | Thuật toán | Độ phức tạp |
| --- | --- | --- |
| Mọi cạnh dài bằng nhau | BFS (bài 2.7) | O(n + m) |
| Cạnh không âm, một đỉnh nguồn | Dijkstra | O((n + m) log n) |
| n ≤ 500, nhiều cặp | Floyd–Warshall | O(n³) |
| Có cạnh **âm** | Bellman–Ford: lặp n − 1 lần "thử cải thiện mọi cạnh"; lần thứ n vẫn cải thiện được nghĩa là có **chu trình âm** | O(n·m) |

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: Dijkstra với cạnh âm.** Lập luận "đỉnh nhỏ nhất đã chốt" sai khi có cạnh âm. Kết quả sai mà không báo lỗi.

> [!WARNING]
> **Bẫy 2: thiếu dòng "bản cũ".** Không có `if (du > d[u]) continue;` thì vẫn đúng nhưng có thể chậm tới mức TLE trên đồ thị lớn.

> [!WARNING]
> **Bẫy 3: Floyd đặt k ở vòng trong.** Thứ tự vòng lặp sai cho kết quả sai. k luôn ở **ngoài cùng**.

> [!WARNING]
> **Bẫy 4: "vô cùng" tràn số.** `LLONG_MAX + w` tràn thành số âm. Trong Dijkstra, chỉ cộng từ đỉnh đã có d hữu hạn; trong Floyd, dùng `LLONG_MAX / 4`.

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Shortest Routes I](https://cses.fi/problemset/task/1671) | CSES 1671 | Đúng mục 2 |
| Khởi động | [Shortest Routes II](https://cses.fi/problemset/task/1672) | CSES 1672 | Đúng mục 3 |
| Luyện | [Flight Discount](https://cses.fi/problemset/task/1195) | CSES 1195 | Dijkstra trên trạng thái (đỉnh, đã dùng mã giảm giá chưa) |
| Luyện | [High Score](https://cses.fi/problemset/task/1673) | CSES 1673 | Bellman–Ford, chu trình dương |
| Luyện | [Investigation](https://cses.fi/problemset/task/1202) | CSES 1202 | Dijkstra + đếm số đường ngắn nhất |
| Thử thách | [Flight Routes](https://cses.fi/problemset/task/1196) | CSES 1196 | k đường ngắn nhất |

---

## 7. Tóm tắt và checkpoint

1. Dijkstra: heap nhỏ nhất, bỏ bản cũ, chỉ dùng khi cạnh không âm.
2. Floyd: ba vòng lặp, k ngoài cùng, n ≤ 500.
3. Cạnh âm: Bellman–Ford, phát hiện được chu trình âm.

<details><summary>Ở ví dụ mở màn, vì sao trạm 2 bị lấy ra khỏi heap hai lần?</summary>Nó được đẩy vào với 6 rồi với 5; lần lấy ra với 6 là bản cũ.</details>

**Checkpoint:**

- [ ] Viết Dijkstra không nhìn sách trong 5 phút; AC Shortest Routes I.
- [ ] AC Flight Discount.
