"""Kiểm chứng mọi đoạn code trong Tập 2.

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
                exe = os.path.join(tempfile.gettempdir(), "t2_" + stem)
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
from itertools import combinations
from collections import deque
R = random.Random(2026)
def arr(n, lo, hi): return [R.randint(lo, hi) for _ in range(n)]
def fmt(*rows): return "".join(" ".join(map(str, r)) + "\n" for r in rows)

def g_ngoac():
    s = "".join(R.choice("()[]{}") for _ in range(R.randint(1, 8))) if R.random() < .5 else (lambda h: h)("".join(R.choice(["()", "[]", "{}", "([])", "{()}"]) for _ in range(R.randint(1, 3))))
    t = s
    while any(p in t for p in ("()", "[]", "{}")):
        for p in ("()", "[]", "{}"): t = t.replace(p, "")
    return s + "\n", ["YES" if t == "" else "NO"]

def g_jos():
    n = R.randint(1, 12); a = list(range(1, n + 1)); out = []; i = 0
    while a:
        i = (i + 1) % len(a); out.append(a.pop(i))
        if a: i %= len(a)
    return f"{n}\n", list(map(str, out))

def g_play():
    a = arr(R.randint(1, 10), 1, 5); n = len(a)
    return fmt([n], a), [str(max(r - l + 1 for l in range(n) for r in range(l, n) if len(set(a[l:r+1])) == r - l + 1))]

def g_set():
    q = R.randint(1, 10); ops = []; s = set(); out = []
    for _ in range(q):
        op, x = R.choice("+-?"), R.randint(1, 6); ops.append([op, x])
        if op == '+': s.add(x)
        elif op == '-': s.discard(x)
        else: c = [v for v in s if v >= x]; out.append(str(min(c)) if c else "-1")
    return fmt([q], *ops), out

def rope(a):
    if len(a) <= 1: return 0
    best = None
    for i, j in combinations(range(len(a)), 2):
        b = [a[k] for k in range(len(a)) if k not in (i, j)] + [a[i] + a[j]]
        c = a[i] + a[j] + rope(b); best = c if best is None or c < best else best
    return best
def g_rope():
    a = arr(R.randint(1, 5), 1, 9); return fmt([len(a)], a), [str(rope(a))]

def g_xor():
    k = R.randint(0, 4); vals = arr(k + 1, -10**9, 10**9); a = vals[:k] * 2 + [vals[k]]; R.shuffle(a)
    return fmt([len(a)], a), [str(vals[k])]

def tau_ngam_brute(Rr, C, g, s):
    D = {'E': (0, 1), 'W': (0, -1), 'S': (1, 0), 'N': (-1, 0)}
    cur = {(i, j) for i in range(Rr) for j in range(C) if g[i][j] == '.'}
    for ch in s:
        nxt = set()
        for i, j in cur:
            for k in (D if ch == '?' else [ch]):
                ni, nj = i + D[k][0], j + D[k][1]
                if 0 <= ni < Rr and 0 <= nj < C and g[ni][nj] == '.': nxt.add((ni, nj))
        cur = nxt
    return len(cur)
def g_tre():
    Rr, C, M = R.randint(1, 6), R.randint(1, 6), R.randint(1, 6)
    g = ["".join(R.choice("...#") for _ in range(C)) for _ in range(Rr)]; s = "".join(R.choice("EWSN?") for _ in range(M))
    return fmt([Rr, C, M], *[[r] for r in g], [s]), [str(tau_ngam_brute(Rr, C, g, s))]

def g_win():
    n = R.randint(1, 10); k = R.randint(1, n); a = arr(n, -9, 9)
    return fmt([n, k], a), [str(min(a[i:i+k])) for i in range(n - k + 1)]

def g_rmq():
    n, q = R.randint(1, 10), R.randint(1, 6); a = arr(n, -9, 9); qs = [sorted((R.randint(1, n), R.randint(1, n))) for _ in range(q)]
    return fmt([n, q], a, *qs), [str(min(a[l-1:r])) for l, r in qs]

def bfs(Rr, C, g, srcs):
    d = {s: 0 for s in srcs}; q = deque(srcs)
    while q:
        i, j = q.popleft()
        for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ni, nj = i + di, j + dj
            if 0 <= ni < Rr and 0 <= nj < C and g[ni][nj] != '#' and (ni, nj) not in d: d[(ni, nj)] = d[(i, j)] + 1; q.append((ni, nj))
    return d
def g_maze():
    Rr, C = R.randint(2, 6), R.randint(2, 6); cells = [(i, j) for i in range(Rr) for j in range(C)]; a, b = R.sample(cells, 2)
    g = [[R.choice("..#") for _ in range(C)] for _ in range(Rr)]; g[a[0]][a[1]] = 'A'; g[b[0]][b[1]] = 'B'; g = ["".join(r) for r in g]
    d = bfs(Rr, C, g, [a]); return fmt([Rr, C], *[[r] for r in g]), [str(d.get(b, -1))]

def comps(n, edges):
    p = list(range(n + 1))
    def f(x):
        while p[x] != x: x = p[x]
        return x
    for u, v in edges: p[f(u)] = f(v)
    return p, f
def g_cc():
    n, m = R.randint(1, 8), R.randint(0, 8); e = [[R.randint(1, n), R.randint(1, n)] for _ in range(m)]
    p, f = comps(n, e); return fmt([n, m], *e), [str(len({f(i) for i in range(1, n + 1)}))]

def g_dsu():
    n, q = R.randint(1, 6), R.randint(1, 10); e = []; ops = []; out = []
    for _ in range(q):
        t = R.randint(1, 3); u, v = R.randint(1, n), R.randint(1, n)
        if t == 1: e.append((u, v)); ops.append([1, u, v])
        elif t == 2:
            p, f = comps(n, e); ops.append([2, u, v]); out.append("YES" if f(u) == f(v) else "NO")
        else:
            p, f = comps(n, e); ops.append([3, u]); out.append(str(sum(f(i) == f(u) for i in range(1, n + 1))))
    return fmt([n, q], *ops), out

def g_coin():
    n, x = R.randint(1, 4), R.randint(1, 30); c = sorted(set(arr(n, 1, 12))); dp = [0] + [None] * x
    for s in range(1, x + 1):
        opts = [dp[s - v] + 1 for v in c if v <= s and dp[s - v] is not None]; dp[s] = min(opts) if opts else None
    return fmt([len(c), x], c), [str(dp[x] if dp[x] is not None else -1)]

def g_book():
    n, x = R.randint(1, 7), R.randint(1, 20); h, s = arr(n, 1, 10), arr(n, 1, 20)
    best = max(sum(s[i] for i in range(n) if m >> i & 1) for m in range(1 << n) if sum(h[i] for i in range(n) if m >> i & 1) <= x)
    return fmt([n, x], h, s), [str(best)]

def g_lis():
    a = arr(R.randint(1, 10), 1, 6); n = len(a)
    best = max(len(sub) for m in range(1, 1 << n) for sub in [[a[i] for i in range(n) if m >> i & 1]] if all(sub[i] < sub[i+1] for i in range(len(sub) - 1)))
    return fmt([n], a), [str(best)]

from functools import lru_cache
def g_lcs():
    s = "".join(R.choice("ABC") for _ in range(R.randint(1, 8))); t = "".join(R.choice("ABC") for _ in range(R.randint(1, 8)))
    @lru_cache(None)
    def L(i, j):
        if i == len(s) or j == len(t): return 0
        return 1 + L(i + 1, j + 1) if s[i] == t[j] else max(L(i + 1, j), L(i, j + 1))
    return fmt([s], [t]), [str(L(0, 0))]

def g_tram():
    Rr, C = R.randint(1, 6), R.randint(1, 6); g = [[R.choice("...#") for _ in range(C)] for _ in range(Rr)]
    cells = [(i, j) for i in range(Rr) for j in range(C)]; picks = R.sample(cells, min(len(cells), 2))
    g[picks[0][0]][picks[0][1]] = 'T'
    if len(picks) > 1: g[picks[1][0]][picks[1][1]] = '.'
    g = ["".join(r) for r in g]; T = [c for c in cells if g[c[0]][c[1]] == 'T']; dots = [c for c in cells if g[c[0]][c[1]] == '.']
    if not dots: return g_tram()
    best = 0
    for c in dots:
        d = bfs(Rr, C, g, [c]); ds = [d[t] for t in T if t in d]
        if not ds: return fmt([Rr, C], *[[r] for r in g]), ["-1"]
        best = max(best, min(ds))
    return fmt([Rr, C], *[[r] for r in g]), [str(best)]

def g_qua():
    n = R.randint(1, 6)
    if R.random() < .5: x = R.randint(1, 30); c = arr(n, 1, 12); v = arr(n, 1, 10**9)
    else: x = R.randint(10**5 + 1, 10**9); c = arr(n, 1, 10**9); v = arr(n, 1, 1000)
    best = max(sum(v[i] for i in range(n) if m >> i & 1) for m in range(1 << n) if sum(c[i] for i in range(n) if m >> i & 1) <= x)
    return fmt([n, x], *[[c[i], v[i]] for i in range(n)]), [str(best)]

def g_ket():
    n, m = R.randint(1, 7), R.randint(1, 8); e = [[R.randint(1, n), R.randint(1, n)] for _ in range(m)]; out = []
    for k in range(1, m + 1):
        p, f = comps(n, e[:k]); out.append(str(sum(1 for u in range(1, n + 1) for v in range(u + 1, n + 1) if f(u) == f(v))))
    return fmt([n, m], *e), out

CASES = [
    ("ngoac", [("([]{()})\n", ["YES"]), ("([)]\n", ["NO"]), ("((\n", ["NO"])], g_ngoac, 300, None),
    ("josephus", [("7\n", "2 4 6 1 5 3 7".split())], g_jos, 50, None),
    ("danh_sach_phat", [("8\n1 2 1 3 2 7 4 2\n", ["5"])], g_play, 300, None),
    ("tap_hop", [("6\n+ 5\n+ 2\n? 3\n- 5\n? 3\n? 1\n", ["5", "-1", "2"])], g_set, 300, None),
    ("so_le_loi", [("5\n7 3 7 9 3\n", ["9"])], g_xor, 200, None),
    ("tau_ngam_bitset", [("3 4 2\n....\n.#..\n....\nES\n", ["3"])], g_tre, 400, None),
    ("min_cua_so", [("8 3\n1 3 -1 -3 5 3 6 7\n", "-1 -3 -3 -3 3 3".split())], g_win, 300, None),
    ("rmq", [("8 4\n3 2 4 5 1 1 5 3\n2 4\n5 6\n1 8\n3 3\n", ["2", "1", "1", "4"])], g_rmq, 300, None),
    ("me_cung", [("5 8\n########\n#.A#...#\n#.##.#B#\n#......#\n########\n", ["9"])], g_maze, 300, None),
    ("dem_tplt", [("5 3\n1 2\n2 3\n4 5\n", ["2"])], g_cc, 300, None),
    ("nhom_ban", [("5 6\n1 1 2\n2 1 3\n1 2 3\n2 1 3\n3 3\n3 5\n", ["NO", "YES", "3", "1"])], g_dsu, 300, None),
    ("doi_tien", [("3 6\n1 3 4\n", ["2"])], g_coin, 300, None),
    ("hieu_sach", [("4 10\n4 8 5 3\n5 12 8 1\n", ["13"])], g_book, 300, None),
    ("lis", [("8\n7 3 5 3 6 2 9 8\n", ["4"]), ("3\n2 2 2\n", ["1"])], g_lis, 300, None),
    ("lcs", [("SAIGON\nSANGO\n", ["4"])], g_lcs, 300, None),
    ("tramxe", [("3 4\nT..#\n..#.\n#...\n", ["6"])], g_tram, 300, "TRAMXE"),
    ("muaqua", [("3 8\n4 5\n3 4\n5 6\n", ["10"])], g_qua, 300, "MUAQUA"),
    ("ketnoi", [("4 3\n1 2\n3 4\n2 3\n", ["1", "2", "6"])], g_ket, 300, "KETNOI"),
]


# ---------- bổ sung khi nâng cấp Tập 2 ----------
def g_dosau():
    s = ""
    def go(d):
        nonlocal s
        for _ in range(R.randint(1, 3)):
            if len(s) > 30: return
            s += "("
            if d < 5 and R.random() < .6: go(d + 1)
            s += ")"
    go(0); d = b = 0
    for c in s:
        d += 1 if c == "(" else -1; b = max(b, d)
    return s + "\n", [str(b)]

def g_hauto():
    def build(k):
        if k == 0 or R.random() < .3:
            v = R.randint(0, 20); return str(v), [str(v)]
        op = R.choice("+-*"); a, ta = build(k - 1); b, tb = build(k - 1)
        return f"({a}{op}{b})", ta + tb + [op]
    e, toks = build(R.randint(1, 4))
    return " ".join(toks) + "\n", [str(eval(e))]

def g_toa():
    n = R.randint(1, 7); p = list(range(1, n + 1)); R.shuffle(p)
    seen = set()
    def dfs(ke, st, k):
        if k == n: return True
        key = (ke, st, k)
        if key in seen: return False
        seen.add(key)
        if st and st[-1] == p[k] and dfs(ke, st[:-1], k + 1): return True
        return ke <= n and dfs(ke + 1, st + (ke,), k)
    return fmt([n], p), ["YES" if dfs(1, (), 0) else "NO"]

CASES += [
    ("do_sau", [("(()(()))\n", ["3"])], g_dosau, 200, None),
    ("hau_to", [("3 4 + 2 *\n", ["14"]), ("5 1 2 + 4 * + 3 -\n", ["14"])], g_hauto, 200, None),
    ("toatau", [("5\n3 2 5 4 1\n", ["YES"]), ("3\n3 1 2\n", ["NO"])], g_toa, 300, "TOATAU"),
]


def g_capbang():
    a = arr(R.randint(1, 12), -3, 3); n = len(a)
    return fmt([n], a), [str(sum(a[i] == a[j] for i in range(n) for j in range(i + 1, n)))]

def g_ve():
    n, m = R.randint(1, 8), R.randint(1, 8); h, t = arr(n, 1, 10), arr(m, 1, 12); h2 = h[:]; out = []
    for x in t:
        c = [v for v in h2 if v <= x]
        if c: v = max(c); h2.remove(v); out.append(str(v))
        else: out.append("-1")
    return fmt([n, m], h, t), out

def g_giuxe():
    n, q = R.randint(1, 8), R.randint(1, 12); co = [False] * (n + 1); ops = []; out = []
    for _ in range(q):
        occ = [i for i in range(1, n + 1) if co[i]]
        if occ and R.random() < .35:
            p = R.choice(occ); co[p] = False; ops.append([2, p])
        else:
            s = R.randint(1, n); ops.append([1, s]); f = next((i for i in range(s, n + 1) if not co[i]), -1)
            if f > 0: co[f] = True
            out.append(str(f))
    return fmt([n, q], *ops), out

CASES += [
    ("cap_bang", [("6\n4 -1 4 4 7 -1\n", ["4"])], g_capbang, 200, None),
    ("ve_ca_nhac", [("5 3\n5 3 7 8 5\n4 8 3\n", ["3", "8", "-1"])], g_ve, 300, None),
    ("giuxe", [("5 7\n1 2\n1 2\n1 5\n1 4\n2 3\n1 2\n1 5\n", "2 3 5 4 3 -1".split())], g_giuxe, 300, "GIUXE"),
]

def g_thuk():
    n, k = R.randint(1, 10), R.randint(1, 4); a = arr(n, 1, 20); out = []
    for i in range(n):
        b = sorted(a[:i + 1], reverse=True); out.append(str(b[k - 1]) if len(b) >= k else "-1")
    return fmt([n, k], a), out

def g_phong():
    n = R.randint(1, 8); m = []
    for _ in range(n):
        s = R.randint(0, 10); m.append([s, s + R.randint(1, 5)])
    best = max(sum(1 for s, e in m if s <= t < e) for t in range(0, 20))
    return fmt([n], *m), [str(best)]

def g_viec():
    n = R.randint(1, 9); v = [[R.randint(1, 5), R.randint(1, 50)] for _ in range(n)]; best = 0
    for msk in range(1 << n):
        ch = sorted(v[i][0] for i in range(n) if msk >> i & 1)
        if all(d >= j + 1 for j, d in enumerate(ch)): best = max(best, sum(v[i][1] for i in range(n) if msk >> i & 1))
    return fmt([n], *v), [str(best)]

CASES += [
    ("noi_day", [("4\n4 3 2 6\n", ["29"])], g_rope, 200, None),
    ("diem_thu_k", [("6 3\n5 9 2 7 8 1\n", "-1 -1 2 5 7 7".split())], g_thuk, 200, None),
    ("phong_hop", [("4\n1 4\n2 5\n4 7\n5 6\n", ["2"])], g_phong, 300, None),
    ("vieclam", [("5\n2 50\n1 30\n2 40\n3 10\n1 60\n", ["120"])], g_viec, 300, "VIECLAM"),
]

def g_tapcon():
    n = R.randint(1, 8); a = arr(n, 1, 15); S = R.randint(1, 40)
    ok = any(sum(a[i] for i in range(n) if m >> i & 1) == S for m in range(1 << n))
    return fmt([n, S], a), ["YES" if ok else "NO"]

def g_haile():
    k = R.randint(0, 4); vals = R.sample(range(0, 10**18, 7**15), k + 2); p, q = vals[0], vals[1]
    a = [p, q] + vals[2:] * 2; R.shuffle(a)
    return fmt([len(a)], a), [str(min(p, q)), str(max(p, q))]

def g_sothich():
    n, m = R.randint(2, 7), R.randint(1, 6); s = ["".join(R.choice("0001") for _ in range(m)) for _ in range(n)]
    c = sum(any(s[i][k] == s[j][k] == "1" for k in range(m)) for i in range(n) for j in range(i + 1, n))
    return fmt([n, m], *[[x] for x in s]), [str(c)]

CASES += [
    ("tong_tap_con", [("4 9\n2 4 5 8\n", ["YES"]), ("3 4\n3 3 5\n", ["NO"])], g_tapcon, 200, None),
    ("hai_so_le", [("6\n4 1 2 1 2 6\n", ["4", "6"])], g_haile, 200, None),
    ("sothich", [("4 5\n10010\n01100\n00011\n01001\n", ["3"])], g_sothich, 300, "SOTHICH"),
]

def g_maxwin():
    n = R.randint(1, 10); k = R.randint(1, n); a = arr(n, -9, 9)
    return fmt([n, k], a), [str(max(a[i:i + k])) for i in range(n - k + 1)]

def g_ondinh():
    n = R.randint(1, 10); k = R.randint(0, 4); a = arr(n, 1, 8)
    return fmt([n, k], a), [str(max(r - l + 1 for l in range(n) for r in range(l, n) if max(a[l:r + 1]) - min(a[l:r + 1]) <= k))]

def g_kyhan():
    n = R.randint(1, 10); A = R.randint(1, n); B = R.randint(A, n); a = arr(n, -9, 9)
    return fmt([n, A, B], a), [str(max(sum(a[l:r + 1]) for l in range(n) for r in range(l, n) if A <= r - l + 1 <= B))]

CASES += [
    ("max_cua_so", [("8 3\n4 2 12 3 5 1 6 7\n", "12 12 12 5 6 7".split())], g_maxwin, 200, None),
    ("doan_on_dinh", [("8 2\n5 3 4 6 9 8 7 10\n", ["3"])], g_ondinh, 300, None),
    ("kyhan", [("8 2 4\n4 -6 3 -1 5 -9 2 7\n", ["9"])], g_kyhan, 300, "KYHAN"),
]

def rand_graph(nlo=2, nhi=8):
    n = R.randint(nlo, nhi); m = R.randint(0, 2 * n); e = []
    for _ in range(m):
        u, v = R.randint(1, n), R.randint(1, n)
        if u != v: e.append([u, v])
    return n, e

def bfs_dist(n, e, s):
    adj = [[] for _ in range(n + 1)]
    for u, v in e: adj[u].append(v); adj[v].append(u)
    d = [-1] * (n + 1); d[s] = 0; q = deque([s])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if d[v] < 0: d[v] = d[u] + 1; q.append(v)
    return d

def g_truyen():
    n, e = rand_graph()
    return fmt([n, len(e)], *e), [str(bfs_dist(n, e, 1)[n])]

def g_haidoi():
    n, e = rand_graph(1, 7)
    ok = any(all((m >> (u - 1) & 1) != (m >> (v - 1) & 1) for u, v in e) for m in range(1 << n))
    return fmt([n, len(e)], *e), ["YES" if ok else "NO"]

def g_lantin():
    Rr, C = R.randint(1, 6), R.randint(1, 6); g = [[R.choice("..#*.") for _ in range(C)] for _ in range(Rr)]
    if not any("*" in r for r in g): g[R.randrange(Rr)][R.randrange(C)] = "*"
    cells = [(i, j) for i in range(Rr) for j in range(C)]
    best = 0
    for i, j in cells:
        if g[i][j] != ".": continue
        # khoảng cách tới * gần nhất bằng BFS ngược từ ô này
        d = {(i, j): 0}; q = deque([(i, j)]); f = -1
        while q:
            x, y = q.popleft()
            if g[x][y] == "*": f = d[(x, y)]; break
            for a, b in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                u, v = x + a, y + b
                if 0 <= u < Rr and 0 <= v < C and g[u][v] != "#" and (u, v) not in d: d[(u, v)] = d[(x, y)] + 1; q.append((u, v))
        if f < 0: best = -1; break
        best = max(best, f)
    return fmt([Rr, C], *[["".join(r)] for r in g]), [str(best)]

CASES += [
    ("truyen_tin", [("5 5\n1 2\n1 3\n1 4\n2 3\n5 4\n", ["2"])], g_truyen, 300, None),
    ("hai_doi", [("5 3\n1 2\n1 3\n4 5\n", ["YES"]), ("3 3\n1 2\n2 3\n3 1\n", ["NO"])], g_haidoi, 300, None),
    ("lantin", [("4 5\n*...#\n.##..\n....#\n#..*.\n", ["3"])], g_lantin, 300, "LANTIN"),
]

def g_duoivong():
    n = R.randint(1, 9); s = R.randint(1, n); nx = [0] + [R.randint(1, n) for _ in range(n)]
    seq = [s]
    while seq[-1] not in seq[:-1]: seq.append(nx[seq[-1]])
    b = seq.index(seq[-1]); t = len(seq) - 1
    return fmt([n, s], nx[1:]), [str(b), str(t - b)]

def comps_count(n, e):
    p = list(range(n + 1))
    def f(x):
        while p[x] != x: x = p[x]
        return x
    for u, v in e: p[f(u)] = f(v)
    roots = [f(i) for i in range(1, n + 1)]
    return len(set(roots)), max(roots.count(r) for r in set(roots))

def g_xayduong():
    n = R.randint(1, 8); m = R.randint(1, 8); e = [[R.randint(1, n), R.randint(1, n)] for _ in range(m)]; out = []
    for i in range(m):
        a, b = comps_count(n, e[:i + 1]); out += [str(a), str(b)]
    return fmt([n, m], *e), out

def g_daythua():
    n = R.randint(2, 8); m = R.randint(1, 9); e = [[R.randint(1, n), R.randint(1, n)] for _ in range(m)]; ans = 0
    for i in range(m):
        u, v = e[i]
        if u == v or bfs_dist(n, e[:i], u)[v] >= 0: ans = i + 1; break
    return fmt([n, m], *e), [str(ans)]

def g_chuyenthu():
    n = R.randint(1, 9); p = [R.randint(1, n) for _ in range(n)]; out = []
    for i in range(1, n + 1):
        seen = set(); x = i
        while x not in seen: seen.add(x); x = p[x - 1]
        out.append(str(len(seen)))
    return fmt([n], p), out

CASES += [
    ("duoi_vong", [("6 1\n2 3 4 5 3 1\n", ["2", "3"]), ("3 1\n2 3 1\n", ["0", "3"])], g_duoivong, 300, None),
    ("xay_duong", [("5 3\n1 2\n1 3\n4 5\n", "4 2 3 3 2 3".split())], g_xayduong, 300, None),
    ("day_thua", [("4 5\n1 2\n3 4\n2 3\n4 1\n1 3\n", ["4"])], g_daythua, 300, None),
    ("chuyenthu", [("5\n2 3 1 3 4\n", "3 3 3 4 5".split())], g_chuyenthu, 300, "CHUYENTHU"),
]

def g_xucxac():
    n = R.randint(1, 30); dp = [1] + [0] * n
    for s in range(1, n + 1): dp[s] = sum(dp[s - k] for k in range(1, 7) if k <= s) % (10**9 + 7)
    return f"{n}\n", [str(dp[n])]

def g_luoi():
    n = R.randint(1, 6); g = ["".join(R.choice("...*") for _ in range(n)) for _ in range(n)]
    from functools import lru_cache
    @lru_cache(None)
    def f(i, j):
        if i >= n or j >= n or g[i][j] == "*": return 0
        if i == n - 1 and j == n - 1: return 1
        return f(i + 1, j) + f(i, j + 1)
    return fmt([n], *[[r] for r in g]), [str(f(0, 0))]

def g_ech():
    n = R.randint(2, 9); K = R.randint(1, 4); h = arr(n, 1, 20); best = None
    def go(i, c):
        nonlocal best
        if i == n - 1: best = c if best is None else min(best, c); return
        for j in range(i + 1, min(n, i + K + 1)): go(j, c + abs(h[i] - h[j]))
    go(0, 0)
    return fmt([n, K], h), [str(best)]

CASES += [
    ("xuc_xac", [("3\n", ["4"])], g_xucxac, 100, None),
    ("duong_luoi", [("4\n....\n.*..\n...*\n*...\n", ["3"])], g_luoi, 300, None),
    ("echnhay", [("6 3\n3 8 2 6 1 5\n", ["4"])], g_ech, 300, "ECHNHAY"),
]

def g_suaxau():
    s = "".join(R.choice("AB") for _ in range(R.randint(0, 6))) or "A"; u = "".join(R.choice("AB") for _ in range(R.randint(1, 6)))
    from functools import lru_cache
    @lru_cache(None)
    def E(i, j):
        if i == 0: return j
        if j == 0: return i
        return E(i - 1, j - 1) if s[i - 1] == u[j - 1] else 1 + min(E(i - 1, j), E(i, j - 1), E(i - 1, j - 1))
    return fmt([s], [u]), [str(E(len(s), len(u)))]

def g_xephop():
    n = R.randint(1, 8); b = [(R.randint(1, 6), R.randint(1, 6)) for _ in range(n)]
    from functools import lru_cache
    @lru_cache(None)
    def f(i): return 1 + max([f(j) for j in range(n) if b[j][0] < b[i][0] and b[j][1] < b[i][1]] + [0])
    return fmt([n], *b), [str(max(f(i) for i in range(n)))]

CASES += [
    ("lis_cham", [("8\n7 3 5 3 6 2 9 8\n", ["4"])], g_lis, 300, None),
    ("sua_xau", [("LOVE\nMOVIE\n", ["2"])], g_suaxau, 300, None),
    ("xephop", [("6\n2 3\n5 4\n6 7\n6 4\n1 1\n3 6\n", ["4"])], g_xephop, 300, "XEPHOP"),
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
        tests = list(samples) + ([gen() for _ in range(cnt)] if gen else [])
        bad = 0
        for inp, exp in tests:
            for lang in langs:
                got = run(stem, lang, inp, fio)
                if got != exp:
                    bad += 1
                    if bad <= 2: print(f"  SAI {stem}.{lang}: vào {inp!r} mong {exp} được {got}")
        print(f"{'OK ' if not bad else 'SAI'} {stem:16} {'+'.join(langs):7} {len(tests)} test")
        fails += bad
    print("TỔNG SỐ LỖI:", fails)
    return fails

if __name__ == "__main__":
    sys.exit(1 if main() else 0)
