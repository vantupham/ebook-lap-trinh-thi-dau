import sys
from collections import deque
sys.setrecursionlimit(10000)
data = sys.stdin.buffer.read().split()
n, m = int(data[0]), int(data[1])
toi, con = [], []
g = [[] for _ in range(n + 1)]

def them(a, b, c):
    g[a].append(len(toi)); toi.append(b); con.append(c)
    g[b].append(len(toi)); toi.append(a); con.append(0)

for i in range(m):
    them(int(data[2 + 3 * i]), int(data[3 + 3 * i]), int(data[4 + 3 * i]))

def bfs(s, t):
    global tang
    tang = [-1] * (n + 1)
    tang[s] = 0
    q = deque([s])
    while q:
        u = q.popleft()
        for id in g[u]:
            if con[id] > 0 and tang[toi[id]] == -1:
                tang[toi[id]] = tang[u] + 1
                q.append(toi[id])
    return tang[t] != -1

def dfs(u, t, f):
    if u == t:
        return f
    while it[u] < len(g[u]):
        id = g[u][it[u]]
        v = toi[id]
        if con[id] > 0 and tang[v] == tang[u] + 1:
            d = dfs(v, t, min(f, con[id]))
            if d > 0:
                con[id] -= d
                con[id ^ 1] += d
                return d
        it[u] += 1
    return 0

luong = 0
while bfs(1, n):
    it = [0] * (n + 1)
    f = dfs(1, n, float('inf'))
    while f:
        luong += f
        f = dfs(1, n, float('inf'))
print(luong)
