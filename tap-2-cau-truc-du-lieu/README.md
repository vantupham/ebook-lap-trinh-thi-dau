# Tập 2 – Cấu trúc dữ liệu và quy hoạch động cơ bản

> **Dành cho:** học sinh đã xong Tập 1 (lớp 10).
> **Kỳ thi đích:** Olympic 30/4 khối 10, **điểm tối đa** HSG lớp 12 cấp thành phố, USACO Silver.
> **Mốc tự đo khi học xong:** giải được bài Codeforces mức 1300–1600.
> **Thời lượng:** khoảng 14 tuần, 8–12 giờ mỗi tuần.

Từ tập này, code trong sách viết bằng **C++**. Mỗi bài có bảng đối chiếu sang Python cho cấu trúc dữ liệu tương ứng; riêng bài 2.5 có lời giải Python vì Python có một kỹ thuật bitset rất gọn.

## Mục lục

| Bài | Nội dung chính | Thời lượng | Bài tiêu biểu |
| --- | --- | --- | --- |
| [2.1 Ngăn xếp và hàng đợi](bai-2-1-ngan-xep-hang-doi/) | `stack`, `queue`, `deque`; dấu ngoặc hợp lệ; mô phỏng vòng tròn | 1 tuần | CSES Josephus Problem I |
| [2.2 set và map](bai-2-2-set-map/) | Tập hợp có thứ tự, từ điển, đếm tần suất giá trị lớn | 1,5 tuần | CSES Playlist |
| [2.3 Hàng đợi ưu tiên](bai-2-3-hang-doi-uu-tien/) | `priority_queue`, luôn lấy phần tử nhỏ nhất | 1 tuần | Nối dây với chi phí nhỏ nhất |
| [2.4 Ngăn xếp đơn điệu](bai-2-4-ngan-xep-don-dieu/) | Phần tử gần nhất lớn hơn/nhỏ hơn; có trang mô phỏng | 1 tuần | **Xây tường, 100%** |
| [2.5 Bit và bitset](bai-2-5-bit-bitset/) | Phép toán bit, xử lý 64 phần tử một lúc | 1,5 tuần | **Tàu ngầm (BOI 2019), 100%** |
| [2.6 Min trên đoạn](bai-2-6-min-tren-doan/) | Cửa sổ trượt với `deque`, sparse table | 1 tuần | CSES Static Range Minimum Queries |
| [2.7 Đồ thị: BFS và DFS](bai-2-7-bfs-dfs/) | Danh sách kề, đường đi ngắn nhất không trọng số, thành phần liên thông, lưới | 2 tuần | CSES Labyrinth, Building Roads |
| [2.8 DSU và đồ thị hàm](bai-2-8-dsu-do-thi-ham/) | Hợp nhất nhóm gần O(1), đồ thị mỗi đỉnh một cung ra | 1 tuần | Tranh điều khiển TV nhìn bằng đồ thị |
| [2.9 Quy hoạch động 1](bai-2-9-qhd-1/) | Trạng thái và công thức truy hồi; đổi tiền, cái túi | 1,5 tuần | CSES Minimizing Coins, Book Shop |
| [2.10 Quy hoạch động 2](bai-2-10-qhd-2/) | Dãy con tăng dài nhất, xâu con chung dài nhất | 1,5 tuần | CSES Increasing Subsequence |
| [2.11 Đề thi thử](bai-2-11-de-thi-thu/) | 3 bài, 120 phút | 1 tuần | Đề tự soạn |

## Python ↔ C++

| C++ | Python |
| --- | --- |
| `vector`, `stack` | `list` (`append`, `pop`) |
| `queue`, `deque` | `collections.deque` |
| `set` (có thứ tự), `multiset` | không có sẵn; `set` của Python **không có thứ tự** |
| `map`, `unordered_map` | `dict` |
| `priority_queue` | `heapq` (luôn là heap **nhỏ nhất**) |
| `bitset<N>` | số nguyên lớn `int` với các phép `& \| ^ << >>` |

## Checkpoint cuối Tập 2

- [ ] Đề thi thử ở bài 2.11 đạt ít nhất 13/20 trong 120 phút.
- [ ] Làm trọn **20/20** đề luyện số 2 ([bài 5.3](../tap-5-de-thi-chien-luoc/bai-5-3-de-luyen-hsg-thanh-pho/)) trong 120 phút.
- [ ] Tự viết không nhìn sách: BFS trên lưới, DSU, cái túi 0/1, LIS O(n log n).
- [ ] Giải được ít nhất 35 bài trong danh sách bài tập của cả tập.

## Kiểm chứng

```bash
python3 kiem_tra.py
```
