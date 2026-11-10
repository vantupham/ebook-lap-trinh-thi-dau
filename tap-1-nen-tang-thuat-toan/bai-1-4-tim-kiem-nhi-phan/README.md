# Bài 1.4 – Tìm kiếm nhị phân

> **Tập 1** · Cần biết trước: bài 1.2 · Thời lượng: khoảng 90 phút đọc, 6 giờ thực hành

**Học xong bài này, em sẽ:**

- tìm trong mảng đã sắp xếp trong O(log n), dùng `lower_bound`/`upper_bound` (C++) và `bisect` (Python);
- viết tìm kiếm nhị phân **không lệch một**, theo một khuôn duy nhất;
- **tìm nhị phân trên đáp án**: biến bài "tìm giá trị nhỏ nhất" thành bài "kiểm tra một giá trị có được không".

---

## 1. Bài toán mở màn: Đếm theo khoảng điểm

Kỳ thi thử có n bạn với điểm a₁ … aₙ (1 ≤ n ≤ 2·10⁵, 0 ≤ aᵢ ≤ 10⁹). Thầy hỏi q câu: "có bao nhiêu bạn có điểm trong khoảng [l, r]?" (q ≤ 2·10⁵).

| Vào | Ra |
| --- | --- |
| `6 3`<br>`5 1 9 3 7 3`<br>`3 7`<br>`10 20`<br>`1 1` | `4`<br>`0`<br>`1` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Nếu dãy điểm đã sắp xếp tăng dần: `1 3 3 5 7 9`. Các bạn có điểm trong [3, 7] nằm ở đâu trong dãy? Làm sao tìm nhanh vị trí bắt đầu và kết thúc của khối đó?

<details>
<summary>Đáp án</summary>

Sau khi sắp xếp, các điểm trong [l, r] nằm **liền một khối**. Số bạn = (vị trí đầu tiên có điểm > r) − (vị trí đầu tiên có điểm ≥ l). Mỗi vị trí tìm được bằng chia đôi trong khoảng log₂(2·10⁵) ≈ 18 bước.

</details>

---

## 2. Ý tưởng chia đôi

Như đoán số trong trò "lớn hơn – nhỏ hơn": mỗi lần hỏi ở giữa, loại một nửa.

Tìm **vị trí đầu tiên có giá trị ≥ 4** trong `1 3 3 5 7 9` (chỉ số 0..5). Giữ khoảng [lo, hi) mà đáp án chắc chắn nằm trong; ban đầu lo = 0, hi = 6.

| lo | hi | mid | a[mid] | a[mid] ≥ 4? | Thu hẹp |
| :---: | :---: | :---: | :---: | :---: | --- |
| 0 | 6 | 3 | 5 | có | hi = 3 (đáp án ở ≤ 3) |
| 0 | 3 | 1 | 3 | không | lo = 2 (đáp án ở > 1) |
| 2 | 3 | 2 | 3 | không | lo = 3 |
| 3 | 3 | | | | dừng: đáp án **3** |

Khuôn chung (nhớ nằm lòng):

```text
lo ← 0, hi ← n                      // đáp án nằm trong [lo, hi]; hi = n nghĩa là "không có"
trong khi lo < hi:
    mid ← (lo + hi) / 2
    nếu đúng(mid): hi ← mid          // mid có thể là đáp án, giữ lại
    ngược lại:     lo ← mid + 1      // mid chắc chắn không phải
trả về lo
```

Khuôn này chạy được khi `đúng(x)` có dạng **sai sai … sai đúng đúng … đúng** (đơn điệu), và tìm vị trí "đúng" đầu tiên.

---

## 3. Dùng hàm có sẵn

| Cần tìm | C++ | Python (`import bisect`) |
| --- | --- | --- |
| vị trí đầu tiên ≥ x | `lower_bound(a.begin(), a.end(), x) - a.begin()` | `bisect.bisect_left(a, x)` |
| vị trí đầu tiên > x | `upper_bound(a.begin(), a.end(), x) - a.begin()` | `bisect.bisect_right(a, x)` |

```cpp
// file: dem_khoang.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    sort(a.begin(), a.end());
    while (q--) {
        long long l, r;
        cin >> l >> r;
        cout << upper_bound(a.begin(), a.end(), r) - lower_bound(a.begin(), a.end(), l) << '\n';
    }
}
```

```python
# file: dem_khoang.py
import sys, bisect
data = sys.stdin.buffer.read().split()
n, q = int(data[0]), int(data[1])
a = sorted(map(int, data[2:2 + n]))
out = []
pos = 2 + n
for _ in range(q):
    l, r = int(data[pos]), int(data[pos + 1])
    pos += 2
    out.append(bisect.bisect_right(a, r) - bisect.bisect_left(a, l))
print('\n'.join(map(str, out)))
```

Độ phức tạp: O(n log n) sắp xếp + O(q log n) trả lời.

---

## 4. Tìm nhị phân trên đáp án: Nhà máy

Xưởng có n máy, máy i làm xong một sản phẩm sau kᵢ giây. Các máy chạy song song. Cần ít nhất t sản phẩm. Hỏi thời gian ngắn nhất? (n ≤ 2·10⁵, t, kᵢ ≤ 10⁹). Đây là bài [Factory Machines](https://cses.fi/problemset/task/1620).

| Vào | Ra |
| --- | --- |
| `3 7`<br>`3 2 5` | `8` |

Tính thẳng đáp án thì khó. Nhưng câu hỏi **"trong T giây có làm đủ t sản phẩm không?"** thì dễ: máy i làm được T / kᵢ (chia nguyên) sản phẩm, cộng lại so với t.

Và câu hỏi đó **đơn điệu**: T làm đủ thì T + 1 cũng đủ. Với ví dụ:

| T | 6 | 7 | 8 | 9 |
| --- | :---: | :---: | :---: | :---: |
| Số sản phẩm (T/3 + T/2 + T/5) | 2 + 3 + 1 = 6 | 2 + 3 + 1 = 6 | 2 + 4 + 1 = **7** | 3 + 4 + 1 = 8 |
| Đủ 7? | sai | sai | **đúng** | đúng |

Vậy ta tìm T nhỏ nhất làm hàm "đủ" đúng, bằng đúng khuôn ở mục 2. Cận trên: một máy nhanh nhất làm một mình cũng xong trong min(k) × t ≤ 10¹⁸ giây.

```cpp
// file: nha_may.cpp
#include <bits/stdc++.h>
using namespace std;
int n;
long long t;
vector<long long> k;

bool du(long long T) {                 // trong T giây có làm đủ t sản phẩm không?
    long long s = 0;
    for (long long x : k) {
        s += T / x;
        if (s >= t) return true;       // dừng sớm, tránh tràn số
    }
    return false;
}

int main() {
    cin >> n >> t;
    k.resize(n);
    for (auto &x : k) cin >> x;
    long long lo = 0, hi = *min_element(k.begin(), k.end()) * t;
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        if (du(mid)) hi = mid;
        else lo = mid + 1;
    }
    cout << lo << '\n';
}
```

```python
# file: nha_may.py
import sys
data = sys.stdin.buffer.read().split()
n, t = int(data[0]), int(data[1])
k = list(map(int, data[2:2 + n]))

def du(T):
    return sum(T // x for x in k) >= t

lo, hi = 0, min(k) * t
while lo < hi:
    mid = (lo + hi) // 2
    if du(mid):
        hi = mid
    else:
        lo = mid + 1
print(lo)
```

Số lần kiểm tra: log₂(10¹⁸) ≈ 60, mỗi lần O(n). Tổng 60 × 2·10⁵ = 1,2·10⁷ phép.

> [!TIP]
> **Dấu hiệu nhận ra "tìm nhị phân trên đáp án":** đề hỏi "giá trị nhỏ nhất (lớn nhất) sao cho …", đáp án có thể rất lớn, và nếu **cho trước** đáp án thì kiểm tra dễ.

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: lặp vô hạn.** Viết `lo = mid` (thay vì `mid + 1`) với `mid = (lo + hi) / 2` có thể kẹt mãi khi hi = lo + 1. Dùng đúng khuôn ở mục 2 và đừng tự chế.

> [!WARNING]
> **Bẫy 2: tràn số trong hàm kiểm tra.** Tổng T / kᵢ có thể vượt 10¹⁸ × 2·10⁵. Dừng sớm khi tổng đã đủ, như trong `du`.

> [!WARNING]
> **Bẫy 3: tìm nhị phân trên mảng chưa sắp xếp.** `lower_bound` trên mảng chưa sắp xếp cho kết quả vô nghĩa, không báo lỗi.

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Interesting drink](https://codeforces.com/problemset/problem/706/B) | CF 706B · 1100 | `upper_bound` cho nhiều câu hỏi |
| Khởi động | [Factory Machines](https://cses.fi/problemset/task/1620) | CSES 1620 | Đúng mục 4 |
| Luyện | [Array Division](https://cses.fi/problemset/task/1085) | CSES 1085 | Nhị phân trên tổng lớn nhất |
| Luyện | [Worms](https://codeforces.com/problemset/problem/474/B) | CF 474B · 1200 | Tiền tố + `lower_bound` |
| Luyện | Tìm số nguyên x lớn nhất với x² ≤ n (n ≤ 10¹⁸), không dùng `sqrt` | Tự luyện | Khuôn nhị phân, chú ý tràn |
| Thử thách | [Hamburgers](https://codeforces.com/problemset/problem/371/C) | CF 371C · 1600 | Nhị phân trên số bánh |

---

## 7. Tóm tắt và checkpoint

1. Mảng đã sắp: `lower_bound` (≥ x), `upper_bound` (> x); đếm trong [l, r] = upper(r) − lower(l).
2. Khuôn: `while lo < hi: mid; nếu đúng(mid): hi = mid, ngược lại lo = mid + 1`.
3. Nhị phân trên đáp án: cần hàm kiểm tra **đơn điệu**.

<details><summary>Trong <code>1 3 3 5 7 9</code>, <code>lower_bound(3)</code> và <code>upper_bound(3)</code> là vị trí nào?</summary>1 và 3 (chỉ số từ 0); có 3 − 1 = 2 số bằng 3.</details>
<details><summary>Điều kiện để tìm nhị phân trên đáp án?</summary>Hàm kiểm tra đơn điệu: sai … sai đúng … đúng.</details>

**Checkpoint:**

- [ ] Viết khuôn tìm nhị phân không nhìn sách, AC Factory Machines.
- [ ] AC CSES Array Division.
