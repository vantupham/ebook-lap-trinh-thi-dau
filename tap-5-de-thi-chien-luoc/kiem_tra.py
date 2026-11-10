"""Kiểm chứng mọi đoạn code trong Tập 5.

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
                exe = os.path.join(tempfile.gettempdir(), "t5_" + stem)
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
from itertools import permutations
from collections import deque
import heapq
R = random.Random(2026)
def arr(n, lo, hi): return [R.randint(lo, hi) for _ in range(n)]
def fmt(*rows): return "".join(" ".join(map(str, r)) + "\n" for r in rows)

def g_nhamay():
    n, m = R.randint(1, 5), R.randint(1, 40); t = arr(n, 1, 10)
    T = 1
    while sum(T // x for x in t) < m: T += 1
    return fmt([n, m], t), [str(T)]
def g_doandai():
    n, s = R.randint(1, 10), R.randint(0, 20); a = arr(n, 0, 9)
    best = max([r - l for l in range(n) for r in range(l + 1, n + 1) if sum(a[l:r]) <= s], default=0)
    return fmt([n, s], a), [str(best)]
def g_phongmay():
    n = R.randint(1, 8); lop = []
    for _ in range(n):
        s = R.randint(0, 10); lop.append([s, R.randint(s + 1, 12)])
    best = 0
    for msk in range(1 << n):
        ch = sorted(lop[i] for i in range(n) if msk >> i & 1)
        if all(ch[i][1] <= ch[i + 1][0] for i in range(len(ch) - 1)): best = max(best, len(ch))
    return fmt([n], *lop), [str(best)]
def g_toanha():
    n = R.randint(1, 12); h = arr(n, 1, 5)
    kq = sum(next((j - i for j in range(i + 1, n) if h[j] > h[i]), 0) for i in range(n))
    return fmt([n], h), [str(kq)]
def g_cuuhoa():
    r, c = R.randint(1, 6), R.randint(1, 6)
    g = [[R.choice("..#") for _ in range(c)] for _ in range(r)]
    for _ in range(R.randint(1, 3)): g[R.randrange(r)][R.randrange(c)] = "F"
    best = 0
    for i in range(r):
        for j in range(c):
            if g[i][j] != ".": continue
            d = {(i, j): 0}; q = deque([(i, j)]); found = None   # BFS ngược từ nhà tới trạm gần nhất
            while q:
                x, y = q.popleft()
                if g[x][y] == "F": found = d[(x, y)]; break
                for u, v in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= u < r and 0 <= v < c and g[u][v] != "#" and (u, v) not in d:
                        d[(u, v)] = d[(x, y)] + 1; q.append((u, v))
            if found is None: return fmt([r, c], *[["".join(row)] for row in g]), ["-1"]
            best = max(best, found)
    return fmt([r, c], *[["".join(row)] for row in g]), [str(best)]
def g_cuaso():
    n = R.randint(1, 10); k, d = R.randint(1, n), R.randint(0, 4); a = arr(n, -5, 5)
    return fmt([n, k, d], a), [str(sum(max(a[i:i + k]) - min(a[i:i + k]) <= d for i in range(n - k + 1)))]
def g_demduong():
    n, m = R.randint(2, 6), R.randint(1, 9); e = [[R.randint(1, n), R.randint(1, n), R.randint(1, 3)] for _ in range(m)]
    adj = {u: [] for u in range(1, n + 1)}
    for u, v, w in e: adj[u].append((v, w)); adj[v].append((u, w))
    paths = []   # liệt kê mọi đường đi đơn từ 1 tới n
    def dfs(u, seen, L):
        if u == n: paths.append(L); return
        for v, w in adj[u]:
            if v not in seen: dfs(v, seen | {v}, L + w)
    dfs(1, {1}, 0)
    if not paths: return fmt([n, m], *e), ["-1"]
    # mỗi cách chọn cạnh song song là một đường khác nhau, nên liệt kê theo cạnh (đã làm ở trên)
    best = min(paths); return fmt([n, m], *e), [str(best), str(paths.count(best))]
def g_dulich():
    n = R.randint(1, 7); c = [[0 if i == j else R.randint(0, 20) for j in range(n)] for i in range(n)]
    best = min(sum(c[p[i]][p[i + 1]] for i in range(n - 1)) for p in ([0] + list(q) for q in permutations(range(1, n))))
    return fmt([n], *c), [str(best)]
def g_bobaso():
    n = R.randint(1, 12); a = arr(n, -4, 4)
    return fmt([n], a), [str(sum(a[i] < a[j] < a[k] for i in range(n) for j in range(i + 1, n) for k in range(j + 1, n)))]

CASES = [
    ("nhamay", [("3 7\n3 2 5\n", ["8"])], g_nhamay, 300, "NHAMAY"),
    ("doandai", [("8 10\n2 5 1 3 7 2 2 4\n", ["3"])], g_doandai, 300, "DOANDAI"),
    ("phongmay", [("5\n7 9\n8 10\n9 11\n10 12\n7 13\n", ["2"])], g_phongmay, 300, "PHONGMAY"),
    ("toanha", [("6\n3 1 4 1 5 2\n", ["6"]), ("3\n2 2 3\n", ["3"])], g_toanha, 300, "TOANHA"),
    ("cuuhoa", [("4 5\nF..#.\n.#...\n...#F\n#....\n", ["4"])], g_cuuhoa, 300, "CUUHOA"),
    ("cuaso", [("7 3 2\n5 3 4 6 6 9 7\n", ["2"])], g_cuaso, 300, "CUASO"),
    ("demduong", [("4 5\n1 2 1\n2 4 2\n1 3 2\n3 4 1\n1 4 4\n", ["3", "2"])], g_demduong, 300, "DEMDUONG"),
    ("dulich", [("4\n0 5 9 4\n5 0 2 7\n9 2 0 3\n4 7 3 0\n", ["9"])], g_dulich, 200, "DULICH"),
    ("bobaso", [("6\n2 5 3 4 1 6\n", ["5"])], g_bobaso, 300, "BOBASO"),
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
    print("TỔNG SỐ LỖI:", fails)
    return fails

if __name__ == "__main__":
    sys.exit(1 if main() else 0)
