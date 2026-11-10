# Bài 4.2 – Chia căn và thuật toán Mo

> **Tập 4** · Cần biết trước: bài 1.5 (hai con trỏ), 2.2 · Thời lượng: khoảng 75 phút đọc, 6 giờ thực hành

**Học xong bài này, em sẽ:** chia mảng thành khoảng √n khối để cân bằng giữa "sửa" và "hỏi"; trả lời **offline** nhiều câu hỏi đoạn bằng thuật toán Mo trong O((n + q)·√n).

**Dấu hiệu nhận biết:** câu hỏi đoạn mà thông tin **không gộp được** từ hai nửa (như số giá trị khác nhau), n, q ≤ 2·10⁵, được đọc hết câu hỏi trước khi trả lời.

---

## 1. Bài toán mở màn: Bao nhiêu loại?

Kệ hàng có n món, món i thuộc loại xᵢ (xᵢ ≤ 10⁹). Có q câu hỏi: các món a..b gồm bao nhiêu **loại khác nhau**? (n, q ≤ 2·10⁵; bài [Distinct Values Queries](https://cses.fi/problemset/task/1734))

| Vào | Ra |
| --- | --- |
| `5 3`<br>`3 2 3 1 2`<br>`1 3`<br>`2 4`<br>`1 5` | `2`<br>`3`<br>`3` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Nếu biết đáp án cho đoạn [l, r] và một mảng đếm số lần mỗi loại xuất hiện, thì mở rộng sang [l, r + 1] hay thu hẹp thành [l + 1, r] tốn bao nhiêu? Vậy nên trả lời các câu hỏi theo **thứ tự nào** để hai đầu đoạn di chuyển ít nhất?

<details>
<summary>Đáp án</summary>

Thêm hoặc bớt một phần tử là O(1): tăng/giảm số đếm, nếu số đếm đổi giữa 0 và 1 thì sửa đáp án. Cần sắp các câu hỏi sao cho tổng quãng đường hai con trỏ di chuyển nhỏ. Thuật toán Mo cho một thứ tự như vậy.

</details>

---

## 2. Chia căn

Ý chung: chia mảng thành các khối dài B ≈ √n. Một đoạn bất kỳ gồm vài **khối trọn** (xử lý nhanh nhờ thông tin tính sẵn của khối) và hai **phần lẻ** ở hai đầu (xử lý từng phần tử). Mỗi câu hỏi tốn O(n/B + B) = O(√n).

## 3. Thuật toán Mo

Sắp câu hỏi theo (khối chứa l, rồi r tăng dần). Trong cùng một khối của l, con trỏ r chỉ tăng (tổng O(n) mỗi khối, O(n·√n) tất cả); con trỏ l mỗi câu hỏi chỉ di chuyển trong một khối (O(√n) mỗi câu).

```cpp
// file: mo.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<int> x(n);
    vector<long long> raw(n);
    for (auto &v : raw) cin >> v;
    vector<long long> b = raw;                         // nén giá trị về 0..n-1
    sort(b.begin(), b.end());
    b.erase(unique(b.begin(), b.end()), b.end());
    for (int i = 0; i < n; i++) x[i] = lower_bound(b.begin(), b.end(), raw[i]) - b.begin();
    int B = max(1, (int)sqrt(n));
    vector<array<int, 3>> qs(q);                       // {l, r, chỉ số}, từ 0
    for (int i = 0; i < q; i++) { cin >> qs[i][0] >> qs[i][1]; qs[i][0]--; qs[i][1]--; qs[i][2] = i; }
    sort(qs.begin(), qs.end(), [&](const array<int, 3> &a, const array<int, 3> &c) {
        if (a[0] / B != c[0] / B) return a[0] / B < c[0] / B;
        return a[1] < c[1];
    });
    vector<int> dem(b.size(), 0), kq(q);
    int khac = 0, L = 0, Rr = -1;                       // đoạn hiện tại [L, Rr], ban đầu rỗng
    auto them = [&](int i) { if (dem[x[i]]++ == 0) khac++; };
    auto bot = [&](int i) { if (--dem[x[i]] == 0) khac--; };
    for (auto [l, r, id] : qs) {
        while (Rr < r) them(++Rr);
        while (L > l) them(--L);
        while (Rr > r) bot(Rr--);
        while (L < l) bot(L++);
        kq[id] = khac;
    }
    for (int v : kq) cout << v << '\n';
}
```

Thứ tự bốn vòng `while` quan trọng: **mở rộng trước, thu hẹp sau**, để đoạn không bao giờ "âm".

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: Mo cho bài có cập nhật.** Mo cơ bản chỉ dùng khi mảng **không đổi**. Có cập nhật cần biến thể "Mo có thời gian", phức tạp hơn nhiều.

> [!WARNING]
> **Bẫy 2: quên nén giá trị.** Giá trị tới 10⁹ không làm chỉ số mảng đếm được.

> [!WARNING]
> **Bẫy 3: in theo thứ tự đã sắp.** Phải lưu đáp án theo chỉ số gốc rồi mới in.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Distinct Values Queries](https://cses.fi/problemset/task/1734) | CSES 1734 | Đúng mục 3 (cũng giải được bằng Fenwick offline) |
| Luyện | [Powerful array](https://codeforces.com/problemset/problem/86/D) | CF 86D · 2200 | Mo với hàm thêm/bớt khác |
| Thử thách | Cài lại bài mở màn bằng Fenwick: sắp câu hỏi theo r, mỗi giá trị chỉ giữ lần xuất hiện gần nhất | Tự luyện | So sánh hai hướng |

**Checkpoint:** AC Distinct Values Queries bằng cả Mo và Fenwick offline.
