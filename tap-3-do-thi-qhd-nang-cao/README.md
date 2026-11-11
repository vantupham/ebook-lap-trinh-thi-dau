# Tập 3 – Đồ thị, quy hoạch động nâng cao và toán rời rạc

> **Dành cho:** học sinh đã xong Tập 2 (lớp 10–11).
> **Kỳ thi đích:** HSG Quốc gia (giải Khuyến khích – Ba), Olympic 30/4 khối 11, USACO Gold.
> **Mốc tự đo khi học xong:** giải được bài Codeforces mức 1600–2000.
> **Thời lượng:** 16–20 tuần.

Kỳ thi HSG Quốc gia kéo dài **180 phút**, đề theo chương trình chuyên sâu môn Tin học và chấm theo subtask. Từ tập này, mỗi bài nêu rõ kỹ thuật thuộc nhóm kiến thức nào trong [IOI Syllabus](https://ioinformatics.org/page/syllabus), để em tự đối chiếu.

## Mục lục

| Bài | Nội dung chính | Bài kiểu đề thi |
| --- | --- | --- |
| [3.1 Đường đi ngắn nhất](bai-3-1-duong-di-ngan-nhat/) | Dijkstra, Floyd–Warshall, Bellman–Ford, đồ thị trạng thái | Hẹn gặp |
| [3.2 Cây khung và thứ tự tô-pô](bai-3-2-cay-khung-topo/) | Kruskal, sắp xếp tô-pô, QHĐ trên DAG | Lịch thi công |
| [3.3 Cây và LCA](bai-3-3-cay-lca/) | Duyệt cây, đường kính, nhảy nhị phân, LCA, khoảng cách | Họp nhóm |
| [3.4 Cây Fenwick](bai-3-4-fenwick/) | Sửa điểm, tổng tiền tố O(log n), nén giá trị, nghịch thế, quét offline | Đếm điểm |
| [3.5 Cây phân đoạn](bai-3-5-cay-phan-doan/) | Min/tổng trên đoạn có sửa, đi xuống cây, nút nhiều giá trị | Tổng lớn nhất có sửa |
| [3.6 Số học modulo và tổ hợp](bai-3-6-to-hop/) | Lũy thừa nhanh, nghịch đảo modulo, C(n, k), bao hàm–loại trừ | Đường đi tránh bẫy |
| [3.7 QHĐ trên tập con (bitmask)](bai-3-7-qhd-bitmask/) | Trạng thái là một tập, n ≤ 20; phân công, đường đi qua mọi đỉnh | Ghép đôi |
| [3.8 QHĐ trên cây](bai-3-8-qhd-tren-cay/) | Trạng thái gắn với cây con, hai và ba trạng thái | Lắp đèn |
| [3.9 QHĐ chữ số](bai-3-9-qhd-chu-so/) | Đếm số trong [a, b] thỏa tính chất về chữ số; trả về (số lượng, tổng) | Số lộc |
| [3.10 Xâu: hash và KMP](bai-3-10-xau-hash-kmp/) | Hàm tiền tố, biên và chu kỳ, băm xâu, tìm nhị phân + băm | Đoạn lặp dài nhất |
| [3.11 Đề thi thử](bai-3-11-de-thi-thu/) | 3 bài, 180 phút | Đề tự soạn theo cấu trúc HSG QG |

## Cách học tập này

- Mọi bài 3.1–3.10 theo cùng một khuôn: bài toán mở màn, 10 phút tự nghĩ, lời giải ngây thơ, ý tưởng then chốt với hình chạy từng bước, bẫy kèm test phá, ví dụ giảm dần hỗ trợ, bài kiểu đề thi có gợi ý 3 tầng, flashcard và checkpoint. Mỗi bài có **hai trang mô phỏng** (liên kết ở đầu bài; danh sách ở [mo-phong](../mo-phong/)).

- Mỗi kỹ thuật mới đi kèm **một khuôn code** ngắn. Hãy tự gõ lại khuôn tới khi viết được trong 5 phút mà không nhìn: trong phòng thi 180 phút, thời gian dành để nghĩ, không phải để nhớ cú pháp.
- Các bài đồ thị và cây dùng **danh sách kề** như bài 2.7.
- Mỗi bài có một bài "vét cạn" để stress test (bài 1.9). Bắt buộc dùng nó trước khi nộp bài mới.

## Checkpoint cuối Tập 3

- [ ] Đề thi thử ở bài 3.11 đạt ít nhất 12/20 trong 180 phút.
- [ ] Tự viết không nhìn sách: Dijkstra, Kruskal, LCA nhảy nhị phân, Fenwick, cây phân đoạn, C(n, k) mod p.
- [ ] Giải được ít nhất 35 bài trong danh sách bài tập của cả tập.

## Kiểm chứng

```bash
python3 kiem_tra.py
```
