# Bài 4.4 – Tối ưu QHĐ: kỹ thuật bao lồi

> **Tập 4** · Cần biết trước: bài 2.9, 2.6 (hàng đợi đơn điệu) · Thời lượng: khoảng 90 phút đọc, 8 giờ thực hành

**Học xong bài này, em sẽ:** tăng tốc QHĐ dạng dp[i] = min theo j < i của (dp[j] + aⱼ·xᵢ) từ O(n²) xuống O(n), bằng cách xem mỗi j là một **đường thẳng** và chỉ giữ phần "đáy" của chúng.

**Dấu hiệu nhận biết:** công thức truy hồi có **tích** của một đại lượng theo j và một đại lượng theo i.

---

## 1. Bài toán mở màn: Diệt quái vật

Trò chơi có n màn. Màn i có quái vật sức mạnh sᵢ; diệt nó tốn sᵢ × f giây, với f là **hệ số kỹ năng hiện tại**. Diệt quái màn i thì hệ số kỹ năng trở thành fᵢ. Ban đầu hệ số là x. Có thể bỏ qua quái các màn trước, nhưng **phải** diệt quái màn n. Biết s₁ ≤ s₂ ≤ … ≤ sₙ và f₁ ≥ f₂ ≥ … ≥ fₙ. Thời gian ít nhất? (n ≤ 2·10⁵, sᵢ, fᵢ, x ≤ 10⁶; bài [Monster Game I](https://cses.fi/problemset/task/2084))

| Vào | Ra |
| --- | --- |
| `5 100`<br>`20 30 30 50 90`<br>`90 60 20 10 1` | `4800` |

Cách tốt nhất: chỉ diệt quái màn 3 (30 × 100 = 3000 giây, hệ số thành 20) rồi màn 5 (90 × 20 = 1800 giây).

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Gọi dp[i] = thời gian ít nhất nếu màn i là màn diệt quái **cuối cùng** tới giờ. Viết công thức tính dp[i] theo các dp[j] trước đó. Nó tốn bao nhiêu phép?

<details>
<summary>Đáp án</summary>

Trước màn i, quái cuối cùng bị diệt là j (hoặc chưa diệt ai: j = 0 với f₀ = x, dp[0] = 0). dp[i] = min theo j < i của (dp[j] + fⱼ·sᵢ). Thử mọi j là O(n²) = 4·10¹⁰: quá chậm.

</details>

---

## 2. Mỗi j là một đường thẳng

Với j cố định, dp[j] + fⱼ·s là một **đường thẳng** theo biến s: hệ số góc fⱼ, tung độ gốc dp[j]. Tính dp[i] = tìm **giá trị nhỏ nhất** của các đường thẳng tại s = sᵢ.

Hai tính chất của bài làm việc này rất nhanh:

1. Hệ số góc fⱼ **giảm dần** theo j: đường mới thêm luôn "dốc ít hơn".
2. Điểm hỏi sᵢ **tăng dần**.

Giữ các đường trong một `deque`, chỉ những đường **có lúc là thấp nhất** (tạo thành "đáy lồi"):

- **Hỏi tại s:** khi đường thứ hai ở đầu deque cho giá trị không lớn hơn đường đầu tại s, bỏ đường đầu (vì s chỉ tăng, nó không bao giờ thấp nhất nữa). Đường đầu là đáp án.
- **Thêm đường mới:** khi đường cuối deque bị kẹp giữa đường áp cuối và đường mới (không bao giờ thấp nhất), bỏ nó.

Mỗi đường vào/ra deque một lần: O(n), giống hàng đợi đơn điệu (bài 2.6).

Điều kiện "đường giữa l₂ thừa" khi thêm l₃ (với l₁ là đường áp cuối): giao điểm của l₁ với l₃ nằm **bên trái hoặc trùng** giao điểm của l₁ với l₂. So sánh bằng phép nhân chéo để khỏi chia:

(b₃ − b₁)·(m₁ − m₂) ≤ (b₂ − b₁)·(m₁ − m₃)

```cpp
// file: cht.cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
struct Line { ll m, b; ll at(ll x) const { return m * x + b; } };

bool thua(const Line &l1, const Line &l2, const Line &l3) {   // l2 không bao giờ là thấp nhất
    return (__int128)(l3.b - l1.b) * (l1.m - l2.m) <= (__int128)(l2.b - l1.b) * (l1.m - l3.m);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    ll x;
    cin >> n >> x;
    vector<ll> s(n), f(n);
    for (auto &v : s) cin >> v;
    for (auto &v : f) cin >> v;
    deque<Line> dq;
    dq.push_back({x, 0});                              // j = 0: hệ số ban đầu x, thời gian 0
    ll dp = 0;
    for (int i = 0; i < n; i++) {
        while (dq.size() >= 2 && dq[1].at(s[i]) <= dq[0].at(s[i])) dq.pop_front();
        dp = dq[0].at(s[i]);
        Line moi = {f[i], dp};
        while (dq.size() >= 2 && thua(dq[dq.size() - 2], dq.back(), moi)) dq.pop_back();
        dq.push_back(moi);
    }
    cout << dp << '\n';                                // dp của màn n
}
```

`__int128` tránh tràn khi nhân: dp tới cỡ 2·10¹⁷, nhân với hệ số góc 10⁶ vượt `long long`.

---

## 3. Các kỹ thuật tối ưu QHĐ khác

| Kỹ thuật | Dạng công thức | Điều kiện | Từ → tới |
| --- | --- | --- | --- |
| Bao lồi (bài này) | min(dp[j] + aⱼ·xᵢ) | góc đơn điệu; nếu điểm hỏi không đơn điệu thì tìm nhị phân trên deque | O(n²) → O(n) hoặc O(n log n) |
| Cây Li Chao | như trên, không cần đơn điệu | | O(n²) → O(n log C) |
| Chia để trị | dp[k][i] = min(dp[k−1][j] + cost(j, i)) | điểm chọn tối ưu tăng theo i | O(k·n²) → O(k·n log n) |
| Knuth | dp[l][r] = min(dp[l][k] + dp[k][r]) + cost(l, r) | cost thỏa bất đẳng thức tứ giác | O(n³) → O(n²) |

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: tràn số khi so giao điểm.** Dùng `__int128` hoặc `long double`.

> [!WARNING]
> **Bẫy 2: dùng deque khi điểm hỏi không đơn điệu.** Bỏ đường ở đầu chỉ đúng khi s tăng. Ngược lại, tìm nhị phân trên deque hoặc dùng cây Li Chao.

> [!WARNING]
> **Bẫy 3: nhầm min và max.** Bài cần max thì đổi dấu: max(m·x + b) = −min(−m·x − b).

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Monster Game I](https://cses.fi/problemset/task/2084) | CSES 2084 | Đúng mục 2 |
| Luyện | [Monster Game II](https://cses.fi/problemset/task/2085) | CSES 2085 | Bỏ điều kiện đơn điệu: Li Chao |
| Luyện | [Subarray Squares](https://cses.fi/problemset/task/2086) | CSES 2086 | Chia để trị hoặc bao lồi |
| Thử thách | [Houses and Schools](https://cses.fi/problemset/task/2087) | CSES 2087 | Chia để trị, cost tính O(1) |

**Checkpoint:** AC Monster Game I; viết lời giải O(n²) và stress test với bản bao lồi.
