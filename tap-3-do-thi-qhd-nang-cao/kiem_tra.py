"""Kiểm chứng mọi đoạn code trong Tập 3.

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
                exe = os.path.join(tempfile.gettempdir(), "t3_" + stem)
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
from itertools import combinations, permutations
from math import comb
R = random.Random(2026)
INF = float('inf')
def arr(n, lo, hi): return [R.randint(lo, hi) for _ in range(n)]
def fmt(*rows): return "".join(" ".join(map(str, r)) + "\n" for r in rows)
def floyd(n, edges, directed):
    d = [[INF] * (n + 1) for _ in range(n + 1)]
    for i in range(n + 1): d[i][i] = 0
    for u, v, w in edges:
        d[u][v] = min(d[u][v], w)
        if not directed: d[v][u] = min(d[v][u], w)
    for k in range(1, n + 1):
        for i in range(1, n + 1):
            for j in range(1, n + 1): d[i][j] = min(d[i][j], d[i][k] + d[k][j])
    return d

def g_dij():
    n, m = R.randint(1, 6), R.randint(0, 10); e = [[R.randint(1, n), R.randint(1, n), R.randint(1, 9)] for _ in range(m)]
    d = floyd(n, e, True); return fmt([n, m], *e), [str(d[1][i] if d[1][i] < INF else -1) for i in range(1, n + 1)]
def g_floyd():
    n, m, q = R.randint(1, 6), R.randint(0, 8), R.randint(1, 5); e = [[R.randint(1, n), R.randint(1, n), R.randint(1, 9)] for _ in range(m)]
    qs = [[R.randint(1, n), R.randint(1, n)] for _ in range(q)]; d = floyd(n, e, False)
    return fmt([n, m, q], *e, *qs), [str(d[a][b] if d[a][b] < INF else -1) for a, b in qs]
def connected(n, es):
    p = list(range(n + 1))
    def f(x):
        while p[x] != x: x = p[x]
        return x
    for u, v, _ in es: p[f(u)] = f(v)
    return len({f(i) for i in range(1, n + 1)}) == 1
def g_kru():
    n, m = R.randint(1, 5), R.randint(0, 7); e = [[R.randint(1, n), R.randint(1, n), R.randint(1, 9)] for _ in range(m)]
    best = None
    for k in range(m + 1):
        for sub in combinations(e, k):
            if connected(n, sub): c = sum(x[2] for x in sub); best = c if best is None or c < best else best
    return fmt([n, m], *[[u, v, w] for u, v, w in e]), [str(best) if best is not None else "IMPOSSIBLE"]
def g_topo():
    n, m = R.randint(1, 6), R.randint(0, 6); e = [[R.randint(1, n), R.randint(1, n)] for _ in range(m)]
    for p in permutations(range(1, n + 1)):
        pos = {v: i for i, v in enumerate(p)}
        if all(pos[a] < pos[b] for a, b in e): return fmt([n, m], *e), list(map(str, p))
    return fmt([n, m], *e), ["IMPOSSIBLE"]
def g_lca():
    n, q = R.randint(1, 9), R.randint(1, 6); lab = [1] + R.sample(range(2, n + 1), n - 1); par = {}
    for i in range(1, n): par[lab[i]] = lab[R.randint(0, i - 1)]
    def anc(v):
        a = [v]
        while v != 1: v = par[v]; a.append(v)
        return a
    qs = [[R.randint(1, n), R.randint(1, n)] for _ in range(q)]; out = []
    for a, b in qs:
        A = anc(a); out.append(str(next(x for x in anc(b) if x in A)))
    return fmt([n, q], [par[v] for v in range(2, n + 1)], *qs), out
def g_fen():
    n, q = R.randint(1, 8), R.randint(1, 8); a = arr(n, 1, 9); b = a[:]; ops = []; out = []
    for _ in range(q):
        if R.random() < .5: k, u = R.randint(1, n), R.randint(1, 9); b[k-1] = u; ops.append([1, k, u])
        else: l, r = sorted((R.randint(1, n), R.randint(1, n))); ops.append([2, l, r]); out.append(str(sum(b[l-1:r])))
    return fmt([n, q], a, *ops), out
def g_inv():
    a = arr(R.randint(1, 9), 1, 5); n = len(a)
    return fmt([n], a), [str(sum(1 for i in range(n) for j in range(i + 1, n) if a[i] > a[j]))]
def g_seg():
    n, q = R.randint(1, 8), R.randint(1, 8); a = arr(n, 1, 9); b = a[:]; ops = []; out = []
    for _ in range(q):
        if R.random() < .5: k, u = R.randint(1, n), R.randint(1, 9); b[k-1] = u; ops.append([1, k, u])
        else: l, r = sorted((R.randint(1, n), R.randint(1, n))); ops.append([2, l, r]); out.append(str(min(b[l-1:r])))
    return fmt([n, q], a, *ops), out
def g_comb():
    q = R.randint(1, 6); qs = []
    for _ in range(q): a = R.randint(0, 1000000); qs.append([a, R.randint(0, a)])
    return fmt([q], *qs), [str(comb(a, b) % 1000000007) for a, b in qs]
def g_lift():
    n, x = R.randint(1, 7), R.randint(5, 15); w = arr(n, 1, 5); best = n
    def go(i, groups):
        nonlocal best
        if len(groups) >= best: return
        if i == n: best = len(groups); return
        for g in groups:
            if g[0] + w[i] <= x: g[0] += w[i]; go(i + 1, groups); g[0] -= w[i]
        groups.append([w[i]]); go(i + 1, groups); groups.pop()
    go(0, []); return fmt([n, x], w), [str(best)]
def g_match():
    n = R.randint(1, 8); e = [[R.randint(1, i - 1), i] for i in range(2, n + 1)]; best = 0
    for k in range(len(e) + 1):
        for sub in combinations(e, k):
            vs = [v for p in sub for v in p]
            if len(vs) == len(set(vs)): best = max(best, k)
    return fmt([n], *e), [str(best)]
def nice(x):
    s = str(x); return all(s[i] != s[i+1] for i in range(len(s) - 1))
def g_dep():
    a = R.randint(0, 3000); b = R.randint(a, a + 3000); return fmt([a, b]), [str(sum(nice(x) for x in range(a, b + 1)))]
def g_kmp():
    t = "".join(R.choice("ab") for _ in range(R.randint(1, 12))); p = "".join(R.choice("ab") for _ in range(R.randint(1, 3)))
    return fmt([t], [p]), [str(sum(t[i:i+len(p)] == p for i in range(len(t) - len(p) + 1)))]
def g_hash():
    s = "".join(R.choice("ab") for _ in range(R.randint(1, 10))); n = len(s); q = R.randint(1, 6); qs = []; out = []
    for _ in range(q):
        a, b = sorted((R.randint(1, n), R.randint(1, n))); c, d = sorted((R.randint(1, n), R.randint(1, n)))
        if R.random() < .5: L = b - a; c = R.randint(1, n - L); d = c + L
        qs.append([a, b, c, d]); out.append("YES" if s[a-1:b] == s[c-1:d] else "NO")
    return fmt([s], [q], *qs), out
def g_gh():
    n, m = R.randint(2, 6), R.randint(0, 9); s = R.randint(1, n); kho = R.sample(range(1, n + 1), s)
    e = [[R.randint(1, n), R.randint(1, n), R.randint(1, 9)] for _ in range(m)]; d = floyd(n, e, False)
    best = min(d[1][w] + d[w][n] for w in kho); return fmt([n, m, s], kho, *e), [str(best if best < INF else -1)]
def g_cl():
    n, q = R.randint(1, 8), R.randint(1, 8); a = arr(n, 1, 9); b = a[:]; ops = []; out = []
    for _ in range(q):
        if R.random() < .5: k, u = R.randint(1, n), R.randint(1, 9); b[k-1] = u; ops.append([1, k, u])
        else: l, r = sorted((R.randint(1, n), R.randint(1, n))); ops.append([2, l, r]); out.append(str(max(b[l-1:r]) - min(b[l-1:r])))
    return fmt([n, q], a, *ops), out
def g_ch():
    a = R.randint(1, 3000); b = R.randint(a, a + 3000); k = R.randint(1, 30)
    return fmt([a, b, k]), [str(sum(sum(map(int, str(x))) % k == 0 for x in range(a, b + 1)))]

CASES = [
    ("dijkstra", [("3 4\n1 2 6\n1 3 2\n3 2 3\n1 3 4\n", ["0", "5", "2"])], g_dij, 300, None),
    ("floyd", [("4 3 5\n1 2 5\n1 3 9\n2 3 3\n1 2\n2 1\n1 3\n1 4\n3 2\n", ["5", "5", "8", "-1", "3"])], g_floyd, 300, None),
    ("kruskal", [("5 6\n1 2 3\n2 3 5\n2 4 2\n3 4 8\n5 1 7\n5 4 4\n", ["14"])], g_kru, 300, None),
    ("topo", [("5 3\n1 2\n3 1\n4 5\n", "3 1 2 4 5".split())], g_topo, 300, None),
    ("lca", [("5 3\n1 1 3 3\n4 5\n2 5\n1 4\n", ["3", "1", "1"])], g_lca, 300, None),
    ("fenwick", [("8 4\n3 2 4 5 1 1 5 3\n2 1 4\n1 4 9\n2 1 4\n2 3 5\n", ["14", "18", "14"])], g_fen, 300, None),
    ("nghich_the", [("5\n3 1 4 1 2\n", ["5"])], g_inv, 300, None),
    ("cay_phan_doan", [("8 4\n3 2 4 5 1 1 5 3\n2 1 4\n2 5 6\n1 2 3\n2 1 4\n", ["2", "1", "3"])], g_seg, 300, None),
    ("to_hop", [("3\n5 3\n2 1\n10 7\n", ["10", "2", "120"])], g_comb, 20, None),
    ("thang_may", [("4 10\n4 8 6 1\n", ["2"])], g_lift, 300, None),
    ("ghep_cap", [("5\n1 2\n1 3\n3 4\n3 5\n", ["2"])], g_match, 300, None),
    ("so_dep", [("123 321\n", ["171"]), ("0 21\n", ["21"])], g_dep, 100, None),
    ("kmp", [("saippuakauppias\npp\n", ["2"])], g_kmp, 300, None),
    ("bam_xau", [("abcabcab\n3\n1 3 4 6\n1 2 7 8\n2 4 3 5\n", ["YES", "YES", "NO"])], g_hash, 300, None),
    ("giaohang", [("5 5 1\n2\n1 2 2\n2 5 2\n1 3 1\n3 4 1\n4 5 1\n", ["4"])], g_gh, 300, "GIAOHANG"),
    ("chenhlech", [("5 4\n3 1 4 1 5\n2 1 3\n1 2 9\n2 1 3\n2 4 5\n", ["3", "6", "4"])], g_cl, 300, "CHENHLECH"),
    ("chiahet", [("1 20 3\n", ["6"]), ("1 1000000000000000000 1\n", ["1000000000000000000"])], g_ch, 100, "CHIAHET"),
]


# ---------- bổ sung khi nâng cấp Tập 3 ----------

def dij_py(n, e, s, directed=True):
    import heapq
    adj = [[] for _ in range(n + 1)]
    for a, b, c in e:
        adj[a].append((b, c))
        if not directed: adj[b].append((a, c))
    d = [INF] * (n + 1); d[s] = 0; pq = [(0, s)]
    while pq:
        du, u = heapq.heappop(pq)
        if du > d[u]: continue
        for v, w in adj[u]:
            if du + w < d[v]: d[v] = du + w; heapq.heappush(pq, (d[v], v))
    return d

def g_demduong():
    n = R.randint(2, 7); e = [[R.randint(1, n), R.randint(1, n), R.randint(1, 3)] for _ in range(R.randint(1, 14))]
    e.append([1, n, R.randint(3, 9)])
    d = floyd(n, e, True); best = d[1][n]
    cnt = 0
    def go(u, c):
        nonlocal cnt
        if c > best: return
        if u == n and c == best: cnt += 1
        for a, b, w in e:
            if a == u: go(b, c + w)
    go(1, 0)
    return fmt([n, len(e)], *e), [str(best), str(cnt % (10**9 + 7))]

def g_giamgia():
    n = R.randint(2, 6); e = [[R.randint(1, n), R.randint(1, n), R.randint(1, 20)] for _ in range(R.randint(1, 10))]
    e.append([1, n, R.randint(10, 40)])
    d1 = floyd(n, e, True); best = d1[1][n]
    for a, b, c in e: best = min(best, d1[1][a] + c // 2 + d1[b][n])
    return fmt([n, len(e)], *e), [str(best)]

def g_hengap():
    n = R.randint(2, 7); e = [[R.randint(1, n), R.randint(1, n), R.randint(1, 9)] for _ in range(R.randint(0, 9))]
    d = floyd(n, e, False); b = min(max(d[1][v], d[n][v]) for v in range(1, n + 1))
    return fmt([n, len(e)], *e), [str(b if b < INF else -1)]

CASES += [
    ("dem_duong", [("4 5\n1 2 1\n1 3 2\n2 4 2\n3 4 1\n2 3 1\n", ["3", "3"])], g_demduong, 300, None),
    ("giam_gia", [("3 4\n1 2 3\n2 3 1\n1 3 7\n2 1 5\n", ["2"])], g_giamgia, 300, None),
    ("hengap", [("5 5\n1 2 4\n2 5 4\n1 3 1\n3 4 2\n4 5 6\n", ["4"])], g_hengap, 300, "HENGAP"),
]

def rand_dag(nlo=2, nhi=7):
    n = R.randint(nlo, nhi); p = list(range(1, n + 1)); R.shuffle(p); e = set()
    for _ in range(R.randint(0, 2 * n)):
        x, y = sorted(R.sample(range(n), 2)) if n > 1 else (0, 0)
        if x != y: e.add((p[x], p[y]))
    return n, [list(x) for x in e]

def g_demlotrinh():
    n, e = rand_dag()
    cnt = 0
    def go(u):
        nonlocal cnt
        if u == n: cnt += 1
        for a, b in e:
            if a == u: go(b)
    go(1)
    return fmt([n, len(e)], *e), [str(cnt % (10**9 + 7))]

def g_bayxa():
    n, e = rand_dag()
    best = -1
    def go(u, k):
        nonlocal best
        if u == n: best = max(best, k)
        for a, b in e:
            if a == u: go(b, k + 1)
    go(1, 1)
    return fmt([n, len(e)], *e), [str(best) if best > 0 else "IMPOSSIBLE"]

def g_thicong():
    if R.random() < .25:
        n = R.randint(2, 6); e = [[R.randint(1, n), R.randint(1, n)] for _ in range(R.randint(1, 8))]
    else:
        n, e = rand_dag(1, 7)
    t = arr(n, 1, 9)
    # Bellman-Ford kiểu dài nhất
    xong = t[:]; cyc = False
    for it in range(n + 1):
        ch = False
        for a, b in e:
            if xong[a - 1] + t[b - 1] > xong[b - 1]: xong[b - 1] = xong[a - 1] + t[b - 1]; ch = True
        if it == n and ch: cyc = True
        if not ch: break
    return fmt([n, len(e)], t, *e), [str(-1 if cyc else max(xong))]

CASES += [
    ("kruskal", [("4 2\n1 2 1\n3 4 1\n", ["IMPOSSIBLE"])], None, 0, None),
    ("dem_lo_trinh", [("4 5\n1 2\n2 4\n1 3\n3 4\n1 4\n", ["3"])], g_demlotrinh, 300, None),
    ("bay_xa", [("5 5\n1 2\n2 5\n1 3\n3 4\n4 5\n", ["4"])], g_bayxa, 300, None),
    ("thicong", [("5 4\n3 2 4 1 2\n1 3\n2 3\n3 5\n4 5\n", ["9"])], g_thicong, 300, "THICONG"),
]

def rand_tree(n):
    return [[R.randint(1, v - 1), v] for v in range(2, n + 1)]

def tree_dist(n, e, s):
    adj = [[] for _ in range(n + 1)]
    for a, b in e: adj[a].append(b); adj[b].append(a)
    d = [-1] * (n + 1); d[s] = 0; q = deque([s])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if d[v] < 0: d[v] = d[u] + 1; q.append(v)
    return d

def shuffle_tree(n, e):
    perm = list(range(1, n + 1)); R.shuffle(perm); perm = [0] + perm
    e2 = [[perm[a], perm[b]] if R.random() < .5 else [perm[b], perm[a]] for a, b in e]; R.shuffle(e2); return e2

def g_duongkinh():
    n = R.randint(1, 9); e = shuffle_tree(n, rand_tree(n))
    return fmt([n], *e), [str(max(max(tree_dist(n, e, s)) for s in range(1, n + 1)))]

def g_sepk():
    n, q = R.randint(1, 9), R.randint(1, 5); p = [0, 0] + [R.randint(1, v - 1) for v in range(2, n + 1)]
    qs = [[R.randint(1, n), R.randint(0, n)] for _ in range(q)]; out = []
    for x, k in qs:
        for _ in range(k): x = p[x]
        out.append(str(x if x else -1))
    return fmt([n, q], p[2:], *qs), out

def g_kccay():
    n, q = R.randint(1, 9), R.randint(1, 5); e = shuffle_tree(n, rand_tree(n)); qs = [[R.randint(1, n), R.randint(1, n)] for _ in range(q)]
    return fmt([n, q], *e, *qs), [str(tree_dist(n, e, a)[b]) for a, b in qs]

def g_hopnhom():
    n, q = R.randint(1, 9), R.randint(1, 5); e = shuffle_tree(n, rand_tree(n)); qs = [[R.randint(1, n) for _ in range(3)] for _ in range(q)]
    D = [None] + [tree_dist(n, e, s) for s in range(1, n + 1)]
    return fmt([n, q], *e, *qs), [str(min(D[a][v] + D[b][v] + D[c][v] for v in range(1, n + 1))) for a, b, c in qs]

CASES += [
    ("lca", [("12 3\n1 2 3 4 5 6 2 8 9 10 4\n7 11\n12 7\n10 6\n", ["2", "4", "2"])], None, 0, None),
    ("duong_kinh", [("8\n1 2\n1 3\n3 4\n3 5\n5 6\n2 7\n7 8\n", ["6"])], g_duongkinh, 300, None),
    ("sep_cap_k", [("5 3\n1 1 3 3\n4 1\n4 2\n4 3\n", ["3", "1", "-1"])], g_sepk, 300, None),
    ("khoang_cach_cay", [("5 3\n1 2\n1 3\n3 4\n3 5\n1 3\n2 5\n1 4\n", ["1", "3", "2"])], g_kccay, 300, None),
    ("hopnhom", [("7 3\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n4 5 6\n4 4 7\n6 7 1\n", ["5", "4", "3"])], g_hopnhom, 300, "HOPNHOM"),
]

def g_congdoan():
    n, q = R.randint(1, 8), R.randint(1, 8); a = arr(n, 0, 9); A = a[:]; ops = []; out = []
    for _ in range(q):
        if R.random() < .5:
            l = R.randint(1, n); r = R.randint(l, n); u = R.randint(-5, 9); ops.append([1, l, r, u])
            for i in range(l - 1, r): A[i] += u
        else:
            k = R.randint(1, n); ops.append([2, k]); out.append(str(A[k - 1]))
    return fmt([n, q], a, *ops), out

def g_rut():
    n = R.randint(1, 9); a = arr(n, 1, 20); L = a[:]; ps = []; out = []
    for i in range(n):
        p = R.randint(1, len(L)); ps.append(p); out.append(str(L.pop(p - 1)))
    return fmt([n], a, ps), out

def g_demdiem():
    n, q = R.randint(1, 8), R.randint(1, 6); P = [[R.randint(1, 6), R.randint(1, 6)] for _ in range(n)]; Q = [[R.randint(1, 7), R.randint(1, 7)] for _ in range(q)]
    return fmt([n, q], *P, *Q), [str(sum(1 for x, y in P if x <= X and y <= Y)) for X, Y in Q]

CASES += [
    ("nghich_the", [("3\n5 5 5\n", ["0"])], None, 0, None),
    ("cong_doan", [("8 3\n3 2 4 5 1 1 5 3\n2 4\n1 2 5 1\n2 4\n", ["5", "6"])], g_congdoan, 300, None),
    ("rut_tham", [("5\n2 6 1 4 5\n3 1 3 1 1\n", "1 2 5 6 4".split())], g_rut, 300, None),
    ("demdiem", [("5 4\n1 1\n2 3\n3 2\n4 4\n5 1\n3 2\n5 5\n2 4\n4 1\n", ["2", "5", "2", "1"])], g_demdiem, 300, "DEMDIEM"),
]

def g_caytong():
    n, q = R.randint(1, 9), R.randint(1, 8); a = arr(n, -9, 9); A = a[:]; ops = []; out = []
    for _ in range(q):
        if R.random() < .4:
            k = R.randint(1, n); u = R.randint(-9, 9); ops.append([1, k, u]); A[k - 1] = u
        else:
            l = R.randint(1, n); r = R.randint(l, n); ops.append([2, l, r]); out.append(str(sum(A[l - 1:r])))
    return fmt([n, q], a, *ops), out

def g_khachsan():
    n, m = R.randint(1, 9), R.randint(1, 8); h = arr(n, 0, 8); r = arr(m, 1, 8); H = h[:]; out = []
    for x in r:
        i = next((i for i, v in enumerate(H) if v >= x), -1)
        if i < 0: out.append("0")
        else: H[i] -= x; out.append(str(i + 1))
    return fmt([n, m], h, r), out

def g_tongmax():
    n, q = R.randint(1, 9), R.randint(1, 6); a = arr(n, -9, 9); A = a[:]; ops = []; out = []
    for _ in range(q):
        k = R.randint(1, n); x = R.randint(-9, 9); ops.append([k, x]); A[k - 1] = x
        out.append(str(max([0] + [sum(A[l:r + 1]) for l in range(n) for r in range(l, n)])))
    return fmt([n, q], a, *ops), out

CASES += [
    ("cay_phan_doan", [("8 4\n3 2 4 5 1 1 5 3\n2 2 7\n2 5 6\n1 2 3\n2 1 4\n", ["1", "1", "3"])], g_seg, 300, None),
    ("cay_tong", [("8 4\n3 2 4 5 1 1 5 3\n2 1 4\n1 4 9\n2 1 4\n2 3 5\n", ["14", "18", "14"])], g_caytong, 300, None),
    ("khach_san", [("8 5\n3 2 4 1 5 5 2 6\n4 4 7 1 1\n", "3 5 0 1 1".split())], g_khachsan, 300, None),
    ("tongmax", [("5 3\n4 -3 2 -6 3\n2 5\n4 1\n1 -10\n", ["11", "15", "11"])], g_tongmax, 300, "TONGMAX"),
]

def g_lttang():
    q = R.randint(1, 4); qs = [[R.randint(0, 30), R.randint(0, 6), R.randint(0, 3)] for _ in range(q)]
    return fmt([q], *qs), [str(pow(a, b ** c, 10**9 + 7)) for a, b, c in qs]

def g_chiakeo():
    n, m = R.randint(1, 30), R.randint(1, 30)
    return fmt([n, m]), [str(comb(n + m - 1, n - 1) % (10**9 + 7))]

def g_duongdi():
    n = R.randint(2, 7); cells = [(r, c) for r in range(1, n + 1) for c in range(1, n + 1) if (r, c) not in ((1, 1), (n, n))]
    b = R.sample(cells, R.randint(0, min(6, len(cells)))); bs = set(b)
    dp = [[0] * (n + 1) for _ in range(n + 1)]
    for r in range(1, n + 1):
        for c in range(1, n + 1):
            if (r, c) in bs: continue
            dp[r][c] = 1 if (r, c) == (1, 1) else dp[r - 1][c] + dp[r][c - 1]
    return fmt([n, len(b)], *b), [str(dp[n][n] % (10**9 + 7))]

CASES += [
    ("luy_thua_tang", [("3\n3 7 1\n15 2 2\n3 4 5\n", ["2187", "50625", "763327764"])], g_lttang, 200, None),
    ("chia_keo", [("3 2\n", ["6"])], g_chiakeo, 100, None),
    ("duongdi", [("4 2\n2 2\n3 3\n", ["4"])], g_duongdi, 300, "DUONGDI"),
]

def g_phancong():
    n = R.randint(1, 6); c = [arr(n, 1, 20) for _ in range(n)]
    return fmt([n], *c), [str(min(sum(c[i][p[i]] for i in range(n)) for p in permutations(range(n))))]

def g_hanhtrinh():
    n = R.randint(2, 6); e = [[R.randint(1, n), R.randint(1, n)] for _ in range(R.randint(1, 14))]
    cnt = 0
    for p in permutations(range(2, n)):
        path = [1, *p, n]
        if all([path[k], path[k + 1]] in e for k in range(n - 1)):
            cnt += 1 if True else 0
    # đếm theo bội của cạnh (có thể có cạnh lặp)
    cnt = 0
    for p in permutations(range(2, n)):
        path = [1, *p, n]; w = 1
        for k in range(n - 1): w *= e.count([path[k], path[k + 1]])
        cnt += w
    return fmt([n, len(e)], *e), [str(cnt % (10**9 + 7))]

def g_ghepdoi():
    N = R.choice([2, 4, 6, 8]); s = [[0] * N for _ in range(N)]
    for i in range(N):
        for j in range(i + 1, N): s[i][j] = s[j][i] = R.randint(0, 20)
    def best(rest):
        if not rest: return 0
        i = rest[0]; return max(s[i][j] + best([x for x in rest[1:] if x != j]) for j in rest[1:])
    return fmt([N], *s), [str(best(list(range(N))))]

CASES += [
    ("thang_may", [("3 10\n6 6 6\n", ["3"]), ("6 12\n6 5 4 4 3 2\n", ["2"])], None, 0, None),
    ("phan_cong", [("3\n4 2 8\n4 3 7\n3 1 6\n", ["12"])], g_phancong, 300, None),
    ("hanh_trinh", [("4 6\n1 2\n1 3\n2 3\n3 2\n2 4\n3 4\n", ["2"])], g_hanhtrinh, 300, None),
    ("ghepdoi", [("4\n0 5 1 2\n5 0 3 4\n1 3 0 6\n2 4 6 0\n", ["11"])], g_ghepdoi, 300, "GHEPDOI"),
]

def g_capduoi():
    n = R.randint(1, 9); p = [0, 0] + [R.randint(1, v - 1) for v in range(2, n + 1)]
    out = []
    for v in range(1, n + 1):
        c = 0
        for u in range(2, n + 1):
            x = u
            while x and x != v: x = p[x]
            if x == v and u != v: c += 1
        out.append(str(c))
    return fmt([n], p[2:]) if n > 1 else "1\n\n", out

def g_doclap():
    n = R.randint(1, 9); e = shuffle_tree(n, rand_tree(n)); w = arr(n, 1, 20); b = 0
    for s in range(1 << n):
        if any((s >> (a - 1) & 1) and (s >> (c - 1) & 1) for a, c in e): continue
        b = max(b, sum(w[i] for i in range(n) if s >> i & 1))
    return fmt([n], w, *e), [str(b)]

def g_lapden():
    n = R.randint(1, 9); e = shuffle_tree(n, rand_tree(n)); nb = [{i} for i in range(n + 1)]
    for a, c in e: nb[a].add(c); nb[c].add(a)
    b = n
    for s in range(1, 1 << n):
        lit = set()
        for i in range(n):
            if s >> i & 1: lit |= nb[i + 1]
        if len(lit & set(range(1, n + 1))) == n: b = min(b, bin(s).count("1"))
    return fmt([n], *e), [str(b)]

def g_ghepcap():
    n = R.randint(1, 9); e = shuffle_tree(n, rand_tree(n)); b = 0
    for s in range(1 << len(e)):
        used = set(); ok = True; c = 0
        for i in range(len(e)):
            if s >> i & 1:
                x, y = e[i]
                if x in used or y in used: ok = False; break
                used |= {x, y}; c += 1
        if ok: b = max(b, c)
    return fmt([n], *e), [str(b)]

CASES += [
    ("ghep_cap", [("7\n1 2\n1 3\n3 4\n3 5\n2 6\n6 7\n", ["3"])], g_ghepcap, 300, None),
    ("cap_duoi", [("5\n1 1 2 3\n", "4 1 1 0 0".split())], g_capduoi, 300, None),
    ("doc_lap", [("6\n3 5 1 4 2 6\n1 2\n1 3\n2 4\n2 5\n3 6\n", ["15"])], g_doclap, 300, None),
    ("lapden", [("8\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n7 8\n", ["3"])], g_lapden, 300, "LAPDEN"),
]

def g_khonggiam():
    a = R.randint(0, 3000); b = R.randint(a, a + 3000)
    return fmt([a, b]), [str(sum(list(str(x)) == sorted(str(x)) for x in range(a, b + 1)))]

def g_tongcs():
    a = R.randint(0, 3000); b = R.randint(a, a + 3000)
    return fmt([a, b]), [str(sum(sum(map(int, str(x))) for x in range(a, b + 1)))]

def g_soloc():
    a = R.randint(0, 3000); b = R.randint(a, a + 5000); K = R.randint(0, 3)
    return fmt([a, b, K]), [str(sum(1 for x in range(a, b + 1) if str(x).count("6") == K and "4" not in str(x)))]

CASES += [
    ("so_dep", [("0 0\n", ["1"]), ("0 9\n", ["10"])], g_dep, 100, None),
    ("khong_giam", [("1 100\n", ["54"])], g_khonggiam, 100, None),
    ("tong_chu_so", [("1 12\n", ["51"])], g_tongcs, 100, None),
    ("soloc", [("1 100 1\n", ["16"])], g_soloc, 100, "SOLOC"),
]

def borders(s): return [L for L in range(1, len(s)) if s[:L] == s[-L:]]

def g_bien():
    s = "".join(R.choice("ab") for _ in range(R.randint(1, 12)))
    return s + "\n", [str(x) for x in borders(s)]

def g_chuky():
    s = "".join(R.choice("ab") for _ in range(R.randint(1, 12)))
    return s + "\n", [str(p) for p in range(1, len(s) + 1) if all(s[i] == s[i + p] for i in range(len(s) - p))]

def g_lapdai():
    s = "".join(R.choice("abc") for _ in range(R.randint(1, 14))); n = len(s); b = 0
    for L in range(1, n):
        subs = [s[i:i + L] for i in range(n - L + 1)]
        if len(set(subs)) < len(subs): b = L
    return s + "\n", [str(b)]

CASES += [
    ("kmp", [("aaa\naa\n", ["2"])], g_kmp, 300, None),
    ("bien", [("abcababcab\n", ["2", "5"])], g_bien, 300, None),
    ("chu_ky", [("abcabca\n", ["3", "6", "7"])], g_chuky, 300, None),
    ("lapdai", [("banana\n", ["3"]), ("abcd\n", ["0"])], g_lapdai, 300, "LAPDAI"),
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
        print(f"{'OK ' if not bad else 'SAI'} {stem:14} {'+'.join(langs):5} {len(tests)} test")
        fails += bad
    print("TỔNG SỐ LỖI:", fails)
    return fails

if __name__ == "__main__":
    sys.exit(1 if main() else 0)
