import sys, heapq
data = sys.stdin.buffer.read().split()
n, m = int(data[0]), int(data[1])
adj = [[] for _ in range(n + 1)]
for i in range(m):
    a, b, c = int(data[2 + 3 * i]), int(data[3 + 3 * i]), int(data[4 + 3 * i])
    adj[a].append((b, c))
VC = float('inf')
d = [VC] * (n + 1)
d[1] = 0
pq = [(0, 1)]
while pq:
    du, u = heapq.heappop(pq)
    if du > d[u]:
        continue                                   # bản cũ
    for v, w in adj[u]:
        nd = du + w
        if nd < d[v]:
            d[v] = nd
            heapq.heappush(pq, (nd, v))
print(" ".join(str(x) if x < VC else "-1" for x in d[1:]))
