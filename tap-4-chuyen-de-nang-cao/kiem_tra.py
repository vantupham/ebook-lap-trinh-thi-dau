"""Kiểm chứng mọi đoạn code trong Tập 4.

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
                exe = os.path.join(tempfile.gettempdir(), "t4_" + stem)
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
from fractions import Fraction as Fr
from functools import lru_cache
from itertools import combinations
import importlib.util
R = random.Random(2026)
def arr(n, lo, hi): return [R.randint(lo, hi) for _ in range(n)]
def fmt(*rows): return "".join(" ".join(map(str, r)) + "\n" for r in rows)
def rand_tree(n): return [[R.randint(1, i - 1), i] for i in range(2, n + 1)]
def path(n, edges, a, b):  # danh sách đỉnh trên đường a..b
    adj = [[] for _ in range(n + 1)]
    for u, v in edges: adj[u].append(v); adj[v].append(u)
    par = [0] * (n + 1); seen = {a}; st = [a]
    while st:
        u = st.pop()
        for v in adj[u]:
            if v not in seen: seen.add(v); par[v] = u; st.append(v)
    p = [b]
    while p[-1] != a: p.append(par[p[-1]])
    return p

def range_ops(assign):
    n, q = R.randint(1, 8), R.randint(1, 8); a = arr(n, 0, 9); A = list(a); ops, out = [], []
    for _ in range(q):
        l = R.randint(1, n); r = R.randint(l, n)
        if R.random() < .5:
            v = R.randint(0, 9); ops.append([1, l, r, v])
            for i in range(l - 1, r): a[i] = v if assign else a[i] + v
        else: ops.append([2, l, r]); out.append(str(sum(a[l - 1:r])))
    return fmt([n, q], A, *ops), out
def g_mo():
    n, q = R.randint(1, 10), R.randint(1, 8); a = arr(n, 1, 10**9 if R.random() < .3 else 4)
    qs = [sorted([R.randint(1, n), R.randint(1, n)]) for _ in range(q)]
    return fmt([n, q], a, *qs), [str(len(set(a[l - 1:r]))) for l, r in qs]
def tree_ops(kind):
    n, q = R.randint(1, 8), R.randint(1, 8); v = arr(n, 1, 9); e = rand_tree(n); R.shuffle(e)
    e = [[b, a] if R.random() < .5 else [a, b] for a, b in e]; V = list(v); ops, out = [], []
    for _ in range(q):
        if R.random() < .4: s, x = R.randint(1, n), R.randint(1, 9); ops.append([1, s, x]); v[s - 1] = x
        elif kind == "sum": s = R.randint(1, n); ops.append([2, s]); out.append(str(sum(v[u - 1] for u in path(n, e, 1, s))))
        else: a, b = R.randint(1, n), R.randint(1, n); ops.append([2, a, b]); out.append(str(max(v[u - 1] for u in path(n, e, a, b))))
    return fmt([n, q], V, *e, *ops), out
def g_cht():
    n = R.randint(1, 8); s = sorted(R.sample(range(1, 60), n)); f = sorted(arr(n, 1, 50), reverse=True); x = R.randint(f[0], 60)
    dp = [0] + [None] * n; F = [x] + f
    for i in range(1, n + 1): dp[i] = min(dp[j] + s[i - 1] * F[j] for j in range(i))
    return fmt([n, x], s, f), [str(dp[n])]
def g_coin():
    n, m = R.randint(1, 6), R.randint(0, 9); k = arr(n, 1, 9); e = [[R.randint(1, n), R.randint(1, n)] for _ in range(m)]
    adj = [[] for _ in range(n + 1)]
    for a, b in e: adj[a].append(b)
    best, seen = 0, set(); st = [(s, 1 << (s - 1)) for s in range(1, n + 1)]
    while st:  # trạng thái (đỉnh hiện tại, tập đã ghé)
        u, msk = st.pop()
        if (u, msk) in seen: continue
        seen.add((u, msk)); best = max(best, sum(k[i] for i in range(n) if msk >> i & 1))
        for v in adj[u]: st.append((v, msk | 1 << (v - 1)))
    return fmt([n, m], k, *e), [str(best)]
def g_flow():
    n, m = R.randint(2, 6), R.randint(1, 10); e = [[R.randint(1, n), R.randint(1, n), R.randint(1, 10**9 if R.random() < .2 else 9)] for _ in range(m)]
    best = min(sum(c for a, b, c in e if (a in S) and (b not in S))
               for r in range(n - 1) for T in combinations(range(2, n), r) for S in [{1, *T}])
    return fmt([n, m], *e), [str(best)]
def inter(a, b, c, d):
    def sub(p, q): return (p[0] - q[0], p[1] - q[1])
    r, s = sub(b, a), sub(d, c); den = r[0] * s[1] - r[1] * s[0]; ca = sub(c, a)
    if den == 0:
        if ca[0] * r[1] - ca[1] * r[0] != 0: return False      # song song, không thẳng hàng
        k = 0 if r[0] != 0 else 1                               # chiếu lên trục x hoặc y
        return max(min(a[k], b[k]), min(c[k], d[k])) <= min(max(a[k], b[k]), max(c[k], d[k]))
    t = Fr(ca[0] * s[1] - ca[1] * s[0], den); u = Fr(ca[0] * r[1] - ca[1] * r[0], den)
    return 0 <= t <= 1 and 0 <= u <= 1
def g_seg():
    t = R.randint(1, 6); rows, out = [], []
    for _ in range(t):
        while True:
            p = arr(8, -3, 3)
            if p[:2] != p[2:4] and p[4:6] != p[6:]: break
        rows.append(p); out.append("YES" if inter(p[0:2], p[2:4], p[4:6], p[6:8]) else "NO")
    return fmt([t], *rows), out
def g_area():
    n = R.randint(3, 9); import math
    ang = sorted(R.sample(range(360), n)); pts = []
    for a in ang:  # đa giác hình sao quanh gốc → đơn giản
        rr = R.randint(1, 10**4); pts.append([round(rr * math.cos(math.radians(a))), round(rr * math.sin(math.radians(a)))])
    if R.random() < .5: pts.reverse()
    s = sum((pts[(i + 1) % n][0] - pts[i][0]) * (pts[(i + 1) % n][1] + pts[i][1]) for i in range(n))  # công thức hình thang
    return fmt([n], *pts), [str(abs(s))]
def g_sa():
    s = "".join(R.choice("ab" if R.random() < .5 else "abc") for _ in range(R.randint(1, 12)))
    return s + "\n", [str(len({s[i:j] for i in range(len(s)) for j in range(i + 1, len(s) + 1)}))]
def g_stick():
    n, k = R.randint(1, 30), R.randint(1, 4); p = R.sample(range(1, 10), k); w = [False] * (n + 1)
    for i in range(1, n + 1): w[i] = any(x <= i and not w[i - x] for x in p)
    return fmt([n, k], p), ["".join("W" if w[i] else "L" for i in range(1, n + 1))]
def g_boc():
    n, k = R.randint(1, 3), R.randint(1, 3); a = arr(n, 1, 7); p = R.sample(range(1, 6), k)
    @lru_cache(None)
    def win(st): return any(not win(tuple(sorted(st[:i] + (st[i] - x,) + st[i + 1:]))) for i in range(len(st)) for x in p if x <= st[i])
    return fmt([n, k], a, p), ["AN" if win(tuple(sorted(a))) else "BAO"]
def g_motchieu():
    n, m = R.randint(1, 5), R.randint(0, 7); e = [[R.randint(1, n), R.randint(1, n)] for _ in range(m)]
    def strong(es):
        for s in range(1, n + 1):
            seen, st = {s}, [s]
            while st:
                u = st.pop()
                for a, b in es:
                    if a == u and b not in seen: seen.add(b); st.append(b)
            if len(seen) < n: return False
        return True
    pairs = [(a, b) for a in range(1, n + 1) for b in range(1, n + 1) if a != b]
    k = 0
    while not any(strong(e + list(c)) for c in combinations(pairs, k)): k += 1
    return fmt([n, m], *e), [str(k)]

def test_doan_so():
    spec = importlib.util.spec_from_file_location("grader", os.path.join(ROOT, "bai-4-10-de-kieu-ioi", "code", "grader.py"))
    gr = importlib.util.module_from_spec(spec); spec.loader.exec_module(gr)
    bad = 0
    for n, x in [(10, 7), (1, 1), (2, 1), (2, 2), (10**9, 1), (10**9, 10**9)] + [(n, R.randint(1, n)) for n in (R.randint(1, 10**9) for _ in range(60))]:
        kq = gr.cham(PROGS["doan_so"]["cpp"], n, x)
        if kq != "OK":
            bad += 1; print(f"  SAI doan_so n={n} x={x}: {kq}")
    print(f"{'OK ' if not bad else 'SAI'} {'doan_so':14} cpp   66 test (qua grader.py)")
    return bad

CASES = [
    ("tuoi_cay", [("5 4\n1 2 3 4 5\n2 1 5\n1 2 4 10\n2 1 3\n2 4 5\n", ["15", "26", "19"])], lambda: range_ops(False), 300, None),
    ("mo", [("5 3\n3 2 3 1 2\n1 3\n2 4\n1 5\n", ["2", "3", "3"])], g_mo, 300, None),
    ("euler_tour", [("5 3\n4 2 5 2 1\n1 2\n1 3\n3 4\n3 5\n2 4\n1 3 2\n2 4\n", ["11", "8"])], lambda: tree_ops("sum"), 300, None),
    ("hld", [("5 3\n2 4 1 3 3\n1 2\n1 3\n2 4\n2 5\n2 3 5\n1 2 2\n2 3 5\n", ["4", "3"])], lambda: tree_ops("max"), 300, None),
    ("cht", [("5 100\n20 30 30 50 90\n90 60 20 10 1\n", ["4800"])], g_cht, 300, None),
    ("nhat_xu", [("4 4\n4 5 2 7\n1 2\n2 1\n1 3\n2 4\n", ["16"])], g_coin, 300, None),
    ("dinic", [("4 5\n1 2 3\n2 4 2\n1 3 4\n3 4 5\n4 1 3\n", ["6"])], g_flow, 300, None),
    ("giao_doan", [("5\n1 1 5 3 1 2 4 3\n1 1 5 3 1 1 4 3\n1 1 5 3 2 3 4 1\n1 1 5 3 2 4 4 1\n1 1 5 3 3 2 7 4\n", "NO YES YES YES YES".split())], g_seg, 300, None),
    ("dien_tich", [("4\n1 1\n4 2\n3 5\n0 4\n", ["20"])], g_area, 300, None),
    ("xau_con", [("abaa\n", ["8"])], g_sa, 300, None),
    ("boc_que", [("10 3\n1 3 4\n", ["WLWWWWLWLW"])], g_stick, 300, None),
    ("denlong", [("5 5\n1 2 3 4 5\n2 1 5\n1 2 4 10\n2 1 5\n1 3 3 0\n2 3 5\n", ["15", "36", "15"])], lambda: range_ops(True), 300, "DENLONG"),
    ("bocsoi", [("3 3\n2 4 6\n1 3 4\n", ["BAO"])], g_boc, 300, "BOCSOI"),
    ("motchieu", [("6 6\n1 2\n2 3\n3 1\n3 4\n5 4\n4 6\n", ["2"])], g_motchieu, 150, "MOTCHIEU"),
]


def main():
    extract()
    fails = 0
    for stem, samples, gen, cnt, fio in CASES:
        langs = [l for l in ("py", "cpp") if l in PROGS.get(stem, {})]
        if not langs:
            print("THIẾU CODE:", stem); fails += 1; continue
        tests = list(samples) + [gen() for _ in range(cnt)]
        bad = 0
        for inp, exp in tests:
            for lang in langs:
                got = run(stem, lang, inp, fio)
                if got != exp:
                    bad += 1
                    if bad <= 2: print(f"  SAI {stem}.{lang}: vào {inp!r} mong {exp} được {got}")
        print(f"{'OK ' if not bad else 'SAI'} {stem:14} {'+'.join(langs):5} {len(tests)} test")
        fails += bad
    fails += test_doan_so()
    print("TỔNG SỐ LỖI:", fails)
    return fails

if __name__ == "__main__":
    sys.exit(1 if main() else 0)
