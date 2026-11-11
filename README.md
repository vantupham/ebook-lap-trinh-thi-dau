# Tự học Lập trình thi đấu – từ HSG lớp 9 tới IOI

**Tác giả:** Phạm Văn Tú

Bộ ebook mở, viết bằng tiếng Việt, cho học sinh THPT tự học lập trình thi đấu. Lộ trình bám theo lịch thi của học sinh THPT: HSG lớp 9 cấp tỉnh/thành phố, chọn đội tuyển, Olympic 30/4, HSG lớp 12, HSG Quốc gia, rồi APIO và IOI.

Bộ sách khác các tài liệu hiện có ở cách học:

- **Nghĩ trước, đọc sau.** Mỗi bài mở đầu bằng một bài toán và 10 phút để em tự nghĩ.
- **Thấy từng bước.** Mỗi thuật toán quan trọng có hình cho từng bước và một [trang mô phỏng tương tác](mo-phong/) để em tự nhập dữ liệu và chạy thử.
- **Học từ lỗi sai.** Mỗi bài có lời giải sai phổ biến kèm test phá nó.
- **Không bị kẹt, không bị lộ đáp án.** Gợi ý chia 3 tầng, ẩn sẵn, bấm mới mở.
- **Tự đánh giá.** Cuối mỗi bài có checkpoint với tiêu chí rõ ràng.
- **Đề thật.** Bài tập gắn nhãn kỳ thi, lời giải trình bày theo từng subtask như cách chấm thật.

## Bắt đầu từ đâu

| Em đang ở đâu? | Bắt đầu từ |
| --- | --- |
| Mới học lập trình, lớp 8–9 | [Tập 0 · Nhập môn tư duy lập trình](tap-0-nhap-mon/) |
| Đã biết vòng lặp, mảng; chuẩn bị chọn đội tuyển | [Tập 1 · Nền tảng thuật toán](tap-1-nen-tang-thuat-toan/) |
| Đã vững sắp xếp, tìm kiếm nhị phân, tổng tiền tố | [Tập 2 · Cấu trúc dữ liệu và QHĐ cơ bản](tap-2-cau-truc-du-lieu/) |
| Đã vững BFS, DSU, QHĐ cơ bản; nhắm HSG Quốc gia | [Tập 3 · Đồ thị, QHĐ nâng cao, toán rời rạc](tap-3-do-thi-qhd-nang-cao/) |
| Đã qua HSG Quốc gia; nhắm đội tuyển, VOI, IOI | [Tập 4 · Chuyên đề nâng cao](tap-4-chuyen-de-nang-cao/) |
| Muốn luyện đề, chia giờ, tránh mất điểm oan (dùng song song) | [Tập 5 · Tuyển tập đề và chiến lược thi](tap-5-de-thi-chien-luoc/) |

**Đã hoàn thành:** [Tập 0](tap-0-nhap-mon/), [Tập 1](tap-1-nen-tang-thuat-toan/), [Tập 2](tap-2-cau-truc-du-lieu/), [Tập 3](tap-3-do-thi-qhd-nang-cao/), [Tập 4](tap-4-chuyen-de-nang-cao/) và [Tập 5](tap-5-de-thi-chien-luoc/): trọn bộ 6 tập. Mỗi tập 0–4 kèm đề thi thử (120 phút; Tập 3 và Tập 4 là 180 phút); Tập 5 có thêm 3 đề luyện và kế hoạch luyện thi. Học xong Tập 2, em có đủ kiến thức cho phần lớn đề HSG 12 cấp tỉnh/thành phố. **Trang mô phỏng từng bước:** các bài 0.1–0.9, 1.1–1.9, 2.1–2.10, 3.1–3.10 và 4.1–4.10 có trang mô phỏng tương tác (xem [danh sách](mo-phong/)); các tập còn lại đang được bổ sung.

## Cấu trúc bộ sách

| Tập | Dành cho | Kỳ thi đích | Mốc tự đo |
| --- | --- | --- | --- |
| 0. Nhập môn tư duy lập trình | Lớp 8–9 | HSG lớp 9 cấp TP | Codeforces 800–1000 |
| 1. Nền tảng thuật toán | Hè lên lớp 10 | Chọn đội tuyển TP; HSG 12 cấp TP | 1000–1300 |
| 2. Cấu trúc dữ liệu và QHĐ cơ bản | Lớp 10 | Olympic 30/4; điểm tối đa HSG 12 TP | 1300–1600 |
| 3. Đồ thị, QHĐ nâng cao, toán rời rạc | Lớp 10–11 | HSG Quốc gia | 1600–2000 |
| 4. Chuyên đề nâng cao | Lớp 11–12 | Chọn đội tuyển quốc gia, APIO, IOI | 2000+ |
| 5. Tuyển tập đề và chiến lược thi | Dùng song song từ Tập 1 | Mọi kỳ thi | Điểm thi thử bấm giờ |

Mỗi bài học đi theo cùng một khuôn 10 bước: bài toán mở màn → tự nghĩ trước → lời giải ngây thơ → ý tưởng then chốt (vẽ từng bước) → mã giả và code → vì sao đúng, chạy bao lâu → bẫy → ví dụ giảm dần hỗ trợ → bài tập 4 nấc → tóm tắt, flashcard, checkpoint. Chi tiết trong [CONTRIBUTING.md](CONTRIBUTING.md).

## Thư mục

```text
.
├── tap-0-nhap-mon/
│   ├── README.md              ← mục lục, checkpoint cuối tập
│   ├── kiem_tra.py            ← tách code từ bài học và kiểm chứng tự động
│   └── bai-0-1-… bai-0-10-…/  ← mỗi bài: README.md + code/
├── tap-1-nen-tang-thuat-toan/  ← cùng cấu trúc, bài 1.1 … 1.10
├── tap-2-cau-truc-du-lieu/       ← bài 2.1 … 2.11, kiem_tra.py
│   └── bai-2-4-ngan-xep-don-dieu/
│       ├── README.md          ← nội dung bài học
│       ├── hinh/              ← hình SVG từng bước (sinh tự động)
│       └── code/              ← lời giải C++/Python, lời giải vét cạn, subtask
├── tap-3-do-thi-qhd-nang-cao/   ← bài 3.1 … 3.11, kiem_tra.py
├── tap-4-chuyen-de-nang-cao/    ← bài 4.1 … 4.11, kiem_tra.py
├── tap-5-de-thi-chien-luoc/     ← bài 5.1 … 5.5, kiem_tra.py
├── mo-phong/
│   ├── ngan-xep-don-dieu.html ← trang mô phỏng tương tác (một tệp, chạy offline)
│   └── src/                   ← mã nguồn, kiểm thử, công cụ sinh hình
├── web/                       ← trang chủ, giao diện, cấu hình trang web
└── .github/workflows/pages.yml ← tự dựng và đăng trang web
```

## Trang web của bộ sách

Bộ sách tự dựng thành một trang web (menu theo tập, tìm kiếm, nền sáng/tối, sơ đồ, ô gợi ý bấm để mở, xem tốt trên điện thoại) bằng [MkDocs Material](https://squidfunk.github.io/mkdocs-material/), và tự đăng lên GitHub Pages mỗi khi có thay đổi trên nhánh `main`.

**Bật lần đầu (chỉ một lần):** vào **Settings → Pages**, mục *Source* chọn **GitHub Actions**. Sau khi đẩy code lên, xem tiến trình ở thẻ **Actions**; khoảng 1–2 phút sau, trang chạy ở `https://<tên-tài-khoản>.github.io/<tên-kho>/`. Trang mô phỏng nằm ở `…/mo-phong/ngan-xep-don-dieu.html`.

**Xem thử trên máy:**

```bash
pip install -r web/requirements.txt
python3 web/chuan_bi.py
mkdocs serve --config-file build/mkdocs.yml     # mở http://127.0.0.1:8000
```

Nội dung vẫn viết trong các tệp `README.md` như cũ. Thư mục `web/` chứa trang chủ (`trang-chu.md`), giao diện (`assets/extra.css`, `assets/logo.svg`) và cấu hình (`mkdocs.base.yml`); `web/chuan_bi.py` tự sinh menu từ tiêu đề các bài, nên thêm bài mới không cần sửa cấu hình. Thư mục `build/` là kết quả sinh ra, không cần đưa lên GitHub.

Muốn mở trang mô phỏng mà không cần mạng: tải kho về, mở `mo-phong/ngan-xep-don-dieu.html` bằng trình duyệt.

## Học thế nào cho hiệu quả

- Học đều 8–12 giờ mỗi tuần, tốt hơn học dồn.
- Kẹt 30 phút thì mở gợi ý tầng 1; thêm 20 phút thì mở tầng 2. Đọc lời giải xong phải tự viết lại code từ đầu, không nhìn.
- Chưa qua checkpoint thì ôn lại đúng mục được chỉ, không đi tiếp.
- Dùng AI để hỏi, không để chép: nhờ giải thích một khái niệm hay tìm test sai thì được; xin code hoàn chỉnh thì không. Trong phòng thi em chỉ có một mình.

## Đóng góp

Mọi góp ý, sửa lỗi, bài mới đều được hoan nghênh qua Issue hoặc Pull Request. Đọc [CONTRIBUTING.md](CONTRIBUTING.md) trước khi viết bài.

## Tác giả

Bộ sách do **Phạm Văn Tú** biên soạn. Mọi góp ý xin gửi qua Issue của kho này.

## Giấy phép

*Chưa chọn.* Gợi ý: nội dung theo [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.vi) (ai cũng được dùng, sửa, chia sẻ nếu ghi nguồn và giữ cùng giấy phép); mã nguồn theo MIT.

Bài từ Codeforces, CSES, USACO, oj.uz chỉ dẫn liên kết, không chép nguyên văn.
