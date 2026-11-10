# Bài 3.8 – QHĐ trên cây

> **Tập 3** · Cần biết trước: bài 3.3, 2.9 · Thời lượng: khoảng 75 phút đọc, 6 giờ thực hành

**Học xong bài này, em sẽ:**

- đặt trạng thái QHĐ gắn với **cây con** của mỗi đỉnh;
- thêm một chiều trạng thái để ghi "đỉnh này đang ở tình trạng nào";
- tính QHĐ từ **lá lên gốc** mà không dùng đệ quy sâu.

---

## 1. Bài toán mở màn: Ghép cặp học nhóm

Lớp có n bạn, quan hệ "là bạn thân" tạo thành một **cây** (n − 1 cặp, ai cũng nối được với ai). Cô giáo muốn ghép càng nhiều **cặp học nhóm** càng tốt; mỗi cặp là hai bạn thân, mỗi bạn ở tối đa một cặp. (n ≤ 2·10⁵; bài [Tree Matching](https://cses.fi/problemset/task/1130))

| Vào | Ra |
| --- | --- |
| `5`<br>`1 2`<br>`1 3`<br>`3 4`<br>`3 5` | `2` |

Ví dụ: cặp (1, 2) và (3, 4).

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Treo cây từ đỉnh 1. Khi đã biết lời giải tốt nhất cho cây con của mỗi đứa con của v, để tính cho cây con của v em cần biết thêm điều gì về mỗi đứa con?

<details>
<summary>Đáp án</summary>

Cần biết đứa con đó **còn rảnh** hay **đã có cặp** trong lời giải của nó, vì v chỉ ghép được với một đứa con còn rảnh. Nên mỗi đỉnh có hai trạng thái.

</details>

---

## 2. Hai trạng thái cho mỗi đỉnh

- `f[v]` = số cặp nhiều nhất trong cây con của v, khi **v không ghép với con nào** (v rảnh, cha có thể ghép với v).
- `g[v]` = số cặp nhiều nhất trong cây con của v, **không ràng buộc** (v có thể đã ghép với một con).

Công thức:

- f[v] = tổng g[c] với mọi con c.
- g[v] = max(f[v], max theo con c của: f[v] − g[c] + f[c] + 1): ghép v với c, khi đó c phải rảnh.

Đáp án: g[1].

| Đỉnh (từ lá lên) | Con | f | g | Giải thích |
| :---: | --- | :---: | :---: | --- |
| 2, 4, 5 | — | 0 | 0 | lá |
| 3 | 4, 5 | 0 | 1 | ghép 3 với 4: 0 − 0 + 0 + 1 |
| 1 | 2, 3 | 0 + 1 = 1 | **2** | ghép 1 với 2: 1 − 0 + 0 + 1 = 2 |

```cpp
// file: ghep_cap.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<int> cha(n + 1, 0), thu_tu;               // thứ tự BFS từ gốc 1
    thu_tu.reserve(n);
    thu_tu.push_back(1);
    cha[1] = -1;
    for (int k = 0; k < (int)thu_tu.size(); k++) {
        int u = thu_tu[k];
        for (int v : adj[u]) if (v != cha[u]) { cha[v] = u; thu_tu.push_back(v); }
    }
    vector<long long> f(n + 1, 0), g(n + 1, 0);
    for (int k = n - 1; k >= 0; k--) {               // duyệt ngược: con trước cha
        int v = thu_tu[k];
        for (int c : adj[v]) if (c != cha[v]) f[v] += g[c];
        g[v] = f[v];
        for (int c : adj[v]) if (c != cha[v]) g[v] = max(g[v], f[v] - g[c] + f[c] + 1);
    }
    cout << g[1] << '\n';
}
```

> [!TIP]
> **Mẹo "thứ tự BFS ngược".** Trong thứ tự BFS từ gốc, cha luôn đứng trước con. Duyệt ngược thì mọi con được tính trước cha: thay cho DFS đệ quy, không sợ tràn ngăn xếp khi cây là một đường thẳng dài 2·10⁵.

---

## 3. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: tham lam ghép ngẫu nhiên.** Ghép gốc với một con bất kỳ có thể làm hỏng một cặp tốt hơn ở dưới. Hoặc chứng minh tham lam (ghép lá với cha của nó cũng đúng!), hoặc dùng QHĐ.

> [!WARNING]
> **Bẫy 2: quên loại cha khỏi danh sách kề.** Cây lưu hai chiều; khi duyệt con phải bỏ qua `cha[v]`.

> [!WARNING]
> **Bẫy 3: đệ quy sâu.** Cây đường thẳng làm DFS đệ quy sâu n tầng. Dùng thứ tự BFS ngược như trên.

---

## 4. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Tree Matching](https://cses.fi/problemset/task/1130) | CSES 1130 | Đúng mục 2 |
| Khởi động | [Subordinates](https://cses.fi/problemset/task/1674) | CSES 1674 | Kích thước cây con bằng thứ tự ngược |
| Luyện | [Tree Distances I](https://cses.fi/problemset/task/1132) | CSES 1132 | Hai lần duyệt: xuống và lên |
| Luyện | Chọn tập đỉnh độc lập (không hai đỉnh kề nhau) có tổng trọng số lớn nhất trên cây | Tự luyện | Hai trạng thái: chọn / không chọn v |
| Thử thách | [Tree Distances II](https://cses.fi/problemset/task/1133) | CSES 1133 | Đổi gốc (rerooting) |

---

## 5. Tóm tắt và checkpoint

1. Trạng thái QHĐ trên cây gắn với cây con của v, thêm chiều "tình trạng của v".
2. Tính từ lá lên gốc: thứ tự BFS ngược.
3. Ghép v với con c: bỏ đóng góp g[c], thay bằng f[c] + 1.

<details><summary>Cây hình sao với gốc nối tới 5 lá: ghép được tối đa mấy cặp?</summary>1.</details>

**Checkpoint:**

- [ ] AC Tree Matching và Tree Distances I.
