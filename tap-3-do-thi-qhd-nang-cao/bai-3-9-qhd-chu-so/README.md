# Bài 3.9 – QHĐ chữ số

> **Tập 3** · Cần biết trước: bài 2.9, 1.6 (đệ quy) · Thời lượng: khoảng 75 phút đọc, 5 giờ thực hành

**Học xong bài này, em sẽ:**

- đếm các số trong đoạn [a, b] (tới 10¹⁸) thỏa một tính chất về **chữ số**;
- đưa bài [a, b] về hai bài [0, N] bằng phép trừ;
- dùng cờ **"đang bám sát"** và **"đã bắt đầu"** để xây số từng chữ số một.

---

## 1. Bài toán mở màn: Biển số đẹp

Một số gọi là **đẹp** nếu không có hai chữ số **liền nhau** bằng nhau (ví dụ 121 đẹp, 112 không đẹp). Đếm số đẹp trong [a, b]. (0 ≤ a ≤ b ≤ 10¹⁸; bài [Counting Numbers](https://cses.fi/problemset/task/2220))

| Vào | Ra |
| --- | --- |
| `123 321` | `171` |

> [!IMPORTANT]
> **Dừng lại và nghĩ.** Duyệt từng số tới 10¹⁸ là không thể. Nhưng khi em viết một số từ trái sang phải, để biết chữ số tiếp theo được chọn những giá trị nào, em cần nhớ những gì về phần đã viết?

<details>
<summary>Đáp án</summary>

Ba điều: (1) **chữ số vừa viết** (để không lặp); (2) phần đã viết có **đang bằng đúng** phần đầu của giới hạn N không (nếu có thì chữ số tiếp theo không được vượt chữ số tương ứng của N); (3) đã **bắt đầu** viết số chưa (các số 0 đứng đầu không tính là chữ số).

</details>

---

## 2. Đếm trên [0, N]

Gọi dem(N) = số số đẹp trong [0, N]. Đáp án = dem(b) − dem(a − 1).

Xây số từ chữ số **đầu tiên** của N. Trạng thái tại vị trí i:

| Thành phần | Ý nghĩa |
| --- | --- |
| `i` | đang chọn chữ số thứ i (từ trái) |
| `truoc` | chữ số vừa chọn (hoặc 10 nếu chưa bắt đầu) |
| `bam` | phần đã chọn đang **bằng** phần đầu của N |
| `bat_dau` | đã viết chữ số khác 0 đầu tiên chưa |

Tại vị trí i, chữ số được chọn từ 0 tới (bam ? N[i] : 9). Chọn d bằng `truoc` (khi đã bắt đầu) thì bỏ. Khi `bam` sai, các trạng thái giống nhau cho cùng kết quả, nên **ghi nhớ** theo (i, truoc) là đủ.

Ví dụ N = 21: các số đẹp trong [0, 21] là 0..9 (10 số), 10, 12..19 (9 số), 20, 21: tổng **21**; chỉ có số 11 bị loại.

```cpp
// file: so_dep.cpp
#include <bits/stdc++.h>
using namespace std;
string s;
long long nho[20][11];                              // nho[i][truoc] khi bam = false, bat_dau = true

long long dem_tu(int i, int truoc, bool bam, bool bat_dau) {
    if (i == (int)s.size()) return 1;               // đã viết xong một số hợp lệ (kể cả số 0)
    if (!bam && bat_dau && nho[i][truoc] != -1) return nho[i][truoc];
    int gioi_han = bam ? s[i] - '0' : 9;
    long long kq = 0;
    for (int d = 0; d <= gioi_han; d++) {
        if (bat_dau && d == truoc) continue;         // hai chữ số liền nhau bằng nhau
        bool bd = bat_dau || d != 0;
        kq += dem_tu(i + 1, bd ? d : 10, bam && d == gioi_han, bd);
    }
    if (!bam && bat_dau) nho[i][truoc] = kq;
    return kq;
}

long long dem(long long N) {                        // số số đẹp trong [0, N]
    if (N < 0) return 0;
    s = to_string(N);
    memset(nho, -1, sizeof nho);
    return dem_tu(0, 10, true, false);
}

int main() {
    long long a, b;
    cin >> a >> b;
    cout << dem(b) - dem(a - 1) << '\n';
}
```

Số trạng thái: 19 vị trí × 11 chữ số trước, mỗi trạng thái thử 10 chữ số: vài nghìn phép.

> [!NOTE]
> **Khuôn chung của QHĐ chữ số:** đổi tính chất cần đếm thì chỉ đổi phần "trạng thái thêm" (chữ số trước, tổng chữ số mod k, số chữ số 4 đã dùng…). Phần `bam`, `bat_dau` và phép trừ dem(b) − dem(a − 1) giữ nguyên.

---

## 3. Bẫy thường gặp

> [!WARNING]
> **Bẫy 1: a = 0.** dem(a − 1) = dem(−1) phải bằng 0. Code trên xử lý bằng `if (N < 0) return 0;`.

> [!WARNING]
> **Bẫy 2: số 0 đứng đầu.** Số 7 viết là "07" trong N = 21; chữ số 0 đầu không được coi là "bằng 0 liền kề". Cờ `bat_dau` lo việc này.

> [!WARNING]
> **Bẫy 3: ghi nhớ cả khi đang bám.** Trạng thái `bam = true` chỉ xảy ra một lần mỗi vị trí và phụ thuộc N; ghi nhớ chung với `bam = false` cho kết quả sai.

---

## 4. Bài tập

| Nấc | Bài | Nguồn | Ý chính |
| --- | --- | --- | --- |
| Khởi động | [Counting Numbers](https://cses.fi/problemset/task/2220) | CSES 2220 | Đúng mục 2 |
| Luyện | Đếm số trong [a, b] (≤ 10¹⁸) có tổng chữ số chia hết cho k (k ≤ 100) | Tự luyện | Trạng thái thêm: tổng mod k |
| Luyện | Đếm số trong [a, b] mà các chữ số không giảm từ trái sang phải | Tự luyện | Trạng thái thêm: chữ số trước |
| Thử thách | Tính **tổng** (không phải số lượng) các số đẹp trong [a, b], mod 10⁹ + 7 | Tự luyện | Mỗi trạng thái trả về cặp (số lượng, tổng) |

---

## 5. Tóm tắt và checkpoint

1. [a, b] → dem(b) − dem(a − 1).
2. Xây số từ trái; trạng thái: vị trí, thông tin cần cho tính chất, `bam`, `bat_dau`.
3. Chỉ ghi nhớ khi không bám (và đã bắt đầu, tùy bài).

<details><summary>Có bao nhiêu số đẹp có đúng 2 chữ số?</summary>9 × 9 = 81.</details>

**Checkpoint:**

- [ ] AC Counting Numbers.
- [ ] Giải bài tổng chữ số chia hết cho k, đối chiếu với vét cạn cho b ≤ 10⁵.
