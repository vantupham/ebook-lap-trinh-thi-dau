# Bài 2.1 – Ngăn xếp và hàng đợi

> **Tập 2** · Cần biết trước: Tập 1 · Thời lượng: khoảng 60 phút đọc, 4 giờ thực hành

**Học xong bài này, em sẽ:**

- dùng **ngăn xếp** (vào sau, ra trước) và **hàng đợi** (vào trước, ra trước);
- nhận ra bài nào cần cấu trúc nào: "gặp lại cái mới nhất" thì ngăn xếp, "xử lý theo thứ tự đến" thì hàng đợi;
- dùng `deque` khi cần thêm/bớt ở cả hai đầu.

---

## 1. Bài toán mở màn: Dấu ngoặc

Trình soạn thảo của An cần kiểm tra một xâu chỉ gồm `()[]{}` có hợp lệ không: mỗi ngoặc mở có ngoặc đóng **cùng loại**, và đóng theo đúng thứ tự lồng nhau. (độ dài ≤ 10⁶)

| Vào | Ra |
| --- | --- |
| `([]{()})` | `YES` |
| `([)]` | `NO` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Khi gặp một ngoặc đóng, nó phải khớp với ngoặc mở **nào**: ngoặc mở đầu tiên, hay ngoặc mở gần nhất chưa được đóng?

<details>
<summary>Đáp án</summary>

Ngoặc mở **gần nhất chưa đóng**. "Cái mới nhất được xử lý trước" chính là ngăn xếp: gặp ngoặc mở thì đẩy vào; gặp ngoặc đóng thì so với đỉnh rồi bỏ đỉnh.

</details>

---

## 2. Ngăn xếp

Chạy tay với `([)]`:

| Ký tự | Hành động | Ngăn xếp (đáy → đỉnh) |
| :---: | --- | --- |
| `(` | đẩy | `(` |
| `[` | đẩy | `( [` |
| `)` | đỉnh là `[`, không khớp với `)` | **NO** |

```cpp
// file: ngoac.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    string s;
    cin >> s;
    stack<char> st;
    bool ok = true;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else {
            char mo = (c == ')') ? '(' : (c == ']') ? '[' : '{';
            if (st.empty() || st.top() != mo) { ok = false; break; }
            st.pop();
        }
    }
    if (!st.empty()) ok = false;          // còn ngoặc mở chưa đóng
    cout << (ok ? "YES" : "NO") << '\n';
}
```

| Thao tác | C++ `stack<T> st` | Python `st = []` |
| --- | --- | --- |
| đẩy | `st.push(x)` | `st.append(x)` |
| xem đỉnh | `st.top()` | `st[-1]` |
| bỏ đỉnh | `st.pop()` | `st.pop()` |
| rỗng? | `st.empty()` | `not st` |

---

## 3. Hàng đợi: trò chơi vòng tròn

n bạn đứng vòng tròn, đánh số 1..n. Bắt đầu từ bạn 1, cứ **bỏ qua một bạn rồi loại bạn kế tiếp**, tới khi hết người. In thứ tự bị loại. (n ≤ 2·10⁵, bài [Josephus Problem I](https://cses.fi/problemset/task/2162))

| Vào | Ra |
| --- | --- |
| `7` | `2 4 6 1 5 3 7` |

Ý tưởng: xếp mọi người vào hàng đợi. Lặp lại: lấy người đầu hàng ra và **cho xếp lại cuối hàng** (được bỏ qua), rồi lấy người đầu hàng tiếp theo ra và **loại**.

| Bước | Hàng đợi trước (đầu → cuối) | Bỏ qua | Loại |
| :---: | --- | :---: | :---: |
| 1 | 1 2 3 4 5 6 7 | 1 | 2 |
| 2 | 3 4 5 6 7 1 | 3 | 4 |
| 3 | 5 6 7 1 3 | 5 | 6 |
| 4 | 7 1 3 5 | 7 | 1 |

```cpp
// file: josephus.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    queue<int> q;
    for (int i = 1; i <= n; i++) q.push(i);
    vector<int> loai;
    while (!q.empty()) {
        q.push(q.front()); q.pop();      // bỏ qua: đưa xuống cuối hàng
        loai.push_back(q.front()); q.pop();
    }
    for (int i = 0; i < n; i++) cout << loai[i] << (i + 1 == n ? '\n' : ' ');
}
```

Khi còn đúng một người, người đó được "bỏ qua" (xếp lại vào hàng) rồi chính người đó bị loại: code trên vẫn đúng. Mỗi người vào/ra hàng đợi O(1) lần mỗi vòng, tổng O(n).

| Thao tác | C++ `queue<T> q` | Python `q = deque()` |
| --- | --- | --- |
| thêm cuối | `q.push(x)` | `q.append(x)` |
| xem đầu | `q.front()` | `q[0]` |
| bỏ đầu | `q.pop()` | `q.popleft()` |

`deque` thêm/bớt được ở **cả hai đầu** (`push_front`, `push_back`, `pop_front`, `pop_back`). Bài 2.6 dùng nó cho min trên cửa sổ trượt.

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: `top()`/`front()` khi rỗng.** C++ không báo lỗi rõ ràng mà cho kết quả rác. Luôn kiểm tra `empty()` trước, như dòng `if (st.empty() || ...)`.

> [!WARNING]
> **Bẫy 2: quên kiểm tra cuối cùng.** Xâu `((` không gặp lỗi nào trong vòng lặp, nhưng vẫn không hợp lệ: ngăn xếp phải rỗng khi kết thúc.

> [!WARNING]
> **Bẫy 3: Python dùng `list.pop(0)` làm hàng đợi.** Mỗi lần là O(n), cả bài thành O(n²). Dùng `collections.deque`.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Josephus Problem I](https://cses.fi/problemset/task/2162) | CSES 2162 | Đúng mục 3 |
| Khởi động | In độ sâu lồng nhau lớn nhất của một xâu ngoặc hợp lệ | Tự luyện | Kích thước ngăn xếp lớn nhất |
| Luyện | [Hulk](https://codeforces.com/problemset/problem/705/A) | CF 705A · 800 | Khởi động cú pháp |
| Luyện | Tính giá trị biểu thức hậu tố, ví dụ `3 4 + 2 *` = 14 | Tự luyện | Ngăn xếp các toán hạng |
| Thử thách | [Longest Regular Bracket Sequence](https://codeforces.com/problemset/problem/5/C) | CF 5C · 1900 | Ngăn xếp chỉ số + đếm |

---

## 6. Tóm tắt và checkpoint

1. Ngăn xếp: vào sau ra trước; dùng khi cần "cái mới nhất chưa xử lý".
2. Hàng đợi: vào trước ra trước; dùng khi xử lý theo thứ tự đến, như mô phỏng xếp hàng và BFS (bài 2.7).
3. `deque`: thêm/bớt hai đầu, O(1).

<details><summary><code>{[]}(</code> có hợp lệ không? Vì sao?</summary>Không: còn <code>(</code> trong ngăn xếp khi kết thúc.</details>

**Checkpoint:**

- [ ] AC CSES Josephus Problem I.
- [ ] Viết bài dấu ngoặc không nhìn sách, đúng cả test `((`.
