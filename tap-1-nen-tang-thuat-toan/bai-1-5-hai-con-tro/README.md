# Bài 1.5 – Hai con trỏ

> **Tập 1** · Cần biết trước: bài 1.1, 1.3 · Thời lượng: khoảng 75 phút đọc, 5 giờ thực hành

**Học xong bài này, em sẽ:**

- dùng hai chỉ số l, r cùng chạy về một phía để xét mọi "cửa sổ" trong O(n);
- nhận ra khi nào hai con trỏ dùng được (khi kéo dài cửa sổ chỉ làm tổng **tăng**);
- dùng hai con trỏ chạy từ hai đầu trên mảng đã sắp xếp.

---

## 1. Bài toán mở màn: Chạy bộ trong giới hạn

Đường chạy ven kênh Nhiêu Lộc chia thành n chặng liên tiếp, chặng i dài aᵢ mét (aᵢ ≥ 1). Chi chỉ đủ sức chạy tối đa S mét. Hỏi Chi chạy được nhiều nhất bao nhiêu chặng **liên tiếp**? (n ≤ 2·10⁵, aᵢ ≤ 10⁹, S ≤ 10¹⁸)

| Vào | Ra |
| --- | --- |
| `6 10`<br>`4 2 3 6 1 2` | `3` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Giả sử đoạn [l, r] có tổng ≤ S. Đoạn [l + 1, r] thì sao? Còn nếu [l, r] có tổng > S, có cần thử [l, r + 1] không?

<details>
<summary>Đáp án</summary>

Mọi aᵢ dương, nên bỏ bớt phần tử thì tổng giảm: [l+1, r] cũng ≤ S. Ngược lại [l, r] đã > S thì kéo dài thêm càng lớn, không cần thử. Vì vậy khi r tăng, l **không bao giờ phải lùi lại**.

</details>

---

## 2. Cửa sổ trượt

Duyệt r từ trái sang phải, thêm a[r] vào cửa sổ. Khi tổng vượt S, **đẩy l sang phải** (bỏ a[l]) tới khi tổng ≤ S. Mỗi lúc, [l, r] là đoạn dài nhất kết thúc tại r thỏa điều kiện.

| r | Thêm a[r] | Tổng sau khi thêm | Đẩy l | l | Tổng | Độ dài r − l + 1 | Tốt nhất |
| :---: | :---: | :---: | --- | :---: | :---: | :---: | :---: |
| 0 | 4 | 4 | — | 0 | 4 | 1 | 1 |
| 1 | 2 | 6 | — | 0 | 6 | 2 | 2 |
| 2 | 3 | 9 | — | 0 | 9 | 3 | 3 |
| 3 | 6 | 15 | bỏ 4, bỏ 2 | 2 | 9 | 2 | 3 |
| 4 | 1 | 10 | — | 2 | 10 | 3 | 3 |
| 5 | 2 | 12 | bỏ 3 | 3 | 9 | 3 | 3 |

```cpp
// file: chay_bo.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long S;
    cin >> n >> S;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    long long tong = 0;
    int l = 0, best = 0;
    for (int r = 0; r < n; r++) {
        tong += a[r];
        while (tong > S) tong -= a[l++];    // đẩy l tới khi cửa sổ hợp lệ
        best = max(best, r - l + 1);        // nếu a[r] > S thì l = r + 1, độ dài 0
    }
    cout << best << '\n';
}
```

```python
# file: chay_bo.py
import sys
data = sys.stdin.buffer.read().split()
n, S = int(data[0]), int(data[1])
a = list(map(int, data[2:2 + n]))
tong = l = best = 0
for r in range(n):
    tong += a[r]
    while tong > S:
        tong -= a[l]
        l += 1
    best = max(best, r - l + 1)
print(best)
```

**Vì sao O(n)?** Giống phân tích ở bài ngăn xếp đơn điệu: r tăng n lần, l cũng chỉ tăng tối đa n lần **trong cả chương trình**. Tổng cộng 2n bước, dù có `while` trong `for`.

---

## 3. Đếm đoạn có tổng đúng bằng x

Cũng cửa sổ trượt, nhưng đếm số đoạn có tổng **bằng** x ([Subarray Sums I](https://cses.fi/problemset/task/1660), aᵢ ≥ 1).

| Vào | Ra |
| --- | --- |
| `5 7`<br>`2 4 1 2 7` | `3` |

Ba đoạn: `2 4 1`, `4 1 2`, `7`.

```cpp
// file: dem_doan_bang_x.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long x;
    cin >> n >> x;
    vector<long long> a(n);
    for (auto &v : a) cin >> v;
    long long tong = 0, dem = 0;
    int l = 0;
    for (int r = 0; r < n; r++) {
        tong += a[r];
        while (tong > x) tong -= a[l++];
        if (tong == x) dem++;          // với mỗi r có tối đa một l phù hợp
    }
    cout << dem << '\n';
}
```

---

## 4. Hai con trỏ từ hai đầu

Trên mảng **đã sắp xếp**, tìm hai phần tử có tổng bằng x ([Sum of Two Values](https://cses.fi/problemset/task/1640)): đặt l ở đầu, r ở cuối.

- a[l] + a[r] < x: cần tổng lớn hơn, tăng l.
- a[l] + a[r] > x: cần tổng nhỏ hơn, giảm r.
- bằng x: tìm được.

Mỗi bước loại được một phần tử, nên O(n) sau khi sắp xếp. Bài CSES yêu cầu in **vị trí ban đầu**, nhớ sắp xếp các cặp (giá trị, chỉ số) như bẫy 3 ở bài 1.2.

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: dùng cửa sổ trượt khi có số âm.** Có số âm thì kéo dài đoạn có thể làm tổng **giảm**, lập luận "l không lùi" sai. Khi đó dùng tổng tiền tố (bài 1.3) kết hợp cách khác.

> [!WARNING]
> **Bẫy 2: phần tử đơn lẻ lớn hơn S.** Khi a[r] > S, vòng `while` đẩy l vượt qua r. Code ở trên vẫn đúng vì độ dài r − l + 1 = 0, nhưng nếu em viết khác hãy thử test này.

> [!WARNING]
> **Bẫy 3: nhầm "đoạn liên tiếp" với "dãy con bất kỳ".** Hai con trỏ ở mục 2–3 dành cho đoạn liên tiếp. Chọn các phần tử bất kỳ là một bài khác hẳn.

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Subarray Sums I](https://cses.fi/problemset/task/1660) | CSES 1660 | Đúng mục 3 |
| Khởi động | [Books](https://codeforces.com/problemset/problem/279/B) | CF 279B · 1400 | Đúng mục 2 |
| Luyện | [Sum of Two Values](https://cses.fi/problemset/task/1640) | CSES 1640 | Hai đầu, giữ chỉ số |
| Luyện | [Ferris Wheel](https://cses.fi/problemset/task/1090) | CSES 1090 | Ghép nặng nhất với nhẹ nhất |
| Thử thách | [Sum of Three Values](https://cses.fi/problemset/task/1641) | CSES 1641 | Cố định một, hai con trỏ cho hai còn lại |

---

## 7. Tóm tắt và checkpoint

1. Cửa sổ trượt: thêm phải, bớt trái; dùng được khi các phần tử không âm.
2. Mỗi con trỏ chỉ đi một chiều, nên O(n) dù có vòng lặp lồng nhau.
3. Mảng đã sắp xếp + tìm cặp: hai đầu tiến vào giữa.

<details><summary>Vì sao cửa sổ trượt cần các phần tử dương?</summary>Để bỏ bớt phần tử thì tổng giảm, kéo dài thì tổng tăng; nhờ đó l không cần lùi.</details>
<details><summary>Số bước tối đa của hai con trỏ trên n phần tử?</summary>Khoảng 2n: mỗi con trỏ đi tối đa n bước.</details>

**Checkpoint:**

- [ ] Viết lại bài Chạy bộ không nhìn sách, đúng cả test có phần tử lớn hơn S.
- [ ] AC CSES Sum of Two Values.
