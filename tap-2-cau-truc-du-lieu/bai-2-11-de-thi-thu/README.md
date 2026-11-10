# Bài 2.11 – Đề thi thử Tập 2

> **Thời gian: 120 phút.** Làm như thi thật: bấm giờ, đọc/ghi tệp, không xem sách. Tổng điểm: 20. Đề tự soạn theo cấu trúc thường gặp của đề HSG 12 cấp tỉnh/thành phố.

Sau đề này, hãy làm [đề luyện số 2](../../tap-5-de-thi-chien-luoc/bai-5-3-de-luyen-hsg-thanh-pho/) trong 120 phút: với Tập 0–2, em có đủ kiến thức để đạt 20/20.

| Bài | Tên tệp chương trình | Dữ liệu | Kết quả | Điểm |
| --- | --- | --- | --- | :---: |
| 1. Trạm xe đạp | `TRAMXE.*` | `TRAMXE.INP` | `TRAMXE.OUT` | 6 |
| 2. Mua quà | `MUAQUA.*` | `MUAQUA.INP` | `MUAQUA.OUT` | 7 |
| 3. Kết nối | `KETNOI.*` | `KETNOI.INP` | `KETNOI.OUT` | 7 |

---

### Bài 1. Trạm xe đạp (6 điểm)

Bản đồ khu phố là lưới R × C: `T` là trạm xe đạp công cộng, `.` là ô đi được, `#` là tòa nhà. Mỗi bước đi sang ô kề cạnh (không vào `#`). Với mỗi ô `.`, gọi khoảng cách của nó là số bước ít nhất để tới **trạm gần nhất**. Hãy in khoảng cách lớn nhất trong mọi ô `.`; in −1 nếu có ô `.` không tới được trạm nào. Đề bảo đảm có ít nhất một trạm và một ô `.`.

**Dữ liệu:** dòng đầu R, C (1 ≤ R, C ≤ 1000); R dòng sau mô tả bản đồ.
**Kết quả:** một số nguyên.

| TRAMXE.INP | TRAMXE.OUT |
| --- | --- |
| `3 4`<br>`T..#`<br>`..#.`<br>`#...` | `6` |

Subtask: 50% số điểm có R, C ≤ 50 và không quá 10 trạm.

### Bài 2. Mua quà (7 điểm)

Có n món quà, món i giá cᵢ đồng và làm bạn nhận vui vᵢ điểm. Với x đồng, mỗi món mua tối đa một lần, hãy làm tổng điểm vui lớn nhất.

**Dữ liệu:** dòng đầu n, x; n dòng sau mỗi dòng cᵢ, vᵢ.
**Kết quả:** tổng điểm vui lớn nhất.

| MUAQUA.INP | MUAQUA.OUT |
| --- | --- |
| `3 8`<br>`4 5`<br>`3 4`<br>`5 6` | `10` |

Subtask: 50% số điểm có n ≤ 100, x ≤ 10⁵, cᵢ ≤ 10⁵, vᵢ ≤ 10⁹. 50% số điểm còn lại có n ≤ 100, x ≤ 10⁹, cᵢ ≤ 10⁹, **vᵢ ≤ 1000**.

### Bài 3. Kết nối (7 điểm)

Tỉnh có n xã, ban đầu chưa có con đường nào. Lần lượt xây m con đường hai chiều. Sau **mỗi** con đường, hãy cho biết có bao nhiêu cặp xã (u, v) với u < v đi lại được với nhau.

**Dữ liệu:** dòng đầu n, m (1 ≤ n, m ≤ 2·10⁵); m dòng sau mỗi dòng u, v (có thể u, v đã đi lại được với nhau).
**Kết quả:** m dòng.

| KETNOI.INP | KETNOI.OUT |
| --- | --- |
| `4 3`<br>`1 2`<br>`3 4`<br>`2 3` | `1`<br>`2`<br>`6` |

Subtask: 40% số điểm có n, m ≤ 1000.

---

## Chữa đề

<details>
<summary><b>Bài 1</b> – BFS nhiều nguồn</summary>

- **50%:** BFS riêng từ mỗi trạm (tối đa 10 lần), lấy min cho mỗi ô: 10 × 2500.
- **100%:** đưa **mọi trạm** vào hàng đợi với khoảng cách 0 **cùng lúc**, rồi BFS một lần. Mỗi ô được tới lần đầu từ trạm gần nhất: O(R·C). Đây là kỹ thuật **BFS nhiều nguồn** (CSES Monsters ở bài 2.7).

```cpp
// file: tramxe.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("TRAMXE.INP", "r", stdin);
    freopen("TRAMXE.OUT", "w", stdout);
    int R, C;
    cin >> R >> C;
    vector<string> g(R);
    for (auto &row : g) cin >> row;
    vector<vector<int>> d(R, vector<int>(C, -1));
    queue<pair<int, int>> q;
    for (int i = 0; i < R; i++)
        for (int j = 0; j < C; j++)
            if (g[i][j] == 'T') { d[i][j] = 0; q.push({i, j}); }
    int di[] = {1, -1, 0, 0}, dj[] = {0, 0, 1, -1};
    while (!q.empty()) {
        auto [i, j] = q.front(); q.pop();
        for (int h = 0; h < 4; h++) {
            int ni = i + di[h], nj = j + dj[h];
            if (ni < 0 || ni >= R || nj < 0 || nj >= C || g[ni][nj] == '#' || d[ni][nj] != -1) continue;
            d[ni][nj] = d[i][j] + 1;
            q.push({ni, nj});
        }
    }
    int kq = 0;
    for (int i = 0; i < R; i++)
        for (int j = 0; j < C; j++)
            if (g[i][j] == '.') {
                if (d[i][j] == -1) { cout << -1 << '\n'; return 0; }
                kq = max(kq, d[i][j]);
            }
    cout << kq << '\n';
}
```

</details>

<details>
<summary><b>Bài 2</b> – cái túi, rồi đổi vai trò</summary>

- **50% đầu:** cái túi 0/1 (bài 2.9): dp[j] = điểm vui lớn nhất với tiền ≤ j. O(n·x) = 10⁷.
- **50% sau:** x tới 10⁹, không lập được mảng theo tiền. Nhưng tổng điểm vui ≤ 100 × 1000 = 10⁵. **Đổi vai trò:** f[v] = **số tiền ít nhất** để đạt **đúng** v điểm vui. Đáp án là v lớn nhất có f[v] ≤ x. O(n · tổng v) = 10⁷.
- Một chương trình làm cả hai: chọn cách theo giới hạn của dữ liệu.

```cpp
// file: muaqua.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("MUAQUA.INP", "r", stdin);
    freopen("MUAQUA.OUT", "w", stdout);
    int n;
    long long x;
    cin >> n >> x;
    vector<long long> c(n), v(n);
    long long tongv = 0;
    for (int i = 0; i < n; i++) { cin >> c[i] >> v[i]; tongv += v[i]; }
    if (x <= 100000) {                               // cái túi theo tiền
        vector<long long> dp(x + 1, 0);
        for (int i = 0; i < n; i++)
            for (long long j = x; j >= c[i]; j--) dp[j] = max(dp[j], dp[j - c[i]] + v[i]);
        cout << dp[x] << '\n';
    } else {                                         // cái túi theo điểm vui
        const long long VC = LLONG_MAX / 4;
        vector<long long> f(tongv + 1, VC);
        f[0] = 0;
        for (int i = 0; i < n; i++)
            for (long long s = tongv; s >= v[i]; s--)
                if (f[s - v[i]] != VC) f[s] = min(f[s], f[s - v[i]] + c[i]);
        long long kq = 0;
        for (long long s = 0; s <= tongv; s++) if (f[s] <= x) kq = s;
        cout << kq << '\n';
    }
}
```

</details>

<details>
<summary><b>Bài 3</b> – DSU, cộng dồn số cặp</summary>

- **40%:** sau mỗi con đường, BFS/DFS đếm kích thước mọi thành phần, cộng k(k−1)/2: O(m·(n + m)).
- **100%:** DSU (bài 2.8). Khi gộp hai nhóm kích thước a và b, có thêm đúng **a × b** cặp mới đi lại được. Đường nối hai xã đã cùng nhóm thì không thêm gì. Đáp án tới n²/2 = 2·10¹⁰: `long long`.

```cpp
// file: ketnoi.cpp
#include <bits/stdc++.h>
using namespace std;
vector<int> cha;
vector<long long> sz;
int tim(int u) {
    while (cha[u] != u) { cha[u] = cha[cha[u]]; u = cha[u]; }
    return u;
}
int main() {
    freopen("KETNOI.INP", "r", stdin);
    freopen("KETNOI.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    cha.resize(n + 1); sz.assign(n + 1, 1);
    iota(cha.begin(), cha.end(), 0);
    long long cap = 0;
    while (m--) {
        int u, v;
        cin >> u >> v;
        u = tim(u); v = tim(v);
        if (u != v) {
            if (sz[u] < sz[v]) swap(u, v);
            cap += sz[u] * sz[v];
            cha[v] = u;
            sz[u] += sz[v];
        }
        cout << cap << '\n';
    }
}
```

</details>

---

## Tự chấm và bước tiếp theo

| Điểm của em | Gợi ý |
| --- | --- |
| Dưới 13 | Xác định bài mất điểm thuộc chủ đề nào (BFS, QHĐ, DSU); làm lại bài học đó và 3 bài nấc Luyện. |
| 13–17 | Đạt mục tiêu. Làm đề luyện số 2 (bài 5.3) trong 120 phút, rồi sang Tập 3. |
| Trên 17 | Sang Tập 3. Em đã sẵn sàng cho Olympic 30/4 khối 10 và có thể bắt đầu luyện đề HSG Quốc gia các năm trước. |
