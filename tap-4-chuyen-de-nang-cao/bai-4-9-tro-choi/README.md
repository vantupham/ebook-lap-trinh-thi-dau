# Bài 4.9 – Lý thuyết trò chơi

> **Tập 4** · Cần biết trước: bài 3.4 (QHĐ), bài 1.9 (XOR) · Thời lượng: khoảng 2 giờ đọc, 6 giờ thực hành

**Học xong bài này, em sẽ:** phân loại trạng thái **thắng/thua** bằng QHĐ; dùng **trò Nim** và phép XOR; tính **số Grundy** để ghép nhiều trò chơi độc lập.

**Dấu hiệu nhận biết:** hai người chơi lần lượt, "cả hai chơi tối ưu", không có may rủi, ai không đi được là thua.

---

## 1. Bài toán mở màn: Bốc que

Có n que. Bảo và Chi lần lượt bốc, Bảo đi trước. Mỗi lượt được bốc p₁, p₂, … hoặc pₖ que. Ai không bốc được là thua. Với **mỗi** n từ 1 tới N, ai thắng? (N ≤ 10⁶, k ≤ 100; bài [Stick Game](https://cses.fi/problemset/task/1729))

| Vào | Ra |
| --- | --- |
| `10 3`<br>`1 3 4` | `WLWWWWLWLW` |

`W` nghĩa là người đi trước thắng.

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Với 0 que, người phải đi thua ngay. Với 2 que chỉ bốc được 1, để lại 1 que. Vậy khi nào một trạng thái là **thắng**?

<details>
<summary>Đáp án</summary>

Một trạng thái **thắng** khi có ít nhất một nước đi dẫn tới trạng thái **thua** của đối thủ. Một trạng thái **thua** khi mọi nước đi đều dẫn tới trạng thái thắng (hoặc không có nước đi nào).

</details>

---

## 2. QHĐ thắng/thua

`thang[0] = false`; `thang[i] = true` nếu tồn tại pⱼ ≤ i mà `thang[i − pⱼ] = false`.

| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Kết quả | L | W | L | W | W | W | W | L | W | L | W |
| Nước thắng | – | −1 | – | −3 | −4 | −3 | −4 | – | −1 | – | −3 |

Độ phức tạp O(N·k) = 10⁸ phép tính đơn giản, khoảng 0,1 giây.

```cpp
// file: boc_que.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k; cin >> n >> k;
    vector<int> p(k);
    for (int &x : p) cin >> x;
    vector<char> thang(n + 1, 0);
    string kq;
    for (int i = 1; i <= n; i++) {
        for (int x : p) if (x <= i && !thang[i - x]) { thang[i] = 1; break; }
        kq += thang[i] ? 'W' : 'L';
    }
    cout << kq << '\n';
}
```

---

## 3. Nim và số Grundy

**Trò Nim:** có nhiều đống sỏi, mỗi lượt bốc bao nhiêu tùy ý từ **một** đống. Người đi trước thua khi và chỉ khi **XOR tất cả các đống bằng 0** ([Nim Game I](https://cses.fi/problemset/task/1730)).

**Số Grundy** của một trạng thái: `g(x) = mex{ g(y) : y là trạng thái đi tới được từ x }`, trong đó mex là số tự nhiên nhỏ nhất **không** có trong tập. g(x) = 0 nghĩa là thua.

**Định lý Sprague–Grundy:** chơi đồng thời nhiều trò độc lập (mỗi lượt chọn một trò để đi) thì Grundy của tổng = **XOR** các Grundy. Ví dụ ba đống que với luật bốc {1, 3, 4}: tính g cho từng đống bằng mex rồi XOR lại.

| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| g(i) với luật {1, 3, 4} | 0 | 1 | 0 | 1 | 2 | 3 | 2 | 0 |

Nim là trường hợp riêng: g(đống x) = x.

---

## 4. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: lẫn "thắng" của người đi trước và người đi sau.** Luôn ghi rõ: trạng thái được đánh giá cho người **sắp đi**.

> [!WARNING]
> **Bẫy 2: cộng Grundy thay vì XOR.** Tổng các trò chơi dùng XOR, không phải cộng.

> [!WARNING]
> **Bẫy 3: luật "ai đi nước cuối thì thua"** (misère) khác hẳn; Nim misère cần xử lý riêng khi mọi đống ≤ 1.

---

## 5. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Stick Game](https://cses.fi/problemset/task/1729) | CSES 1729 | Đúng mục 2 |
| Khởi động | [Nim Game I](https://cses.fi/problemset/task/1730) | CSES 1730 | XOR |
| Luyện | [Nim Game II](https://cses.fi/problemset/task/1098) | CSES 1098 | Grundy = x mod 4 |
| Luyện | [Stair Game](https://cses.fi/problemset/task/1099) | CSES 1099 | Nim trên bậc lẻ |
| Thử thách | [Grundy's Game](https://cses.fi/problemset/task/2207) | CSES 2207 | Grundy tính trước + quan sát |

**Checkpoint:** tự tính bảng g cho luật {2, 3} tới i = 10; giải thích vì sao Nim dùng XOR.
