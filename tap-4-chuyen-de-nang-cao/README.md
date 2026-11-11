# Tập 4 – Chuyên đề nâng cao

> **Dành cho:** học sinh đã xong Tập 3 (lớp 11–12, đội tuyển).
> **Kỳ thi đích:** HSG Quốc gia (giải Nhì – Nhất), kỳ chọn đội tuyển quốc gia, APIO, IOI; USACO Platinum.
> **Mốc tự đo:** Codeforces 2000 trở lên.
> **Thời lượng:** 6–12 tháng. Mỗi bài trong tập là **điểm khởi đầu** của một chuyên đề; sau mỗi bài, hãy làm thêm 10–20 bài cùng chủ đề trên CSES, Codeforces, oj.uz.

Ở mức này, đề thi hiếm khi hỏi thẳng một kỹ thuật. Kỹ năng quan trọng nhất là **nhận ra** bài cần kỹ thuật nào, và **ghép** nhiều kỹ thuật lại. Vì vậy mỗi bài có mục "Dấu hiệu nhận biết".

## Mục lục

| Bài | Nội dung chính | Bài kiểu đề thi |
| --- | --- | --- |
| [4.1 Cây phân đoạn lười](bai-4-1-cay-phan-doan-luoi/) | Cập nhật cả đoạn và hỏi đoạn, O(log n); gán, cộng, lật | Đặt phòng |
| [4.2 Chia căn](bai-4-2-chia-can/) | Chia mảng thành √n khối; thuật toán Mo | Màu nổi bật |
| [4.3 Cây: Euler tour và HLD](bai-4-3-euler-hld/) | Truy vấn cây con, truy vấn đường đi | Mạng nước |
| [4.4 Tối ưu QHĐ: bao lồi](bai-4-4-convex-hull-trick/) | Convex hull trick với deque, Li Chao | Nhảy đá |
| [4.5 Thành phần liên thông mạnh](bai-4-5-scc/) | Kosaraju, đồ thị nén; cầu bằng vao/thap | Dây cầu |
| [4.6 Luồng cực đại](bai-4-6-luong/) | Dinic, lát cắt nhỏ nhất, cặp ghép hai phía | Câu lạc bộ |
| [4.7 Hình học tính toán](bai-4-7-hinh-hoc/) | Tích có hướng, giao đoạn thẳng, dây giày, bao lồi, Pick | Vườn cây |
| [4.8 Mảng hậu tố](bai-4-8-mang-hau-to/) | Nhân đôi, Kasai, đếm xâu con, xâu con thứ k | Mật khẩu |
| [4.9 Lý thuyết trò chơi](bai-4-9-tro-choi/) | Thắng/thua, Nim, số Grundy, Sprague–Grundy | Quân cờ trên đồ thị |
| [4.10 Đề kiểu IOI](bai-4-10-de-kieu-ioi/) | Bài tương tác, grader tự viết, chiến thuật subtask 5 giờ | Đoán số tương tác |
| [4.11 Đề thi thử](bai-4-11-de-thi-thu/) | 3 bài, 180 phút, kiểu đề chọn đội tuyển | Đề tự soạn |

## Cách học tập này

- Mọi bài 4.1–4.9 theo cùng một khuôn: bài toán mở màn, 10 phút tự nghĩ, lời giải ngây thơ, ý tưởng then chốt với hình chạy từng bước, bẫy kèm test phá, ví dụ giảm dần hỗ trợ, bài kiểu đề thi có gợi ý 3 tầng, flashcard và checkpoint. Mỗi bài có **hai trang mô phỏng** (liên kết ở đầu bài; danh sách ở [mo-phong](../mo-phong/)); bài 4.10 có thêm trang mô phỏng bài tương tác.

- Các bài kiểu đề thi đọc/ghi file `TENBAI.INP`/`TENBAI.OUT` và chấm theo subtask như đề thật. Mọi đoạn mã trong tập được kiểm thử tự động bằng `kiem_tra.py` (so với lời giải vét cạn trên dữ liệu ngẫu nhiên).

## Checkpoint cuối Tập 4

- [ ] Đề thi thử ở bài 4.11 đạt ít nhất 12/20 trong 180 phút.
- [ ] Viết không nhìn sách: cây phân đoạn lười, Kosaraju, Dinic, tích có hướng và giao đoạn thẳng.
- [ ] Làm trọn ít nhất 3 đề HSG Quốc gia các năm trước theo subtask, mỗi đề đạt từ mức giải Ba trở lên.

## Kiểm chứng

```bash
python3 kiem_tra.py
```
