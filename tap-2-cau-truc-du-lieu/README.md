# Tập 2 – Cấu trúc dữ liệu và quy hoạch động cơ bản

> **Dành cho:** học sinh đã xong Tập 1 (lớp 10).
> **Kỳ thi đích:** Olympic 30/4 khối 10, **điểm tối đa** HSG lớp 12 cấp thành phố, USACO Silver.
> **Mốc tự đo khi học xong:** giải được bài Codeforces mức 1300–1600.
> **Thời lượng:** khoảng 14 tuần, 8–12 giờ mỗi tuần.

Từ tập này, code trong sách viết chủ yếu bằng **C++**. Lời giải chính và bài kiểu đề thi của mỗi bài có thêm bản Python khi Python đủ nhanh; mỗi bài có bảng đối chiếu sang Python cho cấu trúc dữ liệu tương ứng.

Mọi bài 2.1–2.10 đều theo cùng một khuôn: bài toán mở màn, 10 phút tự nghĩ, lời giải ngây thơ, ý tưởng then chốt với hình chạy từng bước, bẫy kèm test phá, ví dụ giảm dần hỗ trợ, bài kiểu đề thi có gợi ý 3 tầng, flashcard và checkpoint. Mỗi bài có **hai trang mô phỏng** (liên kết ở đầu bài; danh sách ở [mo-phong](../mo-phong/)).

## Mục lục

| Bài | Nội dung chính | Thời lượng | Bài tiêu biểu |
| --- | --- | --- | --- |
| [2.1 Ngăn xếp và hàng đợi](bai-2-1-ngan-xep-hang-doi/) | `stack`, `queue`, `deque`; dấu ngoặc; mô phỏng vòng tròn | 1 tuần | Xếp toa tàu |
| [2.2 set và map](bai-2-2-set-map/) | Tập hợp có thứ tự, từ điển, `lower_bound` trên tập thay đổi | 1,5 tuần | Bãi giữ xe |
| [2.3 Hàng đợi ưu tiên](bai-2-3-hang-doi-uu-tien/) | `priority_queue`, heap trong mảng, tham lam + heap | 1 tuần | Việc làm thêm |
| [2.4 Ngăn xếp đơn điệu](bai-2-4-ngan-xep-don-dieu/) | Phần tử gần nhất lớn hơn/nhỏ hơn; có trang mô phỏng | 1 tuần | **Xây tường, 100%** |
| [2.5 Bit và bitset](bai-2-5-bit-bitset/) | Phép toán bit, XOR, xử lý 64 phần tử một lúc | 1,5 tuần | **Tàu ngầm (BOI 2019), 100%**; Sở thích chung |
| [2.6 Min trên đoạn](bai-2-6-min-tren-doan/) | Hàng đợi đơn điệu, sparse table | 1 tuần | Kỳ hạn gửi tiền |
| [2.7 Đồ thị: BFS và DFS](bai-2-7-bfs-dfs/) | Danh sách kề, BFS một và nhiều nguồn, thành phần liên thông, tô hai màu | 2 tuần | Lan tin |
| [2.8 DSU và đồ thị hàm](bai-2-8-dsu-do-thi-ham/) | Hợp nhất nhóm gần O(1), đuôi và vòng của đồ thị hàm | 1 tuần | Chuyền thư |
| [2.9 Quy hoạch động 1](bai-2-9-qhd-1/) | Bốn bước QHĐ; đổi tiền, cái túi, đếm cách | 1,5 tuần | Ếch nhảy |
| [2.10 Quy hoạch động 2](bai-2-10-qhd-2/) | LIS O(n log n), LCS, khoảng cách sửa | 1,5 tuần | Xếp hộp |
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
