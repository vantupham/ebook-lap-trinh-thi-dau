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

# ----- các bài thêm khi nâng cấp Tập 0 -----
def leap(y): return y % 400 == 0 or (y % 4 == 0 and y % 100 != 0)
def valid_date(d, m, y):
    if not 1 <= m <= 12: return False
    md = [31, 29 if leap(y) else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]
    return 1 <= d <= md
def taxi(d): return sum(15000 if k == 1 else 12000 if k <= 30 else 10000 for k in range(1, d + 1))
def caesar(k, s): return "".join(chr((ord(c) - b + k) % 26 + b) if c.isalpha() and c.isascii() else c for c in s for b in [97 if c.islower() else 65])
def collatz_free(): pass
def g_dongho():
    h, m, s, t = R.randint(0, 23), R.randint(0, 59), R.randint(0, 59), R.choice([R.randint(0, 59), R.randint(0, 10**6), R.randint(0, 10**18)])
    x = h * 3600 + m * 60 + s
    for _ in range(min(t, 100000) if t <= 100000 else 0): x = (x + 1) % 86400
    if t > 100000: x = (x + t) % 86400
    return f"{h} {m} {s} {t}\n", [str(x // 3600), str(x % 3600 // 60), str(x % 60)]
def g_tietkiem():
    a = R.randint(100, 10**4); b = R.randint(a, a * R.choice([1, 2, 50])); p_ = R.randint(1, 100); x, k = a, 0
    while x < b: x = x + x * p_ // 100; k += 1
    return f"{a} {b} {p_}\n", [str(k)]
def g_khac():
    a = [R.randint(1, R.choice([5, 10**6])) for _ in range(R.randint(1, 30))]
    return f"{len(a)}\n{' '.join(map(str, a))}\n", [str(len(set(a)))]
def g_bau():
    m = R.randint(1, 6); ph = [R.randint(1, m) for _ in range(R.randint(1, 15))]
    best = max(range(1, m + 1), key=lambda k: (ph.count(k), -k))
    return f"{m} {len(ph)}\n{' '.join(map(str, ph))}\n", [str(best)]
def g_tat():
    c = [R.randint(1, 5) for _ in range(R.randint(1, 20))]
    return f"{len(c)}\n{' '.join(map(str, c))}\n", [str(sum(c.count(k) // 2 for k in set(c)))]
def g_chu():
    s = rnd_str(R.randint(1, 15), "abcz")
    best = min(set(s), key=lambda ch: (-s.count(ch), ch))
    return s + "\n", [best, str(s.count(best))]
def g_viet():
    ws = [rnd_str(R.randint(1, 5), "abcXY") for _ in range(R.randint(1, 5))]
    s = " " * R.randint(0, 2) + "".join((" " * R.randint(1, 3) if i else "") + w for i, w in enumerate(ws)) + " " * R.randint(0, 2)
    return s + "\n", ["".join(w[0].upper() for w in ws)]
def g_caesar():
    k = R.choice([R.randint(0, 25), R.randint(0, 10**9)]); s = rnd_str(R.randint(1, 15), "abzXZ ,!9")
    s = s.strip() or "a"
    return f"{k}\n{s}\n", caesar(k, s).split()
def g_hh():
    n = R.randint(1, 600); return f"{n}\n", [str(x) for x in range(1, n + 1) if sum(d for d in range(1, x) if x % d == 0) == x]
def g_tongnt():
    a = R.randint(1, 3000); b = R.randint(a, a + 2000)
    return f"{a} {b}\n", [str(sum(1 for x in range(a, b + 1) if is_p(sum(map(int, str(x))))))]
def g_uocn():
    n = R.choice([R.randint(1, 2000), R.randint(1, 10**12), R.randint(1, 1000) ** 2])
    if n <= 2000: c = sum(1 for d in range(1, n + 1) if n % d == 0)
    else:
        c, d = 0, 1
        while d * d <= n:
            if n % d == 0: c += 1 if d * d == n else 2
            d += 1
    return f"{n}\n", [str(c)]
def g_ucln_day():
    g = R.randint(1, 50); a = [g * R.randint(1, 10**6) for _ in range(R.randint(1, 10))]
    return f"{len(a)}\n{' '.join(map(str, a))}\n", [str(__import__('functools').reduce(gcd, a))]
def g_capnt():
    n = R.randint(1, 3000); return f"{n}\n", [str(sum(1 for q in range(2, n - 1) if is_p(q) and is_p(q + 2)))]
def g_robot():
    m = R.randint(1, 4); s = rnd_str(R.randint(1, 15), "LR"); v = 0
    for c in s: v = max(0, v - 1) if c == "L" else min(m, v + 1)
    return f"{m}\n{s}\n", [str(v)]
def g_bong():
    n = R.randint(2, 7); p_ = [R.choice([j for j in range(1, n + 1) if j != i]) for i in range(1, n + 1)]; k = R.randint(0, 30); c = 1
    for _ in range(k): c = p_[c - 1]
    return f"{n} {k}\n{' '.join(map(str, p_))}\n", [str(c)]
def g_quay():
    n = R.randint(1, 8); ts = sorted(R.randint(0, 50) for _ in range(n)); ds = [R.randint(1, 20) for _ in range(n)]
    busy_until, minute, i = 0, 0, 0   # mô phỏng từng phút
    queue = []
    for t_, d_ in zip(ts, ds): queue.append((t_, d_))
    cur = 0
    for t_, d_ in queue:
        while cur < t_: cur += 1
        cur += d_
    return f"{n}\n" + "".join(f"{a} {b}\n" for a, b in zip(ts, ds)), [str(cur)]
CASES += [
    ("vuon", [("5 3\n", ["16", "15"])], lambda: (lambda d, r: (f"{d} {r}\n", [str(2 * (d + r)), str(d * r)]))(R.randint(1, 1000), R.randint(1, 1000)), 50, "VUON"),
    ("ve_xe", [("30 7000 150000\n", ["60000"]), ("2 5000 20000\n", ["0"])], lambda: (lambda n, g, k: (f"{n} {g} {k}\n", [str(max(0, n * g - k))]))(R.randint(1, 100), R.randint(1000, 10000), R.randint(0, 10**6)), 100, None),
    ("xe_dua_don", [("100 45\n", ["3"]), ("90 45\n", ["2"])], lambda: (lambda n, k: (f"{n} {k}\n", [str(-(-n // k))]))(R.randint(1, 10**18), R.randint(1, 10**18)), 100, None),
    ("dao_so", [("123\n", ["321"]), ("540\n", ["45"])], lambda: (lambda n: (f"{n}\n", [str(int(str(n)[::-1]))]))(R.randint(100, 999)), 100, None),
    ("dongho", [("23 59 30 100\n", ["0", "1", "10"])], g_dongho, 100, "DONGHO"),
    ("nam_nhuan", [("2024\n", ["YES"]), ("1900\n", ["NO"]), ("2000\n", ["YES"])], lambda: (lambda y: (f"{y}\n", ["YES" if leap(y) else "NO"]))(R.choice([R.randint(1, 3000), 100 * R.randint(1, 10**7)])), 200, None),
    ("ngay_hop_le", [("29 2 2024\n", ["YES"]), ("29 2 2023\n", ["NO"]), ("31 4 2025\n", ["NO"])], lambda: (lambda d, m, y: (f"{d} {m} {y}\n", ["YES" if valid_date(d, m, y) else "NO"]))(R.randint(1, 32), R.randint(0, 13) or 1, R.choice([1900, 2000, 2023, 2024, R.randint(1, 10**9)])), 300, None),
    ("taxi", [("1\n", ["15000"]), ("10\n", ["123000"]), ("35\n", ["413000"])], lambda: (lambda d: (f"{d}\n", [str(taxi(d))]))(R.randint(1, 200)), 100, "TAXI"),
    ("dem_uoc", [("12\n", ["6"]), ("1\n", ["1"])], lambda: (lambda n: (f"{n}\n", [str(sum(1 for d in range(1, n + 1) if n % d == 0))]))(R.randint(1, 5000)), 100, None),
    ("so_dao_nguoc", [("1234\n", ["4321"]), ("1200\n", ["21"]), ("1000000000000000000\n", ["1"])], lambda: (lambda n: (f"{n}\n", [str(int(str(n)[::-1]))]))(R.randint(1, 10**18 - 1)), 100, None),
    ("tietkiem", [("1000 1100 5\n", ["2"]), ("500 500 3\n", ["0"])], g_tietkiem, 200, "TIETKIEM"),
    ("bau_lop_truong", [("3 6\n2 3 2 1 3 3\n", ["3"])], g_bau, 200, None),
    ("ghep_tat", [("9\n10 20 20 10 10 30 50 10 20\n", ["3"])], g_tat, 200, None),
    ("khacnhau", [("6\n5 1 5 2 1 5\n", ["3"])], g_khac, 200, "KHACNHAU"),
    ("chu_pho_bien", [("banana\n", ["a", "3"])], g_chu, 200, None),
    ("viet_tat", [("thanh pho   ho chi minh\n", ["TPHCM"]), ("  hoc sinh gioi\n", ["HSG"])], g_viet, 200, None),
    ("caesar", [("3\nXin chao, Zed!\n", ["Alq", "fkdr,", "Chg!"])], g_caesar, 200, "CAESAR"),
    ("so_hoan_hao", [("30\n", ["6", "28"])], g_hh, 30, None),
    ("sap_xep_ba", [("5 -2 3\n", ["-2", "3", "5"])], lambda: (lambda a: (" ".join(map(str, a)) + "\n", [str(x) for x in sorted(a)]))([R.randint(-10**9, 10**9) for _ in range(3)]), 200, None),
    ("tongnt", [("10 20\n", ["5"])], g_tongnt, 50, "TONGNT"),
    ("dem_uoc_nhanh", [("36\n", ["9"]), ("1000000000000\n", ["169"])], g_uocn, 60, None),
    ("ucln_day", [("4\n12 18 30 42\n", ["6"])], g_ucln_day, 200, None),
    ("capnt", [("20\n", ["4"]), ("1\n", ["0"]), ("10000000\n", ["58980"])], g_capnt, 40, "CAPNT"),
    ("robot", [("2\nLRRRLR\n", ["2"])], g_robot, 200, None),
    ("chuyen_bong", [("4 5\n3 1 4 2\n", ["3"])], g_bong, 200, None),
    ("quaythu", [("3\n1 5\n2 3\n10 2\n", ["12"])], g_quay, 200, "QUAYTHU"),
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
