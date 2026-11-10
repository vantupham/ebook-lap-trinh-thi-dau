# Bài 3.11 – Đề thi thử Tập 3

> **Thời gian: 180 phút**, như kỳ thi HSG Quốc gia. Đọc/ghi tệp, chấm theo subtask, tổng 20 điểm. Đề tự soạn.

Với đề 180 phút, quy trình ở bài 0.10 đổi một chút: dành **15 phút** đọc cả ba bài và ghi độ phức tạp cần cho từng subtask; sau 120 phút, dừng lại xem bài nào còn subtask "rẻ" chưa lấy.

| Bài | Tên tệp chương trình | Dữ liệu | Kết quả | Điểm |
| --- | --- | --- | --- | :---: |
| 1. Giao hàng | `GIAOHANG.*` | `GIAOHANG.INP` | `GIAOHANG.OUT` | 6 |
| 2. Chênh lệch giá | `CHENHLECH.*` | `CHENHLECH.INP` | `CHENHLECH.OUT` | 7 |
| 3. Số chia hết | `CHIAHET.*` | `CHIAHET.INP` | `CHIAHET.OUT` | 7 |

---

### Bài 1. Giao hàng (6 điểm)

Mạng lưới có n giao lộ và m con đường hai chiều, đường thứ i nối uᵢ, vᵢ dài wᵢ. Có s giao lộ là **kho hàng**. Shipper đi từ giao lộ 1 tới giao lộ n và **phải ghé ít nhất một kho**. Quãng đường ngắn nhất là bao nhiêu? In −1 nếu không thể.

**Dữ liệu:** dòng đầu n, m, s (2 ≤ n ≤ 10⁵; m ≤ 2·10⁵; 1 ≤ s ≤ n); dòng hai gồm s chỉ số kho; m dòng sau mỗi dòng u, v, w (1 ≤ w ≤ 10⁹).

| GIAOHANG.INP | GIAOHANG.OUT |
| --- | --- |
| `5 5 1`<br>`2`<br>`1 2 2`<br>`2 5 2`<br>`1 3 1`<br>`3 4 1`<br>`4 5 1` | `4` |

Đường 1 → 3 → 4 → 5 dài 3 nhưng không qua kho; phải đi 1 → 2 → 5.

Subtask: 50% số điểm có n ≤ 400.

### Bài 2. Chênh lệch giá (7 điểm)

Giá một mặt hàng ở n cửa hàng là a₁ … aₙ. Có q thao tác: `1 i v` đổi giá cửa hàng i thành v; `2 l r` hỏi **giá cao nhất trừ giá thấp nhất** trong các cửa hàng l..r.

**Dữ liệu:** dòng đầu n, q (n, q ≤ 2·10⁵); dòng hai gồm n số (≤ 10⁹); q dòng thao tác.

| CHENHLECH.INP | CHENHLECH.OUT |
| --- | --- |
| `5 4`<br>`3 1 4 1 5`<br>`2 1 3`<br>`1 2 9`<br>`2 1 3`<br>`2 4 5` | `3`<br>`6`<br>`4` |

Subtask: 40% số điểm có n, q ≤ 5000.

### Bài 3. Số chia hết (7 điểm)

Đếm các số nguyên x trong [a, b] mà **tổng các chữ số** của x chia hết cho k.

**Dữ liệu:** một dòng a, b, k (1 ≤ a ≤ b ≤ 10¹⁸; 1 ≤ k ≤ 100).

| CHIAHET.INP | CHIAHET.OUT |
| --- | --- |
| `1 20 3` | `6` |

Các số: 3, 6, 9, 12, 15, 18.

Subtask: 40% số điểm có b ≤ 10⁶.

---

## Chữa đề

<details>
<summary><b>Bài 1</b> – Dijkstra hai lần</summary>

- **50%:** Floyd (bài 3.1) với n ≤ 400: đáp án = min theo kho w của d[1][w] + d[w][n].
- **100%:** đường đi qua kho w ngắn nhất = (ngắn nhất 1 → w) + (ngắn nhất w → n). Đồ thị vô hướng nên w → n bằng n → w. Chạy **Dijkstra từ 1** và **Dijkstra từ n**, rồi lấy min của d₁[w] + dₙ[w] theo mọi kho w. O((n + m) log n).

```cpp
// file: giaohang.cpp
#include <bits/stdc++.h>
using namespace std;
const long long VC = LLONG_MAX / 4;
vector<vector<pair<int, long long>>> adj;
vector<long long> dijkstra(int src, int n) {
    vector<long long> d(n + 1, VC);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    d[src] = 0; pq.push({0, src});
    while (!pq.empty()) {
        auto [du, u] = pq.top(); pq.pop();
        if (du > d[u]) continue;
        for (auto [v, w] : adj[u]) if (d[u] + w < d[v]) { d[v] = d[u] + w; pq.push({d[v], v}); }
    }
    return d;
}
int main() {
    freopen("GIAOHANG.INP", "r", stdin);
    freopen("GIAOHANG.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m, s;
    cin >> n >> m >> s;
    vector<int> kho(s);
    for (auto &x : kho) cin >> x;
    adj.assign(n + 1, {});
    for (int i = 0; i < m; i++) {
        int u, v; long long w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    auto d1 = dijkstra(1, n), dn = dijkstra(n, n);
    long long kq = VC;
    for (int w : kho) if (d1[w] < VC && dn[w] < VC) kq = min(kq, d1[w] + dn[w]);
    cout << (kq == VC ? -1 : kq) << '\n';
}
```

</details>

<details>
<summary><b>Bài 2</b> – cây phân đoạn giữ cả min và max</summary>

- **40%:** mỗi câu hỏi duyệt đoạn: O(n·q) = 2,5·10⁷.
- **100%:** cây phân đoạn (bài 3.5) mà mỗi nút giữ **cặp** (min, max). Không thể dùng một cây cho "max − min" trực tiếp, vì max − min của đoạn lớn không tính được từ max − min của hai nửa.

```cpp
// file: chenhlech.cpp
#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> mn, mx;
void sua(int i, long long v) {
    i += n; mn[i] = mx[i] = v;
    for (; i > 1; i /= 2) { mn[i / 2] = min(mn[i], mn[i ^ 1]); mx[i / 2] = max(mx[i], mx[i ^ 1]); }
}
long long hoi(int l, int r) {                       // [l, r), từ 0
    long long a = LLONG_MAX, b = LLONG_MIN;
    for (l += n, r += n; l < r; l /= 2, r /= 2) {
        if (l & 1) { a = min(a, mn[l]); b = max(b, mx[l]); l++; }
        if (r & 1) { --r; a = min(a, mn[r]); b = max(b, mx[r]); }
    }
    return b - a;
}
int main() {
    freopen("CHENHLECH.INP", "r", stdin);
    freopen("CHENHLECH.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    mn.assign(2 * n, LLONG_MAX); mx.assign(2 * n, LLONG_MIN);
    for (int i = 0; i < n; i++) { cin >> mn[n + i]; mx[n + i] = mn[n + i]; }
    for (int i = n - 1; i >= 1; i--) { mn[i] = min(mn[2 * i], mn[2 * i + 1]); mx[i] = max(mx[2 * i], mx[2 * i + 1]); }
    while (q--) {
        int t, a; long long b;
        cin >> t >> a >> b;
        if (t == 1) sua(a - 1, b);
        else cout << hoi(a - 1, b) << '\n';
    }
}
```

</details>

<details>
<summary><b>Bài 3</b> – QHĐ chữ số với tổng mod k</summary>

- **40%:** duyệt từng số tới 10⁶, tính tổng chữ số.
- **100%:** QHĐ chữ số (bài 3.9). Trạng thái thêm: **tổng chữ số mod k**. Không cần cờ "đã bắt đầu", vì chữ số 0 đứng đầu không đổi tổng. dem(N) đếm cả số 0 (tổng 0 chia hết k), nhưng phép trừ dem(b) − dem(a − 1) với a ≥ 1 loại nó đi.
- Số trạng thái: 19 vị trí × 100 số dư, mỗi trạng thái thử 10 chữ số.

```cpp
// file: chiahet.cpp
#include <bits/stdc++.h>
using namespace std;
string s;
int k;
long long nho[20][100];
long long dem_tu(int i, int du, bool bam) {
    if (i == (int)s.size()) return du == 0;
    if (!bam && nho[i][du] != -1) return nho[i][du];
    int gh = bam ? s[i] - '0' : 9;
    long long kq = 0;
    for (int d = 0; d <= gh; d++) kq += dem_tu(i + 1, (du + d) % k, bam && d == gh);
    if (!bam) nho[i][du] = kq;
    return kq;
}
long long dem(long long N) {                        // số x trong [0, N] có tổng chữ số chia hết k
    if (N < 0) return 0;
    s = to_string(N);
    memset(nho, -1, sizeof nho);
    return dem_tu(0, 0, true);
}
int main() {
    freopen("CHIAHET.INP", "r", stdin);
    freopen("CHIAHET.OUT", "w", stdout);
    long long a, b;
    cin >> a >> b >> k;
    cout << dem(b) - dem(a - 1) << '\n';
}
```

</details>

---

## Tự chấm và bước tiếp theo

| Điểm của em | Gợi ý |
| --- | --- |
| Dưới 12 | Xem bài mất điểm thuộc kỹ thuật nào; làm lại bài học tương ứng và 3 bài nấc Luyện, thi lại sau 1 tuần. |
| 12–17 | Đạt mục tiêu Tập 3. Luyện đề HSG Quốc gia các năm trước (theo subtask), rồi sang Tập 4. |
| Trên 17 | Sang Tập 4. Bắt đầu luyện đề chọn đội tuyển quốc gia và APIO. |
