import heapq
with open("HENGAP.INP") as f:
    data = f.read().split()
n, m = int(data[0]), int(data[1])
adj = [[] for _ in range(n + 1)]
for i in range(m):
    a, b, c = int(data[2 + 3 * i]), int(data[3 + 3 * i]), int(data[4 + 3 * i])
    adj[a].append((b, c))
    adj[b].append((a, c))
VC = float('inf')

def dijkstra(s):
    d = [VC] * (n + 1)
    d[s] = 0
    pq = [(0, s)]
    while pq:
        du, u = heapq.heappop(pq)
        if du > d[u]:
            continue
        for v, w in adj[u]:
            if du + w < d[v]:
                d[v] = du + w
                heapq.heappush(pq, (d[v], v))
    return d

dA, dB = dijkstra(1), dijkstra(n)
best = min(max(dA[v], dB[v]) for v in range(1, n + 1))
with open("HENGAP.OUT", "w") as f:
    f.write(f"{best if best < VC else -1}\n")
