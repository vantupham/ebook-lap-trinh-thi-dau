# Bài 0.5 – Mảng

> **Tập 0** · Cần biết trước: bài 0.4 · Thời lượng: khoảng 75 phút đọc, 5 giờ thực hành

**Học xong bài này, em sẽ:**

- lưu một dãy số vào mảng (`list` trong Python, `vector` trong C++) và duyệt nó;
- dùng **mảng đếm** để đếm tần suất trong O(n) thay vì O(n²);
- dùng **mảng đánh dấu** để biết một giá trị đã xuất hiện hay chưa.

---

## 1. Bài toán mở màn: Thống kê điểm

Lớp của Chi có n bạn (1 ≤ n ≤ 10⁵), mỗi bạn có điểm nguyên từ 0 đến 10. Hãy in:

1. điểm cao nhất và số bạn đạt điểm đó;
2. điểm **xuất hiện nhiều nhất** (nếu có nhiều điểm như vậy, in điểm nhỏ nhất).

| Vào | Ra |
| --- | --- |
| `7`<br>`8 6 9 6 9 7 6` | `9 2`<br>`6` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Để tìm điểm xuất hiện nhiều nhất, An định: với mỗi bạn, đếm xem có bao nhiêu bạn cùng điểm. Với n = 10⁵, cách này cần khoảng bao nhiêu phép so sánh? Có cách nào nhanh hơn, khi biết điểm chỉ từ 0 đến 10?

<details>
<summary>Đáp án</summary>

Cách của An là hai vòng lặp lồng nhau: n² = 10¹⁰ phép, quá chậm. Vì điểm chỉ có 11 giá trị, ta dùng **11 cái hộp**, mỗi hộp đếm số bạn đạt một mức điểm. Duyệt danh sách **một lần**, bỏ mỗi bạn vào đúng hộp.

</details>

---

## 2. Mảng là một dãy hộp đánh số

Mảng `a` có n phần tử: `a[0], a[1], …, a[n-1]`. Chỉ số **bắt đầu từ 0** trong cả Python lẫn C++.

| Thao tác | Python | C++ |
| --- | --- | --- |
| Tạo mảng n số 0 | `a = [0] * n` | `vector<long long> a(n, 0);` |
| Đọc n số vào mảng | `a = list(map(int, input().split()))` | `for (auto &x : a) cin >> x;` |
| Độ dài | `len(a)` | `a.size()` |
| Duyệt từng phần tử | `for x in a:` | `for (auto x : a)` |
| Lớn nhất | `max(a)` | `*max_element(a.begin(), a.end())` |

---

## 3. Mảng đếm

Hộp số k (`dem[k]`) giữ số bạn được k điểm. Duyệt dãy `8 6 9 6 9 7 6`, mỗi bạn làm `dem[diem] += 1`:

| Sau khi xét | dem[6] | dem[7] | dem[8] | dem[9] |
| --- | :---: | :---: | :---: | :---: |
| 8 | 0 | 0 | 1 | 0 |
| 6 | 1 | 0 | 1 | 0 |
| 9 | 1 | 0 | 1 | 1 |
| 6 | 2 | 0 | 1 | 1 |
| 9 | 2 | 0 | 1 | 2 |
| 7 | 2 | 1 | 1 | 2 |
| 6 | **3** | 1 | 1 | **2** |

Điểm cao nhất là 9 với dem[9] = 2. Điểm xuất hiện nhiều nhất là 6 với dem[6] = 3. Chỉ cần duyệt dãy một lần, rồi duyệt 11 hộp: tổng khoảng n + 11 phép.

```python
# file: thong_ke.py
n = int(input())
a = list(map(int, input().split()))
dem = [0] * 11
for x in a:
    dem[x] += 1

cao = max(a)
print(cao, dem[cao])

tot = 0                       # điểm xuất hiện nhiều nhất
for k in range(11):           # duyệt từ nhỏ tới lớn, chỉ đổi khi lớn hơn HẲN
    if dem[k] > dem[tot]:
        tot = k
print(tot)
```

```cpp
// file: thong_ke.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n), dem(11, 0);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        dem[a[i]]++;
    }
    int cao = *max_element(a.begin(), a.end());
    cout << cao << ' ' << dem[cao] << '\n';
    int tot = 0;
    for (int k = 0; k < 11; k++)
        if (dem[k] > dem[tot]) tot = k;
    cout << tot << '\n';
}
```

> [!NOTE]
> Vì sao dùng `>` chứ không phải `>=`? Đề yêu cầu "nếu nhiều điểm cùng xuất hiện nhiều nhất thì in điểm nhỏ nhất". Duyệt từ nhỏ tới lớn và chỉ đổi khi lớn hơn hẳn thì giữ lại điểm nhỏ nhất.

---

## 4. Mảng đánh dấu: Số bị thiếu

Các số 1, 2, …, n được ghi lên n tấm thẻ, nhưng bị mất một thẻ. Cho n và n − 1 số còn lại, tìm số bị mất (2 ≤ n ≤ 2·10⁵). Đây là bài [Missing Number](https://cses.fi/problemset/task/1083) trên CSES.

Ý tưởng: mảng `co[1..n]` toàn `False`; thấy số x thì đặt `co[x] = True`; số nào vẫn `False` là số bị mất.

```python
# file: so_bi_thieu.py
import sys
data = sys.stdin.buffer.read().split()
n = int(data[0])
co = [False] * (n + 1)          # dùng chỉ số 1..n, bỏ trống ô 0
for x in data[1:n]:
    co[int(x)] = True
for v in range(1, n + 1):
    if not co[v]:
        print(v)
        break
```

```cpp
// file: so_bi_thieu.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<bool> co(n + 1, false);
    for (int i = 0; i < n - 1; i++) {
        int x;
        cin >> x;
        co[x] = true;
    }
    for (int v = 1; v <= n; v++)
        if (!co[v]) { cout << v << '\n'; break; }
}
```

> [!TIP]
> **Cách khác của Bảo:** số bị mất = (1 + 2 + … + n) − (tổng các số còn lại). Không cần mảng, nhưng nhớ dùng `long long` (bài 0.2).

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: chỉ số ra ngoài mảng.** Mảng `[0] * n` không có ô `a[n]`. Muốn dùng chỉ số 1..n thì tạo mảng n + 1 ô. Python báo lỗi `IndexError`; C++ **không báo**, chỉ cho kết quả rác hoặc dừng đột ngột.

> [!WARNING]
> **Bẫy 2: mảng đếm cho giá trị quá lớn.** Mảng đếm chỉ dùng được khi giá trị nhỏ (vài triệu trở xuống). Giá trị tới 10⁹ thì cần cách khác: sắp xếp (Tập 1) hoặc `map`/`dict` (Tập 2).

> [!WARNING]
> **Bẫy 3: đọc sai số phần tử.** Bài Số bị thiếu chỉ có **n − 1** số. Đọc thừa một số là lỗi hay gặp, nhất là khi dùng vòng `for` n lần trong C++.

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Missing Number](https://cses.fi/problemset/task/1083) | CSES 1083 | Mảng đánh dấu |
| Khởi động | [Team](https://codeforces.com/problemset/problem/231/A) | CF 231A · 800 | Đọc nhiều dòng, đếm |
| Luyện | [Next Round](https://codeforces.com/problemset/problem/158/A) | CF 158A · 800 | Truy cập phần tử thứ k |
| Luyện | [Increasing Array](https://cses.fi/problemset/task/1094) | CSES 1094 | So sánh phần tử với phần tử trước |
| Luyện | [George and Accommodation](https://codeforces.com/problemset/problem/467/A) | CF 467A · 800 | Đếm có điều kiện |
| Thử thách | [Young Physicist](https://codeforces.com/problemset/problem/69/A) | CF 69A · 1000 | Tổng theo từng cột |

---

## 7. Tóm tắt và checkpoint

1. Mảng: dãy hộp đánh số từ 0. Muốn dùng 1..n thì tạo n + 1 ô.
2. Giá trị nhỏ cần đếm tần suất: **mảng đếm**, O(n).
3. Cần biết "đã xuất hiện chưa": **mảng đánh dấu**.
4. C++ không kiểm tra chỉ số: tự cẩn thận với biên mảng.

<details><summary>Đếm số lần xuất hiện của các giá trị từ 0 đến 10⁶ trong dãy 10⁶ số: cách nào nhanh?</summary>Mảng đếm 10⁶ + 1 ô, duyệt dãy một lần: khoảng 2·10⁶ phép.</details>
<details><summary><code>a = [0] * 5</code>; <code>a[5] = 1</code> có lỗi gì?</summary>Ra ngoài mảng: chỉ số hợp lệ là 0..4.</details>

**Checkpoint:**

- [ ] Viết lại bài Thống kê điểm không nhìn sách.
- [ ] Giải bài Số bị thiếu bằng cả hai cách (mảng đánh dấu và công thức tổng).
