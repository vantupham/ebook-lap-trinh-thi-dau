# Bài 1.2 – Sắp xếp

> **Tập 1** · Cần biết trước: bài 1.1 · Thời lượng: khoảng 60 phút đọc, 5 giờ thực hành

**Học xong bài này, em sẽ:**

- dùng hàm sắp xếp có sẵn (O(n log n)) thay vì tự viết sắp xếp chậm;
- sắp xếp theo **nhiều tiêu chí** bằng `pair` hoặc khóa sắp xếp;
- nhận ra rằng sau khi sắp xếp, nhiều bài khó trở thành bài một vòng lặp.

---

## 1. Bài toán mở màn: Bảng xếp hạng

Sau hội thi Tin học trẻ cấp trường, cô giáo cần in bảng xếp hạng n bạn (1 ≤ n ≤ 10⁵). Xếp theo điểm **giảm dần**; cùng điểm thì theo tên **tăng dần** (thứ tự từ điển). Bạn cùng điểm thì **đồng hạng**, và hạng tiếp theo bị "nhảy" như trong thể thao.

| Vào | Ra |
| --- | --- |
| `5`<br>`An 8`<br>`Binh 9`<br>`Chi 9`<br>`Dung 7`<br>`Em 8` | `1 Binh 9`<br>`1 Chi 9`<br>`3 An 8`<br>`3 Em 8`<br>`5 Dung 7` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Sau khi đã sắp xếp đúng thứ tự, làm sao biết hạng của bạn thứ i trong danh sách? Khi nào hạng của bạn i bằng hạng của bạn i − 1?

<details>
<summary>Đáp án</summary>

Bạn ở vị trí i (đếm từ 1) có hạng i, **trừ khi** cùng điểm với bạn ngay trước: khi đó lấy luôn hạng của bạn trước. Chỉ cần một vòng lặp sau khi sắp xếp.

</details>

---

## 2. Sắp xếp có sẵn

| | Python | C++ |
| --- | --- | --- |
| Tăng dần | `a.sort()` | `sort(a.begin(), a.end());` |
| Giảm dần | `a.sort(reverse=True)` | `sort(a.rbegin(), a.rend());` |
| Theo khóa | `a.sort(key=lambda x: ...)` | `sort(..., [](const T &x, const T &y){ return ...; });` |
| Độ phức tạp | O(n log n) | O(n log n) |

Tự viết sắp xếp nổi bọt (bubble sort) là O(n²): với n = 10⁵ mất 10¹⁰ phép. **Trong thi đấu, luôn dùng hàm có sẵn**, trừ khi đề yêu cầu khác.

## 3. Sắp xếp nhiều tiêu chí

Mẹo: biến "giảm dần theo điểm" thành "tăng dần theo **âm** điểm", rồi so sánh theo cặp (−điểm, tên). Cặp được so sánh phần đầu trước, bằng nhau mới so phần sau.

```cpp
// file: xep_hang.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<pair<int, string>> a(n);          // (−điểm, tên)
    for (auto &[d, ten] : a) {
        cin >> ten >> d;
        d = -d;
    }
    sort(a.begin(), a.end());
    int hang = 0;
    for (int i = 0; i < n; i++) {
        if (i == 0 || a[i].first != a[i - 1].first) hang = i + 1;   // điểm khác bạn trước
        cout << hang << ' ' << a[i].second << ' ' << -a[i].first << '\n';
    }
}
```

```python
# file: xep_hang.py
n = int(input())
a = []
for _ in range(n):
    ten, d = input().split()
    a.append((ten, int(d)))
a.sort(key=lambda x: (-x[1], x[0]))
hang = 0
for i, (ten, d) in enumerate(a):
    if i == 0 or d != a[i - 1][1]:
        hang = i + 1
    print(hang, ten, d)
```

Chạy tay phần tính hạng:

| i | Bạn | Điểm | Cùng điểm bạn trước? | Hạng |
| :---: | --- | :---: | :---: | :---: |
| 0 | Binh | 9 | — | 1 |
| 1 | Chi | 9 | có | 1 |
| 2 | An | 8 | không | 3 |
| 3 | Em | 8 | có | 3 |
| 4 | Dung | 7 | không | 5 |

---

## 4. Sắp xếp làm bài toán dễ đi: đếm giá trị khác nhau

Đếm số giá trị khác nhau trong dãy n số (n ≤ 2·10⁵, giá trị tới 10⁹). Không dùng được mảng đếm (giá trị quá lớn). Nhưng **sau khi sắp xếp, các số bằng nhau đứng liền nhau**: chỉ cần đếm số lần a[i] khác a[i − 1].

| Trước | `2 3 2 2 3` |
| --- | --- |
| Sau sắp xếp | `2 2 2 3 3` |
| Chỗ đổi giá trị | đầu dãy, và 2 → 3: **2** giá trị |

```cpp
// file: dem_phan_biet.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    sort(a.begin(), a.end());
    int dem = 0;
    for (int i = 0; i < n; i++)
        if (i == 0 || a[i] != a[i - 1]) dem++;
    cout << dem << '\n';
}
```

```python
# file: dem_phan_biet.py
import sys
data = sys.stdin.buffer.read().split()
n = int(data[0])
a = sorted(map(int, data[1:n + 1]))
print(sum(1 for i in range(n) if i == 0 or a[i] != a[i - 1]))
```

> [!NOTE]
> Python có cách ngắn hơn: `len(set(a))`. Biết cả hai cách vẫn quan trọng: ý "sắp xếp để các phần tử giống nhau đứng cạnh nhau" dùng được ở rất nhiều bài mà `set` không giúp được.

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: comparator dùng `<=`.** Trong C++, hàm so sánh tự viết phải trả về `a < b` **hẳn**. Dùng `<=` có thể làm chương trình chạy sai hoặc dừng đột ngột.

> [!WARNING]
> **Bẫy 2: hạng đồng hạng.** In `i + 1` cho mọi bạn là sai. Tiêu chí đồng hạng là **cùng điểm**, không phải cùng tên hay cùng vị trí.

> [!WARNING]
> **Bẫy 3: sắp xếp làm mất vị trí ban đầu.** Nếu đề hỏi "vị trí ban đầu" thì phải lưu kèm chỉ số: sắp xếp các cặp (giá trị, chỉ số).

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Distinct Numbers](https://cses.fi/problemset/task/1621) | CSES 1621 | Đúng mục 4 |
| Khởi động | [Helpful Maths](https://codeforces.com/problemset/problem/339/A) | CF 339A · 800 | Sắp xếp rồi in |
| Luyện | [Twins](https://codeforces.com/problemset/problem/160/A) | CF 160A · 900 | Sắp giảm dần rồi chọn |
| Luyện | [Apartments](https://cses.fi/problemset/task/1084) | CSES 1084 | Sắp xếp hai dãy, ghép cặp |
| Luyện | [Ferris Wheel](https://cses.fi/problemset/task/1090) | CSES 1090 | Sắp xếp + ghép nặng với nhẹ |
| Thử thách | [Restaurant Customers](https://cses.fi/problemset/task/1619) | CSES 1619 | Sắp xếp các sự kiện vào/ra |

---

## 7. Tóm tắt và checkpoint

1. Luôn dùng sắp xếp có sẵn: O(n log n).
2. Nhiều tiêu chí: sắp theo cặp; giảm dần thì đổi dấu.
3. Sau sắp xếp: phần tử bằng nhau đứng cạnh nhau, phần tử gần giá trị đứng gần nhau.

<details><summary>Sắp xếp các cặp (3, 'b'), (1, 'z'), (3, 'a') tăng dần cho ra gì?</summary>(1, 'z'), (3, 'a'), (3, 'b').</details>
<details><summary>Đếm giá trị khác nhau của dãy 10⁵ số tới 10⁹: cách nào?</summary>Sắp xếp rồi đếm số chỗ a[i] ≠ a[i−1]; hoặc <code>set</code>.</details>

**Checkpoint:**

- [ ] Viết lại bài Bảng xếp hạng bằng C++ không nhìn sách.
- [ ] AC CSES Apartments và Ferris Wheel.
