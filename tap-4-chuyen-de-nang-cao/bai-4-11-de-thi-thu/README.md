# Bài 4.11 – Đề thi thử Tập 4

> **Thời gian: 180 phút**, kiểu vòng chọn đội tuyển. Đọc/ghi tệp, chấm theo subtask, tổng 20 điểm. Đề tự soạn.

Đề này trộn ba chuyên đề của Tập 4. Trước khi code, hãy tự hỏi với mỗi bài: "dấu hiệu nhận biết" nào đang xuất hiện?

| Bài | Tên tệp chương trình | Dữ liệu | Kết quả | Điểm |
| --- | --- | --- | --- | :---: |
| 1. Đèn lồng | `DENLONG.*` | `DENLONG.INP` | `DENLONG.OUT` | 6 |
| 2. Bốc sỏi | `BOCSOI.*` | `BOCSOI.INP` | `BOCSOI.OUT` | 7 |
| 3. Đường một chiều | `MOTCHIEU.*` | `MOTCHIEU.INP` | `MOTCHIEU.OUT` | 7 |

---

### Bài 1. Đèn lồng (6 điểm)

Phố lồng đèn Lương Nhữ Học treo n chiếc đèn, chiếc thứ i có độ sáng aᵢ. Có q thao tác:

- `1 l r v`: thay **tất cả** đèn từ l tới r bằng loại có độ sáng v;
- `2 l r`: in tổng độ sáng các đèn từ l tới r.

**Dữ liệu:** dòng đầu n, q (1 ≤ n, q ≤ 2·10⁵); dòng hai a₁ … aₙ; q dòng sau là các thao tác (0 ≤ aᵢ, v ≤ 10⁹).

| DENLONG.INP | DENLONG.OUT |
| --- | --- |
| `5 5`<br>`1 2 3 4 5`<br>`2 1 5`<br>`1 2 4 10`<br>`2 1 5`<br>`1 3 3 0`<br>`2 3 5` | `15`<br>`36`<br>`15` |

Subtask: 40% số điểm có n, q ≤ 5000.

### Bài 2. Bốc sỏi (7 điểm)

Có n đống sỏi, đống i có aᵢ viên. An và Bảo lần lượt chơi, **An đi trước**. Mỗi lượt chọn một đống và bốc đúng p₁, p₂, … hoặc pₖ viên từ đống đó (đống phải còn đủ). Ai không đi được là thua. Cả hai chơi tối ưu: in `AN` hoặc `BAO` là người thắng.

**Dữ liệu:** dòng đầu n, k (1 ≤ n ≤ 10⁵; 1 ≤ k ≤ 100); dòng hai a₁ … aₙ (1 ≤ aᵢ ≤ 10⁵); dòng ba p₁ … pₖ phân biệt (1 ≤ pⱼ ≤ 10⁵).

| BOCSOI.INP | BOCSOI.OUT |
| --- | --- |
| `3 3`<br>`2 4 6`<br>`1 3 4` | `BAO` |

Subtask: 30% số điểm có n = 1; 30% số điểm khác có k = 1.

### Bài 3. Đường một chiều (7 điểm)

Khu đô thị có n ngã tư và m đường **một chiều**. Thành phố muốn làm thêm ít đường một chiều nhất để từ mọi ngã tư đi được tới mọi ngã tư khác. Cần thêm ít nhất bao nhiêu đường?

**Dữ liệu:** dòng đầu n, m (1 ≤ n ≤ 10⁵; 0 ≤ m ≤ 2·10⁵); m dòng sau mỗi dòng u, v là đường từ u tới v.

| MOTCHIEU.INP | MOTCHIEU.OUT |
| --- | --- |
| `6 6`<br>`1 2`<br>`2 3`<br>`3 1`<br>`3 4`<br>`5 4`<br>`4 6` | `2` |

Ví dụ thêm 6 → 5 và 6 → 1.

Subtask: 40% số điểm có n ≤ 300.

---

## Chữa đề

<details>
<summary><b>Bài 1</b> – cây phân đoạn lười với phép <i>gán</i></summary>

- **40%:** làm trực tiếp, O(n·q) = 2,5·10⁷.
- **100%:** giống bài 4.1 nhưng nhãn lười là "gán v", không phải "cộng v". Hai điểm khác: gán mới **ghi đè** nhãn cũ (không cộng dồn); vì v có thể bằng 0 nên dùng −1 làm dấu "không có nhãn".

```cpp
// file: denlong.cpp
#include <bits/stdc++.h>
using namespace std;
int n;
vector<long long> sum_, gan;   // gan = giá trị gán chờ đẩy xuống, -1 nếu không có
void ap(int x, int l, int r, long long v) { sum_[x] = v * (r - l + 1); gan[x] = v; }
void day(int x, int l, int r) {
    if (gan[x] < 0) return;
    int m = (l + r) / 2;
    ap(2 * x, l, m, gan[x]); ap(2 * x + 1, m + 1, r, gan[x]);
    gan[x] = -1;
}
void dung(int x, int l, int r, const vector<long long> &a) {
    if (l == r) { sum_[x] = a[l]; return; }
    int m = (l + r) / 2;
    dung(2 * x, l, m, a); dung(2 * x + 1, m + 1, r, a);
    sum_[x] = sum_[2 * x] + sum_[2 * x + 1];
}
void gan_doan(int x, int l, int r, int u, int v, long long val) {
    if (v < l || r < u) return;
    if (u <= l && r <= v) { ap(x, l, r, val); return; }
    day(x, l, r);
    int m = (l + r) / 2;
    gan_doan(2 * x, l, m, u, v, val); gan_doan(2 * x + 1, m + 1, r, u, v, val);
    sum_[x] = sum_[2 * x] + sum_[2 * x + 1];
}
long long tong(int x, int l, int r, int u, int v) {
    if (v < l || r < u) return 0;
    if (u <= l && r <= v) return sum_[x];
    day(x, l, r);
    int m = (l + r) / 2;
    return tong(2 * x, l, m, u, v) + tong(2 * x + 1, m + 1, r, u, v);
}
int main() {
    freopen("DENLONG.INP", "r", stdin);
    freopen("DENLONG.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int q;
    cin >> n >> q;
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    sum_.assign(4 * n, 0); gan.assign(4 * n, -1);
    dung(1, 1, n, a);
    while (q--) {
        int t, l, r; cin >> t >> l >> r;
        if (t == 1) { long long v; cin >> v; gan_doan(1, 1, n, l, r, v); }
        else cout << tong(1, 1, n, l, r) << '\n';
    }
}
```

</details>

<details>
<summary><b>Bài 2</b> – số Grundy và XOR</summary>

- **n = 1:** QHĐ thắng/thua như bài 4.9.
- **k = 1:** g(x) = ⌊x / p₁⌋ mod 2.
- **100%:** các đống là các trò chơi độc lập, nên theo Sprague–Grundy đáp án là XOR của g(aᵢ). Tính g(0 … max a) bằng mex, O(max a · k) = 10⁷. Mex của tối đa k giá trị luôn ≤ k, nên chỉ cần đánh dấu các giá trị ≤ k. Mảng `thay` đánh dấu theo "lần thứ i" để khỏi xóa sau mỗi bước.

Ví dụ: với luật {1, 3, 4}, bảng ở bài 4.9 cho g(2) = 0, g(4) = 2, g(6) = 2; XOR bằng 0 nên An thua.

```cpp
// file: bocsoi.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("BOCSOI.INP", "r", stdin);
    freopen("BOCSOI.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, k;
    cin >> n >> k;
    vector<int> a(n), p(k);
    for (auto &x : a) cin >> x;
    for (auto &x : p) cin >> x;
    int M = *max_element(a.begin(), a.end());
    vector<int> g(M + 1, 0);
    vector<int> thay(k + 2, -1);          // thay[v] = i nghĩa là giá trị v xuất hiện khi tính g[i]
    for (int i = 1; i <= M; i++) {
        for (int x : p) if (x <= i && g[i - x] <= k) thay[g[i - x]] = i;
        int mex = 0;
        while (thay[mex] == i) mex++;
        g[i] = mex;
    }
    int x = 0;
    for (int v : a) x ^= g[v];
    cout << (x ? "AN" : "BAO") << '\n';
}
```

</details>

<details>
<summary><b>Bài 3</b> – nén thành phần liên thông mạnh</summary>

- **40%:** với n ≤ 300, tính bao đóng bắc cầu bằng Floyd để tìm thành phần, rồi dùng công thức dưới.
- **100%:** nén mỗi thành phần liên thông mạnh (bài 4.5) thành một đỉnh, được một DAG. Gọi a = số đỉnh không có cạnh vào (nguồn), b = số đỉnh không có cạnh ra (đích). Mỗi đường mới nối được nhiều nhất một đích tới một nguồn, nên cần ít nhất max(a, b) đường, và có cách chọn đạt đúng con số này. Trường hợp đặc biệt: cả đồ thị đã là **một** thành phần thì đáp án là 0, không phải max(1, 1) = 1.

```cpp
// file: motchieu.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("MOTCHIEU.INP", "r", stdin);
    freopen("MOTCHIEU.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<vector<int>> g(n + 1), gr(n + 1);
    vector<pair<int, int>> e(m);
    for (auto &[u, v] : e) { cin >> u >> v; g[u].push_back(v); gr[v].push_back(u); }
    // Kosaraju lặp: lượt 1 lấy thứ tự kết thúc trên g
    vector<int> thu_tu, it(n + 1, 0);
    vector<char> tham(n + 1, 0);
    for (int s = 1; s <= n; s++) {
        if (tham[s]) continue;
        vector<int> st = {s}; tham[s] = 1;
        while (!st.empty()) {
            int u = st.back();
            if (it[u] < (int)g[u].size()) {
                int v = g[u][it[u]++];
                if (!tham[v]) { tham[v] = 1; st.push_back(v); }
            } else { thu_tu.push_back(u); st.pop_back(); }
        }
    }
    // lượt 2 trên đồ thị ngược, theo thứ tự kết thúc giảm dần
    vector<int> tp(n + 1, -1);
    int c = 0;
    for (int i = n - 1; i >= 0; i--) {
        int s = thu_tu[i];
        if (tp[s] != -1) continue;
        vector<int> st = {s}; tp[s] = c;
        while (!st.empty()) {
            int u = st.back(); st.pop_back();
            for (int v : gr[u]) if (tp[v] == -1) { tp[v] = c; st.push_back(v); }
        }
        c++;
    }
    if (c == 1) { cout << 0 << '\n'; return 0; }
    vector<char> co_vao(c, 0), co_ra(c, 0);
    for (auto [u, v] : e) if (tp[u] != tp[v]) { co_ra[tp[u]] = 1; co_vao[tp[v]] = 1; }
    int nguon = 0, dich = 0;
    for (int i = 0; i < c; i++) { nguon += !co_vao[i]; dich += !co_ra[i]; }
    cout << max(nguon, dich) << '\n';
}
```

</details>

**Tự chấm:** 12/20 trở lên là đạt mục tiêu Tập 4. Chưa đạt: xem lại đúng bài lý thuyết của bài bị mất điểm.
