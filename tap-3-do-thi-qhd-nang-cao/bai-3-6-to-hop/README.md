# Bài 3.6 – Số học modulo và tổ hợp

> **Tập 3** · Cần biết trước: bài 0.8, 1.6 (đệ quy), 2.5 (bit) · Thời lượng: khoảng 90 phút đọc, 6 giờ thực hành

**Học xong bài này, em sẽ:**

- làm phép cộng, trừ, nhân **theo modulo** mà không tràn số;
- tính aᵇ mod m trong O(log b) bằng **lũy thừa nhanh**;
- "chia" theo modulo nguyên tố bằng **nghịch đảo modulo**, và tính C(n, k) mod p cho nhiều câu hỏi.

---

## 1. Bài toán mở màn: Chọn đội tuyển

Trường có a bạn giỏi Tin, cần chọn b bạn vào đội. Có bao nhiêu cách chọn? Có n câu hỏi như vậy; vì đáp án rất lớn, in phần dư khi chia cho p = 10⁹ + 7. (n ≤ 10⁵, 0 ≤ b ≤ a ≤ 10⁶; bài [Binomial Coefficients](https://cses.fi/problemset/task/1079))

| Vào | Ra |
| --- | --- |
| `3`<br>`5 3`<br>`2 1`<br>`10 7` | `10`<br>`2`<br>`120` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** C(a, b) = a! / (b! · (a − b)!). Có thể tính a! mod p. Nhưng **chia** theo modulo thì sao: (12 mod 7) / (4 mod 7) = 5 / 4, không phải số nguyên?

<details>
<summary>Đáp án</summary>

Không chia trực tiếp được. Thay "chia cho x" bằng "nhân với **nghịch đảo** của x": số y sao cho x·y ≡ 1 (mod p). Với p nguyên tố, y = x^(p−2) mod p (định lý Fermat nhỏ), tính bằng lũy thừa nhanh.

</details>

---

## 2. Quy tắc modulo

| Phép | Viết | Ghi chú |
| --- | --- | --- |
| Cộng | `(a + b) % p` | |
| Trừ | `((a - b) % p + p) % p` | C++: `%` của số âm cho số âm |
| Nhân | `a * b % p` | a, b < p ≈ 10⁹ thì tích < 10¹⁸: vừa `long long` |
| Chia cho x | `a * nghich_dao(x) % p` | chỉ khi p nguyên tố và x không chia hết cho p |

## 3. Lũy thừa nhanh

aᵇ = (a^(b/2))² nếu b chẵn, nhân thêm a nếu b lẻ. Viết bằng vòng lặp theo các bit của b:

Tính 3¹³ (13 = 1101₂):

| Bit của b (từ thấp) | 1 | 0 | 1 | 1 |
| --- | :---: | :---: | :---: | :---: |
| a hiện tại | 3 | 9 | 81 | 6561 |
| Nhân vào kết quả? | có | không | có | có |
| Kết quả | 3 | 3 | 243 | 1 594 323 |

3¹³ = 1 594 323 sau 4 lượt thay vì 12 phép nhân.

```cpp
long long luy_thua(long long a, long long b, long long p) {
    long long kq = 1;
    a %= p;
    while (b > 0) {
        if (b & 1) kq = kq * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return kq;
}
```

## 4. C(n, k) cho nhiều câu hỏi

Tính sẵn `gt[i] = i! mod p` và `ngd[i] = (i!)⁻¹ mod p` tới 10⁶. Chỉ cần **một** lần lũy thừa: ngd[N] = gt[N]^(p−2), rồi đi lùi ngd[i−1] = ngd[i]·i.

```cpp
// file: to_hop.cpp
#include <bits/stdc++.h>
using namespace std;
const long long P = 1000000007;
const int N = 1000000;
long long luy_thua(long long a, long long b) {
    long long kq = 1;
    a %= P;
    while (b > 0) {
        if (b & 1) kq = kq * a % P;
        a = a * a % P;
        b >>= 1;
    }
    return kq;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<long long> gt(N + 1), ngd(N + 1);
    gt[0] = 1;
    for (int i = 1; i <= N; i++) gt[i] = gt[i - 1] * i % P;
    ngd[N] = luy_thua(gt[N], P - 2);                  // Fermat: x^(p-2) là nghịch đảo của x
    for (int i = N; i >= 1; i--) ngd[i - 1] = ngd[i] * i % P;
    int q;
    cin >> q;
    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << gt[a] * ngd[b] % P * ngd[a - b] % P << '\n';
    }
}
```

Chuẩn bị O(N), mỗi câu hỏi O(1).

> [!NOTE]
> **Khi nào dùng tam giác Pascal?** C(n, k) = C(n−1, k−1) + C(n−1, k) chỉ cần cộng, không cần p nguyên tố, nhưng tốn O(n²) bộ nhớ: dùng khi n ≤ 5000, hoặc khi modulo **không** nguyên tố.

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: nhân ba số rồi mới lấy dư.** `gt[a] * ngd[b] * ngd[a-b] % P` tràn số: tích hai số đầu đã gần 10¹⁸. Lấy dư **sau mỗi phép nhân**.

> [!WARNING]
> **Bẫy 2: trừ ra số âm.** `(a - b) % P` có thể âm trong C++. Cộng thêm P.

> [!WARNING]
> **Bẫy 3: nghịch đảo khi p không nguyên tố.** Công thức x^(p−2) chỉ đúng khi p nguyên tố. Đề cho modulo 10⁹ + 7 hay 998 244 353 là nguyên tố; modulo 10⁹ thì không.

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Exponentiation](https://cses.fi/problemset/task/1095) | CSES 1095 | Lũy thừa nhanh |
| Khởi động | [Binomial Coefficients](https://cses.fi/problemset/task/1079) | CSES 1079 | Đúng mục 4 |
| Luyện | [Exponentiation II](https://cses.fi/problemset/task/1712) | CSES 1712 | a^(b^c): số mũ lấy dư theo p − 1 |
| Luyện | [Creating Strings II](https://cses.fi/problemset/task/1715) | CSES 1715 | Hoán vị lặp: n! / (c₁!·c₂!·…) |
| Luyện | [Distributing Apples](https://cses.fi/problemset/task/1716) | CSES 1716 | Chia kẹo Euler: C(n+m−1, m) |
| Thử thách | [Christmas Party](https://cses.fi/problemset/task/1717) | CSES 1717 | Hoán vị không điểm cố định |

---

## 7. Tóm tắt và checkpoint

1. Lấy dư sau **mỗi** phép tính; trừ thì cộng thêm p.
2. Lũy thừa nhanh: duyệt bit của số mũ, O(log b).
3. p nguyên tố: x⁻¹ = x^(p−2); C(n, k) = n! · (k!)⁻¹ · ((n−k)!)⁻¹.

<details><summary>Nghịch đảo của 2 theo modulo 7?</summary>4, vì 2 × 4 = 8 ≡ 1 (mod 7).</details>

**Checkpoint:**

- [ ] Viết lũy thừa nhanh và bảng giai thừa nghịch đảo không nhìn sách.
- [ ] AC Exponentiation II và Distributing Apples.
