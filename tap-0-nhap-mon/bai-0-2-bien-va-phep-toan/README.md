# Bài 0.2 – Biến và phép toán

> **Tập 0** · Cần biết trước: bài 0.1 · Thời lượng: khoảng 60 phút đọc, 4 giờ thực hành

**Học xong bài này, em sẽ:**

- dùng thành thạo chia nguyên `//` (`/` trong C++) và chia lấy dư `%`;
- chọn đúng kiểu số để **không bị tràn số**, lỗi mất điểm phổ biến nhất ở HSG 9;
- làm tròn lên phép chia mà không dùng số thực.

---

## 1. Bài toán mở màn: Đổi giây

Đồng hồ thể thao của Bảo ghi thời gian chạy bộ quanh hồ Con Rùa bằng **giây**. Bảo muốn đổi sang giờ, phút, giây. Nhập t (0 ≤ t ≤ 10⁹), in ba số h m s.

| Vào | Ra |
| --- | --- |
| `3725` | `1 2 5` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** 3725 giây là bao nhiêu phút tròn, dư bao nhiêu giây? Em đã dùng phép tính nào?

<details>
<summary>Đáp án</summary>

3725 : 60 = 62 phút, dư 5 giây. 62 phút : 60 = 1 giờ, dư 2 phút. Hai phép tính quan trọng là **chia lấy phần nguyên** và **chia lấy phần dư**.

</details>

---

## 2. Chia nguyên và chia lấy dư

| Phép toán | Python | C++ | 17 và 5 cho ra |
| --- | --- | --- | --- |
| Chia lấy phần nguyên | `17 // 5` | `17 / 5` (cả hai là số nguyên) | 3 |
| Chia lấy dư | `17 % 5` | `17 % 5` | 2 |
| Chia ra số thực | `17 / 5` | `17.0 / 5` | 3.4 |

Luôn đúng: **a = (a chia nguyên b) × b + (a chia dư b)**, ví dụ 17 = 3 × 5 + 2.

```python
# file: doi_giay.py
t = int(input())
h = t // 3600            # số giờ tròn
m = t % 3600 // 60       # phần dư sau khi bỏ giờ, đổi ra phút
s = t % 60               # số giây lẻ
print(h, m, s)
```

```cpp
// file: doi_giay.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    long long t;
    cin >> t;
    cout << t / 3600 << ' ' << t % 3600 / 60 << ' ' << t % 60 << '\n';
}
```

Chạy tay với t = 3725:

| Biểu thức | Tính | Kết quả |
| --- | --- | --- |
| `t // 3600` | 3725 = 1 × 3600 + 125 | 1 |
| `t % 3600` | phần dư ở trên | 125 |
| `125 // 60` | 125 = 2 × 60 + 5 | 2 |
| `t % 60` | 3725 = 62 × 60 + 5 | 5 |

> [!NOTE]
> **Hai mẹo dùng `%` cả đời.** `n % 10` là chữ số cuối của n; `n // 10` là n bỏ chữ số cuối. `n % 2 == 0` nghĩa là n chẵn.

---

## 3. Tràn số: lỗi im lặng nguy hiểm nhất

Python tự mở rộng số nguyên, tính được cả 2¹⁰⁰⁰. **C++ thì không.** Mỗi kiểu số chỉ chứa được một khoảng giá trị:

| Kiểu C++ | Khoảng giá trị (xấp xỉ) | Dùng khi |
| --- | --- | --- |
| `int` | −2,1·10⁹ … 2,1·10⁹ | giá trị chắc chắn dưới 2·10⁹ |
| `long long` | −9,2·10¹⁸ … 9,2·10¹⁸ | tổng, tích, mọi thứ có thể vượt 10⁹ |

Vượt khoảng thì C++ **không báo lỗi** mà cho ra một số sai, thường là số âm.

Ví dụ: tính 1 + 2 + … + n với n ≤ 10⁶. Công thức n(n + 1)/2 với n = 10⁶ cho khoảng 5·10¹¹, vượt `int`.

```cpp
// file: tong_1_n.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    long long n;                    // dùng long long ngay từ đầu
    cin >> n;
    cout << n * (n + 1) / 2 << '\n';
}
```

```python
# file: tong_1_n.py
n = int(input())
print(n * (n + 1) // 2)             # dùng // để kết quả là số nguyên
```

> [!WARNING]
> **Bẫy: `long long` nhưng vẫn tràn.** Với `int a, b;` thì `long long x = a * b;` vẫn tràn, vì phép nhân xảy ra **trước** khi gán, trên kiểu `int`. Sửa: `long long x = 1LL * a * b;`, hoặc khai báo a, b là `long long` từ đầu. Quy tắc an toàn ở Tập 0: **cứ dùng `long long`** cho mọi số có thể lớn.

---

## 4. Làm tròn lên mà không dùng số thực

Cần bao nhiêu chuyến xe 45 chỗ để chở 100 học sinh? 100/45 = 2,22…, nên cần **3** chuyến. Đó là phép chia **làm tròn lên**.

Với a, b nguyên dương: **làm tròn lên của a/b = (a + b − 1) chia nguyên b.**

| a | b | (a + b − 1) // b |
| --- | --- | --- |
| 100 | 45 | 144 // 45 = 3 |
| 90 | 45 | 134 // 45 = 2 |

> [!WARNING]
> **Bẫy: dùng `ceil(a / b)` với số thực.** Số thực có sai số. Với số lớn cỡ 10¹⁸, `ceil` có thể cho kết quả lệch 1. Luôn dùng công thức số nguyên ở trên.

> [!WARNING]
> **Bẫy: số âm.** Python `-7 // 2` cho −4 (làm tròn xuống), C++ `-7 / 2` cho −3 (bỏ phần thập phân). Đề có số âm thì phải kiểm tra kỹ.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Elephant](https://codeforces.com/problemset/problem/617/A) | CF 617A · 800 | Làm tròn lên |
| Khởi động | [Soldier and Bananas](https://codeforces.com/problemset/problem/546/A) | CF 546A · 800 | Tổng 1..n, chú ý kết quả không âm |
| Luyện | [Theatre Square](https://codeforces.com/problemset/problem/1/A) | CF 1A · 1000 | Làm tròn lên + tràn số |
| Luyện | [Domino piling](https://codeforces.com/problemset/problem/50/A) | CF 50A · 800 | Chia nguyên |
| Luyện | Nhập số nguyên dương n (n ≤ 10¹⁸), in tổng các chữ số của n | Tự luyện | `% 10` và `// 10` lặp lại (xem trước bài 0.4) |
| Thử thách | [Trailing Zeros](https://cses.fi/problemset/task/1618) | CSES 1618 | Đếm thừa số 5 trong n! |

---

## 6. Tóm tắt và checkpoint

1. `a // b` (Python), `a / b` (C++ với số nguyên): chia lấy phần nguyên. `a % b`: chia lấy dư.
2. C++: mọi số có thể vượt 2·10⁹ dùng `long long`; nhân hai `int` thì viết `1LL * a * b`.
3. Làm tròn lên a/b: `(a + b - 1) // b`. Không dùng số thực.

<details><summary>Chữ số hàng chục của n là gì?</summary><code>n // 10 % 10</code></details>
<details><summary><code>int a = 100000, b = 100000; long long x = a * b;</code> có đúng không?</summary>Sai: tràn số khi nhân trên kiểu <code>int</code>. Viết <code>1LL * a * b</code>.</details>

**Checkpoint:**

- [ ] Giải đúng CF 1A Theatre Square trong lần nộp đầu tiên.
- [ ] Giải thích được cho bạn vì sao `1LL * a * b` khác `a * b`.
