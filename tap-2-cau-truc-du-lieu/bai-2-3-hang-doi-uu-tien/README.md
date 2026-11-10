# Bài 2.3 – Hàng đợi ưu tiên

> **Tập 2** · Cần biết trước: bài 1.8 (tham lam), 2.2 · Thời lượng: khoảng 60 phút đọc, 4 giờ thực hành

**Học xong bài này, em sẽ:**

- dùng `priority_queue` để luôn lấy được phần tử lớn nhất (hoặc nhỏ nhất) trong O(log n);
- đổi thành heap nhỏ nhất trong C++, và dùng `heapq` trong Python;
- kết hợp heap với tham lam.

---

## 1. Bài toán mở màn: Nối dây

Thợ điện có n đoạn dây dài a₁ … aₙ. Mỗi lần nối hai đoạn dài x và y thành một đoạn x + y, tốn **x + y** đồng. Nối tới khi còn một đoạn. Chi phí nhỏ nhất là bao nhiêu? (n ≤ 2·10⁵, aᵢ ≤ 10⁹)

| Vào | Ra |
| --- | --- |
| `4`<br>`4 3 2 6` | `29` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Một đoạn dây bị "trả tiền" lại mỗi lần nó nằm trong một lần nối. Vậy nên nối những đoạn nào trước?

<details>
<summary>Đáp án</summary>

Đoạn nối sớm bị cộng vào chi phí nhiều lần nhất, nên nối **hai đoạn ngắn nhất** trước (tham lam, chứng minh bằng hoán đổi như bài 1.8). Mỗi bước cần lấy hai phần tử nhỏ nhất của một tập luôn thay đổi: đúng việc của hàng đợi ưu tiên.

</details>

---

## 2. Hàng đợi ưu tiên

| Bước | Các đoạn hiện có | Nối | Chi phí bước | Tổng |
| :---: | --- | --- | :---: | :---: |
| 1 | 2 3 4 6 | 2 + 3 | 5 | 5 |
| 2 | 4 5 6 | 4 + 5 | 9 | 14 |
| 3 | 6 9 | 6 + 9 | 15 | **29** |

| Thao tác | C++ heap nhỏ nhất | Python `heapq` |
| --- | --- | --- |
| khai báo | `priority_queue<long long, vector<long long>, greater<long long>> pq;` | `h = []` |
| thêm | `pq.push(x)` | `heapq.heappush(h, x)` |
| xem nhỏ nhất | `pq.top()` | `h[0]` |
| lấy nhỏ nhất ra | `pq.pop()` | `heapq.heappop(h)` |

`priority_queue<long long>` không có tham số thêm là **heap lớn nhất**. Python `heapq` luôn là heap nhỏ nhất; muốn lớn nhất thì đẩy vào **−x**.

```cpp
// file: noi_day.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        pq.push(x);
    }
    long long tong = 0;
    while (pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        tong += a + b;
        pq.push(a + b);
    }
    cout << tong << '\n';
}
```

Mỗi thao tác O(log n), có n − 1 lần nối: O(n log n). Nếu sắp xếp lại cả mảng sau mỗi lần nối thì thành O(n² log n).

---

## 3. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: nhầm heap lớn nhất và nhỏ nhất.** `priority_queue<long long>` trả về **lớn nhất**. Chạy thử với ví dụ của đề trước khi nộp.

> [!WARNING]
> **Bẫy 2: tràn số.** Tổng chi phí có thể tới khoảng 2·10⁵ × 2·10¹⁴: vẫn trong `long long`, nhưng chắc chắn vượt `int`.

> [!WARNING]
> **Bẫy 3: n = 1.** Không cần nối, chi phí 0. Vòng `while (pq.size() > 1)` xử lý đúng.

---

## 4. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Stick Divisions](https://cses.fi/problemset/task/1161) | CSES 1161 | Đúng bài Nối dây, nhìn ngược |
| Luyện | [Room Allocation](https://cses.fi/problemset/task/1164) | CSES 1164 | Heap các phòng theo giờ trống |
| Luyện | Có n việc, việc i cần làm trước hạn dᵢ và cho lãi pᵢ; mỗi ngày làm một việc. Tối đa lãi | Tự luyện | Sắp theo hạn + heap lãi nhỏ nhất |
| Thử thách | [Sliding Median](https://cses.fi/problemset/task/1076) | CSES 1076 | Hai heap hoặc hai `multiset` |

---

## 5. Tóm tắt và checkpoint

1. `priority_queue`: lấy lớn nhất (mặc định) hoặc nhỏ nhất (`greater`) trong O(log n).
2. Python: `heapq` là heap nhỏ nhất; heap lớn nhất thì đẩy −x.
3. Tham lam "luôn chọn nhỏ nhất/lớn nhất hiện tại" trên tập thay đổi: nghĩ tới heap.

<details><summary>Nối dây với <code>1 1 1 1</code> tốn bao nhiêu?</summary>1+1=2, 1+1=2, 2+2=4: tổng 8.</details>

**Checkpoint:**

- [ ] AC CSES Stick Divisions và Room Allocation.
