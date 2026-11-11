import sys
with open("QUANCO.INP") as f:
    data = f.read().split()
n, m, k = int(data[0]), int(data[1]), int(data[2])
ke = [[] for _ in range(n + 1)]
vao = [0] * (n + 1)
for i in range(m):
    u, v = int(data[3 + 2 * i]), int(data[4 + 2 * i])
    ke[u].append(v)
    vao[v] += 1
q = [u for u in range(1, n + 1) if vao[u] == 0]
i = 0
while i < len(q):
    u = q[i]; i += 1
    for v in ke[u]:
        vao[v] -= 1
        if vao[v] == 0:
            q.append(v)
g = [0] * (n + 1)
for u in reversed(q):
    tap = {g[v] for v in ke[u]}
    mex = 0
    while mex in tap:
        mex += 1
    g[u] = mex
x = 0
for c in data[3 + 2 * m: 3 + 2 * m + k]:
    x ^= g[int(c)]
with open("QUANCO.OUT", "w") as f:
    f.write(("AN" if x else "BINH") + "\n")
