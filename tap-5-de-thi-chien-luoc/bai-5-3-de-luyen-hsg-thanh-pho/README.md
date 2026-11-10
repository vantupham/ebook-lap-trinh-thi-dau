# Bài 5.3 – Đề luyện số 2: HSG 12 cấp tỉnh/thành phố

> **Thời gian: 120 phút.** Làm sau Tập 2. Cấu trúc điểm lệch: bài 1 10 điểm, bài 2 và bài 3 mỗi bài 5 điểm. Đọc/ghi tệp, chấm theo subtask. Đề tự soạn.

Theo chiến lược ở [bài 5.1](../bai-5-1-chien-luoc-phong-thi/): bài 1 chiếm nửa số điểm, hãy làm chắc nó trước.

| Bài | Tên tệp chương trình | Dữ liệu | Kết quả | Điểm |
| --- | --- | --- | --- | :---: |
| 1. Tòa nhà | `TOANHA.*` | `TOANHA.INP` | `TOANHA.OUT` | 10 |
| 2. Cứu hỏa | `CUUHOA.*` | `CUUHOA.INP` | `CUUHOA.OUT` | 5 |
| 3. Cửa sổ ổn định | `CUASO.*` | `CUASO.INP` | `CUASO.OUT` | 5 |

---

### Bài 1. Tòa nhà (10 điểm)

Đại lộ Nguyễn Huệ có n tòa nhà xếp từ trái sang phải, tòa i cao hᵢ. Với mỗi tòa i, gọi j là tòa **đầu tiên bên phải** cao **hơn hẳn** tòa i; khoảng cách của tòa i là j − i (bằng 0 nếu không có tòa nào như vậy). In tổng khoảng cách của mọi tòa.

**Dữ liệu:** dòng đầu n (1 ≤ n ≤ 10⁶); dòng hai h₁ … hₙ (1 ≤ hᵢ ≤ 10⁹).

| TOANHA.INP | TOANHA.OUT |
| --- | --- |
| `6`<br>`3 1 4 1 5 2` | `6` |

Khoảng cách lần lượt là 2, 1, 2, 1, 0, 0.

Subtask: 40% số điểm có n ≤ 1000; 30% số điểm khác có các hᵢ đôi một khác nhau và n ≤ 10⁵.

### Bài 2. Cứu hỏa (5 điểm)

Bản đồ khu phố là lưới R × C: `F` là trạm cứu hỏa, `.` là nhà, `#` là công trình không đi qua được. Xe cứu hỏa đi sang ô kề cạnh mất 1 phút. Thời gian để xe từ trạm **gần nhất** tới một ngôi nhà là bao nhiêu, với ngôi nhà **xa nhất**? In −1 nếu có nhà không xe nào tới được. Đề bảo đảm có ít nhất một trạm.

**Dữ liệu:** dòng đầu R, C (1 ≤ R, C ≤ 1000); R dòng sau mô tả lưới.

| CUUHOA.INP | CUUHOA.OUT |
| --- | --- |
| `4 5`<br>`F..#.`<br>`.#...`<br>`...#F`<br>`#....` | `4` |

Subtask: 40% số điểm có đúng một trạm và R, C ≤ 100; 20% số điểm khác có R, C ≤ 100.

### Bài 3. Cửa sổ ổn định (5 điểm)

Trạm khí tượng Tân Sơn Nhất ghi n giá trị nhiệt độ a₁ … aₙ. Một **cửa sổ** là k giá trị liên tiếp; cửa sổ **ổn định** nếu nhiệt độ cao nhất trừ thấp nhất trong cửa sổ không quá d. Đếm số cửa sổ ổn định.

**Dữ liệu:** dòng đầu n, k, d (1 ≤ k ≤ n ≤ 10⁶; 0 ≤ d ≤ 10⁹); dòng hai a₁ … aₙ (|aᵢ| ≤ 10⁹).

| CUASO.INP | CUASO.OUT |
| --- | --- |
| `7 3 2`<br>`5 3 4 6 6 9 7` | `2` |

Hai cửa sổ ổn định là (5, 3, 4) và (4, 6, 6).

Subtask: 40% số điểm có n·k ≤ 10⁷; 20% số điểm khác có n ≤ 10⁵.

---

## Chữa đề

<details>
<summary><b>Bài 1</b> – ngăn xếp đơn điệu</summary>

- **40%:** với mỗi i, đi sang phải tới khi gặp tòa cao hơn. O(n²).
- **70%:** cũng có thể dùng sparse table và chặt nhị phân tìm tòa đầu tiên cao hơn, O(n log n).
- **100%:** "phần tử lớn hơn đầu tiên bên phải" là bài toán gốc của ngăn xếp đơn điệu (bài 2.4). Giữ ngăn xếp các tòa **chưa tìm được** tòa cao hơn; khi tòa j tới, mọi tòa thấp hơn hẳn nó trên đỉnh ngăn xếp đã tìm được đáp án là j.

> [!WARNING]
> "Cao **hơn hẳn**": dùng `<`, không phải `<=`. Với dãy 2 2 3, tòa 1 có khoảng cách 2, không phải 1. Tổng có thể tới khoảng n²/2 = 5·10¹¹: dùng `long long`.

```cpp
// file: toanha.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("TOANHA.INP", "r", stdin);
    freopen("TOANHA.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> h(n);
    for (auto &x : h) cin >> x;
    vector<int> st;                 // chỉ số các tòa chưa tìm được tòa cao hơn bên phải
    long long kq = 0;
    for (int j = 0; j < n; j++) {
        while (!st.empty() && h[st.back()] < h[j]) { kq += j - st.back(); st.pop_back(); }
        st.push_back(j);
    }
    cout << kq << '\n';
}
```

```python
# file: toanha.py
import sys
def main():
    with open("TOANHA.INP", "rb") as f:
        data = f.read().split()
    n = int(data[0])
    h = list(map(int, data[1:1 + n]))
    st, kq = [], 0
    for j in range(n):
        x = h[j]
        while st and h[st[-1]] < x:
            kq += j - st.pop()
        st.append(j)
    with open("TOANHA.OUT", "w") as f:
        f.write(f"{kq}\n")
main()
```

</details>

<details>
<summary><b>Bài 2</b> – BFS nhiều nguồn</summary>

- **40%:** một trạm: BFS thường (bài 2.7).
- **60%:** nhiều trạm, lưới nhỏ: BFS từ từng trạm, lấy min. O(số trạm · R · C).
- **100%:** đưa **mọi trạm** vào hàng đợi với khoảng cách 0 ngay từ đầu, rồi BFS một lần. Giống như có một "siêu trạm" nối tới mọi trạm bằng cạnh độ dài 0. O(R · C).

Bản Python dồn lưới thành mảng một chiều có viền `#`, mỗi ô có 4 hàng xóm là u ± 1 và u ± (C + 2): lưới 1000 × 1000 chạy khoảng 0,6 giây thay vì hơn 1 giây.

```cpp
// file: cuuhoa.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("CUUHOA.INP", "r", stdin);
    freopen("CUUHOA.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int r, c;
    cin >> r >> c;
    vector<string> g(r);
    for (auto &s : g) cin >> s;
    vector<vector<int>> d(r, vector<int>(c, -1));
    queue<pair<int, int>> q;
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) if (g[i][j] == 'F') { d[i][j] = 0; q.push({i, j}); }
    int dx[] = {1, -1, 0, 0}, dy[] = {0, 0, 1, -1};
    while (!q.empty()) {                // BFS nhiều nguồn: mọi trạm vào hàng đợi từ đầu
        auto [x, y] = q.front(); q.pop();
        for (int k = 0; k < 4; k++) {
            int u = x + dx[k], v = y + dy[k];
            if (u < 0 || v < 0 || u >= r || v >= c || g[u][v] == '#' || d[u][v] != -1) continue;
            d[u][v] = d[x][y] + 1; q.push({u, v});
        }
    }
    int kq = 0;
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) if (g[i][j] == '.') {
        if (d[i][j] == -1) { cout << -1 << '\n'; return 0; }
        kq = max(kq, d[i][j]);
    }
    cout << kq << '\n';
}
```

```python
# file: cuuhoa.py
def main():
    with open("CUUHOA.INP") as f:
        data = f.read().split()
    r, c = int(data[0]), int(data[1])
    W = c + 2                                     # thêm viền '#' quanh lưới để khỏi kiểm tra biên
    g = "#" * W + "".join("#" + row + "#" for row in data[2:2 + r]) + "#" * W
    d = [-1] * len(g)
    q = [i for i, ch in enumerate(g) if ch == "F"]   # mảng một chiều làm hàng đợi: nhanh hơn deque
    for i in q:
        d[i] = 0
    for u in q:                                   # q dài thêm trong lúc duyệt: đúng thứ tự BFS
        du = d[u] + 1
        for v in (u - 1, u + 1, u - W, u + W):
            if d[v] == -1 and g[v] != "#":
                d[v] = du
                q.append(v)
    kq = 0
    for i, ch in enumerate(g):
        if ch == ".":
            if d[i] == -1:
                kq = -1
                break
            kq = max(kq, d[i])
    with open("CUUHOA.OUT", "w") as f:
        f.write(f"{kq}\n")
main()
```

</details>

<details>
<summary><b>Bài 3</b> – hai hàng đợi đơn điệu</summary>

- **40%:** mỗi cửa sổ duyệt k phần tử, O(n·k).
- **60%:** sparse table cho max và min trên đoạn (bài 2.6), O(n log n) bộ nhớ và thời gian.
- **100%:** trượt cửa sổ với **hai** deque đơn điệu, một cho max, một cho min (bài 2.6). Mỗi chỉ số vào và ra mỗi deque một lần: O(n).

```cpp
// file: cuaso.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("CUASO.INP", "r", stdin);
    freopen("CUASO.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k; long long d;
    cin >> n >> k >> d;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    deque<int> mx, mn;              // chỉ số; a giảm dần trong mx, tăng dần trong mn
    int dem = 0;
    for (int i = 0; i < n; i++) {
        while (!mx.empty() && a[mx.back()] <= a[i]) mx.pop_back();
        while (!mn.empty() && a[mn.back()] >= a[i]) mn.pop_back();
        mx.push_back(i); mn.push_back(i);
        if (mx.front() <= i - k) mx.pop_front();
        if (mn.front() <= i - k) mn.pop_front();
        if (i >= k - 1 && a[mx.front()] - a[mn.front()] <= d) dem++;
    }
    cout << dem << '\n';
}
```

```python
# file: cuaso.py
from collections import deque
def main():
    with open("CUASO.INP", "rb") as f:
        data = f.read().split()
    n, k, d = int(data[0]), int(data[1]), int(data[2])
    a = list(map(int, data[3:3 + n]))
    mx, mn = deque(), deque()
    dem = 0
    for i in range(n):
        x = a[i]
        while mx and a[mx[-1]] <= x:
            mx.pop()
        while mn and a[mn[-1]] >= x:
            mn.pop()
        mx.append(i)
        mn.append(i)
        if mx[0] <= i - k:
            mx.popleft()
        if mn[0] <= i - k:
            mn.popleft()
        if i >= k - 1 and a[mx[0]] - a[mn[0]] <= d:
            dem += 1
    with open("CUASO.OUT", "w") as f:
        f.write(f"{dem}\n")
main()
```

</details>

**Tự chấm:** 15/20 trở lên là đạt mức Tập 2. Đạt 20/20 thì làm đề HSG 12 thật của tỉnh/thành phố em các năm trước, rồi sang Tập 3.
