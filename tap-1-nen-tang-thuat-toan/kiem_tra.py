"""Kiểm chứng mọi đoạn code trong Tập 1.

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
                exe = os.path.join(tempfile.gettempdir(), "t1_" + stem)
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
from itertools import permutations, product
R = random.Random(2026)
def arr(n, lo, hi): return [R.randint(lo, hi) for _ in range(n)]
def fmt(*rows): return "".join(" ".join(map(str, r)) + "\n" for r in rows)

def g_maxsub():
    a = arr(R.randint(1, 8), -6, 6); return fmt([len(a)], a), [str(max(sum(a[l:r+1]) for l in range(len(a)) for r in range(l, len(a))))]

def g_rank():
    names = R.sample(["An", "Binh", "Chi", "Dung", "Em", "Giang", "Ha", "Khoa"], R.randint(1, 8))
    rows = [(nm, R.randint(5, 8)) for nm in names]
    s = sorted(rows, key=lambda x: (-x[1], x[0])); out = []
    for nm, d in s: out += [str(1 + sum(1 for _, e in rows if e > d)), nm, str(d)]
    return fmt([len(rows)], *[[nm, d] for nm, d in rows]), out

def g_distinct():
    a = arr(R.randint(1, 10), 1, 5); return fmt([len(a)], a), [str(len(set(a)))]

def g_range():
    n, q = R.randint(1, 8), R.randint(1, 5); a = arr(n, 1, 9); qs = [sorted((R.randint(1, n), R.randint(1, n))) for _ in range(q)]
    return fmt([n, q], a, *qs), [str(sum(a[l-1:r])) for l, r in qs]

def g_forest():
    n, q = R.randint(1, 5), R.randint(1, 5); g = ["".join(R.choice(".*") for _ in range(n)) for _ in range(n)]
    qs = []; out = []
    for _ in range(q):
        y1, y2 = sorted((R.randint(1, n), R.randint(1, n))); x1, x2 = sorted((R.randint(1, n), R.randint(1, n)))
        qs.append([y1, x1, y2, x2]); out.append(str(sum(g[i][j] == '*' for i in range(y1-1, y2) for j in range(x1-1, x2))))
    return fmt([n, q], *[[r] for r in g], *qs), out

def g_diff():
    n, q = R.randint(1, 8), R.randint(1, 5); b = [0] * n; qs = []
    for _ in range(q):
        l, r = sorted((R.randint(1, n), R.randint(1, n))); v = R.randint(-5, 5); qs.append([l, r, v])
        for i in range(l-1, r): b[i] += v
    return fmt([n, q], *qs), list(map(str, b))

def g_count():
    n, q = R.randint(1, 8), R.randint(1, 5); a = arr(n, 0, 9); qs = [sorted((R.randint(0, 10), R.randint(0, 10))) for _ in range(q)]
    return fmt([n, q], a, *qs), [str(sum(l <= x <= r for x in a)) for l, r in qs]

def g_factory():
    n, t = R.randint(1, 4), R.randint(1, 20); k = arr(n, 1, 6)
    T = 0
    while sum(T // x for x in k) < t: T += 1
    return fmt([n, t], k), [str(T)]

def g_run():
    n, S = R.randint(1, 8), R.randint(1, 15); a = arr(n, 1, 8)
    return fmt([n, S], a), [str(max([0] + [r - l + 1 for l in range(n) for r in range(l, n) if sum(a[l:r+1]) <= S]))]

def g_eqx():
    n, x = R.randint(1, 8), R.randint(1, 12); a = arr(n, 1, 6)
    return fmt([n, x], a), [str(sum(1 for l in range(n) for r in range(l, n) if sum(a[l:r+1]) == x))]

def hanoi(n):
    out = []
    def f(n, a, b, c):
        if n: f(n-1, a, c, b); out.append((a, b)); f(n-1, c, b, a)
    f(n, 1, 3, 2); return [str(len(out))] + [str(v) for p in out for v in p]

def bricks_ref(a):
    st, ans = [0], 0
    for x in a:
        while st[-1] > x: st.pop()
        if st[-1] < x: st.append(x); ans += 1
    return ans

def g_brick():
    a = arr(R.randint(1, 10), 0, 5); return fmt([len(a)], a), [str(bricks_ref(a))]

def g_seat():
    n = R.randint(1, 8); return fmt([n]), [str(sum(1 for p in permutations(range(1, n+1)) if all(abs(p[i]-p[i+1]) != 1 for i in range(n-1))))]

def tau_ngam_brute(Rr, C, g, s):
    D = {'E': (0, 1), 'W': (0, -1), 'S': (1, 0), 'N': (-1, 0)}; ends = set()
    def go(i, j, k):
        if k == len(s): ends.add((i, j)); return
        for ch in (D if s[k] == '?' else [s[k]]):
            ni, nj = i + D[ch][0], j + D[ch][1]
            if 0 <= ni < Rr and 0 <= nj < C and g[ni][nj] == '.': go(ni, nj, k + 1)
    for i in range(Rr):
        for j in range(C):
            if g[i][j] == '.': go(i, j, 0)
    return len(ends)

def g_tau():
    Rr, C, M = R.randint(1, 4), R.randint(1, 4), R.randint(1, 4)
    g = ["".join(R.choice("..#") for _ in range(C)) for _ in range(Rr)]; s = "".join(R.choice("EWSN?") for _ in range(M))
    return fmt([Rr, C, M], *[[r] for r in g], [s]), [str(tau_ngam_brute(Rr, C, g, s))]

def g_movie():
    n = R.randint(1, 7); p = []
    for _ in range(n):
        a = R.randint(1, 10); p.append([a, a + R.randint(1, 5)])
    best = 0
    for mask in range(1 << n):
        sel = sorted(p[i] for i in range(n) if mask >> i & 1)
        if all(sel[i][1] <= sel[i+1][0] for i in range(len(sel) - 1)): best = max(best, len(sel))
    return fmt([n], *p), [str(best)]

def g_dt():
    n, q, K = R.randint(1, 8), R.randint(1, 5), R.randint(0, 9); a = arr(n, 0, 9); qs = [sorted((R.randint(1, n), R.randint(1, n))) for _ in range(q)]
    return fmt([n, K, q], a, *qs), [v for l, r in qs for v in (str(sum(a[l-1:r])), str(sum(x >= K for x in a[l-1:r])))]

def g_cap():
    n, X = R.randint(2, 9), R.randint(1, 15); a = arr(n, 1, 8)
    return fmt([n, X], a), [str(sum(1 for i in range(n) for j in range(i+1, n) if a[i] + a[j] <= X))]

def g_keo():
    n = R.randint(1, 7); w = arr(n, 1, 9); best = None
    for asg in product(range(3), repeat=n):
        s = [0, 0, 0]
        for i, b in enumerate(asg): s[b] += w[i]
        d = max(s) - min(s); best = d if best is None or d < best else best
    return fmt([n], w), [str(best)]

CASES = [
    ("tong_lon_nhat_n2", [("8\n-1 3 -2 5 3 -5 2 2\n", ["9"])], g_maxsub, 300, None),
    ("tong_lon_nhat", [("8\n-1 3 -2 5 3 -5 2 2\n", ["9"]), ("1\n-5\n", ["-5"])], g_maxsub, 300, None),
    ("xep_hang", [("5\nAn 8\nBinh 9\nChi 9\nDung 7\nEm 8\n", "1 Binh 9 1 Chi 9 3 An 8 3 Em 8 5 Dung 7".split())], g_rank, 300, None),
    ("dem_phan_biet", [("5\n2 3 2 2 3\n", ["2"])], g_distinct, 200, None),
    ("tong_doan", [("5 3\n3 1 4 1 5\n1 3\n2 5\n4 4\n", ["8", "11", "1"])], g_range, 200, None),
    ("rung_cay", [("4 3\n.*..\n*.**\n**..\n****\n2 2 3 4\n3 1 3 1\n1 1 2 2\n", ["3", "1", "2"])], g_forest, 200, None),
    ("mang_hieu", [("5 2\n1 3 2\n2 5 1\n", ["2", "3", "3", "1", "1"])], g_diff, 200, None),
    ("dem_khoang", [("6 3\n5 1 9 3 7 3\n3 7\n10 20\n1 1\n", ["4", "0", "1"])], g_count, 200, None),
    ("nha_may", [("3 7\n3 2 5\n", ["8"]), ("1 1000000000\n1000000000\n", ["1000000000000000000"])], g_factory, 200, None),
    ("chay_bo", [("6 10\n4 2 3 6 1 2\n", ["3"]), ("1 1\n5\n", ["0"])], g_run, 300, None),
    ("dem_doan_bang_x", [("5 7\n2 4 1 2 7\n", ["3"])], g_eqx, 300, None),
    ("thap_ha_noi", [("2\n", ["3", "1", "2", "1", "3", "2", "3"])], lambda: (lambda n: (f"{n}\n", hanoi(n)))(R.randint(1, 8)), 16, None),
    ("xaytuong_de_quy", [("5\n2 4 2 3 3\n", ["3"]), ("3\n3 1 3\n", ["3"])], g_brick, 300, None),
    ("xep_cho", [("4\n", ["2"])], g_seat, 16, None),
    ("tau_ngam", [("3 4 2\n....\n.#..\n....\nES\n", ["3"])], g_tau, 300, None),
    ("lien_hoan_phim", [("3\n3 5\n4 9\n5 8\n", ["2"])], g_movie, 300, None),
    ("vet_can", [("8\n-1 3 -2 5 3 -5 2 2\n", ["9"])], g_maxsub, 50, None),
    ("doanhthu", [("5 5 2\n3 8 5 1 9\n1 3\n2 5\n", ["16", "2", "23", "3"])], g_dt, 200, "DOANHTHU"),
    ("capso", [("5 7\n1 5 3 6 2\n", ["6"])], g_cap, 300, "CAPSO"),
    ("chiakeo", [("4\n3 1 4 2\n", ["1"])], g_keo, 200, "CHIAKEO"),
]


def main():
    extract()
    fails = 0
    for stem, samples, gen, cnt, fio in CASES:
        langs = [l for l in ("py", "cpp") if l in PROGS.get(stem, {})]
        if not langs:
            print("THIẾU CODE:", stem); fails += 1; continue
        tests = list(samples) + ([gen() for _ in range(cnt)] if gen else [])
        bad = 0
        for inp, exp in tests:
            for lang in langs:
                got = run(stem, lang, inp, fio)
                if got != exp:
                    bad += 1
                    if bad <= 2: print(f"  SAI {stem}.{lang}: vào {inp!r} mong {exp} được {got}")
        print(f"{'OK ' if not bad else 'SAI'} {stem:20} {'+'.join(langs):7} {len(tests)} test")
        fails += bad
    print("TỔNG SỐ LỖI:", fails)
    return fails

if __name__ == "__main__":
    sys.exit(1 if main() else 0)
