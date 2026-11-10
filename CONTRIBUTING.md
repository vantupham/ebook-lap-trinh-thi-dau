# Hướng dẫn viết bài

Cảm ơn bạn muốn góp sức. Để cả bộ sách đọc như một giọng, mỗi bài học theo cùng một khuôn và cùng các quy tắc kiểm chứng dưới đây. Bài mẫu: [Bài 2.4 – Ngăn xếp đơn điệu](tap-2-cau-truc-du-lieu/bai-2-4-ngan-xep-don-dieu/).

## Khuôn 10 bước

1. **Bài toán mở màn.** Một tình huống có bối cảnh đời thực (ưu tiên Việt Nam, TP.HCM), kèm ràng buộc cụ thể.
2. **Dừng lại 10 phút.** 2–3 câu hỏi gợi mở và một ví dụ nhỏ để làm bằng tay. Đáp án để trong `<details>`.
3. **Lời giải ngây thơ.** Đếm số phép tính với ràng buộc thật để thấy vì sao cần ý tưởng mới.
4. **Ý tưởng then chốt.** Một câu in đậm trong khối `> [!IMPORTANT]`, rồi **hình cho từng bước**, mỗi bước trong một `<details>` để học sinh đoán trước rồi mới mở. Thêm sơ đồ Mermaid nếu thuật toán có rẽ nhánh.
5. **Mã giả và code.** Mã giả, rồi C++ (kèm Python ở Tập 0–2). Code đặt trong thư mục `code/` và được trích vào bài.
6. **Vì sao đúng, chạy bao lâu.** Chứng minh ngắn, phân tích độ phức tạp.
7. **Bẫy.** Mỗi bẫy một khối `> [!WARNING]`, kèm một test phá cụ thể.
8. **Ví dụ giảm dần hỗ trợ.** Một ví dụ giải trọn, một ví dụ điền chỗ trống, một ví dụ tự làm.
9. **Bài tập 4 nấc.** Khởi động → Luyện → Thử thách → Đề thật. Ghi nguồn và độ khó. Đề thật có 3 tầng gợi ý trong `<details>`, lời giải theo từng subtask.
10. **Tóm tắt, flashcard, checkpoint.** Tóm tắt 5 dòng; flashcard dạng `<details>`; 3 bài ôn xoắn ốc từ kiến thức cũ; checkpoint dạng `- [ ]` với tiêu chí đo được.

## Hộp nội dung

| Khối GitHub | Dùng cho |
| --- | --- |
| `> [!IMPORTANT]` | Dừng lại và nghĩ; ý tưởng then chốt |
| `> [!NOTE]` | Định nghĩa; mẹo thi |
| `> [!WARNING]` | Bẫy |
| `> [!TIP]` | Liên kết tới trang mô phỏng, cách học |
| `<details><summary>…</summary>…</details>` | Đáp án, gợi ý, từng bước minh họa, flashcard |

## Quy tắc kiểm chứng

- Mọi đoạn code phải **chạy được** và **khớp với lời giải vét cạn** trên ít nhất vài trăm test ngẫu nhiên nhỏ. Ghi rõ điều này cuối bài.
- Số liệu thời gian chạy phải là số đo thật, ghi "đo trên máy thường".
- Hình từng bước sinh bằng code (xem `mo-phong/src/make_svgs.js`), không vẽ tay, để hình luôn khớp với thuật toán.
- Liên kết bài tập phải mở được; không chép nguyên văn đề từ trang khác.

## Kiểm chứng tự động

Trong bài học, mở mỗi khối code cần kiểm chứng bằng dòng `# file: ten.py` hoặc `// file: ten.cpp`. Script `kiem_tra.py` của mỗi tập tách các khối này ra thư mục `code/`, biên dịch, rồi chạy với ví dụ và test ngẫu nhiên. Thêm bài mới thì thêm một dòng vào danh sách `CASES` trong script.

## Văn phong

- Xưng "em" với học sinh. Câu ngắn, dưới 25 chữ. Đoạn văn tối đa 3 câu.
- Thuật ngữ tiếng Việt trước, tiếng Anh trong ngoặc ở lần đầu: ngăn xếp (stack).
- Ba nhân vật: **An** thích code ngay, **Bảo** thích tìm quy luật, **Chi** cẩn thận, hay bắt lỗi.

## Trang mô phỏng

Mỗi trang mô phỏng là **một tệp HTML tự chứa**, chạy offline, không cần thư viện ngoài. Tách phần logic thuần (sinh các "khung hình") ra tệp riêng để kiểm thử bằng Node:

```bash
cd mo-phong/src
node test_engine.js            # so với lời giải vét cạn
python3 build.py               # ghép engine.js vào template.html → ../ngan-xep-don-dieu.html
node make_svgs.js ../../tap-2-cau-truc-du-lieu/bai-2-4-ngan-xep-don-dieu/hinh
```
