"""Kiểm chứng mọi đoạn code trong Tập 0.

1. Tách các khối code có dòng đầu `# file: X` hoặc `// file: X` trong README.md của từng bài ra thư mục code/.
2. Biên dịch C++, chạy C++ và Python với ví dụ của đề và với test ngẫu nhiên, so với lời giải vét cạn.
Chạy:  python3 kiem_tra.py
"""
import os, re, random, subprocess, sys, tempfile, shutil
from math import gcd

ROOT = os.path.dirname(os.path.abspath(__file__))
BLOCK = re.compile(r"```(?:python|cpp)\n(?:#|//) file: (\S+)\n(.*?)```", re.S)
PROGS = {}  # tên (không đuôi) -> {'py': path, 'cpp': exe}


def extract():
    for d in sorted(os.listdir(ROOT)):
        md = os.path.join(ROOT, d, "README.md")
        if not d.startswith("bai-") or not os.path.exists(md):
            continue
        code_dir = os.path.join(ROOT, d, "code")
        os.makedirs(code_dir, exist_ok=True)
        for name, body in BLOCK.findall(open(md, encoding="utf-8").read()):
            path = os.path.join(code_dir, name)
            open(path, "w", encoding="utf-8").write(body)
            stem, ext = os.path.splitext(name)
            entry = PROGS.setdefault(stem, {})
            if ext == ".py":
                entry["py"] = path
            else:
                exe = os.path.join(tempfile.gettempdir(), "t0_" + stem)
                r = subprocess.run(["g++", "-O2", "-std=c++17", "-o", exe, path], capture_output=True, text=True)
                if r.returncode:
                    sys.exit(f"LỖI BIÊN DỊCH {name}:\n{r.stderr}")
                entry["cpp"] = exe


def run(stem, lang, inp, fileio=None):
    prog = PROGS[stem][lang]
    cmd = [sys.executable, prog] if lang == "py" else [prog]
    if not fileio:
        r = subprocess.run(cmd, input=inp, capture_output=True, text=True, timeout=30)
        return r.stdout.split()
    with tempfile.TemporaryDirectory() as tmp:
        open(os.path.join(tmp, fileio + ".INP"), "w").write(inp)
        subprocess.run(cmd, cwd=tmp, capture_output=True, text=True, timeout=30)
        return open(os.path.join(tmp, fileio + ".OUT")).read().split()


# ---------- lời giải vét cạn ----------
def collatz(n):
    c = 0
    while n != 1:
        n = n // 2 if n % 2 == 0 else 3 * n + 1
        c += 1
    return c

def is_p(n):
    return n >= 2 and all(n % d for d in range(2, int(n ** 0.5) + 1))

def tri(a, b, c):
    a, b, c = sorted((a, b, c))
    if a + b <= c: return "KHONG"
    if a == c: return "DEU"
    if a * a + b * b == c * c: return "VUONG"
    if a == b or b == c: return "CAN"
    return "THUONG"

def strong(s):
    return "MANH" if len(s) >= 8 and any(c.isupper() for c in s) and any(c.islower() for c in s) and any(c.isdigit() for c in s) else "YEU"

def kenh(n, m, p, ch):
    cur, k, seen = p, 0, set()
    while True:
        who = next((a for a, b in ch if b == cur), None)
        if who is None: return k
        if cur in seen: return -1
        seen.add(cur); cur = who; k += 1

def runs(s):
    segs = [len(m.group()) for m in re.finditer(r"R+|G+", s)]
    b = max(segs); return [b, segs.count(b)]

R = random.Random(2026)
def rnd_str(n, alpha): return "".join(R.choice(alpha) for _ in range(n))

# mỗi mục: (tên, [(input, expected_tokens)], hàm sinh test ngẫu nhiên -> (input, expected), số test, tệp)
CASES = [
    ("tong_diem", [("7 8 9\n", ["24"])], lambda: (lambda a, b, c: (f"{a} {b} {c}\n", [str(a + b + c)]))(R.randint(0, 10), R.randint(0, 10), R.randint(0, 10)), 50, None),
    ("tong_diem_tep", [("7 8 9\n", ["24"])], None, 0, "TONGDIEM"),
    ("tong_day", [], lambda: (lambda a: (f"{len(a)}\n{' '.join(map(str, a))}\n", [str(sum(a))]))([R.randint(-10**9, 10**9) for _ in range(R.randint(1, 30))]), 50, None),
    ("doi_giay", [("3725\n", ["1", "2", "5"])], lambda: (lambda t: (f"{t}\n", [str(t // 3600), str(t % 3600 // 60), str(t % 60)]))(R.randint(0, 10**9)), 100, None),
    ("tong_1_n", [("1000000\n", ["500000500000"])], lambda: (lambda n: (f"{n}\n", [str(n * (n + 1) // 2)]))(R.randint(1, 10**6)), 50, None),
    ("tam_giac", [("3 4 5\n", ["VUONG"]), ("2 2 3\n", ["CAN"]), ("1 2 3\n", ["KHONG"]), ("1000000000 1000000000 1000000000\n", ["DEU"]), ("5 3 4\n", ["VUONG"]), ("3 2 2\n", ["CAN"])],
     lambda: (lambda a, b, c: (f"{a} {b} {c}\n", [tri(a, b, c)]))(*R.choice([[R.randint(1, 6) for _ in range(3)], [3 * R.randint(1, 9), 4 * R.randint(1, 9), 5 * R.randint(1, 9)]])), 400, None),
    ("ve_mot", [("6\n", ["8"])], lambda: (lambda n: (f"{n}\n", [str(collatz(n))]))(R.randint(1, 10**6)), 100, None),
    ("tong_3_5", [("10\n", ["33"])], lambda: (lambda n: (f"{n}\n", [str(sum(i for i in range(1, n + 1) if i % 3 == 0 or i % 5 == 0))]))(R.randint(1, 3000)), 100, None),
    ("tong_3_5_cong_thuc", [("10\n", ["33"])], lambda: (lambda n: (f"{n}\n", [str(sum(i for i in range(1, n + 1) if i % 3 == 0 or i % 5 == 0))]))(R.randint(1, 3000)), 100, None),
    ("tong_chu_so", [("1234\n", ["10"])], lambda: (lambda n: (f"{n}\n", [str(sum(map(int, str(n))))]))(R.randint(1, 10**18)), 100, None),
    ("thong_ke", [("7\n8 6 9 6 9 7 6\n", ["9", "2", "6"])],
     lambda: (lambda a: (f"{len(a)}\n{' '.join(map(str, a))}\n", [str(max(a)), str(a.count(max(a))), str(min(range(11), key=lambda k: (-a.count(k), k)))]))([R.randint(0, 10) for _ in range(R.randint(1, 20))]), 300, None),
    ("so_bi_thieu", [("5\n2 3 1 5\n", ["4"])], lambda: (lambda n, miss: (f"{n}\n{' '.join(map(str, R.sample([v for v in range(1, n + 1) if v != miss], n - 1)))}\n", [str(miss)]))(*(lambda n: (n, R.randint(1, n)))(R.randint(2, 30))), 200, None),
    ("mat_khau", [("SaiGon2026\n", ["MANH"]), ("saigon2026\n", ["YEU"])], lambda: (lambda s: (s + "\n", [strong(s)]))(rnd_str(R.randint(1, 12), "aAz9Z0b")), 300, None),
    ("doi_xung", [("Top spot!\n", ["YES"]), ("abc\n", ["NO"])], lambda: (lambda s: (s + "\n", ["YES" if (lambda t: t == t[::-1])([c.lower() for c in s if c.isalnum()]) else "NO"]))(R.choice([rnd_str(R.randint(1, 8), "aAb !"), (lambda h: h + h[::-1])(rnd_str(R.randint(1, 5), "abAB, "))])), 300, None),
    ("so_may_man", [("1 30\n", ["3"]), ("30 70\n", ["2"])], lambda: (lambda a, b: (f"{a} {b}\n", [str(sum(1 for n in range(a, b + 1) if str(n) == str(n)[::-1] and sum(map(int, str(n))) % 3 == 0))]))(*sorted((R.randint(1, 5000), R.randint(1, 5000)))), 100, None),
    ("hai_ngon_den", [("4 6\n", ["12"]), ("1000000000 999999999\n", ["999999999000000000"])], lambda: (lambda a, b: (f"{a} {b}\n", [str(a * b // gcd(a, b))]))(R.randint(1, 10**9), R.randint(1, 10**9)), 100, None),
    ("kiem_tra_nguyen_to", [("1\n", ["NO"]), ("2\n", ["YES"]), ("999999000001\n", ["YES"]), ("1000000000000\n", ["NO"])], lambda: (lambda n: (f"{n}\n", ["YES" if is_p(n) else "NO"]))(R.randint(0, 10**5)), 200, None),
    ("sang", [("30\n", ["10"]), ("1000000\n", ["78498"]), ("2\n", ["1"])], lambda: (lambda n: (f"{n}\n", [str(sum(is_p(v) for v in range(n + 1)))]))(R.randint(2, 2000)), 50, None),
    ("kenhtv_mo_phong", [("3 4 2\n3 2\n1 3\n2 4\n", ["2"]), ("4 4 1\n2 1\n3 2\n1 3\n4 1\n", ["-1"])], None, 0, None),
    ("kenhtv", [("3 4 2\n3 2\n1 3\n2 4\n", ["2"]), ("4 4 1\n2 1\n3 2\n1 3\n4 1\n", ["-1"])], None, 0, None),
    ("dayso", [("5\n3 -4 0 7 -3\n", ["10", "2"])], lambda: (lambda a: (f"{len(a)}\n{' '.join(map(str, a))}\n", [str(sum(x for x in a if x > 0)), str(sum(1 for x in a if x % 2 == 0))]))([R.randint(-10**9, 10**9) for _ in range(R.randint(1, 30))]), 100, "DAYSO"),
    ("demnt", [("3\n1 10\n11 20\n14 16\n", ["4", "4", "0"])], None, 0, "DEMNT"),
    ("chuoiden", [("RRGGGRGGG\n", ["3", "2"])], lambda: (lambda s: (s + "\n", [str(x) for x in runs(s)]))(rnd_str(R.randint(1, 20), "RG")), 200, "CHUOIDEN"),
]

def kenh_gen():
    n, m = R.randint(1, 6), R.randint(2, 6)
    ch = []
    for _ in range(n):
        a, b = R.sample(range(1, m + 1), 2); ch.append((a, b))
    p = R.randint(1, m)
    inp = f"{n} {m} {p}\n" + "".join(f"{a} {b}\n" for a, b in ch)
    return inp, [str(kenh(n, m, p, ch))]

def demnt_gen():
    t = R.randint(1, 5); qs = [sorted((R.randint(1, 3000), R.randint(1, 3000))) for _ in range(t)]
    return f"{t}\n" + "".join(f"{l} {r}\n" for l, r in qs), [str(sum(is_p(v) for v in range(l, r + 1))) for l, r in qs]


def main():
    extract()
    gens = {"kenhtv_mo_phong": (kenh_gen, 500), "kenhtv": (kenh_gen, 500), "demnt": (demnt_gen, 30)}
    fails = 0
    for stem, samples, gen, cnt, fio in CASES:
        if stem in gens: gen, cnt = gens[stem]
        langs = [l for l in ("py", "cpp") if l in PROGS.get(stem, {})]
        if not langs:
            print("THIẾU CODE:", stem); fails += 1; continue
        tests = list(samples) + [gen() for _ in range(cnt)] if gen else list(samples)
        bad = 0
        for inp, exp in tests:
            for lang in langs:
                got = run(stem, lang, inp, fio)
                if got != exp:
                    bad += 1
                    if bad <= 2: print(f"  SAI {stem}.{lang}: vào {inp!r} mong {exp} được {got}")
        print(f"{'OK ' if not bad else 'SAI'} {stem:22} {'+'.join(langs):7} {len(tests)} test")
        fails += bad
    print("TỔNG SỐ LỖI:", fails)
    return fails

if __name__ == "__main__":
    sys.exit(1 if main() else 0)
