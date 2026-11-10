# Bài 3.10 – Xâu: KMP và băm xâu

> **Tập 3** · Cần biết trước: bài 0.6, 1.3 (tiền tố), 3.6 (modulo) · Thời lượng: khoảng 90 phút đọc, 6 giờ thực hành

**Học xong bài này, em sẽ:**

- đếm số lần xuất hiện của mẫu p trong văn bản t trong O(|p| + |t|) bằng **hàm tiền tố** (KMP);
- so sánh hai đoạn con bất kỳ của một xâu trong O(1) bằng **băm xâu**;
- biết rủi ro "va chạm" của băm và cách giảm nó.

---

## 1. Bài toán mở màn: Tìm từ khóa

Cho văn bản t và từ khóa p (độ dài tới 10⁶). Từ khóa xuất hiện bao nhiêu lần (được chồng lên nhau)? (bài [String Matching](https://cses.fi/problemset/task/1753))

| Vào | Ra |
| --- | --- |
| `saippuakauppias`<br>`pp` | `2` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** So khớp ngây thơ: thử mọi vị trí bắt đầu, so từng ký tự. Với t = `aaaa…a` (10⁶ chữ) và p = `aaa…ab` (5·10⁵ chữ), cách này tốn bao nhiêu phép? Khi khớp được 10 ký tự rồi mới sai, thông tin gì về 10 ký tự đó có thể tận dụng?

<details>
<summary>Đáp án</summary>

Cỡ 10⁶ × 5·10⁵ phép: quá chậm. Khi đã khớp 10 ký tự đầu của p, ta **biết** 10 ký tự đó của t. Nếu phần cuối của chúng trùng với phần đầu của p, ta có thể tiếp tục từ đó thay vì làm lại từ đầu. Đó là ý của KMP.

</details>

---

## 2. Hàm tiền tố

π[i] = độ dài **tiền tố dài nhất** của xâu (khác chính đoạn đó) cũng là **hậu tố** của đoạn s[0..i].

Với s = `abacaba`:

| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| s[i] | a | b | a | c | a | b | a |
| π[i] | 0 | 0 | 1 | 0 | 1 | 2 | 3 |

π[6] = 3: `aba` vừa là đầu vừa là đuôi của `abacaba`.

Tính π[i] từ π[i−1]: thử kéo dài đoạn khớp trước đó; không được thì lùi về π của đoạn ngắn hơn. Tổng số lần lùi không vượt quá tổng số lần tăng: O(n), giống phân tích của hai con trỏ.

**Tìm mẫu:** tính π của xâu `p + '#' + t` (`#` không có trong p, t). Vị trí nào có π = |p| là một lần p xuất hiện.

```cpp
// file: kmp.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    string t, p;
    cin >> t >> p;
    string s = p + '#' + t;
    int n = s.size(), m = p.size();
    vector<int> pi(n, 0);
    int dem = 0;
    for (int i = 1; i < n; i++) {
        int k = pi[i - 1];
        while (k > 0 && s[i] != s[k]) k = pi[k - 1];   // lùi về đoạn khớp ngắn hơn
        if (s[i] == s[k]) k++;
        pi[i] = k;
        if (k == m) dem++;
    }
    cout << dem << '\n';
}
```

---

## 3. Băm xâu

Đổi mỗi đoạn con thành một **số** (mã băm) sao cho hai đoạn bằng nhau thì cùng mã. Dùng tiền tố như bài 1.3:

h[i] = (h[i−1]·B + s[i−1]) mod M, với cơ số B và modulo M lớn.

Mã của đoạn s[l..r−1] = (h[r] − h[l]·B^(r−l)) mod M: tính O(1) sau O(n) chuẩn bị.

Bài: cho xâu s và q câu hỏi (a, b, c, d): đoạn s[a..b] có **bằng** đoạn s[c..d] không (chỉ số từ 1)?

| Vào | Ra |
| --- | --- |
| `abcabcab`<br>`3`<br>`1 3 4 6`<br>`1 2 7 8`<br>`2 4 3 5` | `YES`<br>`YES`<br>`NO` |

```cpp
// file: bam_xau.cpp
#include <bits/stdc++.h>
using namespace std;
const long long M1 = 1000000007, M2 = 998244353, B = 131;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    int q;
    cin >> s >> q;
    int n = s.size();
    vector<long long> h1(n + 1, 0), h2(n + 1, 0), p1(n + 1, 1), p2(n + 1, 1);
    for (int i = 0; i < n; i++) {
        h1[i + 1] = (h1[i] * B + s[i]) % M1;
        h2[i + 1] = (h2[i] * B + s[i]) % M2;
        p1[i + 1] = p1[i] * B % M1;
        p2[i + 1] = p2[i] * B % M2;
    }
    auto ma = [&](int l, int r) {                      // mã của s[l..r-1], dùng HAI modulo
        long long x = ((h1[r] - h1[l] * p1[r - l]) % M1 + M1) % M1;
        long long y = ((h2[r] - h2[l] * p2[r - l]) % M2 + M2) % M2;
        return make_pair(x, y);
    };
    while (q--) {
        int a, b, c, d;
        cin >> a >> b >> c >> d;
        bool bang = (b - a == d - c) && ma(a - 1, b) == ma(c - 1, d);
        cout << (bang ? "YES" : "NO") << '\n';
    }
}
```

> [!WARNING]
> **Va chạm.** Hai đoạn **khác** nhau có thể trùng mã. Với một modulo cỡ 10⁹ và 10⁶ câu hỏi, xác suất này không nhỏ; kẻ ra đề còn có thể cố ý tạo test làm hỏng một modulo cố định. Dùng **hai modulo** (như trên) hoặc modulo 2⁶¹ − 1 để an toàn.

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: thiếu ký tự ngăn cách.** Không có `#` giữa p và t thì π có thể vượt |p| và đếm sai.

> [!WARNING]
> **Bẫy 2: trừ modulo ra số âm.** Cộng thêm M rồi lấy dư lần nữa, như trong hàm `ma`.

> [!WARNING]
> **Bẫy 3: so mã mà quên so độ dài.** Hai đoạn khác độ dài không thể bằng nhau; kiểm tra độ dài trước.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [String Matching](https://cses.fi/problemset/task/1753) | CSES 1753 | Đúng mục 2 |
| Khởi động | [Finding Borders](https://cses.fi/problemset/task/1732) | CSES 1732 | Đi theo chuỗi π từ cuối |
| Luyện | [Finding Periods](https://cses.fi/problemset/task/1733) | CSES 1733 | Hàm tiền tố hoặc băm |
| Luyện | [Palindrome Queries](https://cses.fi/problemset/task/2420) | CSES 2420 | Băm + cây Fenwick/cây phân đoạn |
| Thử thách | [Longest Palindrome](https://cses.fi/problemset/task/1111) | CSES 1111 | Băm + tìm nhị phân, hoặc Manacher |

---

## 6. Tóm tắt và checkpoint

1. Hàm tiền tố: đoạn khớp đầu–đuôi dài nhất; tìm mẫu trên `p + '#' + t`, O(n + m).
2. Băm: mã tiền tố như tổng tiền tố, so đoạn con O(1).
3. Luôn dùng hai modulo (hoặc 2⁶¹ − 1) để tránh va chạm.

<details><summary>Hàm tiền tố của <code>aaaa</code>?</summary>0 1 2 3.</details>

**Checkpoint:**

- [ ] Viết hàm tiền tố không nhìn sách, AC String Matching và Finding Borders.
