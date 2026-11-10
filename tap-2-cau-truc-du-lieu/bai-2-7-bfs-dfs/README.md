# Bài 2.7 – Đồ thị: BFS và DFS

> **Tập 2** · Cần biết trước: bài 2.1 (hàng đợi, ngăn xếp) · Thời lượng: khoảng 2 giờ đọc, 10 giờ thực hành (2 tuần)

**Học xong bài này, em sẽ:**

- biểu diễn đồ thị bằng **danh sách kề**;
- tìm **đường đi ngắn nhất** (số cạnh ít nhất) bằng BFS;
- đếm **thành phần liên thông** bằng DFS; làm cả hai trên lưới ô vuông.

---

## 1. Bài toán mở màn: Mê cung

Bản đồ R × C gồm `#` (tường), `.` (đường), `A` (xuất phát), `B` (đích). Mỗi bước đi sang một ô kề cạnh. Ít nhất bao nhiêu bước để từ A tới B? In −1 nếu không tới được. (R, C ≤ 1000)

| Vào | Ra |
| --- | --- |
| `5 8`<br>`########`<br>`#.A#...#`<br>`#.##.#B#`<br>`#......#`<br>`########` | `9` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Hãy tô số lên các ô: ô A là 0, các ô đi tới được sau 1 bước ghi 1, sau 2 bước ghi 2… Em tô theo thứ tự nào để mỗi ô được ghi đúng số bước **ít nhất**?

<details>
<summary>Đáp án</summary>

Tô theo **từng lớp**: xong mọi ô số 0, rồi mọi ô số 1, rồi số 2… Ô nào được tô lần đầu thì đó là khoảng cách ngắn nhất. "Lan theo lớp, xử lý theo thứ tự được phát hiện" chính là hàng đợi: đó là **BFS** (tìm kiếm theo chiều rộng).

</details>

---

## 2. Đồ thị và danh sách kề

Đồ thị gồm **đỉnh** và **cạnh** nối hai đỉnh. Lưới ô vuông là một đồ thị: mỗi ô là đỉnh, hai ô kề nhau (không phải tường) có cạnh.

Đồ thị cho dưới dạng n đỉnh, m cạnh (u, v) thì lưu bằng **danh sách kề**: `adj[u]` chứa mọi đỉnh nối với u.

```cpp
vector<vector<int>> adj(n + 1);
for (int i = 0; i < m; i++) {
    int u, v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);      // đồ thị vô hướng: thêm cả hai chiều
}
```

Bộ nhớ O(n + m), duyệt mọi hàng xóm của u tốn O(số hàng xóm).

---

## 3. BFS: đường đi ngắn nhất

```text
d[A] ← 0; đưa A vào hàng đợi
trong khi hàng đợi không rỗng:
    lấy u ở đầu hàng
    với mỗi v kề u mà chưa có d[v]:
        d[v] ← d[u] + 1; đưa v vào cuối hàng
```

Các con số BFS ghi lên mê cung ví dụ (A ở hàng 2 cột 3):

```
 #  #  #  #  #  #  #  #
 #  1  0  #  8  9 10  #
 #  2  #  #  7  #  9  #      ← ô B: d = 9
 #  3  4  5  6  7  8  #
 #  #  #  #  #  #  #  #
```

```cpp
// file: me_cung.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int R, C;
    cin >> R >> C;
    vector<string> g(R);
    for (auto &row : g) cin >> row;
    vector<vector<int>> d(R, vector<int>(C, -1));
    queue<pair<int, int>> q;
    for (int i = 0; i < R; i++)
        for (int j = 0; j < C; j++)
            if (g[i][j] == 'A') { d[i][j] = 0; q.push({i, j}); }
    int di[] = {1, -1, 0, 0}, dj[] = {0, 0, 1, -1};
    while (!q.empty()) {
        auto [i, j] = q.front(); q.pop();
        if (g[i][j] == 'B') { cout << d[i][j] << '\n'; return 0; }
        for (int h = 0; h < 4; h++) {
            int ni = i + di[h], nj = j + dj[h];
            if (ni < 0 || ni >= R || nj < 0 || nj >= C) continue;
            if (g[ni][nj] == '#' || d[ni][nj] != -1) continue;
            d[ni][nj] = d[i][j] + 1;
            q.push({ni, nj});
        }
    }
    cout << -1 << '\n';
}
```

Mỗi ô vào hàng đợi tối đa một lần: O(R·C). Python: `collections.deque`, cùng cấu trúc.

---

## 4. DFS: thành phần liên thông

Thành phố có n nút giao (1..n) và m con đường hai chiều. Một **thành phần liên thông** là một nhóm nút đi lại được với nhau. Đếm số thành phần. (n, m ≤ 2·10⁵)

| Vào | Ra |
| --- | --- |
| `5 3`<br>`1 2`<br>`2 3`<br>`4 5` | `2` |

DFS (tìm kiếm theo chiều sâu): từ một đỉnh chưa thăm, đi sâu hết mức có thể, đánh dấu mọi đỉnh gặp được. Mỗi lần bắt đầu DFS từ một đỉnh chưa thăm là gặp **một thành phần mới**.

```cpp
// file: dem_tplt.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<bool> tham(n + 1, false);
    int dem = 0;
    for (int s = 1; s <= n; s++) {
        if (tham[s]) continue;
        dem++;                                  // thành phần mới
        stack<int> st;                          // DFS bằng ngăn xếp, tránh đệ quy quá sâu
        st.push(s);
        tham[s] = true;
        while (!st.empty()) {
            int u = st.top(); st.pop();
            for (int v : adj[u])
                if (!tham[v]) { tham[v] = true; st.push(v); }
        }
    }
    cout << dem << '\n';
}
```

> [!NOTE]
> **BFS hay DFS?** Cần **khoảng cách ngắn nhất** (theo số cạnh): BFS. Chỉ cần biết **đi tới được không** hay đếm thành phần: cả hai đều được; DFS viết ngắn hơn. Đường đi có trọng số khác nhau (đường dài ngắn khác nhau) cần Dijkstra ở Tập 3.

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: đánh dấu khi lấy ra thay vì khi đưa vào.** Nếu chỉ đánh dấu lúc lấy khỏi hàng đợi, một ô có thể bị đưa vào nhiều lần, chậm đi rất nhiều. Đánh dấu **ngay khi đưa vào**.

> [!WARNING]
> **Bẫy 2: DFS đệ quy trên đồ thị lớn.** Đường đi dài 10⁵ đỉnh làm đệ quy sâu 10⁵ tầng: Python lỗi, C++ có thể tràn ngăn xếp. Dùng ngăn xếp tự quản như trên.

> [!WARNING]
> **Bẫy 3: quên cạnh hai chiều.** Đường hai chiều phải thêm vào cả `adj[u]` và `adj[v]`.

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Counting Rooms](https://cses.fi/problemset/task/1192) | CSES 1192 | Thành phần liên thông trên lưới |
| Khởi động | [Building Roads](https://cses.fi/problemset/task/1666) | CSES 1666 | Đếm thành phần, nối chúng lại |
| Luyện | [Labyrinth](https://cses.fi/problemset/task/1193) | CSES 1193 | BFS + in đường đi (lưu ô cha) |
| Luyện | [Message Route](https://cses.fi/problemset/task/1667) | CSES 1667 | BFS trên danh sách kề |
| Luyện | [Building Teams](https://cses.fi/problemset/task/1668) | CSES 1668 | Tô hai màu bằng BFS/DFS |
| Thử thách | [Monsters](https://cses.fi/problemset/task/1194) | CSES 1194 | BFS nhiều nguồn |

---

## 7. Tóm tắt và checkpoint

1. Đồ thị lưu bằng danh sách kề; lưới là đồ thị ngầm, không cần lưu cạnh.
2. BFS + hàng đợi: khoảng cách ngắn nhất theo số cạnh, O(n + m).
3. DFS + ngăn xếp: đánh dấu mọi đỉnh đi tới được, đếm thành phần.
4. Đánh dấu ngay khi đưa vào hàng đợi/ngăn xếp.

<details><summary>Vì sao ô được BFS tô đầu tiên có khoảng cách ngắn nhất?</summary>BFS xử lý hết các ô cách k bước trước mọi ô cách k + 1 bước.</details>

**Checkpoint:**

- [ ] AC Labyrinth (có in đường đi).
- [ ] Viết BFS trên lưới không nhìn sách trong 10 phút.
