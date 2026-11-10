# Bài 0.8 – Số học cơ bản

> **Tập 0** · Cần biết trước: bài 0.4, 0.5, 0.7 · Thời lượng: khoảng 90 phút đọc, 6 giờ thực hành

**Học xong bài này, em sẽ:**

- tính ƯCLN bằng thuật toán Euclid và BCNN mà không tràn số;
- kiểm tra số nguyên tố trong O(√n), liệt kê ước trong O(√n);
- dùng **sàng Eratosthenes** để tìm mọi số nguyên tố tới 10⁶–10⁷.

Đây là nhóm bài gặp nhiều nhất ở đề HSG lớp 9.

---

## 1. Bài toán mở màn: Hai ngọn đèn

Trên cầu Ba Son có hai ngọn đèn trang trí. Đèn thứ nhất chớp sau mỗi a giây, đèn thứ hai sau mỗi b giây (1 ≤ a, b ≤ 10⁹). Lúc 0 giây cả hai cùng chớp. Hỏi sau bao nhiêu giây chúng lại cùng chớp lần đầu tiên?

| Vào | Ra |
| --- | --- |
| `4 6` | `12` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Đáp án chính là BCNN(a, b). Với a, b tới 10⁹, cách "thử lần lượt 1, 2, 3, … giây" cần tối đa bao nhiêu bước? BCNN có thể lớn tới đâu?

<details>
<summary>Đáp án</summary>

BCNN có thể tới a × b = 10¹⁸ (khi a, b nguyên tố cùng nhau), nên thử lần lượt có thể cần 10¹⁸ bước. Cần công thức: **BCNN(a, b) = a / ƯCLN(a, b) × b**. Kết quả tới 10¹⁸ nên phải dùng `long long`.

</details>

---

## 2. Thuật toán Euclid

Ý tưởng: ƯCLN(a, b) = ƯCLN(b, a mod b), và ƯCLN(a, 0) = a.

Chạy tay với ƯCLN(84, 36):

| Bước | a | b | a mod b |
| :---: | :---: | :---: | :---: |
| 1 | 84 | 36 | 12 |
| 2 | 36 | 12 | 0 |
| 3 | 12 | 0 | dừng: ƯCLN = 12 |

Số bước rất ít: kể cả với số cỡ 10¹⁸ cũng chỉ khoảng 90 bước.

```python
# file: hai_ngon_den.py
def ucln(a, b):
    while b != 0:
        a, b = b, a % b
    return a

a, b = map(int, input().split())
print(a // ucln(a, b) * b)      # chia TRƯỚC rồi mới nhân
```

```cpp
// file: hai_ngon_den.cpp
#include <bits/stdc++.h>
using namespace std;
long long ucln(long long a, long long b) {
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}
int main() {
    long long a, b;
    cin >> a >> b;
    cout << a / ucln(a, b) * b << '\n';   // chia trước để giá trị trung gian nhỏ hơn
}
```

> [!NOTE]
> Python có sẵn `math.gcd(a, b)`; C++ (từ C++17) có `gcd(a, b)`. Em nên biết tự viết, vì ý tưởng Euclid còn dùng ở nhiều bài khác.

---

## 3. Ước và số nguyên tố trong O(√n)

Nếu d là ước của n thì n / d cũng là ước. Trong mỗi cặp (d, n/d), một số **không vượt quá √n**. Vậy chỉ cần thử d từ 1 tới √n.

Ví dụ n = 36: các cặp (1, 36), (2, 18), (3, 12), (4, 9), (6, 6). Thử d = 1..6 là đủ.

```python
# file: kiem_tra_nguyen_to.py
def la_nguyen_to(n):
    if n < 2:
        return False
    d = 2
    while d * d <= n:          # tương đương d <= căn n, nhưng không dùng số thực
        if n % d == 0:
            return False
        d += 1
    return True

n = int(input())
print("YES" if la_nguyen_to(n) else "NO")
```

```cpp
// file: kiem_tra_nguyen_to.cpp
#include <bits/stdc++.h>
using namespace std;
bool la_nguyen_to(long long n) {
    if (n < 2) return false;
    for (long long d = 2; d * d <= n; d++)
        if (n % d == 0) return false;
    return true;
}
int main() {
    long long n;
    cin >> n;
    cout << (la_nguyen_to(n) ? "YES" : "NO") << '\n';
}
```

Với n ≤ 10¹², vòng lặp chạy tối đa 10⁶ lượt: nhanh.

---

## 4. Sàng Eratosthenes

Khi cần **mọi** số nguyên tố tới N (hoặc kiểm tra nhiều số), dùng sàng: viết các số 2..N; lấy số nhỏ nhất chưa bị gạch, đó là số nguyên tố; gạch mọi bội của nó; lặp lại.

Sàng với N = 30 (dấu × là bị gạch, ghi số nguyên tố đã gạch nó):

| Số nguyên tố p | Gạch các bội, bắt đầu từ p² |
| :---: | --- |
| 2 | 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 |
| 3 | 9, 15, 21, 27 (6, 12, … đã bị 2 gạch) |
| 5 | 25 |
| 7 | 7² = 49 > 30: dừng |

Còn lại: **2, 3, 5, 7, 11, 13, 17, 19, 23, 29**.

Vì sao bắt đầu từ p²? Các bội nhỏ hơn như 2p, 3p đã bị gạch bởi 2, 3 trước đó. Độ phức tạp khoảng N log log N, gần như O(N).

Bài: nhập N (2 ≤ N ≤ 10⁶), in số lượng số nguyên tố không vượt quá N.

```python
# file: sang.py
n = int(input())
nt = [True] * (n + 1)
nt[0] = nt[1] = False
p = 2
while p * p <= n:
    if nt[p]:
        for k in range(p * p, n + 1, p):
            nt[k] = False
    p += 1
print(sum(nt))
```

```cpp
// file: sang.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<bool> nt(n + 1, true);
    nt[0] = nt[1] = false;
    for (long long p = 2; p * p <= n; p++)
        if (nt[p])
            for (long long k = p * p; k <= n; k += p) nt[k] = false;
    cout << count(nt.begin(), nt.end(), true) << '\n';
}
```

> [!TIP]
> **Python với N = 10⁷.** Thay vòng `for k` bằng phép gán lát cắt: `nt[p*p::p] = [False] * len(range(p*p, n + 1, p))`, hoặc dùng `bytearray`. Nhanh hơn nhiều lần.

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: BCNN tràn số.** `a * b / ucln(a, b)` tính `a * b` trước, có thể vượt cả `long long` khi a, b gần 10¹⁸ hoặc vượt `int` khi a, b gần 10⁹. Luôn **chia trước, nhân sau**.

> [!WARNING]
> **Bẫy 2: 1 không phải số nguyên tố.** Hàm kiểm tra phải trả về sai với n = 0 và n = 1.

> [!WARNING]
> **Bẫy 3: dùng `sqrt` số thực.** `for (d = 2; d <= sqrt(n); d++)` có thể sai lệch với n lớn do sai số. Viết `d * d <= n` với `d` kiểu `long long`.

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | Nhập n (n ≤ 10¹²), in số ước của n | Tự luyện | Cặp ước (d, n/d), chú ý d = n/d |
| Khởi động | [Almost Prime](https://codeforces.com/problemset/problem/26/A) | CF 26A · 900 | Đếm ước nguyên tố |
| Luyện | [T-primes](https://codeforces.com/problemset/problem/230/B) | CF 230B · 1300 | Sàng + số chính phương |
| Luyện | Nhập n số (n ≤ 10⁵, mỗi số ≤ 10⁶), đếm có bao nhiêu số nguyên tố | Tự luyện | Sàng một lần, tra nhiều lần |
| Luyện | Nhập n số, in ƯCLN của cả dãy | Tự luyện | ƯCLN(a, b, c) = ƯCLN(ƯCLN(a, b), c) |
| Thử thách | [Counting Divisors](https://cses.fi/problemset/task/1713) | CSES 1713 | Sàng ước cho nhiều truy vấn |

---

## 7. Tóm tắt và checkpoint

1. ƯCLN: Euclid, `a, b = b, a % b` tới khi b = 0. BCNN = a / ƯCLN × b.
2. Ước, kiểm tra nguyên tố: thử d với `d * d <= n`, O(√n).
3. Nhiều số cần kiểm tra, hoặc cần mọi số nguyên tố tới N: sàng Eratosthenes.

<details><summary>ƯCLN(48, 18) qua từng bước Euclid?</summary>(48, 18) → (18, 12) → (12, 6) → (6, 0): bằng 6.</details>
<details><summary>Trong sàng, vì sao bắt đầu gạch từ p²?</summary>Các bội kp với k &lt; p đã bị gạch bởi một số nguyên tố nhỏ hơn p.</details>
<details><summary>Có bao nhiêu số nguyên tố không vượt quá 30?</summary>10.</details>

**Checkpoint:**

- [ ] Viết sàng Eratosthenes không nhìn sách trong 5 phút.
- [ ] AC CF 230B T-primes.
