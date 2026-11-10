"""Ghép engine.js vào template.html để tạo trang mô phỏng một tệp."""
from pathlib import Path

here = Path(__file__).resolve().parent
template = (here / "template.html").read_text(encoding="utf-8")
engine = (here / "engine.js").read_text(encoding="utf-8")
out = here.parent / "ngan-xep-don-dieu.html"
out.write_text(template.replace("/*ENGINE*/", engine), encoding="utf-8")
print("Đã tạo", out)
