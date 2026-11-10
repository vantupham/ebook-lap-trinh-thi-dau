# Bài 2.2 – set và map

> **Tập 2** · Cần biết trước: bài 1.2, 1.5 · Thời lượng: khoảng 75 phút đọc, 6 giờ thực hành

**Học xong bài này, em sẽ:**

- dùng `set` để lưu các giá trị **khác nhau, có thứ tự**, thêm/xóa/tìm trong O(log n);
- dùng `map` như một "mảng đếm" cho giá trị lớn (tới 10⁹) hoặc khóa là xâu;
- kết hợp `map` với hai con trỏ để giải bài cửa sổ không lặp.

---

## 1. Bài toán mở màn: Danh sách phát

Ứng dụng nghe nhạc của Chi có n bài liên tiếp, bài i có mã kᵢ (kᵢ ≤ 10⁹). Chi muốn nghe một **đoạn liên tiếp dài nhất** mà không bài nào bị lặp lại. (n ≤ 2·10⁵, bài [Playlist](https://cses.fi/problemset/task/1141))

| Vào | Ra |
| --- | --- |
| `8`<br>`1 2 1 3 2 7 4 2` | `5` |

Đoạn dài nhất là `1 3 2 7 4`.

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Đây là bài cửa sổ trượt (bài 1.5): thêm bài r vào cửa sổ, nếu bị lặp thì đẩy l. Nhưng làm sao biết **ngay** bài r đã có trong cửa sổ chưa, khi mã bài tới 10⁹ nên không dùng được mảng đánh dấu?

<details>
<summary>Đáp án</summary>

Dùng `map` lưu **vị trí gần nhất** của mỗi mã bài. Khi thêm bài r: nếu mã của nó từng xuất hiện ở vị trí p ≥ l, thì cửa sổ phải bắt đầu sau p, tức l = p + 1.

</details>

---

## 2. map: mảng đếm cho mọi kiểu khóa

`map<K, V>` giống mảng nhưng chỉ số (khóa) có thể là số rất lớn, số âm, hay xâu. Mỗi thao tác O(log n).

| Thao tác | C++ `map<long long,int> m` | Python `m = {}` |
| --- | --- | --- |
| gán / sửa | `m[k] = v` | `m[k] = v` |
| có khóa k chưa? | `m.count(k)` | `k in m` |
| đếm tần suất | `m[x]++` (khóa mới tự bắt đầu từ 0) | `m[x] = m.get(x, 0) + 1` |
| duyệt theo khóa tăng dần | `for (auto [k, v] : m)` | `for k in sorted(m)` |

`unordered_map` nhanh hơn (trung bình O(1)) nhưng không có thứ tự; ở mức này, `map` an toàn và đủ nhanh.

Chạy tay Danh sách phát với `1 2 1 3 2 7 4 2` (chỉ số từ 0):

| r | k[r] | Vị trí gần nhất trước đó | l mới | Độ dài | Tốt nhất |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 1 | — | 0 | 1 | 1 |
| 1 | 2 | — | 0 | 2 | 2 |
| 2 | 1 | 0 (≥ l) | 1 | 2 | 2 |
| 3 | 3 | — | 1 | 3 | 3 |
| 4 | 2 | 1 (≥ l) | 2 | 3 | 3 |
| 5 | 7 | — | 2 | 4 | 4 |
| 6 | 4 | — | 2 | 5 | **5** |
| 7 | 2 | 4 (≥ l) | 5 | 3 | 5 |

```cpp
// file: danh_sach_phat.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    map<long long, int> gan_nhat;          // mã bài -> vị trí xuất hiện gần nhất
    int l = 0, best = 0;
    for (int r = 0; r < n; r++) {
        long long k;
        cin >> k;
        if (gan_nhat.count(k) && gan_nhat[k] >= l) l = gan_nhat[k] + 1;
        gan_nhat[k] = r;
        best = max(best, r - l + 1);
    }
    cout << best << '\n';
}
```

---

## 3. set: tập hợp có thứ tự

`set` giữ các giá trị **khác nhau, luôn sắp xếp**. Ngoài thêm/xóa/tìm, nó trả lời được "giá trị nhỏ nhất ≥ x" trong O(log n), kể cả khi tập thay đổi liên tục; mảng đã sắp xếp + `lower_bound` (bài 1.4) thì không làm được việc thêm/xóa nhanh.

Ví dụ: có q thao tác trên một tập ban đầu rỗng: `+ x` thêm x; `- x` xóa x (nếu có); `? x` in giá trị nhỏ nhất ≥ x trong tập, hoặc −1 nếu không có.

| Vào | Ra |
| --- | --- |
| `6`<br>`+ 5`<br>`+ 2`<br>`? 3`<br>`- 5`<br>`? 3`<br>`? 1` | `5`<br>`-1`<br>`2` |

```cpp
// file: tap_hop.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> q;
    set<long long> s;
    while (q--) {
        char op;
        long long x;
        cin >> op >> x;
        if (op == '+') s.insert(x);
        else if (op == '-') s.erase(x);
        else {
            auto it = s.lower_bound(x);            // phần tử đầu tiên >= x
            cout << (it == s.end() ? -1 : *it) << '\n';
        }
    }
}
```

`multiset` giống `set` nhưng cho phép giá trị lặp lại. Xóa **một** bản sao: `ms.erase(ms.find(x))`; viết `ms.erase(x)` sẽ xóa **mọi** bản sao.

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: `m[k]` tự tạo khóa.** Chỉ cần đọc `m[k]` là khóa k được tạo với giá trị 0. Muốn kiểm tra có khóa chưa, dùng `m.count(k)`.

> [!WARNING]
> **Bẫy 2: quên điều kiện "≥ l".** Trong Danh sách phát, vị trí cũ nằm **ngoài** cửa sổ thì không làm lặp. Thiếu điều kiện này, l có thể bị kéo lùi.

> [!WARNING]
> **Bẫy 3: `multiset::erase(x)` xóa hết.** Dùng `erase(find(x))` để xóa một phần tử.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Playlist](https://cses.fi/problemset/task/1141) | CSES 1141 | Đúng mục 2 |
| Khởi động | [Registration system](https://codeforces.com/problemset/problem/4/C) | CF 4C · 1300 | `map<string,int>` |
| Luyện | [Concert Tickets](https://cses.fi/problemset/task/1091) | CSES 1091 | `multiset` + tìm giá lớn nhất ≤ x |
| Luyện | [Subarray Sums II](https://cses.fi/problemset/task/1661) | CSES 1661 | Tiền tố + đếm bằng `map` |
| Luyện | [Towers](https://cses.fi/problemset/task/1073) | CSES 1073 | `multiset` + `upper_bound` |
| Thử thách | [Traffic Lights](https://cses.fi/problemset/task/1163) | CSES 1163 | `set` vị trí + `multiset` độ dài |

---

## 6. Tóm tắt và checkpoint

1. `map`: mảng đếm cho khóa lớn hoặc xâu; O(log n) mỗi thao tác.
2. `set`: giá trị khác nhau, có thứ tự; `lower_bound` trên tập thay đổi.
3. `multiset`: cho phép lặp; xóa một bản bằng `erase(find(x))`.

<details><summary>Tìm giá trị lớn nhất ≤ x trong <code>set s</code> thế nào?</summary><code>auto it = s.upper_bound(x);</code> nếu <code>it != s.begin()</code> thì đáp án là <code>*prev(it)</code>.</details>

**Checkpoint:**

- [ ] AC Playlist và Concert Tickets.
- [ ] Giải thích được vì sao `m[k]` làm tăng kích thước map.
