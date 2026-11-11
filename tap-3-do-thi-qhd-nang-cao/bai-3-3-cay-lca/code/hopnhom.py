from collections import deque
with open("HOPNHOM.INP") as f:
    data = f.read().split()
n, q = int(data[0]), int(data[1])
adj = [[] for _ in range(n + 1)]
p = 2
for _ in range(n - 1):
    a, b = int(data[p]), int(data[p + 1])
    p += 2
    adj[a].append(b)
    adj[b].append(a)
LOG = max(1, n.bit_length())
sau = [-1] * (n + 1)
cha = [0] * (n + 1)
sau[1] = 0
dq = deque([1])
while dq:
    u = dq.popleft()
    for v in adj[u]:
        if sau[v] < 0:
            sau[v] = sau[u] + 1
            cha[v] = u
            dq.append(v)
up = [cha]
for j in range(1, LOG):
    prev = up[-1]
    up.append([prev[prev[v]] for v in range(n + 1)])

def lca(a, b):
    if sau[a] < sau[b]:
        a, b = b, a
    k = sau[a] - sau[b]
    j = 0
    while k:
        if k & 1:
            a = up[j][a]
        k >>= 1
        j += 1
    if a == b:
        return a
    for j in range(LOG - 1, -1, -1):
        if up[j][a] != up[j][b]:
            a, b = up[j][a], up[j][b]
    return up[0][a]

def kc(a, b):
    return sau[a] + sau[b] - 2 * sau[lca(a, b)]

out = []
for _ in range(q):
    a, b, c = int(data[p]), int(data[p + 1]), int(data[p + 2])
    p += 3
    out.append((kc(a, b) + kc(b, c) + kc(c, a)) // 2)
with open("HOPNHOM.OUT", "w") as f:
    f.write("\n".join(map(str, out)) + "\n")
