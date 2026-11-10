# Bài 2.6 – Min trên đoạn

> **Tập 2** · Cần biết trước: bài 2.1 (`deque`), 2.4 (ngăn xếp đơn điệu), 1.3 · Thời lượng: khoảng 75 phút đọc, 5 giờ thực hành

**Học xong bài này, em sẽ:**

- tìm min của **mọi cửa sổ dài k** trong O(n) bằng hàng đợi đơn điệu;
- trả lời min của **đoạn bất kỳ** trong O(1) sau O(n log n) chuẩn bị, bằng **sparse table**;
- biết vì sao tổng tiền tố (bài 1.3) không dùng được cho min.

---

## 1. Bài toán mở màn: Ngày lạnh nhất trong tuần

Đài khí tượng có nhiệt độ n ngày. Với **mỗi** cửa sổ k ngày liên tiếp, in nhiệt độ thấp nhất. (n ≤ 10⁶)

| Vào | Ra |
| --- | --- |
| `8 3`<br>`1 3 -1 -3 5 3 6 7` | `-1 -3 -3 -3 3 3` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Với tổng, ta có p[r] − p[l−1]. Có "phép trừ" nào cho min không? Nếu không, khi cửa sổ trượt sang phải một ô, phần tử nào trong cửa sổ **không bao giờ** còn có thể là min?

<details>
<summary>Đáp án</summary>

Min không có phép ngược, nên tiền tố không dùng được. Nhưng nếu j đứng trước k và a[j] ≥ a[k], thì j vô dụng từ khi k vào cửa sổ: k vừa nhỏ hơn hoặc bằng, vừa ở lại lâu hơn. Giống hệt ý của ngăn xếp đơn điệu (bài 2.4).

</details>

---

## 2. Hàng đợi đơn điệu

Giữ một `deque` các **chỉ số** có giá trị tăng dần từ đầu tới cuối:

1. Thêm i vào cuối: trước đó bỏ ở **cuối** mọi chỉ số có giá trị ≥ a[i] (chúng vô dụng).
2. Bỏ ở **đầu** chỉ số đã ra khỏi cửa sổ (≤ i − k).
3. Đầu deque là chỉ số của min.

| i | a[i] | Bỏ cuối | Bỏ đầu (hết hạn) | deque (giá trị) | Min |
| :---: | :---: | --- | --- | --- | :---: |
| 0 | 1 | — | — | 1 | |
| 1 | 3 | — | — | 1 3 | |
| 2 | −1 | 3, 1 | — | −1 | −1 |
| 3 | −3 | −1 | — | −3 | −3 |
| 4 | 5 | — | — | −3 5 | −3 |
| 5 | 3 | 5 | — | −3 3 | −3 |
| 6 | 6 | — | −3 (chỉ số 3 ≤ 6 − 3) | 3 6 | 3 |
| 7 | 7 | — | — | 3 6 7 | 3 |

```cpp
// file: min_cua_so.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    cin >> n >> k;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    deque<int> dq;                                   // chỉ số, giá trị tăng dần
    vector<long long> kq;
    for (int i = 0; i < n; i++) {
        while (!dq.empty() && a[dq.back()] >= a[i]) dq.pop_back();
        dq.push_back(i);
        if (dq.front() <= i - k) dq.pop_front();     // ra khỏi cửa sổ [i-k+1, i]
        if (i >= k - 1) kq.push_back(a[dq.front()]);
    }
    for (size_t i = 0; i < kq.size(); i++) cout << kq[i] << (i + 1 == kq.size() ? '\n' : ' ');
}
```

Mỗi chỉ số vào và ra deque tối đa một lần: O(n).

---

## 3. Sparse table: min của đoạn bất kỳ

Bài [Static Range Minimum Queries](https://cses.fi/problemset/task/1647): n ≤ 2·10⁵, q ≤ 2·10⁵ câu hỏi min(a[l..r]) với l, r bất kỳ, mảng không đổi.

Ý tưởng: tính sẵn min của mọi đoạn có độ dài là **lũy thừa của 2**. `sp[j][i]` = min của 2ʲ phần tử bắt đầu tại i:

- sp[0][i] = a[i]
- sp[j][i] = min(sp[j−1][i], sp[j−1][i + 2ʲ⁻¹]): đoạn dài 2ʲ = hai nửa dài 2ʲ⁻¹.

Trả lời [l, r]: gọi k là số lớn nhất với 2ᵏ ≤ độ dài. Hai đoạn dài 2ᵏ, một bắt đầu ở l, một kết thúc ở r, **phủ kín** [l, r] (có thể chồng lên nhau, không sao vì min(x, x) = x):

```
l                               r
|<----- 2^k ----->|
             |<----- 2^k ----->|
```

```cpp
// file: rmq.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    int LOG = 1;
    while ((1 << LOG) <= n) LOG++;
    vector<vector<long long>> sp(LOG, vector<long long>(n));
    for (auto &x : sp[0]) cin >> x;
    for (int j = 1; j < LOG; j++)
        for (int i = 0; i + (1 << j) <= n; i++)
            sp[j][i] = min(sp[j - 1][i], sp[j - 1][i + (1 << (j - 1))]);
    while (q--) {
        int l, r;
        cin >> l >> r;
        l--; r--;                                   // về chỉ số từ 0
        int k = __lg(r - l + 1);                    // 2^k <= độ dài
        cout << min(sp[k][l], sp[k][r - (1 << k) + 1]) << '\n';
    }
}
```

Chuẩn bị O(n log n), mỗi câu hỏi O(1). `__lg(x)` của C++ cho log₂ làm tròn xuống.

> [!NOTE]
> **Xây tường 60%.** Lời giải đệ quy ở bài 1.6 tìm min của đoạn bằng cách quét lại: O(N²). Thay bằng sparse table thì mỗi lần tìm min là O(1), lời giải chạy kịp N ≤ 10⁵, tức 60% điểm. Lời giải 100% vẫn là ngăn xếp ở bài 2.4.

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: deque lưu giá trị thay vì chỉ số.** Không biết khi nào phần tử ra khỏi cửa sổ. Lưu chỉ số.

> [!WARNING]
> **Bẫy 2: sparse table với mảng thay đổi.** Sparse table chỉ dùng được khi mảng **không đổi**. Mảng có cập nhật thì cần cây phân đoạn (Tập 3).

> [!WARNING]
> **Bẫy 3: dùng sparse table cho tổng.** Hai đoạn chồng nhau làm phần giữa bị cộng hai lần. Sparse table O(1) chỉ đúng cho phép "chồng không sao" như min, max, ƯCLN.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Static Range Minimum Queries](https://cses.fi/problemset/task/1647) | CSES 1647 | Đúng mục 3 |
| Khởi động | In max của mọi cửa sổ k phần tử | Tự luyện | Đổi chiều so sánh |
| Luyện | Xây tường 60%: kết hợp lời giải đệ quy bài 1.6 với sparse table, so với lời giải 100% bằng stress test | Tự luyện | Lắp ghép kiến thức |
| Luyện | [Maximum Subarray Sum II](https://cses.fi/problemset/task/1644) | CSES 1644 | Tiền tố + min trên cửa sổ |
| Thử thách | Đếm số đoạn [l, r] có max − min ≤ k (n ≤ 2·10⁵) | Tự luyện | Hai con trỏ + hai hàng đợi đơn điệu |

---

## 6. Tóm tắt và checkpoint

1. Min trên cửa sổ trượt: deque chỉ số, giá trị tăng dần, O(n).
2. Min đoạn bất kỳ trên mảng không đổi: sparse table, O(1) mỗi câu hỏi.
3. Sparse table O(1) dùng cho phép mà chồng đoạn không sao: min, max, ƯCLN.

<details><summary>Độ dài đoạn là 13 thì dùng hai đoạn con dài bao nhiêu?</summary>2³ = 8.</details>

**Checkpoint:**

- [ ] AC Static Range Minimum Queries.
- [ ] Viết hàng đợi đơn điệu không nhìn sách.
