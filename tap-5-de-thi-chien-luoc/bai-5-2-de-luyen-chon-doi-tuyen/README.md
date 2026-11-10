# Bài 5.2 – Đề luyện số 1: chọn đội tuyển cấp tỉnh/thành phố

> **Thời gian: 120 phút.** Làm sau Tập 1. Đọc/ghi tệp, chấm theo subtask, tổng 20 điểm. Đề tự soạn theo kiểu đề chọn đội tuyển HSG lớp 9 và lớp 10 cấp tỉnh/thành phố.

Trước khi code, lập bảng **điểm / phút** như [bài 5.1](../bai-5-1-chien-luoc-phong-thi/).

| Bài | Tên tệp chương trình | Dữ liệu | Kết quả | Điểm |
| --- | --- | --- | --- | :---: |
| 1. Nhà máy bánh mì | `NHAMAY.*` | `NHAMAY.INP` | `NHAMAY.OUT` | 6 |
| 2. Đoạn dài nhất | `DOANDAI.*` | `DOANDAI.INP` | `DOANDAI.OUT` | 7 |
| 3. Phòng máy | `PHONGMAY.*` | `PHONGMAY.INP` | `PHONGMAY.OUT` | 7 |

---

### Bài 1. Nhà máy bánh mì (6 điểm)

Một tiệm bánh mì ở Chợ Lớn có n lò. Lò i nướng xong một mẻ sau mỗi tᵢ phút, các lò chạy song song. Cần ít nhất bao nhiêu phút để nướng xong m mẻ?

**Dữ liệu:** dòng đầu n, m (1 ≤ n ≤ 2·10⁵; 1 ≤ m ≤ 10⁹); dòng hai t₁ … tₙ (1 ≤ tᵢ ≤ 10⁹).

| NHAMAY.INP | NHAMAY.OUT |
| --- | --- |
| `3 7`<br>`3 2 5` | `8` |

Sau 8 phút: lò 1 xong 2 mẻ, lò 2 xong 4 mẻ, lò 3 xong 1 mẻ, đủ 7 mẻ. Sau 7 phút mới được 6 mẻ.

Subtask: 50% số điểm có m ≤ 10⁵ và tᵢ ≤ 100.

### Bài 2. Đoạn dài nhất (7 điểm)

Dãy n số nguyên không âm a₁ … aₙ. Tìm đoạn liên tiếp **dài nhất** có tổng không vượt quá S. In độ dài (in 0 nếu mọi số đều lớn hơn S).

**Dữ liệu:** dòng đầu n, S (1 ≤ n ≤ 10⁶; 0 ≤ S ≤ 10¹⁵); dòng hai a₁ … aₙ (0 ≤ aᵢ ≤ 10⁹).

| DOANDAI.INP | DOANDAI.OUT |
| --- | --- |
| `8 10`<br>`2 5 1 3 7 2 2 4` | `3` |

Ví dụ đoạn 5 1 3 có tổng 9.

Subtask: 40% số điểm có n ≤ 1000; 30% số điểm khác có n ≤ 10⁵.

### Bài 3. Phòng máy (7 điểm)

Phòng máy của trường nhận n đăng ký, lớp thứ i muốn dùng từ thời điểm sᵢ tới eᵢ (sᵢ < eᵢ). Mỗi lúc chỉ một lớp dùng phòng; một lớp kết thúc lúc t thì lớp khác được bắt đầu đúng lúc t. Nhận nhiều nhất bao nhiêu lớp?

**Dữ liệu:** dòng đầu n (1 ≤ n ≤ 2·10⁵); n dòng sau mỗi dòng sᵢ, eᵢ (0 ≤ sᵢ < eᵢ ≤ 10⁹).

| PHONGMAY.INP | PHONGMAY.OUT |
| --- | --- |
| `5`<br>`7 9`<br>`8 10`<br>`9 11`<br>`10 12`<br>`7 13` | `2` |

Ví dụ nhận các lớp [7, 9] và [9, 11].

Subtask: 40% số điểm có n ≤ 15.

---

## Chữa đề

<details>
<summary><b>Bài 1</b> – chặt nhị phân đáp án</summary>

- **50%:** thử lần lượt T = 1, 2, … tới khi Σ ⌊T / tᵢ⌋ ≥ m. Đáp án ≤ m · 100 = 10⁷ phút, mỗi lần thử O(n): chỉ chạy kịp khi n nhỏ; tốt hơn là mô phỏng bằng hàng đợi ưu tiên.
- **100%:** "làm được m mẻ trong T phút" **đúng thì cũng đúng với mọi T lớn hơn**: tính đơn điệu, nên chặt nhị phân T (bài 1.4). Cận trên: lò nhanh nhất làm một mình hết m mẻ, tức min(t)·m ≤ 10¹⁸.

> [!WARNING]
> Σ ⌊T / tᵢ⌋ có thể tới 2·10⁵ · 10¹⁸: tràn `long long`. Dừng cộng ngay khi tổng đã đạt m.

```cpp
// file: nhamay.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("NHAMAY.INP", "r", stdin);
    freopen("NHAMAY.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; long long m;
    cin >> n >> m;
    vector<long long> t(n);
    for (auto &x : t) cin >> x;
    // làm được(T) = Σ T / tᵢ >= m ; tìm T nhỏ nhất
    long long lo = 1, hi = *min_element(t.begin(), t.end()) * m;   // một máy nhanh nhất làm hết là đủ
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2, sp = 0;
        for (long long x : t) { sp += mid / x; if (sp >= m) break; }   // dừng sớm để không tràn
        if (sp >= m) hi = mid; else lo = mid + 1;
    }
    cout << lo << '\n';
}
```

```python
# file: nhamay.py
def main():
    with open("NHAMAY.INP") as f:
        data = f.read().split()
    n, m = int(data[0]), int(data[1])
    t = list(map(int, data[2:2 + n]))
    lo, hi = 1, min(t) * m
    while lo < hi:
        mid = (lo + hi) // 2
        if sum(mid // x for x in t) >= m:
            hi = mid
        else:
            lo = mid + 1
    with open("NHAMAY.OUT", "w") as f:
        f.write(f"{lo}\n")
main()
```

</details>

<details>
<summary><b>Bài 2</b> – hai con trỏ</summary>

- **40%:** thử mọi đoạn bằng tổng tiền tố, O(n²).
- **70%:** với mỗi đầu trái, chặt nhị phân đầu phải xa nhất trên mảng tiền tố (tăng vì aᵢ ≥ 0), O(n log n).
- **100%:** hai con trỏ (bài 1.5). Khi r tăng, l chỉ có thể đứng yên hoặc tăng, vì mọi số không âm. Tổng O(n).

```cpp
// file: doandai.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("DOANDAI.INP", "r", stdin);
    freopen("DOANDAI.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; long long s;
    cin >> n >> s;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    long long tong = 0; int l = 0, best = 0;
    for (int r = 0; r < n; r++) {
        tong += a[r];
        while (tong > s) tong -= a[l++];       // đoạn [l, r] luôn có tổng <= s (l có thể vượt r)
        best = max(best, r - l + 1);
    }
    cout << best << '\n';
}
```

```python
# file: doandai.py
def main():
    with open("DOANDAI.INP") as f:
        data = f.read().split()
    n, s = int(data[0]), int(data[1])
    a = list(map(int, data[2:2 + n]))
    tong = l = best = 0
    for r in range(n):
        tong += a[r]
        while tong > s:
            tong -= a[l]
            l += 1
        best = max(best, r - l + 1)
    with open("DOANDAI.OUT", "w") as f:
        f.write(f"{best}\n")
main()
```

</details>

<details>
<summary><b>Bài 3</b> – tham lam theo thời điểm kết thúc</summary>

- **40%:** thử mọi tập con (2¹⁵), kiểm tra không chồng nhau.
- **100%:** xếp các lớp theo **thời điểm kết thúc tăng dần**, nhận lớp nếu nó bắt đầu không sớm hơn lớp vừa nhận kết thúc (bài 1.8). Lý do: lớp kết thúc sớm nhất để lại nhiều thời gian nhất cho các lớp sau; đổi nó vào bất kỳ phương án tối ưu nào cũng không làm giảm số lớp.

> [!WARNING]
> Xếp theo thời điểm **bắt đầu** hoặc theo **độ dài** đều sai. Ví dụ lớp [7, 13] bắt đầu sớm nhất nhưng chặn mất hai lớp khác.

```cpp
// file: phongmay.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("PHONGMAY.INP", "r", stdin);
    freopen("PHONGMAY.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<pair<long long, long long>> lop(n);          // (kết thúc, bắt đầu)
    for (auto &[e, s] : lop) cin >> s >> e;
    sort(lop.begin(), lop.end());
    long long het = LLONG_MIN; int dem = 0;
    for (auto [e, s] : lop) if (s >= het) { dem++; het = e; }   // chọn lớp kết thúc sớm nhất còn xếp được
    cout << dem << '\n';
}
```

```python
# file: phongmay.py
def main():
    with open("PHONGMAY.INP") as f:
        data = list(map(int, f.read().split()))
    n = data[0]
    lop = sorted((data[2 + 2 * i], data[1 + 2 * i]) for i in range(n))   # (kết thúc, bắt đầu)
    het, dem = float("-inf"), 0
    for e, s in lop:
        if s >= het:
            dem += 1
            het = e
    with open("PHONGMAY.OUT", "w") as f:
        f.write(f"{dem}\n")
main()
```

</details>

**Tự chấm:** 14/20 trở lên là đạt mức Tập 1. Bài bị mất điểm nhiều nhất cho biết cần đọc lại bài nào: 1.4, 1.5 hay 1.8.
