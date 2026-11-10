# Bài 2.10 – Quy hoạch động 2: dãy con và xâu con

> **Tập 2** · Cần biết trước: bài 2.9, 1.4 (tìm kiếm nhị phân) · Thời lượng: khoảng 90 phút đọc, 8 giờ thực hành

**Học xong bài này, em sẽ:**

- tìm **dãy con tăng dài nhất** (LIS) trong O(n²), rồi O(n log n);
- tìm **xâu con chung dài nhất** (LCS) của hai xâu bằng bảng QHĐ hai chiều;
- đặt trạng thái dạng "kết thúc tại i" và "xét i ký tự đầu của xâu này, j ký tự đầu của xâu kia".

---

## 1. Bài toán mở màn: Bậc thang điểm số

Bảng điểm n bài kiểm tra của Bảo theo thời gian là a₁ … aₙ. Bảo muốn chọn ra **nhiều bài nhất** (giữ nguyên thứ tự thời gian) sao cho điểm **tăng ngặt**. (n ≤ 2·10⁵; bài [Increasing Subsequence](https://cses.fi/problemset/task/1145))

| Vào | Ra |
| --- | --- |
| `8`<br>`7 3 5 3 6 2 9 8` | `4` |

Ví dụ `3 5 6 9`.

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Gọi f[i] là độ dài dãy tăng dài nhất **kết thúc tại** bài i. Biết f của mọi bài trước i, tính f[i] thế nào?

<details>
<summary>Đáp án</summary>

Bài i nối được vào sau mọi bài j < i có aⱼ < aᵢ: f[i] = 1 + max(f[j]) với các j đó (bằng 1 nếu không có j nào). Đáp án là max của mọi f[i]. Cách này O(n²).

</details>

---

## 2. LIS trong O(n log n)

Với n = 2·10⁵, O(n²) là quá chậm. Ý tưởng mới: gọi `tails[k]` = **giá trị cuối nhỏ nhất** của một dãy tăng dài k + 1 đã tìm được. Đuôi càng nhỏ càng dễ nối thêm. Mảng `tails` luôn **tăng dần**, nên mỗi phần tử mới x:

- tìm vị trí đầu tiên trong `tails` có giá trị ≥ x (`lower_bound`, bài 1.4);
- nếu không có: x nối dài dãy dài nhất, thêm x vào cuối;
- nếu có ở vị trí k: thay `tails[k] = x` (dãy dài k + 1 nay có đuôi nhỏ hơn).

| x | Vị trí lower_bound | tails sau bước |
| :---: | :---: | --- |
| 7 | 0 (rỗng) | 7 |
| 3 | 0 | 3 |
| 5 | 1 | 3 5 |
| 3 | 0 | 3 5 |
| 6 | 2 | 3 5 6 |
| 2 | 0 | 2 5 6 |
| 9 | 3 | 2 5 6 9 |
| 8 | 3 | 2 5 6 8 |

Độ dài `tails` cuối cùng là **4**. Chú ý: `tails` không nhất thiết là một dãy tăng thật (2 đứng sau 5 trong dãy gốc); chỉ **độ dài** của nó là đáp án.

```cpp
// file: lis.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> tails;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        auto it = lower_bound(tails.begin(), tails.end(), x);   // >= x: dãy TĂNG NGẶT
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    cout << tails.size() << '\n';
}
```

Đổi `lower_bound` thành `upper_bound` thì được dãy **không giảm** (cho phép bằng nhau).

---

## 3. Xâu con chung dài nhất

Cho hai xâu s và t (độ dài ≤ 5000). Tìm độ dài xâu dài nhất là **dãy con** (giữ thứ tự, không cần liền nhau) của cả hai.

| Vào | Ra |
| --- | --- |
| `SAIGON`<br>`SANGO` | `4` |

Ví dụ `SAGO`.

- **Trạng thái:** d[i][j] = LCS của i ký tự đầu của s và j ký tự đầu của t.
- **Truy hồi:** nếu s[i] = t[j] thì d[i][j] = d[i−1][j−1] + 1; ngược lại d[i][j] = max(d[i−1][j], d[i][j−1]).
- **Cơ sở:** d[0][j] = d[i][0] = 0.

| | ∅ | S | A | N | G | O |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| ∅ | 0 | 0 | 0 | 0 | 0 | 0 |
| S | 0 | **1** | 1 | 1 | 1 | 1 |
| A | 0 | 1 | **2** | 2 | 2 | 2 |
| I | 0 | 1 | 2 | 2 | 2 | 2 |
| G | 0 | 1 | 2 | 2 | **3** | 3 |
| O | 0 | 1 | 2 | 2 | 3 | **4** |
| N | 0 | 1 | 2 | 3 | 3 | 4 |

Các ô in đậm là nơi hai ký tự bằng nhau và độ dài tăng lên: S, A, G, O.

```cpp
// file: lcs.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    string s, t;
    cin >> s >> t;
    int n = s.size(), m = t.size();
    vector<vector<int>> d(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            d[i][j] = (s[i - 1] == t[j - 1]) ? d[i - 1][j - 1] + 1
                                              : max(d[i - 1][j], d[i][j - 1]);
    cout << d[n][m] << '\n';
}
```

O(n·m) thời gian và bộ nhớ: 2,5·10⁷ ô với n = m = 5000, khoảng 100 MB nếu dùng `int`. Mỗi hàng chỉ cần hàng ngay trên, nên có thể giữ **hai hàng** để còn O(m) bộ nhớ (bài tập Luyện).

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: nhầm "tăng ngặt" và "không giảm".** `lower_bound` cho tăng ngặt, `upper_bound` cho không giảm. Thử với dãy `2 2 2`: tăng ngặt là 1, không giảm là 3.

> [!WARNING]
> **Bẫy 2: lệch chỉ số trong bảng hai chiều.** d có kích thước (n + 1) × (m + 1); ký tự thứ i của s là `s[i - 1]`.

> [!WARNING]
> **Bẫy 3: bộ nhớ.** Bảng 5000 × 5000 `long long` là 200 MB, vượt giới hạn thường gặp (256 MB vẫn sát). Dùng `int`, hoặc hai hàng.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Increasing Subsequence](https://cses.fi/problemset/task/1145) | CSES 1145 | Đúng mục 2 |
| Khởi động | Viết LIS O(n²), so với `lis.cpp` bằng stress test | Tự luyện | Hai lời giải đối chiếu |
| Luyện | [Edit Distance](https://cses.fi/problemset/task/1639) | CSES 1639 | Bảng hai chiều như LCS |
| Luyện | LCS với hai hàng: O(m) bộ nhớ | Tự luyện | Tiết kiệm bộ nhớ |
| Luyện | [Array Description](https://cses.fi/problemset/task/1746) | CSES 1746 | QHĐ hai chiều: vị trí × giá trị |
| Thử thách | [Projects](https://cses.fi/problemset/task/1140) | CSES 1140 | QHĐ + sắp xếp + tìm nhị phân |

---

## 6. Tóm tắt và checkpoint

1. Trạng thái "kết thúc tại i": LIS O(n²); `tails` + `lower_bound`: O(n log n).
2. Hai xâu: trạng thái (i, j) = tiền tố của mỗi xâu; bảng (n + 1) × (m + 1).
3. Chỉ cần hàng trước thì giữ hai hàng để tiết kiệm bộ nhớ.

<details><summary>LIS tăng ngặt của <code>1 3 2 3 4</code>?</summary>4: <code>1 2 3 4</code>.</details>
<details><summary>LCS("ABC", "CBA") bằng bao nhiêu?</summary>1.</details>

**Checkpoint:**

- [ ] Viết LIS O(n log n) không nhìn sách, AC Increasing Subsequence.
- [ ] AC Edit Distance.
