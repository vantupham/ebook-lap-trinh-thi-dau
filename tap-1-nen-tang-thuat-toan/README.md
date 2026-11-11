# Tập 1 – Nền tảng thuật toán

> **Dành cho:** học sinh đã xong Tập 0 (hè lên lớp 10, đầu lớp 10).
> **Kỳ thi đích:** chọn đội tuyển HSG thành phố (tháng 9), HSG lớp 12 cấp thành phố (khoảng 60% điểm), USACO Bronze.
> **Mốc tự đo khi học xong:** giải được bài Codeforces mức 1000–1300.
> **Thời lượng:** khoảng 12 tuần, 8–12 giờ mỗi tuần.

Từ tập này, **C++ là ngôn ngữ chính**. Bản Python vẫn có cho lời giải chính của mỗi bài, nhưng em nên bắt đầu chuyển hẳn sang C++: từ Tập 2, nhiều bài Python không còn kịp thời gian.

## Mục lục

| Bài | Nội dung chính | Thời lượng | Bài tiêu biểu |
| --- | --- | --- | --- |
| [1.1 Độ phức tạp](bai-1-1-do-phuc-tap/) | Ký hiệu O, đọc ràng buộc để chọn thuật toán, ba lời giải cho một bài | 1 tuần | CSES Maximum Subarray Sum |
| [1.2 Sắp xếp](bai-1-2-sap-xep/) | `sort`, sắp theo nhiều tiêu chí, `pair`, xếp hạng đồng hạng | 1 tuần | CSES Distinct Numbers |
| [1.3 Tổng tiền tố](bai-1-3-tong-tien-to/) | Tổng đoạn O(1), tổng tiền tố 2 chiều, mảng hiệu | 1,5 tuần | CSES Forest Queries |
| [1.4 Tìm kiếm nhị phân](bai-1-4-tim-kiem-nhi-phan/) | Tìm trên mảng đã sắp, `lower_bound`, tìm nhị phân trên đáp án | 1,5 tuần | CSES Factory Machines |
| [1.5 Hai con trỏ](bai-1-5-hai-con-tro/) | Đoạn con thỏa điều kiện, cặp có tổng cho trước | 1 tuần | CSES Subarray Sums I |
| [1.6 Đệ quy](bai-1-6-de-quy/) | Hàm tự gọi mình, chia bài toán lớn thành bài nhỏ | 1 tuần | **Xây tường, subtask 40%** |
| [1.7 Vét cạn và quay lui](bai-1-7-vet-can-quay-lui/) | Duyệt mọi khả năng, cắt nhánh | 1,5 tuần | **Tàu ngầm (BOI 2019), subtask 60%** |
| [1.8 Tham lam](bai-1-8-tham-lam/) | Chọn tốt nhất trước mắt, chứng minh bằng hoán đổi, phản ví dụ | 1 tuần | CSES Movie Festival |
| [1.9 Stress test và gỡ lỗi](bai-1-9-stress-test/) | Sinh test, so với vét cạn, đọc các loại lỗi của máy chấm | 1 tuần | Tìm lỗi trong một lời giải "gần đúng" |
| [1.10 Đề thi thử](bai-1-10-de-thi-thu/) | 3 bài, 120 phút, chấm theo subtask | 1 tuần | Đề tự soạn theo cấu trúc HSG 12 TP |

## Kỹ năng xuyên suốt tập

- **Đọc ràng buộc trước khi nghĩ thuật toán** (bài 1.1). Mọi bài từ 1.2 trở đi đều bắt đầu bằng bước này.
- **Viết lời giải chậm trước, nhanh sau.** Lời giải chậm lấy subtask nhỏ và là "trọng tài" để kiểm tra lời giải nhanh (bài 1.9).
- **Bảng chạy tay** cho mỗi thuật toán mới, như ở Tập 0.
- **Mô phỏng trước, đọc sau.** Mỗi bài 1.1–1.9 có trang mô phỏng (liên kết ở đầu bài; danh sách đầy đủ ở [mo-phong](../mo-phong/)). Bật chế độ **Đoán trước**, chạy hết một ví dụ, rồi mở từng bước trong mục "Chạy từng bước".
- **Ví dụ giảm dần hỗ trợ:** làm Ví dụ 2 (điền chỗ trống) và Ví dụ 3 (tự làm) trước khi mở lời giải; bài kiểu đề thi có gợi ý 3 tầng.

## Checkpoint cuối Tập 1

Em sẵn sàng sang Tập 2 nếu:

- [ ] Làm đề thi thử ở bài 1.10 trong 120 phút, đạt ít nhất 13/20 điểm.
- [ ] Giải được ít nhất 30 bài trong danh sách bài tập của cả tập, trong đó có ít nhất 15 bài bằng C++.
- [ ] Tự viết không nhìn sách: tìm kiếm nhị phân trên đáp án, tổng tiền tố 2 chiều, sinh mọi tập con bằng quay lui, script stress test.
- [ ] Tự làm được Tranh điều khiển TV (0.9), subtask 40% Xây tường (1.6) và subtask 60% Tàu ngầm (1.7) không nhìn sách.

## Kiểm chứng

Mọi đoạn code có dòng đầu `// file:` hoặc `# file:` được `kiem_tra.py` tách ra thư mục `code/`, biên dịch và so với lời giải vét cạn trên test ngẫu nhiên:

```bash
python3 kiem_tra.py
```
