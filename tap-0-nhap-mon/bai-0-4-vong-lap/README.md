# Bài 0.4 – Vòng lặp

> **Tập 0** · Cần biết trước: bài 0.3 · Thời lượng: khoảng 75 phút đọc, 5 giờ thực hành

**Học xong bài này, em sẽ:**

- dùng `while` khi chưa biết trước số lần lặp, `for` khi biết;
- viết các mẫu lặp cơ bản: đếm, tính tổng, tách chữ số;
- **ước lượng số phép tính** để biết chương trình có chạy kịp 1 giây không.

---

## 1. Bài toán mở màn: Trò chơi về 1

An nghĩ ra trò chơi: bắt đầu từ số nguyên dương n. Nếu n chẵn thì chia đôi, nếu lẻ thì nhân 3 rồi cộng 1. Lặp lại tới khi n = 1. Hỏi cần bao nhiêu bước? (1 ≤ n ≤ 10⁶)

| Vào | Ra |
| --- | --- |
| `6` | `8` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Tự chơi bằng tay với n = 6. Em có biết trước sẽ cần bao nhiêu bước không? Điều đó cho em biết nên dùng `for` hay `while`.

<details>
<summary>Đáp án</summary>

6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1: tám bước. Không biết trước số bước, chỉ biết **điều kiện dừng** (n = 1), nên dùng `while`.

</details>

---

## 2. `while`: lặp khi điều kiện còn đúng

```python
# file: ve_mot.py
n = int(input())
buoc = 0
while n != 1:
    if n % 2 == 0:
        n //= 2
    else:
        n = 3 * n + 1
    buoc += 1
print(buoc)
```

```cpp
// file: ve_mot.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    long long n;          // giá trị có thể vượt 10⁹ giữa chừng (xem bẫy 2)
    cin >> n;
    int buoc = 0;
    while (n != 1) {
        if (n % 2 == 0) n /= 2;
        else n = 3 * n + 1;
        buoc++;
    }
    cout << buoc << '\n';
}
```

Chạy tay với n = 6. Mỗi dòng là **trạng thái sau một lượt** vòng lặp:

| Lượt | n trước | Chẵn/lẻ | n sau | buoc |
| :---: | :---: | :---: | :---: | :---: |
| 1 | 6 | chẵn | 3 | 1 |
| 2 | 3 | lẻ | 10 | 2 |
| 3 | 10 | chẵn | 5 | 3 |
| 4 | 5 | lẻ | 16 | 4 |
| 5 | 16 | chẵn | 8 | 5 |
| 6 | 8 | chẵn | 4 | 6 |
| 7 | 4 | chẵn | 2 | 7 |
| 8 | 2 | chẵn | 1 | 8 |

Tới đây n = 1, điều kiện `n != 1` sai, vòng lặp dừng.

> [!NOTE]
> **Kỹ năng gỡ lỗi số 1: bảng chạy tay.** Khi code ra kết quả sai, hãy kẻ bảng như trên, mỗi cột là một biến. Hoặc in giá trị biến trong mỗi lượt lặp (nhớ xóa trước khi nộp).

---

## 3. `for`: lặp với số lần biết trước

Bài: tính tổng các số từ 1 đến n chia hết cho 3 hoặc 5 (1 ≤ n ≤ 10⁶). Với n = 10: 3 + 5 + 6 + 9 + 10 = 33.

```python
# file: tong_3_5.py
n = int(input())
s = 0
for i in range(1, n + 1):          # i chạy 1, 2, ..., n (range dừng TRƯỚC n + 1)
    if i % 3 == 0 or i % 5 == 0:
        s += i
print(s)
```

```cpp
// file: tong_3_5.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    long long s = 0;
    for (int i = 1; i <= n; i++)
        if (i % 3 == 0 || i % 5 == 0) s += i;
    cout << s << '\n';
}
```

Ba mẫu lặp gặp mãi trong thi đấu:

| Mẫu | Khởi tạo | Trong vòng lặp |
| --- | --- | --- |
| Tính tổng | `s = 0` | `s += x` |
| Đếm | `dem = 0` | `if (điều kiện) dem += 1` |
| Tìm lớn nhất | `mx = phần tử đầu` (hoặc rất nhỏ) | `if x > mx: mx = x` |

Tách chữ số là một mẫu `while` kinh điển:

```python
# file: tong_chu_so.py
n = int(input())
s = 0
while n > 0:
    s += n % 10     # lấy chữ số cuối
    n //= 10        # bỏ chữ số cuối
print(s)
```

---

## 4. Chương trình có kịp 1 giây không?

Đây là câu hỏi em phải tự trả lời **trước khi** viết code. Quy ước thô:

| Ngôn ngữ | Số phép tính đơn giản mỗi giây (xấp xỉ) |
| --- | --- |
| C++ | 10⁸ |
| Python | 10⁷ (chậm hơn khoảng 10 lần) |

Đếm số lượt lặp theo n:

| Code | Số lượt | n = 10⁶ thì |
| --- | --- | --- |
| một `for` từ 1 đến n | n | 10⁶: rất nhanh |
| hai `for` lồng nhau, mỗi cái tới n | n² | 10¹²: **quá chậm** |
| `while n > 0: n //= 10` | số chữ số của n | 7: tức thì |
| `while n > 1: n //= 2` | khoảng log₂ n | 20: tức thì |

Với tổng các số chia hết cho 3 hoặc 5, Bảo tìm được **công thức** chạy tức thì kể cả khi n = 10¹⁸: tổng các bội của 3, cộng tổng các bội của 5, **trừ** tổng các bội của 15 (vì bị cộng hai lần).

```python
# file: tong_3_5_cong_thuc.py
n = int(input())

def tong_boi(k):            # tổng k + 2k + ... + mk, với m = n // k
    m = n // k
    return k * m * (m + 1) // 2

print(tong_boi(3) + tong_boi(5) - tong_boi(15))
```

Bài 0.7 sẽ giải thích `def`. Ý tưởng "cộng hai lần thì trừ đi" gọi là **bao hàm – loại trừ**, sẽ gặp lại ở Tập 3.

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: lệch một (off-by-one).** `range(1, n)` chỉ chạy tới n − 1. `for (i = 0; i <= n; i++)` chạy n + 1 lượt. Luôn thử với n nhỏ (n = 1, n = 2) để kiểm tra.

> [!WARNING]
> **Bẫy 2: giá trị trung gian vượt giới hạn.** Trong Trò chơi về 1, n ≤ 10⁶ nhưng giá trị giữa chừng có thể lớn hơn nhiều. Bản C++ dùng `long long` cho chắc.

> [!WARNING]
> **Bẫy 3: vòng lặp vô hạn.** Quên cập nhật biến điều kiện (`n //= 10`) thì `while` chạy mãi. Trên judge, em nhận lỗi quá thời gian (TLE) thay vì sai đáp án.

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Weird Algorithm](https://cses.fi/problemset/task/1068) | CSES 1068 | Như bài mở màn, in cả dãy |
| Khởi động | [Bear and Big Brother](https://codeforces.com/problemset/problem/791/A) | CF 791A · 800 | `while` mô phỏng theo năm |
| Luyện | [Nearly Lucky Number](https://codeforces.com/problemset/problem/110/A) | CF 110A · 800 | Tách chữ số, đếm |
| Luyện | [Beautiful Year](https://codeforces.com/problemset/problem/271/A) | CF 271A · 800 | Thử lần lượt từng năm |
| Luyện | Nhập n (n ≤ 10¹⁸), in số đảo ngược của n (ví dụ 1200 → 21) | Tự luyện | Tách chữ số và ghép lại |
| Thử thách | [Number Spiral](https://cses.fi/problemset/task/1071) | CSES 1071 | Không thể lặp tới 10⁹: phải tìm công thức |

---

## 7. Tóm tắt và checkpoint

1. Biết điều kiện dừng nhưng không biết số lần: `while`. Biết số lần: `for`.
2. Ba mẫu: tổng, đếm, lớn nhất. Tách chữ số: `% 10` rồi `// 10`.
3. Trước khi code, đếm số lượt lặp: C++ khoảng 10⁸ mỗi giây, Python khoảng 10⁷.
4. Khi số lượt quá lớn, đi tìm công thức.

<details><summary><code>for i in range(2, 10, 3)</code> cho i nhận những giá trị nào?</summary>2, 5, 8.</details>
<details><summary>Hai vòng lặp lồng nhau, mỗi vòng 10⁵ lượt, có chạy kịp 1 giây bằng C++ không?</summary>Không: 10¹⁰ phép, cần khoảng 100 giây.</details>

**Checkpoint:**

- [ ] Kẻ được bảng chạy tay cho Trò chơi về 1 với n = 7.
- [ ] AC CSES Weird Algorithm và ít nhất 2 bài nấc Luyện.
