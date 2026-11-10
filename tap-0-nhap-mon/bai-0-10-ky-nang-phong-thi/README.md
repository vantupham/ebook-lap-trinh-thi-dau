# Bài 0.10 – Kỹ năng phòng thi và đề thi thử

> **Tập 0** · Cần biết trước: bài 0.1–0.9 · Thời lượng: 120 phút thi thử, cộng 2 giờ chữa bài

**Học xong bài này, em sẽ:**

- có quy trình 120 phút cho một đề 3 bài;
- có checklist trước khi nộp để không mất điểm oan;
- tự đánh giá mình đã sẵn sàng sang Tập 1 chưa.

---

## 1. Quy trình 120 phút

| Thời gian | Việc làm |
| --- | --- |
| 0–10 phút | Đọc **cả ba bài**. Với mỗi bài, ghi ra giấy: ràng buộc, các subtask, độ phức tạp cần đạt (bảng ở bài 0.4). |
| 10–15 phút | Xếp thứ tự làm: bài **chắc ăn và nhiều điểm** trước, không nhất thiết theo số thứ tự bài. |
| 15–90 phút | Làm từng bài: viết bản chắc chắn đúng cho subtask nhỏ **trước**, nộp (lưu) xong mới nâng cấp. |
| 90–110 phút | Quay lại nâng subtask cho bài còn dở. Không bắt đầu ý tưởng hoàn toàn mới lúc này. |
| 110–120 phút | Chạy **checklist** cho cả ba bài. |

> [!IMPORTANT]
> **Luật vàng:** luôn có **một bản đã lưu, chạy đúng** cho mỗi bài. Khi nâng cấp, lưu bản cũ thành tệp khác (ví dụ `BAI2_cham.cpp`) chứ không xóa đi.

## 2. Checklist trước khi nộp

- [ ] Tên tệp chương trình, tệp `.INP`, `.OUT` **đúng từng chữ** như đề; thư mục bài làm đặt đúng quy chế.
- [ ] Hai dòng đọc/ghi tệp **đã bật** (không còn `//` hay `#` ở đầu).
- [ ] Không in thừa chữ, thừa dấu cách lạ, không còn lệnh in để gỡ lỗi.
- [ ] Đã chạy với **mọi ví dụ** của đề và cho kết quả đúng.
- [ ] Đã thử test biên: n nhỏ nhất, n lớn nhất, giá trị bằng nhau, số âm (nếu có).
- [ ] C++: mọi tổng, tích có thể vượt 2·10⁹ đều là `long long`.
- [ ] Đã ước lượng thời gian chạy với dữ liệu lớn nhất.

---

## 3. Đề thi thử

> **Thời gian: 120 phút.** Làm như thi thật: bấm giờ, không xem sách, không tra mạng, đọc/ghi tệp. Tổng điểm: 20.

| Bài | Tên tệp chương trình | Dữ liệu | Kết quả | Điểm |
| --- | --- | --- | --- | :---: |
| 1. Dãy số | `DAYSO.*` | `DAYSO.INP` | `DAYSO.OUT` | 6 |
| 2. Đếm nguyên tố | `DEMNT.*` | `DEMNT.INP` | `DEMNT.OUT` | 7 |
| 3. Chuỗi đèn | `CHUOIDEN.*` | `CHUOIDEN.INP` | `CHUOIDEN.OUT` | 7 |

### Bài 1. Dãy số (6 điểm)

Cho dãy n số nguyên a₁, a₂, …, aₙ. Hãy tính **tổng các số dương** và **số lượng số chẵn** trong dãy.

**Dữ liệu:** dòng đầu là n (1 ≤ n ≤ 10⁵); dòng thứ hai gồm n số nguyên, |aᵢ| ≤ 10⁹.
**Kết quả:** một dòng gồm hai số: tổng các số dương (0 nếu không có), số lượng số chẵn.

| DAYSO.INP | DAYSO.OUT |
| --- | --- |
| `5`<br>`3 -4 0 7 -3` | `10 2` |

Subtask: 50% số điểm có n ≤ 1000 và |aᵢ| ≤ 10⁴.

### Bài 2. Đếm nguyên tố (7 điểm)

Cho T câu hỏi, mỗi câu hỏi gồm hai số L, R. Với mỗi câu hỏi, hãy đếm số các số nguyên tố trong đoạn [L, R].

**Dữ liệu:** dòng đầu là T; T dòng sau, mỗi dòng hai số L, R (1 ≤ L ≤ R ≤ 10⁶).
**Kết quả:** T dòng, mỗi dòng là đáp án của một câu hỏi.

| DEMNT.INP | DEMNT.OUT |
| --- | --- |
| `3`<br>`1 10`<br>`11 20`<br>`14 16` | `4`<br>`4`<br>`0` |

Subtask: 40% số điểm có T ≤ 10, R ≤ 10⁴; 70% số điểm có T ≤ 100; 100% số điểm có T ≤ 10⁵.

### Bài 3. Chuỗi đèn (7 điểm)

Dải đèn trang trí trên đường Nguyễn Huệ có n bóng, mỗi bóng màu đỏ (`R`) hoặc xanh (`G`), mô tả bằng một xâu s. Một **đoạn đều** là một đoạn bóng liên tiếp cùng màu. Hãy tìm độ dài đoạn đều dài nhất và số đoạn đều có độ dài đó (các đoạn được tính khi không thể kéo dài thêm về hai phía).

**Dữ liệu:** một dòng chứa xâu s gồm các ký tự `R`, `G` (1 ≤ độ dài s ≤ 10⁶).
**Kết quả:** một dòng gồm hai số: độ dài lớn nhất, số đoạn đạt độ dài đó.

| CHUOIDEN.INP | CHUOIDEN.OUT |
| --- | --- |
| `RRGGGRGGG` | `3 2` |

Subtask: 50% số điểm có độ dài s ≤ 1000.

---

## 4. Chữa đề

Chỉ mở sau khi đã làm xong 120 phút.

<details>
<summary><b>Bài 1</b> – nhận xét và lời giải</summary>

Hai bẫy đặt sẵn, đúng những gì Tập 0 đã cảnh báo:

- **Tràn số:** tổng có thể tới 10⁵ × 10⁹ = 10¹⁴, vượt `int`. Subtask 50% để các bạn quên `long long` vẫn có điểm.
- **Số âm và phép `%`:** trong C++, `-3 % 2` bằng **−1**, không phải 1. Kiểm tra chẵn bằng `x % 2 == 0` thì đúng; kiểm tra lẻ bằng `x % 2 == 1` thì **sai** với số âm. Số 0 là số chẵn.

```cpp
// file: dayso.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("DAYSO.INP", "r", stdin);
    freopen("DAYSO.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    long long tong = 0;
    int chan = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        if (x > 0) tong += x;
        if (x % 2 == 0) chan++;
    }
    cout << tong << ' ' << chan << '\n';
}
```

```python
# file: dayso.py
import sys
sys.stdin = open("DAYSO.INP", "r")
sys.stdout = open("DAYSO.OUT", "w")
data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:n + 1]))
print(sum(x for x in a if x > 0), sum(1 for x in a if x % 2 == 0))
```

</details>

<details>
<summary><b>Bài 2</b> – nhận xét và lời giải theo subtask</summary>

- **40%:** với mỗi câu hỏi, kiểm tra từng số trong [L, R] bằng hàm O(√n) ở bài 0.8. Khoảng 10 × 10⁴ × 100 = 10⁷ phép.
- **70%:** sàng Eratosthenes **một lần** tới 10⁶, rồi mỗi câu hỏi đếm bằng vòng lặp từ L tới R: 100 × 10⁶ = 10⁸ phép, vừa kịp với C++.
- **100%:** T = 10⁵ câu hỏi, mỗi câu lặp 10⁶ lần là quá chậm. Ý mới: lập mảng **đếm cộng dồn** `dem[i]` = số số nguyên tố trong [1, i]. Khi đó đáp án là `dem[R] - dem[L-1]`, trả lời mỗi câu hỏi trong một phép tính. Kỹ thuật này tên là **tổng tiền tố**, học kỹ ở Tập 1.

```cpp
// file: demnt.cpp
#include <bits/stdc++.h>
using namespace std;
const int MAX = 1000000;
int main() {
    freopen("DEMNT.INP", "r", stdin);
    freopen("DEMNT.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<bool> nt(MAX + 1, true);
    nt[0] = nt[1] = false;
    for (long long p = 2; p * p <= MAX; p++)
        if (nt[p])
            for (long long k = p * p; k <= MAX; k += p) nt[k] = false;
    vector<int> dem(MAX + 1, 0);              // dem[i] = số số nguyên tố trong [1, i]
    for (int i = 1; i <= MAX; i++) dem[i] = dem[i - 1] + (nt[i] ? 1 : 0);
    int t;
    cin >> t;
    while (t--) {
        int l, r;
        cin >> l >> r;
        cout << dem[r] - dem[l - 1] << '\n';
    }
}
```

```python
# file: demnt.py
import sys
sys.stdin = open("DEMNT.INP", "r")
sys.stdout = open("DEMNT.OUT", "w")
MAX = 10 ** 6
nt = bytearray([1]) * (MAX + 1)
nt[0] = nt[1] = 0
p = 2
while p * p <= MAX:
    if nt[p]:
        nt[p * p::p] = bytearray(len(range(p * p, MAX + 1, p)))   # gạch mọi bội một lượt
    p += 1
dem = [0] * (MAX + 1)
for i in range(1, MAX + 1):
    dem[i] = dem[i - 1] + nt[i]
data = sys.stdin.read().split()
t = int(data[0])
out = []
for k in range(t):
    l, r = int(data[1 + 2 * k]), int(data[2 + 2 * k])
    out.append(dem[r] - dem[l - 1])
print('\n'.join(map(str, out)))
```

</details>

<details>
<summary><b>Bài 3</b> – nhận xét và lời giải</summary>

- **50%:** với mỗi vị trí bắt đầu, đi sang phải tới khi đổi màu: O(n²), đủ cho n ≤ 1000.
- **100%:** duyệt **một lần**, giữ độ dài đoạn đang chạy `cur`. Gặp ký tự giống ký tự trước thì `cur += 1`, khác thì kết thúc một đoạn và bắt đầu đoạn mới. Cập nhật kết quả mỗi khi một đoạn kết thúc, **kể cả đoạn cuối cùng** (bẫy hay gặp).

Chạy tay với `RRGGGRGGG`: các đoạn là RR (2), GGG (3), R (1), GGG (3). Dài nhất là 3, có 2 đoạn.

```cpp
// file: chuoiden.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("CHUOIDEN.INP", "r", stdin);
    freopen("CHUOIDEN.OUT", "w", stdout);
    string s;
    cin >> s;
    int n = s.size(), best = 0, so_doan = 0, cur = 0;
    for (int i = 0; i < n; i++) {
        cur = (i > 0 && s[i] == s[i - 1]) ? cur + 1 : 1;
        bool het_doan = (i == n - 1 || s[i + 1] != s[i]);   // đoạn kết thúc tại i
        if (het_doan) {
            if (cur > best) { best = cur; so_doan = 1; }
            else if (cur == best) so_doan++;
        }
    }
    cout << best << ' ' << so_doan << '\n';
}
```

```python
# file: chuoiden.py
import sys
sys.stdin = open("CHUOIDEN.INP", "r")
sys.stdout = open("CHUOIDEN.OUT", "w")
s = sys.stdin.readline().strip()
n = len(s)
best = so_doan = cur = 0
for i in range(n):
    cur = cur + 1 if i > 0 and s[i] == s[i - 1] else 1
    if i == n - 1 or s[i + 1] != s[i]:      # đoạn kết thúc tại i
        if cur > best:
            best, so_doan = cur, 1
        elif cur == best:
            so_doan += 1
print(best, so_doan)
```

</details>

---

## 5. Tự chấm và bước tiếp theo

| Điểm của em | Gợi ý |
| --- | --- |
| Dưới 12 | Ôn lại bài có điểm thấp nhất; làm thêm 5 bài tập nấc Luyện của bài đó rồi thi lại sau 1 tuần. |
| 12–16 | Đạt mục tiêu Tập 0. Xem lại bài mất điểm do lỗi kỹ thuật hay do thuật toán, rồi sang Tập 1. |
| Trên 16 | Sang Tập 1. Em đã sẵn sàng cho kỳ HSG lớp 9 cấp thành phố. |

Nhớ ghi **nhật ký lỗi**: mỗi lần mất điểm, ghi một dòng "bài nào, lỗi gì, lần sau làm gì". Sau vài đề, em sẽ thấy mình hay mắc cùng vài lỗi, và sửa được chúng.
