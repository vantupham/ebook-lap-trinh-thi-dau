# Bài 4.7 – Hình học tính toán cơ bản

> **Tập 4** · Cần biết trước: bài 1.1 (tràn số) · Thời lượng: khoảng 2 giờ đọc, 8 giờ thực hành

**Học xong bài này, em sẽ:** dùng **tích có hướng** để biết rẽ trái hay rẽ phải; kiểm tra hai đoạn thẳng có cắt nhau không; tính **diện tích đa giác** bằng công thức dây giày. Tất cả chỉ dùng số nguyên, không có sai số.

**Dấu hiệu nhận biết:** đề cho tọa độ nguyên; hỏi cắt nhau, nằm trong, diện tích, bao lồi.

---

## 1. Bài toán mở màn: Hai con đường

An vẽ hai đoạn đường trên bản đồ Quận 1: đoạn AB và đoạn CD. Hai đoạn có chung điểm nào không? (tọa độ |x|, |y| ≤ 10⁹; bài [Line Segment Intersection](https://cses.fi/problemset/task/2190))

| Vào | Ra |
| --- | --- |
| `5`<br>`1 1 5 3 1 2 4 3`<br>`1 1 5 3 1 1 4 3`<br>`1 1 5 3 2 3 4 1`<br>`1 1 5 3 2 4 4 1`<br>`1 1 5 3 3 2 7 4` | `NO`<br>`YES`<br>`YES`<br>`YES`<br>`YES` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Giải hệ phương trình hai đường thẳng sẽ phải chia, sinh số thực và sai số. Có cách nào chỉ dùng phép nhân và trừ số nguyên không?

<details>
<summary>Đáp án</summary>

Có. Đoạn AB cắt đoạn CD khi C và D nằm **khác phía** đường AB, **và** A, B nằm khác phía đường CD. "Phía nào" được biết bằng **dấu** của tích có hướng, chỉ cần nhân và trừ.

</details>

---

## 2. Tích có hướng

Với ba điểm O, A, B: `cross(O, A, B) = (A.x − O.x)·(B.y − O.y) − (A.y − O.y)·(B.x − O.x)`.

| Dấu | Ý nghĩa: đi O → A rồi tới B |
| --- | --- |
| > 0 | rẽ **trái** (ngược chiều kim đồng hồ) |
| < 0 | rẽ **phải** |
| = 0 | O, A, B **thẳng hàng** |

Tọa độ tới 10⁹ thì hiệu tới 2·10⁹, tích tới 4·10¹⁸: vẫn vừa `long long` (tối đa khoảng 9,2·10¹⁸).

**Hai đoạn cắt nhau** khi:

- trường hợp thường: `cross(A,B,C)` và `cross(A,B,D)` trái dấu (hoặc một cái bằng 0), **và** `cross(C,D,A)`, `cross(C,D,B)` cũng vậy;
- trường hợp cả bốn điểm thẳng hàng: hai đoạn phải **chồng lên nhau** trên trục, kiểm tra bằng hình chữ nhật bao.

Gộp lại: mỗi điểm là đầu mút nằm trên đoạn kia thì cắt; ngoài ra hai cặp dấu phải **ngặt** trái dấu.

```cpp
// file: giao_doan.cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
struct P { ll x, y; };
ll cross(P o, P a, P b) { return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x); }
int dau(ll v) { return (v > 0) - (v < 0); }
bool tren_doan(P a, P b, P c) {          // c nằm trên đoạn ab?
    return cross(a, b, c) == 0 && min(a.x, b.x) <= c.x && c.x <= max(a.x, b.x)
                               && min(a.y, b.y) <= c.y && c.y <= max(a.y, b.y);
}
bool cat(P a, P b, P c, P d) {
    if (tren_doan(a, b, c) || tren_doan(a, b, d) || tren_doan(c, d, a) || tren_doan(c, d, b)) return true;
    return dau(cross(a, b, c)) * dau(cross(a, b, d)) < 0 && dau(cross(c, d, a)) * dau(cross(c, d, b)) < 0;
}
int main() {
    int t; cin >> t;
    while (t--) {
        P a, b, c, d;
        cin >> a.x >> a.y >> b.x >> b.y >> c.x >> c.y >> d.x >> d.y;
        cout << (cat(a, b, c, d) ? "YES" : "NO") << '\n';
    }
}
```

> [!WARNING]
> **Bẫy: nhân hai tích có hướng với nhau** (`cross1 * cross2 < 0`) sẽ tràn tới 10³⁷. Chỉ nhân **dấu** của chúng.

---

## 3. Diện tích đa giác: công thức dây giày

Đa giác có đỉnh P₁, P₂, …, Pₙ theo thứ tự: `2·S = |Σ (xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)|` với Pₙ₊₁ = P₁. Mỗi số hạng là tích có hướng của hai đỉnh liên tiếp với gốc O: cộng "diện tích có dấu" của các tam giác O Pᵢ Pᵢ₊₁, phần thừa ngoài đa giác tự triệt tiêu.

Ví dụ hình vuông (1,1), (4,2), (3,5), (0,4) theo chiều kim đồng hồ ngược:

| i | xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ |
| --- | --- |
| 1 | 1·2 − 4·1 = −2 |
| 2 | 4·5 − 3·2 = 14 |
| 3 | 3·4 − 0·5 = 12 |
| 4 | 0·1 − 1·4 = −4 |
| Tổng | 20 → S = 10 |

Bài [Polygon Area](https://cses.fi/problemset/task/2191) yêu cầu in **2·S** để kết quả luôn nguyên.

```cpp
// file: dien_tich.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<long long> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    long long s = 0;
    for (int i = 0; i < n; i++) { int j = (i + 1) % n; s += x[i] * y[j] - x[j] * y[i]; }
    cout << llabs(s) << '\n';
}
```

---

## 4. Đi xa hơn

- **Bao lồi** (Andrew monotone chain): sắp xếp điểm, dựng nửa dưới và nửa trên, bỏ điểm khi `cross ≤ 0`. Độ phức tạp O(n log n) ([Convex Hull](https://cses.fi/problemset/task/2195)).
- **Điểm trong đa giác:** bắn tia sang phải, đếm số cạnh cắt; lẻ là trong ([Point in Polygon](https://cses.fi/problemset/task/2192)).
- **Định lý Pick:** đa giác đỉnh nguyên có S = I + B/2 − 1, với B = số điểm nguyên trên biên = Σ gcd(|Δx|, |Δy|) ([Polygon Lattice Points](https://cses.fi/problemset/task/2193)).

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Point Location Test](https://cses.fi/problemset/task/2189) | CSES 2189 | Dấu tích có hướng |
| Khởi động | [Polygon Area](https://cses.fi/problemset/task/2191) | CSES 2191 | Dây giày |
| Luyện | [Line Segment Intersection](https://cses.fi/problemset/task/2190) | CSES 2190 | Mục 2 |
| Luyện | [Point in Polygon](https://cses.fi/problemset/task/2192) | CSES 2192 | Tia + điểm trên biên |
| Thử thách | [Convex Hull](https://cses.fi/problemset/task/2195) | CSES 2195 | Monotone chain |

**Checkpoint:** giải thích được vì sao chỉ nhân dấu; AC Convex Hull.
