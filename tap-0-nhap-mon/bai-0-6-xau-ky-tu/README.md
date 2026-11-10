# Bài 0.6 – Xâu ký tự

> **Tập 0** · Cần biết trước: bài 0.5 · Thời lượng: khoảng 60 phút đọc, 4 giờ thực hành

**Học xong bài này, em sẽ:**

- duyệt từng ký tự của xâu, nhận biết chữ hoa, chữ thường, chữ số;
- dùng **mã ASCII** để đổi chữ hoa/thường và tính vị trí chữ cái trong bảng chữ;
- đọc cả một dòng có dấu cách, và kiểm tra xâu đối xứng.

---

## 1. Bài toán mở màn: Mật khẩu mạnh

Quán cà phê gần trường đặt quy định: mật khẩu Wi-Fi **mạnh** nếu dài ít nhất 8 ký tự và có đủ cả chữ hoa, chữ thường, chữ số. Nhập mật khẩu (không chứa dấu cách, dài không quá 100), in `MANH` hoặc `YEU`.

| Vào | Ra |
| --- | --- |
| `SaiGon2026` | `MANH` |
| `saigon2026` | `YEU` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Em cần kiểm tra bao nhiêu điều kiện? Với mỗi điều kiện "có chữ hoa", em sẽ duyệt xâu thế nào?

<details>
<summary>Đáp án</summary>

Bốn điều kiện: độ dài ≥ 8, có chữ hoa, có chữ thường, có chữ số. Dùng ba **biến cờ** (`co_hoa`, `co_thuong`, `co_so`) ban đầu là sai; duyệt từng ký tự một lần, gặp loại nào thì bật cờ loại đó.

</details>

---

## 2. Duyệt xâu và biến cờ

```python
# file: mat_khau.py
s = input().strip()
co_hoa = co_thuong = co_so = False
for ch in s:
    if 'A' <= ch <= 'Z':
        co_hoa = True
    elif 'a' <= ch <= 'z':
        co_thuong = True
    elif '0' <= ch <= '9':
        co_so = True
if len(s) >= 8 and co_hoa and co_thuong and co_so:
    print("MANH")
else:
    print("YEU")
```

```cpp
// file: mat_khau.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    string s;
    cin >> s;
    bool co_hoa = false, co_thuong = false, co_so = false;
    for (char ch : s) {
        if ('A' <= ch && ch <= 'Z') co_hoa = true;
        else if ('a' <= ch && ch <= 'z') co_thuong = true;
        else if ('0' <= ch && ch <= '9') co_so = true;
    }
    if (s.size() >= 8 && co_hoa && co_thuong && co_so) cout << "MANH\n";
    else cout << "YEU\n";
}
```

---

## 3. Mã ASCII: mỗi ký tự là một con số

Máy tính lưu mỗi ký tự bằng một số. Các chữ cái và chữ số **nằm liền nhau** theo thứ tự:

| Ký tự | `'0'` … `'9'` | `'A'` … `'Z'` | `'a'` … `'z'` |
| --- | --- | --- | --- |
| Mã | 48 … 57 | 65 … 90 | 97 … 122 |

Nhờ vậy:

| Muốn | Python | C++ |
| --- | --- | --- |
| Mã của ký tự | `ord(ch)` | `(int)ch` |
| Ký tự từ mã | `chr(m)` | `(char)m` |
| Chữ số `'7'` thành số 7 | `ord(ch) - ord('0')` hoặc `int(ch)` | `ch - '0'` |
| Vị trí chữ cái (`'a'` là 0) | `ord(ch) - ord('a')` | `ch - 'a'` |
| Đổi thành chữ hoa | `ch.upper()` | `toupper(ch)` |

`ch - 'a'` là cầu nối giữa xâu và mảng: đếm tần suất 26 chữ cái bằng mảng đếm 26 ô, như bài 0.5.

---

## 4. Xâu đối xứng

Một câu là **đối xứng** nếu đọc xuôi và ngược giống nhau, sau khi bỏ mọi ký tự không phải chữ hoặc số và không phân biệt hoa thường. Ví dụ `Top spot!` → `topspot` → đối xứng. Nhập một dòng (có thể có dấu cách, dài không quá 10⁵), in `YES` hoặc `NO`.

Ý tưởng: lọc lấy chữ và số, đổi về chữ thường, rồi so ký tự thứ i với ký tự thứ i tính từ cuối.

| i | t[i] | t[len − 1 − i] | Bằng? |
| :---: | :---: | :---: | :---: |
| 0 | t | t | có |
| 1 | o | o | có |
| 2 | p | p | có |
| 3 | s | s | có (ở giữa) |

```python
# file: doi_xung.py
s = input()
t = [ch.lower() for ch in s if ch.isalnum()]   # lọc chữ và số, đổi về thường
print("YES" if t == t[::-1] else "NO")         # t[::-1] là t đảo ngược
```

```cpp
// file: doi_xung.cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    string s, t;
    getline(cin, s);                 // đọc cả dòng, kể cả dấu cách
    for (char ch : s)
        if (isalnum((unsigned char)ch)) t += tolower(ch);
    bool ok = true;
    int n = t.size();
    for (int i = 0; i < n / 2; i++)
        if (t[i] != t[n - 1 - i]) { ok = false; break; }
    cout << (ok ? "YES" : "NO") << '\n';
}
```

---

## 5. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: `cin >> s` chỉ đọc tới dấu cách.** Dòng có dấu cách thì dùng `getline(cin, s)`. Nếu trước đó đã `cin >> n`, phải bỏ ký tự xuống dòng còn sót bằng `cin.ignore()` trước khi `getline`.

> [!WARNING]
> **Bẫy 2: ký tự xuống dòng ẩn.** Tệp tạo trên Windows có thể kết thúc dòng bằng `\r\n`. Trong Python, `input().strip()` bỏ được ký tự thừa ở hai đầu; trong C++, khi dùng `getline` hãy cẩn thận với `\r` ở cuối.

> [!WARNING]
> **Bẫy 3: nối xâu trong vòng lặp ở Python.** `t = t + ch` lặp 10⁵ lần có thể chậm. Gom vào `list` rồi `''.join(...)` khi cần một xâu.

---

## 6. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Way Too Long Words](https://codeforces.com/problemset/problem/71/A) | CF 71A · 800 | Độ dài, ký tự đầu và cuối |
| Khởi động | [Word Capitalization](https://codeforces.com/problemset/problem/281/A) | CF 281A · 800 | Đổi chữ hoa |
| Luyện | [Petya and Strings](https://codeforces.com/problemset/problem/112/A) | CF 112A · 800 | So sánh không phân biệt hoa thường |
| Luyện | [String Task](https://codeforces.com/problemset/problem/118/A) | CF 118A · 1000 | Lọc ký tự, dựng xâu mới |
| Luyện | [Boy or Girl](https://codeforces.com/problemset/problem/236/A) | CF 236A · 800 | Đếm chữ cái khác nhau bằng mảng 26 ô |
| Thử thách | [Palindrome Reorder](https://cses.fi/problemset/task/1755) | CSES 1755 | Đếm tần suất rồi dựng xâu đối xứng |

---

## 7. Tóm tắt và checkpoint

1. Duyệt xâu như duyệt mảng; dùng biến cờ để ghi nhận "đã gặp".
2. Ký tự là số: `ch - 'a'` cho vị trí chữ cái, `ch - '0'` cho giá trị chữ số.
3. Dòng có dấu cách: `input()` (Python), `getline` (C++).

<details><summary>Trong C++, <code>'7' - '0'</code> bằng bao nhiêu?</summary>7.</details>
<details><summary>Đếm tần suất các chữ thường trong xâu: dùng mảng bao nhiêu ô, chỉ số là gì?</summary>26 ô, chỉ số <code>ch - 'a'</code>.</details>

**Checkpoint:**

- [ ] Viết lại bài Xâu đối xứng không nhìn sách, bằng ngôn ngữ em chọn.
- [ ] AC ít nhất 4 bài trong bảng bài tập.
