# Bài 4.5 – Thành phần liên thông mạnh

> **Tập 4** · Cần biết trước: bài 2.7, 3.2 (tô-pô, QHĐ trên DAG) · Thời lượng: khoảng 90 phút đọc, 8 giờ thực hành

**Học xong bài này, em sẽ:** tìm các **thành phần liên thông mạnh** (SCC) của đồ thị có hướng bằng thuật toán Kosaraju; **nén** mỗi SCC thành một đỉnh để được đồ thị không chu trình, rồi QHĐ trên đó.

**Dấu hiệu nhận biết:** đồ thị có hướng **có chu trình**, nhưng bài toán sẽ dễ nếu không có chu trình (thứ tự tô-pô, QHĐ trên DAG).

---

## 1. Bài toán mở màn: Nhặt xu

Mê cung có n phòng và m đường hầm **một chiều**; phòng i có kᵢ đồng xu. Em xuất phát ở phòng bất kỳ, đi theo đường hầm, kết thúc ở phòng bất kỳ, nhặt xu ở mọi phòng đi qua (mỗi phòng một lần). Nhặt được nhiều nhất bao nhiêu xu? (n ≤ 10⁵, m ≤ 2·10⁵; bài [Coin Collector](https://cses.fi/problemset/task/1686))

| Vào | Ra |
| --- | --- |
| `4 4`<br>`4 5 2 7`<br>`1 2`<br>`2 1`<br>`1 3`<br>`2 4` | `16` |

Đi 1 → 2 → 1 → … → 2 → 4: nhặt 4 + 5 + 7 = 16.

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Phòng 1 và 2 đi qua lại được với nhau. Nếu vào được một trong hai, có nhặt được cả hai không? Gộp những nhóm phòng "đi qua lại được" thành một đỉnh thì đồ thị mới có chu trình không?

<details>
<summary>Đáp án</summary>

Có: trong một nhóm đi qua lại được, vào một phòng là nhặt hết cả nhóm. Gộp mỗi nhóm (SCC) thành một đỉnh thì đồ thị mới **không còn chu trình** (nếu còn, các nhóm trên chu trình đáng lẽ đã là một nhóm). Trên DAG đó, QHĐ đường đi có tổng lớn nhất (bài 3.2).

</details>

---

## 2. Kosaraju

1. DFS trên đồ thị gốc, ghi các đỉnh theo **thứ tự hoàn thành** (đỉnh xong sau cùng ở cuối).
2. Lấy các đỉnh theo thứ tự hoàn thành **ngược**, DFS trên **đồ thị đảo chiều**; mỗi lần DFS từ một đỉnh chưa thăm thu được đúng một SCC.

Vì sao đúng (ý chính): đỉnh hoàn thành sau cùng nằm trong một SCC "nguồn" của đồ thị nén; trên đồ thị đảo, từ đó không đi sang SCC nào khác chưa thăm.

Các SCC thu được ở bước 2 xuất hiện theo **thứ tự tô-pô** của đồ thị nén: không cần sắp tô-pô lại.

```cpp
// file: nhat_xu.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<long long> k(n + 1);
    for (int i = 1; i <= n; i++) cin >> k[i];
    vector<vector<int>> g(n + 1), rg(n + 1);
    for (int i = 0; i < m; i++) { int a, b; cin >> a >> b; g[a].push_back(b); rg[b].push_back(a); }
    // Bước 1: thứ tự hoàn thành, DFS bằng ngăn xếp
    vector<int> xong, it(n + 1, 0);
    vector<bool> tham(n + 1, false);
    for (int s = 1; s <= n; s++) {
        if (tham[s]) continue;
        vector<int> st = {s};
        tham[s] = true;
        while (!st.empty()) {
            int u = st.back();
            if (it[u] < (int)g[u].size()) {
                int v = g[u][it[u]++];
                if (!tham[v]) { tham[v] = true; st.push_back(v); }
            } else { xong.push_back(u); st.pop_back(); }
        }
    }
    // Bước 2: DFS trên đồ thị đảo theo thứ tự hoàn thành ngược
    vector<int> comp(n + 1, -1);
    int c = 0;
    for (int i = n - 1; i >= 0; i--) {
        int s = xong[i];
        if (comp[s] != -1) continue;
        vector<int> st = {s};
        comp[s] = c;
        while (!st.empty()) {
            int u = st.back(); st.pop_back();
            for (int v : rg[u]) if (comp[v] == -1) { comp[v] = c; st.push_back(v); }
        }
        c++;
    }
    // Nén và QHĐ: SCC đánh số theo thứ tự tô-pô 0, 1, ..., c-1
    vector<long long> xu(c, 0), dp(c, 0);
    for (int u = 1; u <= n; u++) xu[comp[u]] += k[u];
    vector<vector<int>> cg(c);
    for (int u = 1; u <= n; u++) for (int v : g[u]) if (comp[u] != comp[v]) cg[comp[u]].push_back(comp[v]);
    long long kq = 0;
    for (int x = 0; x < c; x++) dp[x] = xu[x];
    for (int x = 0; x < c; x++) {                     // theo thứ tự tô-pô: x xong trước khi đẩy đi
        kq = max(kq, dp[x]);
        for (int y : cg[x]) dp[y] = max(dp[y], dp[x] + xu[y]);
    }
    cout << kq << '\n';
}
```

O(n + m).

---

## 3. Cầu và khớp (đồ thị vô hướng)

- **Cầu:** cạnh mà xóa đi làm đồ thị mất liên thông. **Khớp:** đỉnh mà xóa đi làm mất liên thông.
- Cùng một kỹ thuật: DFS, ghi `vao[u]` và `thap[u]` = thời điểm vào nhỏ nhất đi tới được từ cây con của u bằng **một** cạnh ngược. Cạnh cha–con (p, u) là cầu khi `thap[u] > vao[p]`; p (không phải gốc) là khớp khi có con u với `thap[u] ≥ vao[p]`.
- Luyện: [Necessary Roads](https://cses.fi/problemset/task/2076), [Necessary Cities](https://cses.fi/problemset/task/2077). Nhớ viết DFS bằng ngăn xếp tự quản.

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: quên đồ thị đảo.** Bước 2 phải chạy trên `rg`, không phải `g`.

> [!WARNING]
> **Bẫy 2: cạnh trong cùng một SCC.** Khi nén, bỏ các cạnh có hai đầu cùng SCC, kẻo QHĐ cộng xu một nhóm hai lần.

> [!WARNING]
> **Bẫy 3: đệ quy sâu.** Đồ thị đường thẳng 10⁵ đỉnh: dùng ngăn xếp như trên.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Planets and Kingdoms](https://cses.fi/problemset/task/1683) | CSES 1683 | In SCC của từng đỉnh |
| Khởi động | [Coin Collector](https://cses.fi/problemset/task/1686) | CSES 1686 | Đúng mục 2 |
| Luyện | [Flight Routes Check](https://cses.fi/problemset/task/1682) | CSES 1682 | Một SCC hay không |
| Luyện | [Necessary Roads](https://cses.fi/problemset/task/2076) | CSES 2076 | Cầu |
| Thử thách | [Giant Pizza](https://cses.fi/problemset/task/1684) | CSES 1684 | 2-SAT qua SCC |

**Checkpoint:** viết Kosaraju không nhìn sách; AC Coin Collector và Giant Pizza.
