# Bài 1.3 – Tổng tiền tố

> **Tập 1** · Cần biết trước: bài 1.1 · Thời lượng: khoảng 90 phút đọc, 6 giờ thực hành

**Học xong bài này, em sẽ:**

- trả lời "tổng đoạn [l, r]" trong O(1) sau O(n) chuẩn bị;
- mở rộng sang lưới 2 chiều;
- dùng **mảng hiệu** để cộng một giá trị vào cả đoạn trong O(1).

---

## 1. Bài toán mở màn: Doanh thu theo đoạn ngày

Quán của An có doanh thu n ngày a₁ … aₙ. Chủ quán hỏi q câu: "tổng doanh thu từ ngày l tới ngày r là bao nhiêu?". (1 ≤ n, q ≤ 2·10⁵, 1 ≤ aᵢ ≤ 10⁹)

| Vào | Ra |
| --- | --- |
| `5 3`<br>`3 1 4 1 5`<br>`1 3`<br>`2 5`<br>`4 4` | `8`<br>`11`<br>`1` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Cộng lại từ l tới r cho mỗi câu hỏi tốn bao nhiêu phép trong trường hợp xấu nhất? Nếu em đã biết "tổng từ ngày 1 tới ngày r" và "tổng từ ngày 1 tới ngày l − 1", em tính tổng [l, r] thế nào?

<details>
<summary>Đáp án</summary>

Cộng trực tiếp: q × n = 4·10¹⁰ phép, quá chậm. Nhưng tổng [l, r] = (tổng 1..r) − (tổng 1..l−1): chỉ một phép trừ.

</details>

---

## 2. Mảng tổng tiền tố

Định nghĩa p[0] = 0 và **p[i] = a₁ + a₂ + … + aᵢ**, tính bằng p[i] = p[i−1] + aᵢ.

| i | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| aᵢ | | 3 | 1 | 4 | 1 | 5 |
| p[i] | 0 | 3 | 4 | 8 | 9 | 14 |

Câu hỏi (2, 5): p[5] − p[1] = 14 − 3 = 11.

```cpp
// file: tong_doan.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<long long> p(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        p[i] = p[i - 1] + x;
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << p[r] - p[l - 1] << '\n';
    }
}
```

```python
# file: tong_doan.py
import sys
data = sys.stdin.buffer.read().split()
n, q = int(data[0]), int(data[1])
p = [0] * (n + 1)
for i in range(1, n + 1):
    p[i] = p[i - 1] + int(data[1 + i])
out = []
pos = 2 + n
for _ in range(q):
    l, r = int(data[pos]), int(data[pos + 1])
    pos += 2
    out.append(p[r] - p[l - 1])
print('\n'.join(map(str, out)))
```

Độ phức tạp O(n + q). Chú ý cách in: gom kết quả rồi in một lần nhanh hơn nhiều so với in từng dòng, nhất là trong Python.

---

## 3. Hai chiều: bản đồ cây xanh

Bản đồ công viên là lưới n × n, `*` là ô có cây. Có q câu hỏi: hình chữ nhật từ hàng y₁ cột x₁ tới hàng y₂ cột x₂ có bao nhiêu cây? (n ≤ 1000, q ≤ 2·10⁵). Đây là bài [Forest Queries](https://cses.fi/problemset/task/1652).

Gọi **p[i][j]** = số cây trong hình chữ nhật từ (1, 1) tới (i, j). Khi đó:

- **Xây:** p[i][j] = ô(i, j) + p[i−1][j] + p[i][j−1] − p[i−1][j−1]
- **Hỏi:** cây trong (y₁, x₁)–(y₂, x₂) = p[y₂][x₂] − p[y₁−1][x₂] − p[y₂][x₁−1] + p[y₁−1][x₁−1]

Vì sao cộng lại p[y₁−1][x₁−1]? Hình chữ nhật góc trên trái bị **trừ hai lần**, nên phải cộng lại một lần (bao hàm – loại trừ, như bài 0.4).

```
         x1        x2
   +-----+---------+
   |  D  |    B    |      Cần tính vùng A.
y1 +-----+---------+      p[y2][x2] = A + B + C + D
   |  C  |    A    |      p[y1-1][x2] = B + D
y2 +-----+---------+      p[y2][x1-1] = C + D
                          A = p[y2][x2] - (B+D) - (C+D) + D
```

```cpp
// file: rung_cay.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<vector<int>> p(n + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= n; i++) {
        string row;
        cin >> row;
        for (int j = 1; j <= n; j++)
            p[i][j] = (row[j - 1] == '*') + p[i - 1][j] + p[i][j - 1] - p[i - 1][j - 1];
    }
    while (q--) {
        int y1, x1, y2, x2;
        cin >> y1 >> x1 >> y2 >> x2;
        cout << p[y2][x2] - p[y1 - 1][x2] - p[y2][x1 - 1] + p[y1 - 1][x1 - 1] << '\n';
    }
}
```

---

## 4. Ngược lại: mảng hiệu

Bài toán ngược: có n hộp ban đầu toàn 0, và q thao tác "cộng v vào mọi hộp từ l tới r". Cuối cùng in giá trị từng hộp. (n, q ≤ 2·10⁵)

Mẹo: thay vì cộng cả đoạn, chỉ ghi hai dấu: **d[l] += v** và **d[r+1] −= v**. Cuối cùng lấy tổng tiền tố của d: dấu cộng có tác dụng từ l trở đi, dấu trừ "tắt" nó sau r.

Ví dụ n = 5, thao tác (1, 3, +2) và (2, 5, +1):

| Vị trí | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| d sau (1, 3, +2) | +2 | | | −2 | | |
| d sau (2, 5, +1) | +2 | +1 | | −2 | | −1 |
| Tổng tiền tố (kết quả) | 2 | 3 | 3 | 1 | 1 | |

```cpp
// file: mang_hieu.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<long long> d(n + 2, 0);
    while (q--) {
        int l, r;
        long long v;
        cin >> l >> r >> v;
        d[l] += v;
        d[r + 1] -= v;
    }
    long long cur = 0;
    for (int i = 1; i <= n; i++) {
        cur += d[i];
        cout << cur << (i == n ? '\n' : ' ');
    }
}
```

> [!NOTE]
> Tổng tiền tố và mảng hiệu là **hai phép ngược nhau**: tiền tố của mảng hiệu cho lại mảng gốc. Đề có "nhiều câu hỏi tổng đoạn" thì nghĩ tới tiền tố; có "nhiều lần cộng vào đoạn, hỏi một lần ở cuối" thì nghĩ tới mảng hiệu.

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: lệch chỉ số.** Dùng p[0] = 0 và đánh số từ 1 giúp công thức `p[r] - p[l-1]` không cần trường hợp đặc biệt khi l = 1. Trộn chỉ số từ 0 và từ 1 là nguồn lỗi số một.

> [!WARNING]
> **Bẫy 2: mảng hiệu thiếu ô.** `d[r + 1]` với r = n cần mảng có n + 2 ô.

> [!WARNING]
> **Bẫy 3: tràn số.** Tổng tiền tố của 2·10⁵ số tới 10⁹ vượt `int`.

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Static Range Sum Queries](https://cses.fi/problemset/task/1646) | CSES 1646 | Đúng mục 2 |
| Khởi động | [Forest Queries](https://cses.fi/problemset/task/1652) | CSES 1652 | Đúng mục 3 |
| Luyện | [Subarray Divisibility](https://cses.fi/problemset/task/1662) | CSES 1662 | Tiền tố + đếm số dư bằng nhau |
| Luyện | Đếm số đoạn [l, r] có tổng chia hết cho k, với k ≤ 10⁶ | Tự luyện | Giống bài trên, dùng mảng đếm |
| Luyện | [Greg and Array](https://codeforces.com/problemset/problem/295/A) | CF 295A · 1400 | Mảng hiệu hai tầng |
| Thử thách | [Subarray Sums II](https://cses.fi/problemset/task/1661) | CSES 1661 | Tiền tố + đếm bằng `map` (xem trước Tập 2) |

---

## 7. Tóm tắt và checkpoint

1. p[i] = p[i−1] + aᵢ; tổng [l, r] = p[r] − p[l−1].
2. 2 chiều: xây bằng cộng hai, trừ một; hỏi bằng trừ hai, cộng một.
3. Cộng v vào đoạn [l, r] nhiều lần: d[l] += v, d[r+1] −= v, cuối cùng lấy tiền tố.

<details><summary>a = 2 7 1 8 2. Tổng đoạn [2, 4] qua mảng tiền tố?</summary>p = 0 2 9 10 18 20; p[4] − p[1] = 18 − 2 = 16.</details>
<details><summary>Vì sao công thức hỏi 2 chiều phải cộng lại p[y₁−1][x₁−1]?</summary>Vùng góc trên trái bị trừ hai lần.</details>

**Checkpoint:**

- [ ] Viết tiền tố 2 chiều không nhìn sách, AC Forest Queries.
- [ ] Giải thích bằng hình vẽ vì sao mảng hiệu đúng.
