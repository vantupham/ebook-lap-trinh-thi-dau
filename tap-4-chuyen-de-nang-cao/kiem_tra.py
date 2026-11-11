"""Kiểm chứng mọi đoạn code trong Tập 4.

1. Tách các khối code có dòng đầu `# file: X` hoặc `// file: X` trong README.md của từng bài ra thư mục code/.
2. Biên dịch C++, chạy C++ và Python với ví dụ của đề và với test ngẫu nhiên, so với lời giải vét cạn.
Chạy:  python3 kiem_tra.py
"""
import os, re, random, subprocess, sys, tempfile, shutil
from collections import deque
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


# ---------- bổ sung khi nâng cấp Tập 4 ----------

def g_minluoi():
    n, q = R.randint(1, 8), R.randint(1, 8); a = arr(n, -9, 9); A = a[:]; ops = []; out = []
    for _ in range(q):
        l = R.randint(1, n); r = R.randint(l, n)
        if R.random() < .5:
            v = R.randint(-5, 5); ops.append([1, l, r, v])
            for i in range(l - 1, r): A[i] += v
        else: ops.append([2, l, r]); out.append(str(min(A[l - 1:r])))
    return fmt([n, q], a, *ops), out

def g_battat():
    n, q = R.randint(1, 8), R.randint(1, 8); A = [0] * n; ops = []; out = []
    for _ in range(q):
        l = R.randint(1, n); r = R.randint(l, n); t = R.randint(1, 2); ops.append([t, l, r])
        if t == 1:
            for i in range(l - 1, r): A[i] ^= 1
        else: out.append(str(sum(A[l - 1:r])))
    return fmt([n, q], *ops), out

def g_datphong():
    n, C, q = R.randint(1, 8), R.randint(1, 6), R.randint(1, 8); A = [0] * n; ops = []; out = []
    for _ in range(q):
        l = R.randint(1, n); r = R.randint(l, n); k = R.randint(1, 3); ops.append([l, r, k])
        if max(A[l - 1:r]) + k <= C:
            out.append("YES")
            for i in range(l - 1, r): A[i] += k
        else: out.append("NO")
    return fmt([n, C, q], *ops), out

CASES += [
    ("tuoi_cay", [("8 4\n1 2 3 4 5 6 7 8\n1 2 7 10\n2 3 4\n2 1 8\n1 5 8 1\n", ["27", "96"]), ("8 3\n1 1 1 1 1 1 1 1\n1 1 8 5\n1 3 3 1\n2 3 3\n", ["7"])], None, 0, None),
    ("min_luoi", [("5 4\n5 2 7 1 6\n2 1 5\n1 3 5 -2\n2 3 5\n2 1 2\n", ["1", "-1", "2"])], g_minluoi, 300, None),
    ("bat_tat", [("6 5\n1 2 5\n2 1 6\n1 4 6\n2 1 6\n2 3 4\n", ["4", "3", "1"])], g_battat, 300, None),
    ("datphong", [("5 3 4\n1 3 2\n2 5 1\n3 4 1\n4 5 2\n", ["YES", "YES", "NO", "YES"])], g_datphong, 300, "DATPHONG"),
]

def g_khoitong():
    n, q = R.randint(1, 12), R.randint(1, 8); a = arr(n, 0, 9); A = a[:]; ops = []; out = []
    for _ in range(q):
        if R.random() < .4:
            i = R.randint(1, n); v = R.randint(0, 9); ops.append([1, i, v]); A[i - 1] = v
        else:
            l = R.randint(1, n); r = R.randint(l, n); ops.append([2, l, r]); out.append(str(sum(A[l - 1:r])))
    return fmt([n, q], a, *ops), out

def g_demcap():
    n, q = R.randint(1, 10), R.randint(1, 6); a = arr(n, 1, 4); qs = []; out = []
    for _ in range(q):
        l = R.randint(1, n); r = R.randint(l, n); qs.append([l, r]); s = a[l - 1:r]
        out.append(str(sum(s[i] == s[j] for i in range(len(s)) for j in range(i + 1, len(s)))))
    return fmt([n, q], a, *qs), out

def g_noibat():
    n, q, K = R.randint(1, 12), R.randint(1, 6), R.randint(1, 3); a = arr(n, 1, 4); qs = []; out = []
    for _ in range(q):
        l = R.randint(1, n); r = R.randint(l, n); qs.append([l, r]); s = a[l - 1:r]
        out.append(str(sum(1 for c in set(s) if s.count(c) >= K)))
    return fmt([n, q, K], a, *qs), out

CASES += [
    ("mo", [("9 4\n3 2 3 1 2 4 4 1 3\n1 4\n2 6\n5 9\n3 5\n", ["3", "4", "4", "3"])], None, 0, None),
    ("khoi_tong", [("6 3\n1 2 3 4 5 6\n2 2 5\n1 3 10\n2 1 6\n", ["14", "28"])], g_khoitong, 300, None),
    ("dem_cap", [("6 3\n1 2 1 1 2 3\n1 4\n2 5\n1 6\n", ["3", "2", "4"])], g_demcap, 300, None),
    ("noibat", [("8 3 2\n1 2 1 3 2 2 3 1\n1 5\n2 7\n1 8\n", ["2", "2", "3"])], g_noibat, 300, "NOIBAT"),
]

def rtree(n):
    e = [[R.randint(1, v - 1), v] for v in range(2, n + 1)]
    return [[a, b] if R.random() < .5 else [b, a] for a, b in e]

def parents(n, e):
    adj = [[] for _ in range(n + 1)]
    for a, b in e: adj[a].append(b); adj[b].append(a)
    par = [0] * (n + 1); order = [1]; seen = {1}
    for u in order:
        for v in adj[u]:
            if v not in seen: seen.add(v); par[v] = u; order.append(v)
    return par

def in_sub(par, v, u):
    while v and v != u: v = par[v]
    return v == u

def g_caycon():
    n, q = R.randint(1, 8), R.randint(1, 6); e = rtree(n); val = arr(n, 0, 9); par = parents(n, e); V = [0] + val[:]; ops = []; out = []
    for _ in range(q):
        if R.random() < .4:
            s = R.randint(1, n); x = R.randint(0, 9); ops.append([1, s, x]); V[s] = x
        else:
            s = R.randint(1, n); ops.append([2, s]); out.append(str(sum(V[v] for v in range(1, n + 1) if in_sub(par, v, s))))
    return fmt([n, q], val, *e, *ops), out

def path_nodes(par, a, b):
    anc = []
    x = a
    while x: anc.append(x); x = par[x]
    y = b; pb = []
    while y not in anc: pb.append(y); y = par[y]
    return anc[:anc.index(y) + 1] + pb

def g_hldtong():
    n, q = R.randint(1, 8), R.randint(1, 6); e = rtree(n); val = arr(n, 0, 9); par = parents(n, e); V = [0] + val[:]; ops = []; out = []
    for _ in range(q):
        if R.random() < .4:
            s = R.randint(1, n); x = R.randint(0, 9); ops.append([1, s, x]); V[s] = x
        else:
            a, b = R.randint(1, n), R.randint(1, n); ops.append([2, a, b]); out.append(str(sum(V[v] for v in path_nodes(par, a, b))))
    return fmt([n, q], val, *e, *ops), out

def g_mangnuoc():
    n, q = R.randint(1, 8), R.randint(1, 6); e = rtree(n); val = arr(n, 0, 9); par = parents(n, e); V = [0] + val[:]; ops = []; out = []
    for _ in range(q):
        u = R.randint(1, n)
        if R.random() < .5:
            v = R.randint(-5, 9); ops.append([1, u, v])
            for w in range(1, n + 1):
                if in_sub(par, w, u): V[w] += v
        else:
            ops.append([2, u]); out.append(str(sum(V[w] for w in range(1, n + 1) if in_sub(par, w, u))))
    return fmt([n, q], val, *e, *ops), out

CASES += [
    ("cay_con", [("7 4\n4 2 5 2 1 3 6\n1 2\n1 3\n2 4\n2 5\n3 6\n5 7\n2 2\n2 1\n1 5 10\n2 2\n", ["11", "23", "20"])], g_caycon, 300, None),
    ("hld_tong", [("5 3\n2 4 1 3 3\n1 2\n1 3\n2 4\n2 5\n2 3 5\n1 2 2\n2 3 5\n", ["10", "8"])], g_hldtong, 300, None),
    ("mangnuoc", [("7 6\n1 1 1 1 1 1 1\n1 2\n1 3\n2 4\n2 5\n3 6\n5 7\n1 2 3\n2 2\n2 1\n1 1 1\n2 5\n2 3\n", ["16", "19", "10", "4"])], g_mangnuoc, 300, "MANGNUOC"),
]

def g_lichao():
    n = R.randint(1, 8); x = R.randint(1, 60); s = arr(n, 1, 60); f = arr(n, 1, 60)
    dp = [0]; F = [x] + f
    for i in range(1, n + 1): dp.append(min(dp[j] + s[i - 1] * F[j] for j in range(i)))
    return fmt([n, x], s, f), [str(dp[n])]

def g_nhayda():
    n = R.randint(1, 9); C = R.randint(0, 30); h = sorted(R.sample(range(1, 60), n))
    dp = [0] * n
    for i in range(1, n): dp[i] = min(dp[j] + (h[i] - h[j]) ** 2 + C for j in range(i))
    return fmt([n, C], h), [str(dp[n - 1])]

CASES += [
    ("quai_cham", [("5 100\n20 30 30 50 90\n90 60 20 10 1\n", ["4800"])], g_cht, 200, None),
    ("li_chao", [("5 100\n20 70 30 50 90\n90 30 60 10 1\n", ["5900"])], g_lichao, 100, None),
    ("nhayda", [("5 5\n1 3 4 7 10\n", ["42"])], g_nhayda, 300, "NHAYDA"),
]

def reach_sets(n, e):
    out = []
    for i in range(n + 1):
        s = {i}; q = [i]
        for u in q:
            for a, b in e:
                if a == u and b not in s: s.add(b); q.append(b)
        out.append(s)
    return out

def g_demscc():
    n = R.randint(1, 8); e = [[R.randint(1, n), R.randint(1, n)] for _ in range(R.randint(0, 12))]
    Rs = reach_sets(n, e); lab = [0] * (n + 1); sizes = []
    for i in range(1, n + 1):
        if not lab[i]:
            grp = [j for j in range(1, n + 1) if j in Rs[i] and i in Rs[j]]
            for j in grp: lab[j] = 1
            sizes.append(len(grp))
    return fmt([n, len(e)], *e), [str(len(sizes)), str(max(sizes))]

def g_ditoi():
    n = R.randint(1, 6); e = [[R.randint(1, n), R.randint(1, n)] for _ in range(R.randint(0, 10))]
    Rs = reach_sets(n, e); ok = all(len(Rs[i] & set(range(1, n + 1))) == n for i in range(1, n + 1))
    return fmt([n, len(e)], *e), ["YES" if ok else "NO"]

def g_daycau():
    n = R.randint(1, 8); e = []
    for _ in range(R.randint(0, 11)):
        a, b = R.randint(1, n), R.randint(1, n)
        if a != b: e.append([a, b])
    def comps(skip):
        p = list(range(n + 1))
        def f(x):
            while p[x] != x: x = p[x]
            return x
        for i, (a, b) in enumerate(e):
            if i != skip: p[f(a)] = f(b)
        return len({f(i) for i in range(1, n + 1)})
    base = comps(-1)
    return fmt([n, len(e)], *e), [str(sum(comps(i) > base for i in range(len(e))))]

CASES += [
    ("dem_scc", [("7 9\n1 2\n2 3\n3 1\n3 4\n4 5\n5 4\n5 6\n6 7\n7 6\n", ["3", "3"])], g_demscc, 300, None),
    ("di_dau_cung_toi", [("4 5\n1 2\n2 3\n3 1\n1 4\n4 1\n", ["YES"]), ("3 2\n1 2\n2 3\n", ["NO"])], g_ditoi, 300, None),
    ("daycau", [("7 8\n1 2\n2 3\n3 1\n3 4\n4 5\n5 6\n6 4\n5 7\n", ["2"]), ("2 2\n1 2\n1 2\n", ["0"])], g_daycau, 300, "DAYCAU"),
]

def maxflow_brute(n, e, s, t):
    best = None
    nodes = [v for v in range(n) if v not in (s, t)]
    for m in range(1 << len(nodes)):
        S = {s} | {nodes[i] for i in range(len(nodes)) if m >> i & 1}
        c = sum(w for a, b, w in e if a in S and b not in S)
        best = c if best is None else min(best, c)
    return best

def g_khieuvu():
    a, b = R.randint(1, 5), R.randint(1, 5); ps = list({(R.randint(1, a), R.randint(1, b)) for _ in range(R.randint(0, 9))})
    best = 0
    def go(u, used, k):
        nonlocal best
        if u > a: best = max(best, k); return
        go(u + 1, used, k)
        for x, y in ps:
            if x == u and y not in used: go(u + 1, used | {y}, k + 1)
    go(1, frozenset(), 0)
    return fmt([a, b, len(ps)], *ps), [str(best)]

def g_chanduong():
    n = R.randint(2, 7); e = []
    for _ in range(R.randint(0, 10)):
        a, b = R.randint(1, n), R.randint(1, n)
        if a != b: e.append([a, b])
    E = [(a - 1, b - 1, 1) for a, b in e] + [(b - 1, a - 1, 1) for a, b in e]
    return fmt([n, len(e)], *e), [str(maxflow_brute(n, E, 0, n - 1))]

def g_caulacbo():
    n, m = R.randint(1, 5), R.randint(1, 3); c = arr(m, 1, 3); ps = list({(R.randint(1, n), R.randint(1, m)) for _ in range(R.randint(0, 9))})
    best = 0
    def go(i, cnt, k):
        nonlocal best
        if i > n: best = max(best, k); return
        go(i + 1, cnt, k)
        for x, y in ps:
            if x == i and cnt[y - 1] < c[y - 1]:
                cnt[y - 1] += 1; go(i + 1, cnt, k + 1); cnt[y - 1] -= 1
    go(1, [0] * m, 0)
    return fmt([n, m, len(ps)], c, *ps), [str(best)]

CASES += [
    ("dinic", [("4 5\n1 2 1\n1 3 1\n2 3 1\n2 4 1\n3 4 1\n", ["2"])], None, 0, None),
    ("khieu_vu", [("3 3 5\n1 1\n1 2\n2 1\n3 2\n3 3\n", ["3"])], g_khieuvu, 300, None),
    ("chan_duong", [("4 5\n1 2\n1 3\n2 3\n3 4\n1 4\n", ["2"])], g_chanduong, 300, None),
    ("caulacbo", [("4 2 5\n1 2\n1 1\n2 1\n3 2\n4 2\n2 2\n", ["3"])], g_caulacbo, 300, "CAULACBO"),
]

from fractions import Fraction as Fr
from math import gcd as _gcd, atan2 as _atan2, pi as _pi

def _cat_brute(a, b, c, d):
    # tham số hóa A + t(B-A) = C + u(D-C) bằng phân số
    rx, ry, sx, sy = b[0]-a[0], b[1]-a[1], d[0]-c[0], d[1]-c[1]
    den = rx * sy - ry * sx
    qx, qy = c[0]-a[0], c[1]-a[1]
    if den != 0:
        t = Fr(qx * sy - qy * sx, den); u = Fr(qx * ry - qy * rx, den)
        return 0 <= t <= 1 and 0 <= u <= 1
    if rx == ry == 0 and sx == sy == 0: return a == c
    if rx == ry == 0: a, b, c, d = c, d, a, b; rx, ry = b[0]-a[0], b[1]-a[1]
    if (c[0]-a[0]) * ry - (c[1]-a[1]) * rx != 0 or (d[0]-a[0]) * ry - (d[1]-a[1]) * rx != 0: return False
    L = rx * rx + ry * ry
    t0 = Fr((c[0]-a[0]) * rx + (c[1]-a[1]) * ry, L); t1 = Fr((d[0]-a[0]) * rx + (d[1]-a[1]) * ry, L)
    return max(min(t0, t1), 0) <= min(max(t0, t1), 1)

def g_giaodoan():
    q = R.randint(1, 6); rows = []; ans = []
    for _ in range(q):
        v = arr(8, -3, 3) if R.random() < .7 else [R.choice([-10**9, 10**9, R.randint(-10**9, 10**9)]) for _ in range(8)]
        rows.append(v); ans.append("YES" if _cat_brute(v[0:2], v[2:4], v[4:6], v[6:8]) else "NO")
    return fmt([q], *rows), ans

def _sao(n, lo, hi):
    while True:
        s = list({(R.randint(lo, hi), R.randint(lo, hi)) for _ in range(n)})
        if len(s) < 3: continue
        cx, cy = sum(p[0] for p in s) / len(s) + .123, sum(p[1] for p in s) / len(s) + .071
        s.sort(key=lambda p: _atan2(p[1] - cy, p[0] - cx))
        a = [_atan2(p[1] - cy, p[0] - cx) for p in s]
        if len(set(a)) < len(a): continue
        gaps = [a[i+1] - a[i] for i in range(len(a)-1)] + [a[0] + 2*_pi - a[-1]]
        s2 = sum(s[i][0]*s[(i+1)%len(s)][1] - s[(i+1)%len(s)][0]*s[i][1] for i in range(len(s)))
        if max(gaps) < _pi - 1e-9 and s2 != 0: return s

def _hull_brute(P):
    V = []
    for p in P:
        a = sorted(_atan2(r[1]-p[1], r[0]-p[0]) for r in P if r != p)
        g = [a[i+1]-a[i] for i in range(len(a)-1)] + [a[0] + 2*_pi - a[-1]]
        if max(g) > _pi + 1e-9: V.append(p)
    cx, cy = sum(p[0] for p in V) / len(V), sum(p[1] for p in V) / len(V)
    V.sort(key=lambda p: _atan2(p[1]-cy, p[0]-cx))
    return len(V), abs(sum(V[i][0]*V[(i+1)%len(V)][1] - V[(i+1)%len(V)][0]*V[i][1] for i in range(len(V))))

def g_dientich():
    s = _sao(R.randint(3, 9), -20, 20)
    if R.random() < .5: s.reverse()
    tri = sum(Fr((s[i][0]-s[0][0])*(s[i+1][1]-s[0][1]) - (s[i][1]-s[0][1])*(s[i+1][0]-s[0][0])) for i in range(1, len(s)-1))
    return fmt([len(s)], *s), [str(abs(tri))]

def g_hangrao():
    while True:
        P = list({(R.randint(-6, 6), R.randint(-6, 6)) for _ in range(R.randint(3, 12))})
        if len(P) >= 3 and any((b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]) for a in P[:1] for b in P for c in P): break
    k, s2 = _hull_brute(P)
    return fmt([len(P)], *P), [str(k), str(s2)]

def _pip(P, x, y):
    n = len(P); ins = False
    for i in range(n):
        a, b = P[i], P[(i+1)%n]
        if (b[0]-a[0])*(y-a[1]) - (b[1]-a[1])*(x-a[0]) == 0 and min(a[0],b[0]) <= x <= max(a[0],b[0]) and min(a[1],b[1]) <= y <= max(a[1],b[1]): return 0
        if (a[1] > y) != (b[1] > y) and x < a[0] + Fr((y-a[1])*(b[0]-a[0]), b[1]-a[1]): ins = not ins
    return 1 if ins else 0

def g_vuoncay():
    s = _sao(R.randint(3, 9), -8, 8)
    if R.random() < .5: s.reverse()
    xs, ys = [p[0] for p in s], [p[1] for p in s]
    c = sum(_pip(s, x, y) for x in range(min(xs), max(xs)+1) for y in range(min(ys), max(ys)+1))
    return fmt([len(s)], *s), [str(c)]

CASES += [
    ("giao_doan", [("5\n1 1 5 3 1 2 4 3\n1 1 5 3 1 1 4 3\n1 1 5 3 2 3 4 1\n1 1 5 3 2 4 4 1\n1 1 5 3 3 2 7 4\n", ["NO","YES","YES","YES","YES"]),
                   ("1\n-1000000000 -1000000000 1000000000 1000000000 -1000000000 1000000000 1000000000 -1000000000\n", ["YES"])], g_giaodoan, 300, None),
    ("dien_tich", [("4\n1 1\n4 2\n3 5\n0 4\n", ["20"])], g_dientich, 300, None),
    ("hang_rao", [("7\n0 0\n4 0\n2 1\n1 3\n4 4\n0 4\n2 2\n", ["4", "32"]), ("4\n0 0\n1 0\n2 0\n1 1\n", ["3", "2"])], g_hangrao, 300, None),
    ("vuoncay", [("4\n0 0\n6 0\n4 4\n0 3\n", ["13"])], g_vuoncay, 300, "VUONCAY"),
]

def _sub(s): return {s[i:j] for i in range(len(s)) for j in range(i+1, len(s)+1)}
def _rs(): return "".join(R.choice("ab" if R.random() < .6 else "abc") for _ in range(R.randint(1, 14)))

def g_lapdai():
    s = _rs(); best = "-1"
    for L in range(len(s) - 1, 0, -1):
        cnt = {}
        for i in range(len(s) - L + 1): cnt[s[i:i+L]] = cnt.get(s[i:i+L], 0) + 1
        c = sorted(x for x, v in cnt.items() if v >= 2)
        if c: best = c[0]; break
    return s + "\n", [best]

def g_xauthuk():
    s = _rs(); S = sorted(_sub(s)); k = R.randint(1, len(S))
    return f"{s}\n{k}\n", [S[k-1]]

def g_matkhau():
    s = _rs(); n = len(s); L = R.randint(1, n); Rr = R.randint(L, n)
    return f"{s}\n{L} {Rr}\n", [str(sum(1 for x in _sub(s) if L <= len(x) <= Rr))]

def g_xaucon():
    s = _rs(); return s + "\n", [str(len(_sub(s)))]

CASES += [
    ("xau_con", [("abaa\n", ["8"]), ("banana\n", ["15"])], g_xaucon, 300, None),
    ("lap_dai_nhat", [("cabababc\n", ["abab"]), ("abc\n", ["-1"])], g_lapdai, 300, None),
    ("xau_thu_k", [("babaacbaab\n10\n", ["aba"])], g_xauthuk, 300, None),
    ("matkhau", [("banana\n2 3\n", ["6"])], g_matkhau, 300, "MATKHAU"),
]

def g_nim():
    t = R.randint(1, 5); rows = [[t]]; ans = []
    for _ in range(t):
        a = arr(R.randint(1, 3), 0, 5)
        @lru_cache(None)
        def w(st): return any(not w(tuple(sorted(st[:i] + (st[i] - x,) + st[i+1:]))) for i in range(len(st)) for x in range(1, st[i] + 1))
        rows += [[len(a)], a]; ans.append("first" if w(tuple(sorted(a))) else "second")
    return fmt(*rows), ans

def g_cauthang():
    t = R.randint(1, 4); rows = [[t]]; ans = []
    for _ in range(t):
        p = arr(R.randint(1, 4), 0, 3)
        @lru_cache(None)
        def w(st): return any(not w(st[:k-1] + (st[k-1] + x, st[k] - x) + st[k+1:]) for k in range(1, len(st)) for x in range(1, st[k] + 1))
        rows += [[len(p)], p]; ans.append("first" if w(tuple(p)) else "second")
    return fmt(*rows), ans

def g_quanco():
    n = R.randint(1, 7); E = list({(a, b) for a, b in ((R.randint(1, n), R.randint(1, n)) for _ in range(R.randint(0, 12))) if a < b})
    perm = list(range(1, n + 1)); R.shuffle(perm); E = [(perm[a-1], perm[b-1]) for a, b in E]
    k = R.randint(1, 3); c = [R.randint(1, n) for _ in range(k)]
    ke = {u: [v for a, v in E if a == u] for u in range(1, n + 1)}
    @lru_cache(None)
    def w(st): return any(not w(tuple(sorted(st[:i] + (v,) + st[i+1:]))) for i in range(len(st)) for v in ke[st[i]])
    return fmt([n, len(E), k], *E, c), ["AN" if w(tuple(sorted(c))) else "BINH"]

def g_bocque_lon():
    n, k = R.randint(1, 60), R.randint(1, 5); p = R.sample(range(1, 12), k)
    @lru_cache(None)
    def w(i): return any(x <= i and not w(i - x) for x in p)
    return fmt([n, k], p), ["".join("W" if w(i) else "L" for i in range(1, n + 1))]

QC = "6 8 {}\n1 2\n1 3\n2 4\n3 4\n3 5\n4 6\n5 6\n2 6\n{}\n"
CASES += [
    ("boc_que", [("10 3\n1 3 4\n", ["WLWWWWLWLW"])], g_bocque_lon, 300, None),
    ("nim", [("3\n4\n5 7 2 5\n2\n4 1\n3\n3 5 6\n", ["first", "first", "second"])], g_nim, 300, None),
    ("cau_thang", [("3\n3\n0 2 1\n4\n1 1 1 1\n2\n5 3\n", ["first", "second", "first"])], g_cauthang, 300, None),
    ("quanco", [(QC.format(3, "2 4 5"), ["AN"]), (QC.format(2, "1 4"), ["BINH"])], g_quanco, 300, "QUANCO"),
]

def main():
    extract()
    fails = 0
    only = set(sys.argv[1:])           # python3 kiem_tra.py ten1 ten2: chỉ kiểm vài bài
    for stem, samples, gen, cnt, fio in CASES:
        if only and stem not in only:
            continue
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
