# Bài 4.1 – Cây phân đoạn lười

> **Tập 4** · Cần biết trước: bài 3.5 · Thời lượng: khoảng 90 phút đọc, 8 giờ thực hành

**Học xong bài này, em sẽ:** cộng một giá trị vào **cả đoạn** và hỏi tổng **đoạn**, mỗi việc O(log n), bằng kỹ thuật "hoãn việc" (lazy propagation).

**Dấu hiệu nhận biết:** đề có cả "cập nhật đoạn" lẫn "hỏi đoạn", xen kẽ nhau, n và q tới 2·10⁵.

---

## 1. Bài toán mở màn: Tưới cây

Con đường có n cây, cây i cao aᵢ cm. Có q thao tác: `1 l r v` các cây l..r cùng cao thêm v cm; `2 l r` hỏi tổng chiều cao các cây l..r. (n, q ≤ 2·10⁵)

| Vào | Ra |
| --- | --- |
| `5 4`<br>`1 2 3 4 5`<br>`2 1 5`<br>`1 2 4 10`<br>`2 1 3`<br>`2 4 5` | `15`<br>`26`<br>`19` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Với cây phân đoạn thường (bài 3.5), cộng v vào đoạn dài k phải sửa k lá. Nếu một nút **phủ trọn** đoạn [l, r], có cần đi xuống các con của nó ngay không?

<details>
<summary>Đáp án</summary>

Không cần. Cập nhật tổng của nút đó (+ v × độ dài) và **ghi chú** "các con còn nợ +v". Chỉ khi sau này phải đi xuống nút con thì mới "trả nợ" xuống. Mỗi thao tác chỉ chạm O(log n) nút.

</details>

---

## 2. Hoãn việc

Mỗi nút giữ `tong` (tổng đoạn của nó, **đã tính** cả các lần cộng) và `no` (lượng cộng **chưa đẩy** xuống hai con). Trước khi đi vào con, gọi `day(x)` để đẩy nợ xuống.

```cpp
// file: tuoi_cay.cpp
#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> tong, no;

void ap(int x, int l, int r, long long v) {         // cộng v vào cả đoạn của nút x
    tong[x] += v * (r - l + 1);
    no[x] += v;
}
void day(int x, int l, int r) {                     // đẩy nợ xuống hai con
    if (no[x] == 0) return;
    int m = (l + r) / 2;
    ap(2 * x, l, m, no[x]);
    ap(2 * x + 1, m + 1, r, no[x]);
    no[x] = 0;
}
void cong(int x, int l, int r, int ql, int qr, long long v) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { ap(x, l, r, v); return; }   // phủ trọn: ghi nợ, dừng
    day(x, l, r);
    int m = (l + r) / 2;
    cong(2 * x, l, m, ql, qr, v);
    cong(2 * x + 1, m + 1, r, ql, qr, v);
    tong[x] = tong[2 * x] + tong[2 * x + 1];
}
long long hoi(int x, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return tong[x];
    day(x, l, r);
    int m = (l + r) / 2;
    return hoi(2 * x, l, m, ql, qr) + hoi(2 * x + 1, m + 1, r, ql, qr);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    tong.assign(4 * n, 0); no.assign(4 * n, 0);
    for (int i = 1; i <= n; i++) { long long a; cin >> a; cong(1, 1, n, i, i, a); }
    while (q--) {
        int t, l, r;
        cin >> t >> l >> r;
        if (t == 1) { long long v; cin >> v; cong(1, 1, n, l, r, v); }
        else cout << hoi(1, 1, n, l, r) << '\n';
    }
}
```

Đệ quy ở đây chỉ sâu log₂ n ≈ 18 tầng: an toàn. Cây cần **4n** nút.

**Mở rộng.** Đổi "cộng" thành "gán", hoặc kết hợp cả hai, chỉ cần định nghĩa lại `ap` và cách **gộp hai lần nợ** (gán rồi cộng khác cộng rồi gán). Bài [Range Updates and Sums](https://cses.fi/problemset/task/1735) luyện đúng điều này.

---

## 3. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: quên `day` trước khi đi xuống.** Con đọc giá trị cũ, chưa cộng phần nợ.

> [!WARNING]
> **Bẫy 2: quên tính lại `tong[x]` sau khi sửa con.** Nút cha giữ tổng sai từ đó về sau.

> [!WARNING]
> **Bẫy 3: nợ nhân độ dài tràn số.** v × độ dài tới 10⁹ × 2·10⁵: `long long`.

---

## 4. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Range Update Queries](https://cses.fi/problemset/task/1651) | CSES 1651 | Giải lại bằng cây lười |
| Luyện | [Range Updates and Sums](https://cses.fi/problemset/task/1735) | CSES 1735 | Hai loại nợ: cộng và gán |
| Luyện | [Polynomial Queries](https://cses.fi/problemset/task/1736) | CSES 1736 | Nợ là cấp số cộng |
| Thử thách | [Prefix Sum Queries](https://cses.fi/problemset/task/2166) | CSES 2166 | Nút giữ (tổng, tiền tố lớn nhất) |

**Checkpoint:** viết cây lười cộng–tổng không nhìn sách trong 10 phút; AC Range Updates and Sums.
