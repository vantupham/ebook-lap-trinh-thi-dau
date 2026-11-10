# Bài 3.4 – Cây Fenwick

> **Tập 3** · Cần biết trước: bài 1.3 (tổng tiền tố), 2.5 (bit) · Thời lượng: khoảng 75 phút đọc, 6 giờ thực hành

**Học xong bài này, em sẽ:**

- vừa **sửa một phần tử** vừa hỏi **tổng đoạn**, mỗi việc O(log n);
- hiểu vì sao cây Fenwick chỉ cần hai vòng lặp ngắn với `i & -i`;
- đếm **cặp nghịch thế** của một dãy trong O(n log n).

---

## 1. Bài toán mở màn: Bảng doanh thu sống

Bảng doanh thu n ngày liên tục được **sửa lại** (kế toán nhập nhầm). Có q thao tác: `1 k u` đặt doanh thu ngày k thành u; `2 a b` hỏi tổng các ngày từ a tới b. (n, q ≤ 2·10⁵; bài [Dynamic Range Sum Queries](https://cses.fi/problemset/task/1648))

| Vào | Ra |
| --- | --- |
| `8 4`<br>`3 2 4 5 1 1 5 3`<br>`2 1 4`<br>`1 4 9`<br>`2 1 4`<br>`2 3 5` | `14`<br>`18`<br>`14` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Tổng tiền tố (bài 1.3) trả lời O(1), nhưng sửa một phần tử thì phải sửa lại bao nhiêu ô tiền tố? Nếu không dùng tiền tố, hỏi tổng đoạn tốn bao nhiêu?

<details>
<summary>Đáp án</summary>

Sửa aₖ làm đổi p[k], p[k+1], …, p[n]: O(n). Không dùng tiền tố thì hỏi tổng là O(n). Cả hai cách đều O(n·q) ở trường hợp xấu. Cây Fenwick đưa **cả hai** việc về O(log n).

</details>

---

## 2. Ý tưởng: mỗi ô giữ tổng một khối

Ô `t[i]` giữ tổng của một khối **kết thúc tại i**, dài đúng bằng **bit 1 thấp nhất** của i (viết `i & -i`):

| i | Nhị phân | i & −i | t[i] giữ tổng |
| :---: | :---: | :---: | --- |
| 1 | 0001 | 1 | a₁ |
| 2 | 0010 | 2 | a₁..a₂ |
| 3 | 0011 | 1 | a₃ |
| 4 | 0100 | 4 | a₁..a₄ |
| 5 | 0101 | 1 | a₅ |
| 6 | 0110 | 2 | a₅..a₆ |
| 7 | 0111 | 1 | a₇ |
| 8 | 1000 | 8 | a₁..a₈ |

- **Tổng tiền tố 1..i:** cộng t[i], rồi nhảy i −= i & −i, lặp lại. Tổng 1..7 = t[7] + t[6] + t[4].
- **Cộng v vào aᵢ:** cộng v vào t[i], rồi nhảy i += i & −i. Sửa a₃ thì sửa t[3], t[4], t[8].

Mỗi lần nhảy xóa hoặc thêm một bit, nên tối đa log₂ n bước.

```cpp
// file: fenwick.cpp
#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> t;
void cong(int i, long long v) { for (; i <= n; i += i & -i) t[i] += v; }
long long tong(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; }

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    t.assign(n + 1, 0);
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) { cin >> a[i]; cong(i, a[i]); }
    while (q--) {
        int loai;
        cin >> loai;
        if (loai == 1) {
            int k; long long u;
            cin >> k >> u;
            cong(k, u - a[k]);                     // đặt giá trị = cộng thêm phần chênh lệch
            a[k] = u;
        } else {
            int l, r;
            cin >> l >> r;
            cout << tong(r) - tong(l - 1) << '\n';
        }
    }
}
```

---

## 3. Đếm nghịch thế

Cặp (i, j) là **nghịch thế** nếu i < j và aᵢ > aⱼ. Đếm số cặp nghịch thế (n ≤ 2·10⁵, aᵢ ≤ 10⁹). Đây là số lần đổi chỗ tối thiểu của sắp xếp nổi bọt.

| Vào | Ra |
| --- | --- |
| `5`<br>`3 1 4 1 2` | `5` |

Duyệt từ trái sang phải. Với aⱼ, số nghịch thế mà j là phần tử thứ hai = số phần tử **đã gặp** lớn hơn aⱼ. Lưu số lần gặp mỗi giá trị trong cây Fenwick, nhưng giá trị tới 10⁹ nên trước tiên **nén giá trị**: thay mỗi số bằng thứ hạng của nó trong dãy đã sắp xếp (bài 1.2, 1.4).

```cpp
// file: nghich_the.cpp
#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> t;
void cong(int i, long long v) { for (; i <= n; i += i & -i) t[i] += v; }
long long tong(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; }

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    vector<long long> b = a;                       // nén giá trị về 1..n
    sort(b.begin(), b.end());
    b.erase(unique(b.begin(), b.end()), b.end());
    t.assign(n + 1, 0);
    long long dem = 0;
    for (int j = 0; j < n; j++) {
        int r = lower_bound(b.begin(), b.end(), a[j]) - b.begin() + 1;
        dem += j - tong(r);                        // đã gặp j số, trừ đi số <= a[j]
        cong(r, 1);
    }
    cout << dem << '\n';
}
```

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: chỉ số từ 0.** Với i = 0, `i & -i` = 0 và vòng `cong` chạy mãi. Cây Fenwick luôn đánh số **từ 1**.

> [!WARNING]
> **Bẫy 2: "đặt giá trị" khác "cộng thêm".** Thao tác `1 k u` là **gán**; phải cộng phần chênh lệch `u - a[k]` và nhớ cập nhật `a[k]`.

> [!WARNING]
> **Bẫy 3: số nghịch thế tràn `int`.** Tới n²/2 = 2·10¹⁰.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Dynamic Range Sum Queries](https://cses.fi/problemset/task/1648) | CSES 1648 | Đúng mục 2 |
| Khởi động | [Range Update Queries](https://cses.fi/problemset/task/1651) | CSES 1651 | Fenwick trên mảng hiệu (bài 1.3) |
| Luyện | Đếm nghịch thế, so với lời giải O(n²) bằng stress test | Tự luyện | Mục 3 |
| Luyện | [List Removals](https://cses.fi/problemset/task/1749) | CSES 1749 | Tìm phần tử thứ k bằng Fenwick + nhị phân |
| Thử thách | [Salary Queries](https://cses.fi/problemset/task/1144) | CSES 1144 | Nén giá trị cả các câu hỏi |

---

## 6. Tóm tắt và checkpoint

1. t[i] giữ tổng khối dài `i & -i` kết thúc tại i.
2. Hỏi tiền tố: `i -= i & -i`; cộng: `i += i & -i`; cả hai O(log n), đánh số từ 1.
3. Giá trị lớn: nén về 1..n trước khi đưa vào Fenwick.

<details><summary>Tổng 1..6 cộng những ô nào?</summary>t[6] + t[4].</details>

**Checkpoint:**

- [ ] Viết Fenwick không nhìn sách trong 3 phút.
- [ ] AC Dynamic Range Sum Queries và Range Update Queries.
