# Bài 1.8 – Tham lam

> **Tập 1** · Cần biết trước: bài 1.2 · Thời lượng: khoảng 75 phút đọc, 5 giờ thực hành

**Học xong bài này, em sẽ:**

- giải bài tối ưu bằng cách **luôn chọn phương án tốt nhất trước mắt**;
- tìm **phản ví dụ** để loại các ý tham lam sai, trước khi code;
- chứng minh một cách tham lam đúng bằng **lập luận hoán đổi**.

---

## 1. Bài toán mở màn: Liên hoan phim

Liên hoan phim có n suất chiếu, suất i bắt đầu lúc aᵢ và kết thúc lúc bᵢ. Bảo muốn xem trọn vẹn **càng nhiều suất càng tốt**; xem xong một suất có thể vào ngay suất bắt đầu đúng lúc đó. (n ≤ 2·10⁵, aᵢ < bᵢ ≤ 10⁹; bài [Movie Festival](https://cses.fi/problemset/task/1629))

| Vào | Ra |
| --- | --- |
| `3`<br>`3 5`<br>`4 9`<br>`5 8` | `2` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Ba bạn đề xuất ba cách chọn "tham lam":
> - **An:** chọn suất **bắt đầu sớm nhất** trước.
> - **Chi:** chọn suất **ngắn nhất** trước.
> - **Bảo:** chọn suất **kết thúc sớm nhất** trước.
>
> Hãy tìm phản ví dụ cho từng cách. Cách nào không tìm được phản ví dụ?

<details>
<summary>Đáp án</summary>

- **An sai:** `1 100`, `2 3`, `4 5`. An chọn `1 100` rồi hết chỗ: 1 suất. Đúng là 2.
- **Chi sai:** `1 5`, `4 7`, `6 10`. Suất ngắn nhất `4 7` chặn cả hai suất còn lại: 1 suất. Đúng là 2 (`1 5`, `6 10`).
- **Bảo đúng.** Chứng minh ở mục 3.

</details>

---

## 2. Lời giải: kết thúc sớm nhất trước

Sắp xếp theo thời điểm kết thúc. Duyệt lần lượt; suất nào bắt đầu không sớm hơn lúc suất trước kết thúc thì xem.

| Suất (đã sắp theo kết thúc) | Bắt đầu ≥ lúc rảnh? | Xem? | Rảnh từ |
| --- | :---: | :---: | :---: |
| 3 → 5 | 3 ≥ 0 | có | 5 |
| 5 → 8 | 5 ≥ 5 | có | 8 |
| 4 → 9 | 4 ≥ 8? không | không | 8 |

```cpp
// file: lien_hoan_phim.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<pair<long long, long long>> p(n);     // (kết thúc, bắt đầu) để sort theo kết thúc
    for (auto &[b, a] : p) cin >> a >> b;
    sort(p.begin(), p.end());
    long long ranh = 0;
    int dem = 0;
    for (auto [b, a] : p)
        if (a >= ranh) { dem++; ranh = b; }
    cout << dem << '\n';
}
```

```python
# file: lien_hoan_phim.py
import sys
data = sys.stdin.buffer.read().split()
n = int(data[0])
p = sorted(((int(data[2 + 2 * i]), int(data[1 + 2 * i])) for i in range(n)))   # (kết thúc, bắt đầu)
ranh = dem = 0
for b, a in p:
    if a >= ranh:
        dem += 1
        ranh = b
print(dem)
```

---

## 3. Vì sao đúng: lập luận hoán đổi

Xét một lịch xem **tốt nhất** bất kỳ, gọi suất đầu tiên trong đó là X. Gọi G là suất kết thúc sớm nhất trong tất cả các suất (suất mà Bảo chọn đầu tiên).

- G kết thúc không muộn hơn X.
- Vậy **thay X bằng G**, lịch vẫn hợp lệ: mọi suất sau X bắt đầu sau khi X kết thúc, nên cũng sau khi G kết thúc.
- Số suất không đổi, nên vẫn tốt nhất.

Tức là luôn có một lịch tốt nhất bắt đầu bằng lựa chọn của Bảo. Lặp lại lập luận cho phần còn lại: mọi lựa chọn của Bảo đều "an toàn".

> [!NOTE]
> **Khuôn chứng minh tham lam:** lấy một lời giải tốt nhất bất kỳ, chỉ ra có thể **đổi** một phần của nó thành lựa chọn tham lam mà không làm kết quả tệ đi. Nếu không chứng minh được, hãy tìm phản ví dụ bằng stress test (bài 1.9) trước khi tin.

---

## 4. Khi tham lam sai: đổi tiền

Có các đồng xu mệnh giá 1, 3, 4. Cần đổi 6 với ít đồng nhất. Tham lam "lấy đồng lớn nhất có thể": 4 + 1 + 1 = **3 đồng**. Nhưng 3 + 3 = **2 đồng**.

Với bộ mệnh giá tiền Việt Nam (1, 2, 5, 10, …), tham lam lại đúng. Cùng một ý tưởng, đúng hay sai **phụ thuộc dữ liệu**. Bài đổi tiền với mệnh giá bất kỳ giải bằng quy hoạch động ở Tập 2.

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: tin trực giác.** Ý tham lam "nghe hợp lý" sai rất thường xuyên. Luôn thử tìm phản ví dụ nhỏ bằng tay, hoặc viết vét cạn để đối chiếu.

> [!WARNING]
> **Bẫy 2: sai điều kiện bằng.** Đề cho phép vào suất bắt đầu **đúng lúc** suất trước kết thúc: điều kiện là `a >= ranh`, không phải `a > ranh`. Đọc kỹ đề ở chỗ "bằng".

> [!WARNING]
> **Bẫy 3: sắp xếp sai khóa.** Sắp theo cặp (bắt đầu, kết thúc) là sắp theo **bắt đầu**, tức cách của An. Đặt kết thúc ở vị trí đầu cặp.

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Movie Festival](https://cses.fi/problemset/task/1629) | CSES 1629 | Đúng mục 2 |
| Khởi động | [Stick Lengths](https://cses.fi/problemset/task/1074) | CSES 1074 | Chọn trung vị |
| Luyện | [Tasks and Deadlines](https://cses.fi/problemset/task/1630) | CSES 1630 | Việc ngắn làm trước, chứng minh hoán đổi |
| Luyện | [Missing Coin Sum](https://cses.fi/problemset/task/2183) | CSES 2183 | Sắp xếp + nhận xét tham lam |
| Luyện | [Boys and Girls](https://codeforces.com/problemset/problem/253/A) | CF 253A · 1100 | Tham lam xen kẽ |
| Thử thách | [Towers](https://cses.fi/problemset/task/1073) | CSES 1073 | Tham lam + `multiset` (xem trước Tập 2) |

---

## 7. Tóm tắt và checkpoint

1. Tham lam: sắp xếp theo một tiêu chí rồi chọn lần lượt.
2. Trước khi code: tìm phản ví dụ cho mọi ý tham lam đang có.
3. Chứng minh: đổi một phần lời giải tốt nhất thành lựa chọn tham lam mà không tệ đi.

<details><summary>Phản ví dụ cho "chọn suất ngắn nhất trước"?</summary><code>1 5</code>, <code>4 7</code>, <code>6 10</code>: chọn <code>4 7</code> chỉ được 1 suất, đúng là 2.</details>
<details><summary>Mệnh giá 1, 3, 4, đổi 6: tham lam cho mấy đồng, tối ưu mấy đồng?</summary>Tham lam 3 đồng (4+1+1), tối ưu 2 đồng (3+3).</details>

**Checkpoint:**

- [ ] AC Movie Festival và Tasks and Deadlines.
- [ ] Trình bày được bằng lời chứng minh hoán đổi cho bài Liên hoan phim.
