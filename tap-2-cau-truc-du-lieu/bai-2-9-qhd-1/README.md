# Bài 2.9 – Quy hoạch động 1: trạng thái và công thức truy hồi

> **Tập 2** · Cần biết trước: bài 1.6 (đệ quy), 1.8 (tham lam sai ở bài đổi tiền) · Thời lượng: khoảng 2 giờ đọc, 8 giờ thực hành

**Học xong bài này, em sẽ:**

- giải bài tối ưu bằng cách **lưu lời giải các bài con** thay vì tính lại;
- tự đặt **trạng thái** và **công thức truy hồi**, và biết thứ tự tính;
- giải hai bài kinh điển: đổi tiền và cái túi 0/1.

---

## 1. Bài toán mở màn: Đổi tiền (lần nữa)

Ở bài 1.8, tham lam sai với mệnh giá {1, 3, 4} và số tiền 6. Giờ giải cho đúng: có n mệnh giá c₁ … cₙ (mỗi loại dùng không giới hạn). Đổi x đồng với **ít đồng nhất**; in −1 nếu không đổi được. (n ≤ 100, x ≤ 10⁶; bài [Minimizing Coins](https://cses.fi/problemset/task/1634))

| Vào | Ra |
| --- | --- |
| `3 6`<br>`1 3 4` | `2` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Đồng xu **cuối cùng** em dùng để đổi 6 đồng có thể là 1, 3 hoặc 4. Nếu đồng cuối là 3, phần còn lại là bài toán gì?

<details>
<summary>Đáp án</summary>

Đổi 6 − 3 = 3 đồng với ít đồng nhất: **cùng bài toán, số nhỏ hơn**. Vậy cách tốt nhất cho 6 = 1 + min(cách tốt nhất cho 5, cho 3, cho 2).

</details>

---

## 2. Bốn bước của quy hoạch động

1. **Trạng thái:** dp[s] = số đồng ít nhất để đổi s đồng.
2. **Công thức truy hồi:** dp[s] = min(dp[s − c] + 1) với mọi mệnh giá c ≤ s.
3. **Cơ sở:** dp[0] = 0. Số tiền chưa đổi được ghi là "vô cùng".
4. **Thứ tự tính:** s tăng dần, vì dp[s] cần các dp nhỏ hơn.

| s | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| từ dp[s−1] + 1 | | 1 | 2 | 3 | 2 | 2 | 3 |
| từ dp[s−3] + 1 | | | | 1 | 2 | 3 | **2** |
| từ dp[s−4] + 1 | | | | | 1 | 2 | 3 |
| **dp[s]** | 0 | 1 | 2 | 1 | 1 | 2 | **2** |

```cpp
// file: doi_tien.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, x;
    cin >> n >> x;
    vector<int> c(n);
    for (auto &v : c) cin >> v;
    const int VC = 1e9;                         // "vô cùng": chưa đổi được
    vector<int> dp(x + 1, VC);
    dp[0] = 0;
    for (int s = 1; s <= x; s++)
        for (int v : c)
            if (v <= s && dp[s - v] != VC) dp[s] = min(dp[s], dp[s - v] + 1);
    cout << (dp[x] == VC ? -1 : dp[x]) << '\n';
}
```

Độ phức tạp O(n·x) = 10⁸ với giới hạn lớn nhất: vừa kịp với C++.

> [!NOTE]
> **Vì sao gọi là "động"?** Viết đệ quy thẳng `f(s) = min(f(s - c) + 1)` thì cùng một f(s) bị tính lại vô số lần (như Fibonacci ở bài 1.6). Quy hoạch động **lưu** mỗi f(s) một lần. Có hai cách viết: đệ quy có lưu (gọi là ghi nhớ) hoặc vòng lặp từ nhỏ tới lớn như trên. Trong thi đấu, vòng lặp thường nhanh hơn và không lo đệ quy sâu.

---

## 3. Cái túi 0/1: Hiệu sách

Có n cuốn sách, cuốn i giá hᵢ và có sᵢ trang. Có x đồng, **mỗi cuốn mua tối đa một lần**. Tối đa tổng số trang? (n ≤ 1000, x ≤ 10⁵; bài [Book Shop](https://cses.fi/problemset/task/1158))

| Vào | Ra |
| --- | --- |
| `4 10`<br>`4 8 5 3`<br>`5 12 8 1` | `13` |

Mua cuốn 1 (4 đồng, 5 trang) và cuốn 3 (5 đồng, 8 trang): 9 đồng, 13 trang.

- **Trạng thái:** dp[j] = số trang nhiều nhất với tổng giá **không quá** j, chỉ dùng các cuốn đã xét.
- **Truy hồi khi xét cuốn i:** không mua thì giữ dp[j]; mua thì dp[j − hᵢ] + sᵢ. Lấy lớn hơn.
- **Thứ tự:** với mỗi cuốn, duyệt j **giảm dần** từ x xuống hᵢ.

Vì sao giảm dần? dp[j − hᵢ] phải là giá trị **trước khi** xét cuốn i. Duyệt tăng dần thì dp[j − hᵢ] có thể đã "mua cuốn i" rồi, và cuốn i bị mua hai lần.

```cpp
// file: hieu_sach.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, x;
    cin >> n >> x;
    vector<int> h(n), s(n);
    for (auto &v : h) cin >> v;
    for (auto &v : s) cin >> v;
    vector<int> dp(x + 1, 0);
    for (int i = 0; i < n; i++)
        for (int j = x; j >= h[i]; j--)             // giảm dần: mỗi cuốn dùng tối đa một lần
            dp[j] = max(dp[j], dp[j - h[i]] + s[i]);
    cout << dp[x] << '\n';
}
```

O(n·x) = 10⁸.

| Biến thể | Khác ở đâu |
| --- | --- |
| Mỗi món dùng **không giới hạn** | Duyệt j **tăng dần** |
| Đếm **số cách** thay vì tối ưu | Thay `max` bằng cộng, lấy dư theo đề |

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: "vô cùng" cộng 1 bị tràn.** Nếu VC = `INT_MAX` thì VC + 1 tràn thành số âm, trở thành "tốt nhất". Dùng 10⁹ và kiểm tra `!= VC` trước khi cộng.

> [!WARNING]
> **Bẫy 2: sai chiều duyệt ở cái túi.** Tăng dần biến 0/1 thành không giới hạn. Đây là lỗi phổ biến nhất của bài này.

> [!WARNING]
> **Bẫy 3: trạng thái thiếu thông tin.** Nếu công thức cần biết điều gì mà trạng thái không lưu (ví dụ "đã mua cuốn nào"), thì phải thêm chiều cho trạng thái hoặc đổi cách đặt. Hãy tự hỏi: "biết dp các trạng thái nhỏ hơn có **đủ** để tính trạng thái này không?"

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Dice Combinations](https://cses.fi/problemset/task/1633) | CSES 1633 | Đếm cách, dp[s] = tổng 6 trạng thái trước |
| Khởi động | [Minimizing Coins](https://cses.fi/problemset/task/1634) | CSES 1634 | Đúng mục 2 |
| Luyện | [Coin Combinations I](https://cses.fi/problemset/task/1635) | CSES 1635 | Đếm cách có thứ tự |
| Luyện | [Coin Combinations II](https://cses.fi/problemset/task/1636) | CSES 1636 | Đếm cách không thứ tự: đổi thứ tự hai vòng lặp |
| Luyện | [Grid Paths](https://cses.fi/problemset/task/1638) | CSES 1638 | QHĐ trên lưới |
| Luyện | [Book Shop](https://cses.fi/problemset/task/1158) | CSES 1158 | Đúng mục 3 |
| Thử thách | [Removing Digits](https://cses.fi/problemset/task/1637) | CSES 1637 | Tự đặt trạng thái |

---

## 6. Tóm tắt và checkpoint

1. QHĐ = trạng thái + công thức truy hồi + cơ sở + thứ tự tính.
2. Hỏi "bước cuối cùng là gì?" để tìm công thức.
3. Cái túi 0/1: duyệt tiền giảm dần; không giới hạn: tăng dần.

<details><summary>dp[7] của bài đổi tiền {1, 3, 4} bằng bao nhiêu?</summary>2 (3 + 4).</details>
<details><summary>Coin Combinations I và II khác nhau ở đâu trong code?</summary>I: vòng ngoài là tổng tiền (thứ tự khác nhau tính là khác). II: vòng ngoài là mệnh giá (mỗi tổ hợp đếm một lần).</details>

**Checkpoint:**

- [ ] AC 5 bài CSES ở nấc Khởi động và Luyện.
- [ ] Giải thích được bằng ví dụ vì sao cái túi 0/1 phải duyệt giảm dần.
