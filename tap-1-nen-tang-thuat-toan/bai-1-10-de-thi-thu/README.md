# Bài 1.10 – Đề thi thử Tập 1

> **Thời gian: 120 phút.** Làm như thi thật: bấm giờ, đọc/ghi tệp, không xem sách. Tổng điểm: 20. Đề tự soạn theo cấu trúc thường gặp của đề HSG cấp tỉnh/thành phố: 3 bài, chấm theo subtask.

Trước khi làm, đọc lại [quy trình 120 phút và checklist](../../tap-0-nhap-mon/bai-0-10-ky-nang-phong-thi/) ở Tập 0. Bài mới của Tập 1: với mỗi bài, **ghi ra giấy độ phức tạp cần đạt cho từng subtask** trước khi code.

| Bài | Tên tệp chương trình | Dữ liệu | Kết quả | Điểm |
| --- | --- | --- | --- | :---: |
| 1. Doanh thu | `DOANHTHU.*` | `DOANHTHU.INP` | `DOANHTHU.OUT` | 6 |
| 2. Cặp số | `CAPSO.*` | `CAPSO.INP` | `CAPSO.OUT` | 7 |
| 3. Chia kẹo | `CHIAKEO.*` | `CHIAKEO.INP` | `CHIAKEO.OUT` | 7 |

---

### Bài 1. Doanh thu (6 điểm)

Cửa hàng ghi doanh thu n ngày a₁ … aₙ. Một ngày gọi là **đạt** nếu doanh thu không dưới K. Có q câu hỏi, mỗi câu gồm l, r: hãy cho biết tổng doanh thu và số ngày đạt trong các ngày từ l tới r.

**Dữ liệu:** dòng đầu gồm n, K, q (1 ≤ n, q ≤ 2·10⁵; 0 ≤ K ≤ 10⁹). Dòng hai gồm n số aᵢ (0 ≤ aᵢ ≤ 10⁹). q dòng sau, mỗi dòng gồm l, r (1 ≤ l ≤ r ≤ n).
**Kết quả:** q dòng, mỗi dòng hai số: tổng doanh thu, số ngày đạt.

| DOANHTHU.INP | DOANHTHU.OUT |
| --- | --- |
| `5 5 2`<br>`3 8 5 1 9`<br>`1 3`<br>`2 5` | `16 2`<br>`23 3` |

Subtask: 50% số điểm có n, q ≤ 1000.

### Bài 2. Cặp số (7 điểm)

Cho dãy n số nguyên dương a₁ … aₙ và số X. Đếm số cặp chỉ số (i, j) với i < j sao cho aᵢ + aⱼ ≤ X.

**Dữ liệu:** dòng đầu gồm n, X (2 ≤ n ≤ 2·10⁵; 1 ≤ X ≤ 2·10⁹). Dòng hai gồm n số (1 ≤ aᵢ ≤ 10⁹).
**Kết quả:** một số nguyên là số cặp.

| CAPSO.INP | CAPSO.OUT |
| --- | --- |
| `5 7`<br>`1 5 3 6 2` | `6` |

Subtask: 40% số điểm có n ≤ 2000.

### Bài 3. Chia kẹo (7 điểm)

Có n gói kẹo, gói i có wᵢ viên. Cần chia **mọi gói** cho ba bạn An, Bảo, Chi (không mở gói; một bạn có thể không nhận gói nào). Gọi số kẹo của ba bạn là x, y, z. Hãy làm cho max(x, y, z) − min(x, y, z) nhỏ nhất.

**Dữ liệu:** dòng đầu là n (1 ≤ n ≤ 12). Dòng hai gồm n số wᵢ (1 ≤ wᵢ ≤ 10⁹).
**Kết quả:** giá trị nhỏ nhất của max − min.

| CHIAKEO.INP | CHIAKEO.OUT |
| --- | --- |
| `4`<br>`3 1 4 2` | `1` |

Một cách chia tốt nhất: An {4}, Bảo {3}, Chi {1, 2}: 4, 3, 3.

Subtask: 50% số điểm có n ≤ 8.

---

## Chữa đề

Chỉ mở sau khi đã làm xong 120 phút.

<details>
<summary><b>Bài 1</b> – tổng tiền tố, hai lần</summary>

- **50%:** mỗi câu hỏi duyệt từ l tới r: O(n·q) = 10⁶.
- **100%:** hai mảng tiền tố: `p[i]` = tổng doanh thu, `d[i]` = số ngày đạt trong 1..i. Mỗi câu hỏi O(1). Tổng tới 2·10¹⁴: `long long`.

```cpp
// file: doanhthu.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("DOANHTHU.INP", "r", stdin);
    freopen("DOANHTHU.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    long long K;
    cin >> n >> K >> q;
    vector<long long> p(n + 1, 0);
    vector<int> d(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        p[i] = p[i - 1] + x;
        d[i] = d[i - 1] + (x >= K);
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << p[r] - p[l - 1] << ' ' << d[r] - d[l - 1] << '\n';
    }
}
```

```python
# file: doanhthu.py
import sys
sys.stdin = open("DOANHTHU.INP", "rb")
sys.stdout = open("DOANHTHU.OUT", "w")
data = sys.stdin.read().split()
n, K, q = int(data[0]), int(data[1]), int(data[2])
p = [0] * (n + 1)
d = [0] * (n + 1)
for i in range(1, n + 1):
    x = int(data[2 + i])
    p[i] = p[i - 1] + x
    d[i] = d[i - 1] + (x >= K)
out = []
pos = 3 + n
for _ in range(q):
    l, r = int(data[pos]), int(data[pos + 1])
    pos += 2
    out.append(f"{p[r] - p[l - 1]} {d[r] - d[l - 1]}")
print('\n'.join(out))
```

</details>

<details>
<summary><b>Bài 2</b> – sắp xếp + hai con trỏ</summary>

- **40%:** thử mọi cặp: O(n²) = 4·10⁶.
- **100%:** thứ tự các phần tử không ảnh hưởng số cặp, nên **sắp xếp**. Với mỗi l từ trái sang, giảm r tới khi a[l] + a[r] ≤ X; khi đó mọi j trong (l, r] đều ghép được với l, cộng thêm r − l cặp. l tăng thì a[l] tăng, r chỉ giảm: hai con trỏ, O(n log n).
- Số cặp tới n²/2 = 2·10¹⁰: `long long`. Tổng a[l] + a[r] tới 2·10⁹: vượt `int`.

Chạy tay với `1 2 3 5 6`, X = 7:

| l | a[l] | r sau khi giảm | Cặp mới (r − l) |
| :---: | :---: | :---: | :---: |
| 0 | 1 | 4 (1 + 6 = 7) | 4 |
| 1 | 2 | 3 (2 + 5 = 7) | 2 |
| 2 | 3 | 2 (3 + 5 > 7, r giảm tới bằng l: dừng) | 0 |

Tổng 6.

```cpp
// file: capso.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("CAPSO.INP", "r", stdin);
    freopen("CAPSO.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long X;
    cin >> n >> X;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    sort(a.begin(), a.end());
    long long dem = 0;
    int r = n - 1;
    for (int l = 0; l < n; l++) {
        while (r > l && a[l] + a[r] > X) r--;
        if (r <= l) break;
        dem += r - l;
    }
    cout << dem << '\n';
}
```

```python
# file: capso.py
import sys
sys.stdin = open("CAPSO.INP", "rb")
sys.stdout = open("CAPSO.OUT", "w")
data = sys.stdin.read().split()
n, X = int(data[0]), int(data[1])
a = sorted(map(int, data[2:2 + n]))
dem, r = 0, n - 1
for l in range(n):
    while r > l and a[l] + a[r] > X:
        r -= 1
    if r <= l:
        break
    dem += r - l
print(dem)
```

</details>

<details>
<summary><b>Bài 3</b> – quay lui chia ba</summary>

- n ≤ 12: mỗi gói có 3 lựa chọn, 3¹² = 531 441 cách. Vét cạn được.
- Quay lui: gói i giao cho bạn 0, 1 hoặc 2; cộng vào tổng của bạn đó, đi tiếp, rồi trừ ra.
- **Cắt nhánh** (giúp Python chạy nhanh hơn): gói đầu tiên luôn giao cho An, vì đổi tên ba bạn không đổi kết quả. Còn 3¹¹ = 177 147 cách.
- Tổng tới 1,2·10¹⁰: `long long`.

```cpp
// file: chiakeo.cpp
#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> w;
long long s[3], best = LLONG_MAX;

void chia(int i) {
    if (i == n) {
        best = min(best, max({s[0], s[1], s[2]}) - min({s[0], s[1], s[2]}));
        return;
    }
    for (int b = 0; b < 3; b++) {
        if (i == 0 && b > 0) break;      // gói đầu luôn cho bạn 0
        s[b] += w[i];
        chia(i + 1);
        s[b] -= w[i];
    }
}

int main() {
    freopen("CHIAKEO.INP", "r", stdin);
    freopen("CHIAKEO.OUT", "w", stdout);
    cin >> n;
    w.resize(n);
    for (auto &x : w) cin >> x;
    chia(0);
    cout << best << '\n';
}
```

```python
# file: chiakeo.py
import sys
sys.stdin = open("CHIAKEO.INP", "r")
sys.stdout = open("CHIAKEO.OUT", "w")
data = sys.stdin.read().split()
n = int(data[0])
w = list(map(int, data[1:n + 1]))
s = [0, 0, 0]
best = None

def chia(i):
    global best
    if i == n:
        d = max(s) - min(s)
        if best is None or d < best:
            best = d
        return
    for b in range(1 if i == 0 else 3):
        s[b] += w[i]
        chia(i + 1)
        s[b] -= w[i]

chia(0)
print(best)
```

</details>

---

## Tự chấm và bước tiếp theo

| Điểm của em | Gợi ý |
| --- | --- |
| Dưới 13 | Xem bài mất điểm thuộc kỹ thuật nào (tiền tố, hai con trỏ, quay lui); làm lại bài học đó và 3 bài tập nấc Luyện, thi lại sau 1 tuần. |
| 13–17 | Đạt mục tiêu Tập 1. Ghi nhật ký lỗi rồi sang Tập 2. |
| Trên 17 | Sang Tập 2. Làm thêm [đề luyện số 1](../../tap-5-de-thi-chien-luoc/bai-5-2-de-luyen-chon-doi-tuyen/) trong 120 phút: mục tiêu 15/20. |
