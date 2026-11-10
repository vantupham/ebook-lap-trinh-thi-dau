# Bài 5.4 – Đề luyện số 3: HSG Quốc gia

> **Thời gian: 180 phút.** Làm sau Tập 3. Đọc/ghi tệp, chấm theo subtask, tổng 20 điểm. Đề tự soạn theo kiểu đề HSG Quốc gia và Olympic 30/4 khối 11.

| Bài | Tên tệp chương trình | Dữ liệu | Kết quả | Điểm |
| --- | --- | --- | --- | :---: |
| 1. Đếm đường | `DEMDUONG.*` | `DEMDUONG.INP` | `DEMDUONG.OUT` | 6 |
| 2. Du lịch | `DULICH.*` | `DULICH.INP` | `DULICH.OUT` | 7 |
| 3. Bộ ba tăng | `BOBASO.*` | `BOBASO.INP` | `BOBASO.OUT` | 7 |

---

### Bài 1. Đếm đường (6 điểm)

Bản đồ có n địa điểm và m con đường hai chiều, đường thứ i nối uᵢ, vᵢ dài wᵢ. In độ dài đường đi ngắn nhất từ 1 tới n và **số đường đi ngắn nhất** khác nhau, chia lấy dư cho 10⁹ + 7. In −1 nếu không đi được.

**Dữ liệu:** dòng đầu n, m (2 ≤ n ≤ 10⁵; 1 ≤ m ≤ 2·10⁵); m dòng sau mỗi dòng u, v, w (1 ≤ w ≤ 10⁹).

| DEMDUONG.INP | DEMDUONG.OUT |
| --- | --- |
| `4 5`<br>`1 2 1`<br>`2 4 2`<br>`1 3 2`<br>`3 4 1`<br>`1 4 4` | `3 2` |

Hai đường dài 3 là 1 → 2 → 4 và 1 → 3 → 4.

Subtask: 50% số điểm có mọi w = 1.

### Bài 2. Du lịch (7 điểm)

Đoàn du lịch xuất phát ở điểm 1 và phải ghé **mọi** điểm trong n điểm, mỗi điểm đúng một lần, kết thúc ở đâu cũng được. Đi từ điểm i tới điểm j tốn cᵢⱼ. Tổng chi phí nhỏ nhất là bao nhiêu?

**Dữ liệu:** dòng đầu n (1 ≤ n ≤ 16); n dòng sau là ma trận c (0 ≤ cᵢⱼ ≤ 10⁶, cᵢᵢ = 0; c có thể không đối xứng).

| DULICH.INP | DULICH.OUT |
| --- | --- |
| `4`<br>`0 5 9 4`<br>`5 0 2 7`<br>`9 2 0 3`<br>`4 7 3 0` | `9` |

Đi 1 → 4 → 3 → 2: 4 + 3 + 2 = 9.

Subtask: 40% số điểm có n ≤ 9.

### Bài 3. Bộ ba tăng (7 điểm)

Dãy a₁ … aₙ. Đếm số bộ ba chỉ số i < j < k mà aᵢ < aⱼ < aₖ.

**Dữ liệu:** dòng đầu n (1 ≤ n ≤ 2·10⁵); dòng hai a₁ … aₙ (|aᵢ| ≤ 10⁹).

| BOBASO.INP | BOBASO.OUT |
| --- | --- |
| `6`<br>`2 5 3 4 1 6` | `5` |

Năm bộ ba: (2, 3, 4), (2, 3, 6), (2, 4, 6), (2, 5, 6), (3, 4, 6).

Subtask: 30% số điểm có n ≤ 300; 30% số điểm khác có n ≤ 5000.

---

## Chữa đề

<details>
<summary><b>Bài 1</b> – Dijkstra kèm đếm</summary>

- **50%:** mọi cạnh dài 1: BFS, đếm số cách theo từng tầng.
- **100%:** Dijkstra (bài 3.1). Khi tìm được đường **ngắn hơn** tới v thì `cach[v] = cach[u]`; khi tìm được đường **bằng** thì cộng thêm `cach[u]`. Vì mọi w ≥ 1, khi u được lấy ra khỏi hàng đợi lần đầu, mọi đỉnh đứng trước u trên đường ngắn nhất đã được xử lý xong, nên `cach[u]` đã đúng.

> [!WARNING]
> Nếu đề cho phép w = 0, cách đếm này sai (hai đỉnh cùng khoảng cách nối nhau). Khi đó phải xử lý theo nhóm đỉnh cùng khoảng cách.

```cpp
// file: demduong.cpp
#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1e9 + 7, VC = LLONG_MAX / 4;
int main() {
    freopen("DEMDUONG.INP", "r", stdin);
    freopen("DEMDUONG.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<vector<pair<int, long long>>> adj(n + 1);
    for (int i = 0; i < m; i++) { int u, v; long long w; cin >> u >> v >> w; adj[u].push_back({v, w}); adj[v].push_back({u, w}); }
    vector<long long> d(n + 1, VC), cach(n + 1, 0);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    d[1] = 0; cach[1] = 1; pq.push({0, 1});
    while (!pq.empty()) {
        auto [du, u] = pq.top(); pq.pop();
        if (du > d[u]) continue;            // khi lấy u ra lần đầu, cach[u] đã đủ
        for (auto [v, w] : adj[u]) {
            if (d[u] + w < d[v]) { d[v] = d[u] + w; cach[v] = cach[u]; pq.push({d[v], v}); }
            else if (d[u] + w == d[v]) cach[v] = (cach[v] + cach[u]) % MOD;
        }
    }
    if (d[n] == VC) cout << -1 << '\n';
    else cout << d[n] << ' ' << cach[n] << '\n';
}
```

</details>

<details>
<summary><b>Bài 2</b> – QHĐ trạng thái bitmask</summary>

- **40%:** thử mọi hoán vị của n − 1 điểm còn lại: 8! = 40320 cách.
- **100%:** QHĐ bitmask (bài 3.7). `f[mask][u]` = chi phí nhỏ nhất đã ghé đúng tập `mask`, đang đứng ở u. Chuyển sang mọi v chưa có trong mask. O(2ⁿ · n²) = 1,7·10⁷.

```cpp
// file: dulich.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    freopen("DULICH.INP", "r", stdin);
    freopen("DULICH.OUT", "w", stdout);
    int n;
    cin >> n;
    vector<vector<long long>> c(n, vector<long long>(n));
    for (auto &row : c) for (auto &x : row) cin >> x;
    const long long VC = LLONG_MAX / 4;
    // f[mask][u] = chi phí nhỏ nhất đi qua đúng tập mask (chứa đỉnh 0), đang đứng ở u
    vector<vector<long long>> f(1 << n, vector<long long>(n, VC));
    f[1][0] = 0;
    for (int mask = 1; mask < (1 << n); mask++) {
        if (!(mask & 1)) continue;
        for (int u = 0; u < n; u++) {
            if (f[mask][u] == VC) continue;
            for (int v = 0; v < n; v++) if (!(mask >> v & 1))
                f[mask | 1 << v][v] = min(f[mask | 1 << v][v], f[mask][u] + c[u][v]);
        }
    }
    cout << *min_element(f[(1 << n) - 1].begin(), f[(1 << n) - 1].end()) << '\n';
}
```

</details>

<details>
<summary><b>Bài 3</b> – hai cây Fenwick</summary>

- **30%:** ba vòng lặp, O(n³).
- **60%:** với mỗi j, đếm số phần tử nhỏ hơn bên trái và lớn hơn bên phải bằng hai vòng lặp, O(n²).
- **100%:** như trên nhưng đếm bằng cây Fenwick (bài 3.4) trên giá trị đã nén: đáp án = Σ trái[j] · phải[j]. O(n log n). Đáp án tới khoảng n³/27 ≈ 3·10¹⁴: dùng `long long`.

```cpp
// file: bobaso.cpp
#include <bits/stdc++.h>
using namespace std;
struct Fenwick {
    int n; vector<long long> t;
    Fenwick(int n) : n(n), t(n + 1, 0) {}
    void cong(int i, long long v) { for (; i <= n; i += i & -i) t[i] += v; }
    long long tong(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; }
};
int main() {
    freopen("BOBASO.INP", "r", stdin);
    freopen("BOBASO.OUT", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    vector<long long> v = a;                       // nén giá trị về 1..k
    sort(v.begin(), v.end()); v.erase(unique(v.begin(), v.end()), v.end());
    int k = v.size();
    vector<int> b(n);
    for (int i = 0; i < n; i++) b[i] = lower_bound(v.begin(), v.end(), a[i]) - v.begin() + 1;
    vector<long long> trai(n), phai(n);            // số phần tử nhỏ hơn bên trái, lớn hơn bên phải
    Fenwick L(k), R(k);
    for (int i = 0; i < n; i++) { trai[i] = L.tong(b[i] - 1); L.cong(b[i], 1); }
    for (int i = n - 1; i >= 0; i--) { phai[i] = (n - 1 - i) - R.tong(b[i]); R.cong(b[i], 1); }
    long long kq = 0;
    for (int i = 0; i < n; i++) kq += trai[i] * phai[i];
    cout << kq << '\n';
}
```

</details>

**Tự chấm:** 13/20 trở lên tương đương mức giải Ba – Nhì HSG Quốc gia. Sau đó làm đề thật các năm (xem [bài 5.5](../bai-5-5-kho-de-ke-hoach/)).
