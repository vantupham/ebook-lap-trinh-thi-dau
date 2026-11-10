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
    ("noi_day", [("4\n4 3 2 6\n", ["29"]), ("4\n1 1 1 1\n", ["8"])], g_rope, 200, None),
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
        print(f"{'OK ' if not bad else 'SAI'} {stem:16} {'+'.join(langs):7} {len(tests)} test")
        fails += bad
    print("TỔNG SỐ LỖI:", fails)
    return fails

if __name__ == "__main__":
    sys.exit(1 if main() else 0)
