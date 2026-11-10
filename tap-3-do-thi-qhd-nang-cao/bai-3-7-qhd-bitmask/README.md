# Bài 3.7 – QHĐ trên tập con (bitmask)

> **Tập 3** · Cần biết trước: bài 1.7 (bitmask), 2.5, 2.9 · Thời lượng: khoảng 90 phút đọc, 6 giờ thực hành

**Học xong bài này, em sẽ:**

- dùng **tập con** (biểu diễn bằng bitmask) làm trạng thái QHĐ khi n ≤ 20;
- thiết kế trạng thái gồm **nhiều thông tin** (cặp giá trị) và so sánh chúng;
- nhận ra dấu hiệu "n ≤ 20 mà vét cạn n! quá chậm".

---

## 1. Bài toán mở màn: Thang máy

n bạn (n ≤ 20) cân nặng w₁ … wₙ cần lên tầng thượng bằng một thang máy chở tối đa x kg mỗi chuyến. Ít nhất bao nhiêu chuyến? (wᵢ ≤ x ≤ 10⁹; bài [Elevator Rides](https://cses.fi/problemset/task/1653))

| Vào | Ra |
| --- | --- |
| `4 10`<br>`4 8 6 1` | `2` |

Ví dụ: chuyến 1 chở {4, 6}, chuyến 2 chở {8, 1}.

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Thử mọi thứ tự xếp người (rồi chất lần lượt vào thang) là 20! ≈ 2,4·10¹⁸: quá chậm. Nhưng sau khi đã chở xong một **nhóm** người, thứ tự trong nhóm còn quan trọng không? Thông tin nào về quá khứ là đủ?

<details>
<summary>Đáp án</summary>

Chỉ cần biết **tập** người đã chở (không cần thứ tự), số chuyến đã dùng, và chuyến hiện tại đã chất bao nhiêu kg. Có 2²⁰ ≈ 10⁶ tập: QHĐ được.

</details>

---

## 2. Trạng thái là một tập

dp[mask] = cặp **(số chuyến, số kg trong chuyến cuối)** tốt nhất để chở xong đúng tập `mask`. "Tốt hơn" nghĩa là ít chuyến hơn, nếu bằng thì chuyến cuối nhẹ hơn (còn nhiều chỗ hơn).

- Cơ sở: dp[0] = (1, 0): một chuyến rỗng đang chờ.
- Chuyển: từ dp[mask] = (k, w), thêm người i chưa có trong mask:
  - nếu w + wᵢ ≤ x: được (k, w + wᵢ);
  - ngược lại mở chuyến mới: (k + 1, wᵢ).
- Đáp án: số chuyến của dp[tất cả].

Duyệt mask **tăng dần** là đúng thứ tự tính, vì thêm người làm mask lớn hơn.

```cpp
// file: thang_may.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    long long x;
    cin >> n >> x;
    vector<long long> w(n);
    for (auto &v : w) cin >> v;
    int full = 1 << n;
    vector<pair<int, long long>> dp(full, {INT_MAX, 0});   // (số chuyến, kg chuyến cuối)
    dp[0] = {1, 0};
    for (int mask = 0; mask < full; mask++) {
        if (dp[mask].first == INT_MAX) continue;
        auto [k, cur] = dp[mask];
        for (int i = 0; i < n; i++) {
            if (mask >> i & 1) continue;
            pair<int, long long> moi = (cur + w[i] <= x) ? make_pair(k, cur + w[i])
                                                         : make_pair(k + 1, w[i]);
            dp[mask | 1 << i] = min(dp[mask | 1 << i], moi);   // so cặp: chuyến trước, kg sau
        }
    }
    cout << dp[full - 1].first << '\n';
}
```

Độ phức tạp O(2ⁿ · n) = 2·10⁷ với n = 20. Bộ nhớ 2²⁰ cặp ≈ 16 MB.

> [!NOTE]
> **Vì sao chỉ cần giữ cặp tốt nhất?** Với cùng tập đã chở, ít chuyến hơn luôn tốt hơn (dù chuyến cuối nặng hơn, cùng lắm mở thêm một chuyến là bằng). Cùng số chuyến thì chuyến cuối nhẹ hơn tốt hơn. Đây là lập luận "trạng thái trội" thường gặp khi thiết kế QHĐ.

---

## 3. Các dạng QHĐ bitmask hay gặp

| Dạng | Trạng thái | Ví dụ |
| --- | --- | --- |
| Chia tập thành nhóm | dp[mask] | Thang máy |
| Đường đi qua mọi đỉnh (người du lịch) | dp[mask][đỉnh cuối] | [Hamiltonian Flights](https://cses.fi/problemset/task/1690) |
| Phân công n việc cho n người | dp[mask] với người thứ popcount(mask) | Bài tập Luyện |
| Lát gạch lưới hẹp | dp[cột][mask hàng đã lấp] | [Counting Tilings](https://cses.fi/problemset/task/2181) |

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: n quá lớn.** 2ⁿ·n với n = 25 là 8·10⁸; với n = 30 là quá chậm và quá bộ nhớ. Dấu hiệu dùng bitmask là n ≤ 20 (đôi khi ≤ 23).

> [!WARNING]
> **Bẫy 2: độ ưu tiên toán tử.** `mask | 1 << i` đúng vì `<<` làm trước `|`; nhưng `mask & 1 << i == 0` thì sai vì `==` làm trước `&`. Luôn thêm ngoặc khi không chắc.

> [!WARNING]
> **Bẫy 3: thiếu thông tin trong trạng thái.** Chỉ lưu số chuyến mà quên kg chuyến cuối thì không biết người tiếp theo có vừa không.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Elevator Rides](https://cses.fi/problemset/task/1653) | CSES 1653 | Đúng mục 2 |
| Luyện | Phân công: n ≤ 20 người, n việc, người i làm việc j tốn cᵢⱼ; tổng chi phí nhỏ nhất | Tự luyện | dp[mask], người thứ popcount(mask) |
| Luyện | [Hamiltonian Flights](https://cses.fi/problemset/task/1690) | CSES 1690 | dp[mask][đỉnh cuối] |
| Thử thách | [Counting Tilings](https://cses.fi/problemset/task/2181) | CSES 2181 | QHĐ theo cột, mask hàng |

---

## 6. Tóm tắt và checkpoint

1. n ≤ 20 và cần "tập đã chọn": trạng thái là bitmask, 2ⁿ trạng thái.
2. Trạng thái có thể là một cặp; giữ cặp **trội** nhất.
3. Thêm phần tử làm mask tăng: duyệt mask tăng dần.

<details><summary>Thang máy với x = 10 và cân nặng 6 6 6: bao nhiêu chuyến?</summary>3.</details>

**Checkpoint:**

- [ ] AC Elevator Rides.
- [ ] AC Hamiltonian Flights.
