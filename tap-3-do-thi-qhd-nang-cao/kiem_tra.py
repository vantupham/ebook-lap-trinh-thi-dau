"""Kiểm chứng mọi đoạn code trong Tập 3.

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
        print(f"{'OK ' if not bad else 'SAI'} {stem:14} {'+'.join(langs):5} {len(tests)} test")
        fails += bad
    print("TỔNG SỐ LỖI:", fails)
    return fails

if __name__ == "__main__":
    sys.exit(1 if main() else 0)
