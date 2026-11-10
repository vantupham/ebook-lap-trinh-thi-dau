# Bài 1.1 – Độ phức tạp

> **Tập 1** · Cần biết trước: Tập 0, đặc biệt bài 0.4 · Thời lượng: khoảng 75 phút đọc, 4 giờ thực hành

**Học xong bài này, em sẽ:**

- dùng ký hiệu O để mô tả tốc độ của thuật toán;
- **đọc ràng buộc của đề để đoán độ phức tạp cần đạt**, trước khi nghĩ lời giải;
- thấy cùng một bài có thể giải bằng O(n³), O(n²) hoặc O(n), và mỗi cách lấy được bao nhiêu điểm.

---

## 1. Bài toán mở màn: Chuỗi ngày lãi nhất

Quán nước mía của nhà An ghi lãi (hoặc lỗ, số âm) của n ngày liên tiếp. An muốn tìm một **đoạn ngày liên tiếp** có tổng lãi lớn nhất. Đoạn phải có ít nhất 1 ngày. (1 ≤ n ≤ 2·10⁵, |aᵢ| ≤ 10⁹)

| Vào | Ra |
| --- | --- |
| `8`<br>`-1 3 -2 5 3 -5 2 2` | `9` |

Đoạn tốt nhất là `3 -2 5 3`, tổng 9.

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Có bao nhiêu đoạn con liên tiếp trong một dãy n phần tử? Nếu thử hết, với n = 2·10⁵ thì cần khoảng bao nhiêu phép tính?

<details>
<summary>Đáp án</summary>

Chọn điểm đầu và điểm cuối: khoảng n²/2 đoạn, tức 2·10¹⁰ đoạn. Nếu mỗi đoạn lại cộng lại từ đầu thì còn nhân thêm n nữa. Thử hết là không kịp.

</details>

---

## 2. Ký hiệu O

Ta không đếm chính xác số phép tính, chỉ quan tâm nó **tăng theo n nhanh cỡ nào**. Bỏ hằng số và các số hạng nhỏ: n²/2 + 3n viết là **O(n²)**.

## 3. Ba lời giải, ba mức điểm

**Cách 1 – O(n³).** Thử mọi đoạn [l, r], cộng lại từ đầu.

```cpp
for (int l = 0; l < n; l++)
    for (int r = l; r < n; r++) {
        long long s = 0;
        for (int k = l; k <= r; k++) s += a[k];
        best = max(best, s);
    }
```

**Cách 2 – O(n²).** Giữ nguyên l, khi tăng r chỉ cần **cộng thêm** a[r] vào tổng cũ.

```cpp
// file: tong_lon_nhat_n2.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    long long best = LLONG_MIN;
    for (int l = 0; l < n; l++) {
        long long s = 0;
        for (int r = l; r < n; r++) {
            s += a[r];                  // tổng đoạn [l, r] = tổng [l, r-1] + a[r]
            best = max(best, s);
        }
    }
    cout << best << '\n';
}
```

**Cách 3 – O(n): thuật toán Kadane.** Bảo nhận xét: gọi `cur` là tổng lớn nhất của đoạn **kết thúc tại** vị trí i. Đoạn đó hoặc chỉ gồm a[i], hoặc là đoạn tốt nhất kết thúc tại i − 1 nối thêm a[i]:

**cur = max(a[i], cur + a[i])**

Nói cách khác: nếu tổng đang mang theo là số âm thì bỏ đi, bắt đầu lại từ a[i].

| i | a[i] | cur trước | cur + a[i] | cur mới | best |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | −1 | — | — | −1 | −1 |
| 1 | 3 | −1 | 2 | **3** (bỏ phần âm) | 3 |
| 2 | −2 | 3 | 1 | 1 | 3 |
| 3 | 5 | 1 | 6 | 6 | 6 |
| 4 | 3 | 6 | 9 | 9 | **9** |
| 5 | −5 | 9 | 4 | 4 | 9 |
| 6 | 2 | 4 | 6 | 6 | 9 |
| 7 | 2 | 6 | 8 | 8 | 9 |

```cpp
// file: tong_lon_nhat.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    long long cur = 0, best = LLONG_MIN;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        cur = (i == 0) ? x : max(x, cur + x);
        best = max(best, cur);
    }
    cout << best << '\n';
}
```

```python
# file: tong_lon_nhat.py
import sys
data = sys.stdin.buffer.read().split()
n = int(data[0])
cur = best = None
for x in map(int, data[1:n + 1]):
    cur = x if cur is None else max(x, cur + x)
    best = cur if best is None else max(best, cur)
print(best)
```

So sánh với n = 2·10⁵:

| Cách | Độ phức tạp | Số phép (xấp xỉ) | Kịp 1 giây với C++? |
| --- | --- | --- | --- |
| 1 | O(n³) | 10¹⁵ | Chỉ với n ≤ 500 |
| 2 | O(n²) | 2·10¹⁰ | Chỉ với n ≤ 10⁴ |
| 3 | O(n) | 2·10⁵ | Có |

Nếu đề chia subtask n ≤ 500, n ≤ 5000, n ≤ 2·10⁵ thì ba cách lần lượt lấy được các mức điểm đó. **Viết cách dễ trước, nộp, rồi mới nâng cấp.**

---

## 4. Đọc ràng buộc để đoán thuật toán

Máy chấm chạy khoảng 10⁸ phép đơn giản mỗi giây (C++). Từ giới hạn n, em suy ra độ phức tạp tối đa:

| n tối đa | Độ phức tạp chấp nhận được | Hướng nghĩ thường gặp |
| --- | --- | --- |
| 10 | O(n!) | Thử mọi hoán vị (bài 1.7) |
| 20 | O(2ⁿ · n) | Thử mọi tập con (bài 1.7) |
| 500 | O(n³) | Ba vòng lặp lồng nhau |
| 5 000 | O(n²) | Hai vòng lặp lồng nhau |
| 10⁵ – 10⁶ | O(n log n) hoặc O(n) | Sắp xếp (1.2), tìm nhị phân (1.4), tiền tố (1.3), hai con trỏ (1.5) |
| 10¹⁸ | O(log n) hoặc O(1) | Công thức, tìm nhị phân trên đáp án (1.4) |

log₂(10⁶) ≈ 20, nên O(n log n) với n = 10⁶ là khoảng 2·10⁷ phép: vẫn nhanh.

> [!TIP]
> **Thói quen mới:** đọc đề xong, việc đầu tiên là ghi ra giấy "n ≤ … nên cần O(…)". Bảng này đúng cho rất nhiều bài; nó gợi ý em nên nghĩ theo hướng nào.

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: khởi tạo `best = 0`.** Nếu mọi ngày đều lỗ, đáp án là số âm lớn nhất, nhưng code in ra 0. Khởi tạo bằng phần tử đầu tiên hoặc một số rất nhỏ (`LLONG_MIN`). Bài 1.9 sẽ dùng stress test để bắt lỗi này.

> [!WARNING]
> **Bẫy 2: quên hằng số khi n "vừa đủ".** O(n²) với n = 10⁴ là 10⁸: thường kịp với C++, thường **không** kịp với Python.

> [!WARNING]
> **Bẫy 3: tràn số.** Tổng đoạn có thể tới 2·10⁵ × 10⁹ = 2·10¹⁴: phải dùng `long long`.

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Maximum Subarray Sum](https://cses.fi/problemset/task/1643) | CSES 1643 | Đúng bài mở màn |
| Khởi động | Với mỗi đoạn code trong mục 3, tự đo thời gian chạy với n = 10³, 10⁴, 10⁵ | Tự luyện | Cảm nhận độ phức tạp |
| Luyện | [Two Knights](https://cses.fi/problemset/task/1072) | CSES 1072 | Từ thử hết sang công thức |
| Luyện | [Bit Strings](https://cses.fi/problemset/task/1617) | CSES 1617 | O(n) với phép lấy dư |
| Thử thách | [Two Sets](https://cses.fi/problemset/task/1092) | CSES 1092 | Nhận xét toán để tránh vét cạn |

---

## 7. Tóm tắt và checkpoint

1. Độ phức tạp đo tốc độ tăng theo n; bỏ hằng số.
2. Đọc giới hạn n → tra bảng mục 4 → biết cần O(…).
3. Một bài, nhiều lời giải: chậm lấy subtask nhỏ, nhanh lấy trọn điểm.

<details><summary>n ≤ 2000 thì nên nhắm độ phức tạp nào?</summary>O(n²) là an toàn (4·10⁶ phép); O(n³) = 8·10⁹ thì không kịp.</details>
<details><summary>Ý tưởng chính của Kadane?</summary>Tổng tốt nhất kết thúc tại i = max(a[i], tổng tốt nhất kết thúc tại i−1 + a[i]).</details>

**Checkpoint:**

- [ ] AC CSES Maximum Subarray Sum bằng Kadane.
- [ ] Nhìn ràng buộc của 5 bài bất kỳ trên Codeforces, đoán đúng độ phức tạp cần đạt ít nhất 4 bài.
