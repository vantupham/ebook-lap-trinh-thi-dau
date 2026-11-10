"""Chuẩn bị nội dung cho trang web (MkDocs Material).

Chép các tập vào build/docs, đổi README.md thành index.md, đổi ô cảnh báo kiểu GitHub
(> [!NOTE], > [!WARNING]...) thành ô ghi chú có màu, bật markdown bên trong <details>,
và sinh menu (nav) cho mkdocs.yml.

Chạy:  python3 web/chuan_bi.py && mkdocs build
"""
import os, re, shutil, yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEB = os.path.join(ROOT, "web")
OUT = os.path.join(ROOT, "build", "docs")
TAPS = sorted(d for d in os.listdir(ROOT) if re.match(r"tap-\d-", d))
BO_QUA = {"kiem_tra.py", "__pycache__", "stress.sh"}

KIEU = {"NOTE": "note", "TIP": "tip", "IMPORTANT": "question", "WARNING": "warning", "CAUTION": "danger"}
TEN_MAC_DINH = {"NOTE": "Ghi chú", "TIP": "Mẹo", "IMPORTANT": "Dừng lại và nghĩ", "WARNING": "Cẩn thận", "CAUTION": "Nguy hiểm"}


def doi_canh_bao(text):
    """> [!WARNING]\\n> **Bẫy 1: ...** nội dung  →  !!! warning "Bẫy 1: ..."\\n    nội dung"""
    out, lines, i = [], text.split("\n"), 0
    while i < len(lines):
        m = re.match(r"^> \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$", lines[i])
        if not m:
            out.append(lines[i]); i += 1; continue
        kind = m.group(1); i += 1
        body = []
        while i < len(lines) and lines[i].startswith(">"):
            body.append(lines[i][2:] if lines[i].startswith("> ") else lines[i][1:]); i += 1
        title = TEN_MAC_DINH[kind]
        if body:
            t = re.match(r"^\*\*(.+?)\*\*\s*(.*)$", body[0])
            if t:
                title = t.group(1).rstrip(".:"); body[0] = t.group(2)
        out.append(f'!!! {KIEU[kind]} "{title}"')
        out += ["    " + b if b.strip() else "" for b in body]
        out.append("")
    return "\n".join(out)


def xu_ly(text):
    text = doi_canh_bao(text)
    text = re.sub(r"<details>", "<details markdown>", text)
    text = re.sub(r"\]\(((?:\.\./)*)README\.md\)", r"](\1index.md)", text)
    # liên kết tới thư mục (bai-0-1-.../) → trang index.md của thư mục đó
    def thu_muc(m):
        path = m.group(1)
        return f"]({path}gioi-thieu.md)" if re.search(r"(^|/)mo-phong/$", path) else f"]({path}index.md)"
    text = re.sub(r"\]\((?!https?:|#|mailto:)([^)\s]*/)\)", thu_muc, text)
    text = text.replace("](CONTRIBUTING.md)", "](dong-gop.md)").replace("](../../CONTRIBUTING.md)", "](../../dong-gop.md)")
    return text


def tieu_de(md):
    for line in open(md, encoding="utf-8"):
        if line.startswith("# "):
            return line[2:].strip()
    return os.path.basename(os.path.dirname(md))


def so_bai(name):  # bai-2-11-... -> (2, 11)
    m = re.match(r"bai-(\d+)-(\d+)-", name)
    return (int(m.group(1)), int(m.group(2))) if m else (99, 99)


def chep_thu_muc(src, dst):
    for dp, dns, fns in os.walk(src):
        dns[:] = [d for d in dns if d not in BO_QUA]
        rel = os.path.relpath(dp, src)
        os.makedirs(os.path.join(dst, rel), exist_ok=True)
        for f in fns:
            if f in BO_QUA:
                continue
            s, d = os.path.join(dp, f), os.path.join(dst, rel, f)
            if f == "README.md":
                d = os.path.join(dst, rel, "index.md")
            if f.endswith(".md"):
                open(d, "w", encoding="utf-8").write(xu_ly(open(s, encoding="utf-8").read()))
            else:
                shutil.copy2(s, d)


def main():
    shutil.rmtree(OUT, ignore_errors=True)
    os.makedirs(OUT)
    shutil.copytree(os.path.join(WEB, "assets"), os.path.join(OUT, "assets"))
    shutil.copy2(os.path.join(WEB, "trang-chu.md"), os.path.join(OUT, "index.md"))
    open(os.path.join(OUT, "gioi-thieu.md"), "w", encoding="utf-8").write(xu_ly(open(os.path.join(ROOT, "README.md"), encoding="utf-8").read()))
    open(os.path.join(OUT, "dong-gop.md"), "w", encoding="utf-8").write(xu_ly(open(os.path.join(ROOT, "CONTRIBUTING.md"), encoding="utf-8").read()))
    chep_thu_muc(os.path.join(ROOT, "mo-phong"), os.path.join(OUT, "mo-phong"))
    os.rename(os.path.join(OUT, "mo-phong", "index.md"), os.path.join(OUT, "mo-phong", "gioi-thieu.md"))

    nav = [{"Trang chủ": "index.md"}, {"Bắt đầu": [{"Giới thiệu bộ sách": "gioi-thieu.md"}, {"Trang mô phỏng": "mo-phong/gioi-thieu.md"}, {"Đóng góp": "dong-gop.md"}]}]
    for tap in TAPS:
        chep_thu_muc(os.path.join(ROOT, tap), os.path.join(OUT, tap))
        so = tap.split("-")[1]
        muc = [{"Tổng quan": f"{tap}/index.md"}]
        for bai in sorted((b for b in os.listdir(os.path.join(ROOT, tap)) if b.startswith("bai-")), key=so_bai):
            ten = tieu_de(os.path.join(ROOT, tap, bai, "README.md"))
            ten = re.sub(r"^Bài (\d+\.\d+) – ", r"\1 ", ten)
            muc.append({ten: f"{tap}/{bai}/index.md"})
        nav.append({f"Tập {so}": muc})

    base = open(os.path.join(WEB, "mkdocs.base.yml"), encoding="utf-8").read()
    repo = os.environ.get("GITHUB_REPOSITORY")          # "chu-kho/ten-kho", có sẵn khi chạy trên GitHub Actions
    if repo:
        chu, ten = repo.split("/")
        base = base.replace("site_url: https://example.github.io/ebook-lap-trinh-thi-dau/", f"site_url: https://{chu.lower()}.github.io/{ten}/")
        base = base.replace("# repo_url: https://github.com/<tên-tài-khoản>/ebook-lap-trinh-thi-dau", f"repo_url: https://github.com/{repo}\nrepo_name: {repo}")
    with open(os.path.join(ROOT, "build", "mkdocs.yml"), "w", encoding="utf-8") as f:
        f.write("# Tệp sinh tự động bởi web/chuan_bi.py, đừng sửa tay. Sửa web/mkdocs.base.yml.\n")
        f.write(base.rstrip() + "\n\n")
        yaml.safe_dump({"nav": nav}, f, allow_unicode=True, sort_keys=False)
    print("Đã chuẩn bị", OUT)


if __name__ == "__main__":
    main()
