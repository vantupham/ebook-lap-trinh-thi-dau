import sys
data = sys.stdin.buffer.read().split()
n = int(data[0])
adj = [[] for _ in range(n + 1)]
for i in range(n - 1):
    a, b = int(data[1 + 2 * i]), int(data[2 + 2 * i])
    adj[a].append(b)
    adj[b].append(a)
cha = [0] * (n + 1)
cha[1] = -1
thu_tu = [1]
for u in thu_tu:                                   # list lớn dần trong khi duyệt: chính là BFS
    for v in adj[u]:
        if v != cha[u]:
            cha[v] = u
            thu_tu.append(v)
f = [0] * (n + 1)
g = [0] * (n + 1)
for v in reversed(thu_tu):                         # con trước cha
    con = [c for c in adj[v] if c != cha[v]]
    f[v] = sum(g[c] for c in con)
    g[v] = f[v]
    for c in con:
        g[v] = max(g[v], f[v] - g[c] + f[c] + 1)
print(g[1])
