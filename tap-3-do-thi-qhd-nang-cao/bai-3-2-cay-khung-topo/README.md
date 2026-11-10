# Bài 3.2 – Cây khung nhỏ nhất và thứ tự tô-pô

> **Tập 3** · Cần biết trước: bài 2.8 (DSU), 2.3, 2.7 · Thời lượng: khoảng 90 phút đọc, 6 giờ thực hành

**Học xong bài này, em sẽ:**

- nối mọi đỉnh với **tổng chi phí nhỏ nhất** bằng thuật toán Kruskal;
- xếp các việc có ràng buộc "việc a phải làm trước việc b" bằng **sắp xếp tô-pô**;
- phát hiện khi ràng buộc mâu thuẫn (có chu trình).

---

## 1. Bài toán mở màn: Sửa đường sau lũ

Sau mưa lũ, n xã bị cắt đứt. Có m con đường có thể sửa, sửa đường nối a và b tốn c triệu đồng. Hãy sửa sao cho mọi xã đi lại được với nhau, tốn ít tiền nhất; in `IMPOSSIBLE` nếu không thể. (n ≤ 10⁵, m ≤ 2·10⁵; bài [Road Reparation](https://cses.fi/problemset/task/1675))

| Vào | Ra |
| --- | --- |
| `5 6`<br>`1 2 3`<br>`2 3 5`<br>`2 4 2`<br>`3 4 8`<br>`5 1 7`<br>`5 4 4` | `14` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Thử tham lam: xét các con đường từ **rẻ nhất**, sửa nếu nó nối hai nhóm xã **chưa** đi lại được. Khi nào thì bỏ qua một con đường rẻ?

<details>
<summary>Đáp án</summary>

Bỏ qua khi hai đầu đã cùng nhóm: sửa nó chỉ tạo vòng, tốn tiền mà không nối thêm ai. Đây là **Kruskal**; kiểm tra "cùng nhóm" bằng DSU (bài 2.8).

</details>

---

## 2. Kruskal

| Đường (theo chi phí) | Hai đầu cùng nhóm? | Sửa? | Tổng |
| --- | :---: | :---: | :---: |
| 2–4 (2) | không | có | 2 |
| 1–2 (3) | không | có | 5 |
| 5–4 (4) | không | có | 9 |
| 2–3 (5) | không | có | **14** |
| 5–1 (7) | có (5–4–2–1) | không | |
| 3–4 (8) | có | không | |

Đã sửa n − 1 = 4 đường: mọi xã đã nối. Tập đường được sửa gọi là **cây khung nhỏ nhất**.

```cpp
// file: kruskal.cpp
#include <bits/stdc++.h>
using namespace std;
vector<int> cha;
int tim(int u) { while (cha[u] != u) u = cha[u] = cha[cha[u]]; return u; }
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<array<long long, 3>> e(m);               // {chi phí, a, b}
    for (auto &[c, a, b] : e) cin >> a >> b >> c;
    sort(e.begin(), e.end());
    cha.resize(n + 1);
    iota(cha.begin(), cha.end(), 0);
    long long tong = 0;
    int da_noi = 0;
    for (auto [c, a, b] : e) {
        int x = tim(a), y = tim(b);
        if (x == y) continue;
        cha[x] = y;
        tong += c;
        da_noi++;
    }
    if (da_noi == n - 1) cout << tong << '\n';
    else cout << "IMPOSSIBLE\n";
}
```

O(m log m) cho sắp xếp. Đúng vì lập luận hoán đổi (bài 1.8): đổi một cạnh trong cây tốt nhất bằng cạnh rẻ hơn mà Kruskal chọn không làm tổng tăng.

---

## 3. Sắp xếp tô-pô

Có n môn học và m ràng buộc "phải học môn a **trước** môn b". Hãy in một thứ tự học hợp lệ; nếu có nhiều, in thứ tự **nhỏ nhất theo từ điển**; nếu ràng buộc mâu thuẫn, in `IMPOSSIBLE`.

| Vào | Ra |
| --- | --- |
| `5 3`<br>`1 2`<br>`3 1`<br>`4 5` | `3 1 2 4 5` |

Ý tưởng (thuật toán Kahn): môn **không còn môn nào phải học trước** thì học được ngay. Học xong thì "gỡ" các ràng buộc đi ra từ nó. Muốn thứ tự nhỏ nhất, luôn chọn môn có số nhỏ nhất trong các môn học được: dùng heap nhỏ nhất.

| Bước | Học được ngay | Chọn | Gỡ ràng buộc |
| :---: | --- | :---: | --- |
| 1 | 3, 4 | 3 | 3 → 1: môn 1 học được |
| 2 | 1, 4 | 1 | 1 → 2: môn 2 học được |
| 3 | 2, 4 | 2 | |
| 4 | 4 | 4 | 4 → 5 |
| 5 | 5 | 5 | |

```cpp
// file: topo.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    vector<int> vao(n + 1, 0);                     // số môn phải học trước
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        vao[b]++;
    }
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 1; i <= n; i++) if (vao[i] == 0) pq.push(i);
    vector<int> thu_tu;
    while (!pq.empty()) {
        int u = pq.top(); pq.pop();
        thu_tu.push_back(u);
        for (int v : adj[u]) if (--vao[v] == 0) pq.push(v);
    }
    if ((int)thu_tu.size() < n) { cout << "IMPOSSIBLE\n"; return 0; }   // còn môn kẹt trong chu trình
    for (int i = 0; i < n; i++) cout << thu_tu[i] << (i + 1 == n ? '\n' : ' ');
}
```

> [!NOTE]
> **QHĐ trên đồ thị có hướng không chu trình.** Thứ tự tô-pô cho ta "thứ tự tính" của QHĐ (bài 2.9): xét các đỉnh theo thứ tự tô-pô thì mọi đỉnh đi trước đã được tính xong. Bài [Longest Flight Route](https://cses.fi/problemset/task/1680) và [Game Routes](https://cses.fi/problemset/task/1681) dùng đúng ý này.

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: Kruskal không kiểm tra liên thông.** Đồ thị không liên thông thì không có cây khung; đếm số cạnh đã chọn, phải đủ n − 1.

> [!WARNING]
> **Bẫy 2: tô-pô "thiếu đỉnh" là có chu trình.** Nếu sau thuật toán chưa xếp đủ n môn, các môn còn lại nằm trong một vòng chờ nhau.

> [!WARNING]
> **Bẫy 3: tổng chi phí tràn số.** 10⁵ cạnh × 10⁹: `long long`.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Road Reparation](https://cses.fi/problemset/task/1675) | CSES 1675 | Đúng mục 2 |
| Khởi động | [Course Schedule](https://cses.fi/problemset/task/1679) | CSES 1679 | Đúng mục 3 (in thứ tự bất kỳ) |
| Luyện | [Longest Flight Route](https://cses.fi/problemset/task/1680) | CSES 1680 | QHĐ theo thứ tự tô-pô |
| Luyện | [Game Routes](https://cses.fi/problemset/task/1681) | CSES 1681 | Đếm đường đi trên DAG |
| Thử thách | [Course Schedule II](https://cses.fi/problemset/task/1757) | CSES 1757 | Tô-pô trên đồ thị ngược |

---

## 6. Tóm tắt và checkpoint

1. Kruskal: sắp cạnh tăng dần, nhận cạnh nối hai nhóm khác nhau (DSU).
2. Tô-pô (Kahn): lấy dần đỉnh có bậc vào 0; thiếu đỉnh nghĩa là có chu trình.
3. Thứ tự tô-pô là thứ tự tính cho QHĐ trên DAG.

<details><summary>Cây khung của n đỉnh có bao nhiêu cạnh?</summary>n − 1.</details>

**Checkpoint:**

- [ ] AC Road Reparation và Course Schedule.
- [ ] AC Longest Flight Route.
