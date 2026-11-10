# Bài 2.5 – Bit và bitset

> **Tập 2** · Cần biết trước: bài 1.7 (bitmask), bài 1.7 mục 4 (Tàu ngầm 60%) · Thời lượng: khoảng 90 phút đọc, 5 giờ thực hành

**Học xong bài này, em sẽ:**

- dùng các phép toán bit `& | ^ ~ << >>` và các mẹo bit hay gặp;
- dùng **bitset** để xử lý 64 phần tử trong **một** phép tính;
- lấy **trọn điểm** bài Tàu ngầm (BOI 2019).

---

## 1. Bài toán mở màn: Số lẻ loi

Trong dãy n số (n ≤ 10⁶, lẻ), mọi giá trị xuất hiện đúng hai lần, trừ **một** giá trị xuất hiện một lần. Tìm nó, chỉ dùng O(1) bộ nhớ.

| Vào | Ra |
| --- | --- |
| `5`<br>`7 3 7 9 3` | `9` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Phép toán nào "triệt tiêu" khi gặp cùng một số hai lần, giống như cộng rồi trừ?

<details>
<summary>Đáp án</summary>

Phép **XOR** (`^`): x ^ x = 0 và x ^ 0 = x, lại có tính giao hoán. XOR cả dãy thì các cặp triệt tiêu, chỉ còn số lẻ loi.

</details>

---

## 2. Phép toán bit

Mỗi số nguyên là một dãy bit. Với a = 12 (`1100`) và b = 10 (`1010`):

| Phép | Ý nghĩa | a ? b | Kết quả |
| --- | --- | --- | --- |
| `a & b` | AND: 1 khi cả hai bit là 1 | `1100 & 1010` | `1000` = 8 |
| `a \| b` | OR: 1 khi ít nhất một bit là 1 | `1100 \| 1010` | `1110` = 14 |
| `a ^ b` | XOR: 1 khi hai bit khác nhau | `1100 ^ 1010` | `0110` = 6 |
| `a << 1` | dịch trái = nhân 2 | `1100 << 1` | `11000` = 24 |
| `a >> 2` | dịch phải = chia 4 | `1100 >> 2` | `11` = 3 |

Mẹo hay dùng:

| Muốn | Viết |
| --- | --- |
| bit thứ i của x là 1? | `x >> i & 1` |
| bật bit thứ i | `x \| (1LL << i)` |
| số bit 1 | `__builtin_popcountll(x)` (C++), `x.bit_count()` hoặc `bin(x).count('1')` (Python) |
| x là lũy thừa của 2? | `x > 0 && (x & (x - 1)) == 0` |

```cpp
// file: so_le_loi.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    long long x = 0;
    for (int i = 0; i < n; i++) {
        long long a;
        cin >> a;
        x ^= a;
    }
    cout << x << '\n';
}
```

> [!WARNING]
> **Bẫy: `1 << 40`.** `1` là `int` (32 bit), dịch quá 31 là sai. Viết `1LL << 40`.

---

## 3. Bitset: 64 ô một lúc

Máy tính tính AND/OR/dịch trên một số 64 bit **trong một phép**. `bitset<N>` ghép nhiều số 64 bit lại, nên một phép `&` trên `bitset<512>` chỉ tốn khoảng 8 phép máy, thay vì 512 phép nếu xử lý từng ô.

Nhắc lại lời giải 60% bài Tàu ngầm (bài 1.7): giữ **tập các ô có thể đang đứng**, mỗi ký tự cập nhật tập bằng cách duyệt từng ô. O(R·C·M) = 500 × 500 × 5000 = 1,25·10⁹: quá chậm.

Ý mới: biểu diễn mỗi hàng của tập là một bitset, bit j bật nếu ô (i, j) có thể đang đứng. Khi đó **một ký tự** biến cả hàng bằng vài phép bit:

| Ký tự | Hàng i mới | Vì sao |
| --- | --- | --- |
| `E` (sang phải) | `(cu[i] << 1) & trong[i]` | bit j sang j + 1 |
| `W` (sang trái) | `(cu[i] >> 1) & trong[i]` | bit j sang j − 1 |
| `S` (xuống) | `cu[i-1] & trong[i]` | hàng trên rơi xuống hàng i |
| `N` (lên) | `cu[i+1] & trong[i]` | hàng dưới lên hàng i |
| `?` | OR của cả bốn dòng trên | đi được hướng nào cũng tính |

`trong[i]` là bitset các ô trống của hàng i: phép `&` loại cả ô tường lẫn những bit bị dịch ra ngoài bản đồ (các bit ngoài cột C − 1 luôn là 0 trong `trong[i]`).

Ví dụ hàng `.#..` (bit 0 là cột trái nhất) có `trong` bật các bit 0, 2, 3. Nếu tập hiện tại ở hàng này là {cột 0, cột 2} và gặp `E`:

```
cu       : cột 0 ✓, cột 2 ✓          → bit 0, 2
cu << 1  : cột 1 ✓, cột 3 ✓          → bit 1, 3
& trong  : cột 1 là tường, bị loại   → chỉ còn cột 3
```

Độ phức tạp: M × R × (C / 64) ≈ 5000 × 500 × 8 = 2·10⁷ phép: dưới 0,1 giây.

```cpp
// file: tau_ngam_bitset.cpp
#include <bits/stdc++.h>
using namespace std;
const int MAXC = 512;
int main() {
    // Khi thi: bật freopen cho TAUNGAM.INP / TAUNGAM.OUT
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int R, C, M;
    cin >> R >> C >> M;
    vector<bitset<MAXC>> trong(R), cu(R);
    for (int i = 0; i < R; i++) {
        string row;
        cin >> row;
        for (int j = 0; j < C; j++)
            if (row[j] == '.') trong[i][j] = 1;
        cu[i] = trong[i];                      // ban đầu: mọi ô trống
    }
    string s;
    cin >> s;
    vector<bitset<MAXC>> moi(R);
    for (char ch : s) {
        for (int i = 0; i < R; i++) {
            bitset<MAXC> b;
            if (ch == 'E' || ch == '?') b |= cu[i] << 1;
            if (ch == 'W' || ch == '?') b |= cu[i] >> 1;
            if ((ch == 'S' || ch == '?') && i > 0) b |= cu[i - 1];
            if ((ch == 'N' || ch == '?') && i + 1 < R) b |= cu[i + 1];
            moi[i] = b & trong[i];
        }
        swap(cu, moi);
    }
    long long dem = 0;
    for (int i = 0; i < R; i++) dem += cu[i].count();
    cout << dem << '\n';
}
```

**Python:** số nguyên của Python dài tùy ý và các phép bit chạy rất nhanh. Ghép **cả bản đồ** vào một số nguyên: ô (i, j) là bit i·W + j với W = C + 1. Cột thừa thứ C luôn là 0 trong `trong`, làm "vách ngăn" để dịch trái/phải không tràn sang hàng bên cạnh. Khi đó đi xuống là dịch W bit.

```python
# file: tau_ngam_bitset.py
import sys
data = sys.stdin.read().split()
R, C, M = int(data[0]), int(data[1]), int(data[2])
g = data[3:3 + R]
s = data[3 + R] if len(data) > 3 + R else ""
W = C + 1                                   # thêm một cột "vách ngăn" luôn bằng 0
trong = 0
for i in range(R):
    for j in range(C):
        if g[i][j] == '.':
            trong |= 1 << (i * W + j)
cu = trong
for ch in s:
    if ch == 'E':   b = cu << 1
    elif ch == 'W': b = cu >> 1
    elif ch == 'S': b = cu << W
    elif ch == 'N': b = cu >> W
    else:           b = (cu << 1) | (cu >> 1) | (cu << W) | (cu >> W)
    cu = b & trong
print(bin(cu).count('1'))
```

Mỗi bước chỉ 1–7 phép trên một số khoảng 250 000 bit. Đo trên máy thường với bản đồ 500 × 500 và M = 5000: bản Python chạy khoảng 0,5 giây, bản C++ khoảng 0,06 giây, và hai bản cho cùng đáp án.

> [!NOTE]
> Bản đồ 500 × 500 và M = 5000 là giới hạn của BOI 2019. Học sinh dùng Python vẫn lấy được trọn điểm, **nếu biết mẹo số nguyên lớn**.

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: chiều dịch của bitset.** Trong `bitset`, `<<` đưa bit j lên **j + 1** (chỉ số lớn hơn). Nếu em in bitset ra bằng `cout`, bit 0 nằm ở **bên phải**: đừng bị lừa khi gỡ lỗi.

> [!WARNING]
> **Bẫy 2: cập nhật tại chỗ.** Hướng `N` dùng `cu[i-1]`: nếu ghi đè `cu[i-1]` trước khi tính hàng i, kết quả sai. Luôn ghi vào mảng `moi` riêng.

> [!WARNING]
> **Bẫy 3: thiếu cột vách ngăn trong bản Python.** Không có cột thừa, dịch phải ở cuối hàng i sẽ sang đầu hàng i + 1.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Bit Strings](https://cses.fi/problemset/task/1617) | CSES 1617 | 2ⁿ mod 10⁹+7 |
| Khởi động | [Gray Code](https://cses.fi/problemset/task/2205) | CSES 2205 | i ^ (i >> 1) |
| Luyện | Tàu ngầm 100%: sinh bản đồ 500 × 500, M = 5000 và đo thời gian bản 60% với bản bitset | Tự luyện | Thấy sức mạnh của bitset |
| Luyện | [Nautilus](https://oj.uz/problem/view/BOI19_nautilus) | BOI 2019 (oj.uz) | Nộp bài tàu ngầm lên judge quốc tế |
| Thử thách | [Counting Bits](https://cses.fi/problemset/task/1146) | CSES 1146 | Đếm bit 1 từ 1 tới n theo từng bit |

---

## 6. Tóm tắt và checkpoint

1. XOR triệt tiêu cặp giống nhau; `x >> i & 1` đọc bit i; dùng `1LL << i` cho số lớn.
2. Bitset: xử lý 64 phần tử một phép; tập ô trên lưới → mỗi hàng một bitset.
3. Python: một số nguyên lớn làm bitset cả bản đồ, thêm cột vách ngăn.

<details><summary>6 ^ 5 bằng bao nhiêu?</summary><code>110 ^ 101 = 011</code> = 3.</details>
<details><summary>Trong bản Python, đi lên (<code>B</code>) là dịch bit thế nào?</summary>Dịch phải W = C + 1 bit.</details>

**Checkpoint:**

- [ ] AC Nautilus trên oj.uz bằng ngôn ngữ em chọn.
- [ ] Tự giải thích được vai trò của `& trong[i]` sau mỗi phép dịch.
