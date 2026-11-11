from collections import deque
with open("THICONG.INP") as f:
    data = f.read().split()
n, m = int(data[0]), int(data[1])
t = [0] + [int(x) for x in data[2:2 + n]]
adj = [[] for _ in range(n + 1)]
vao = [0] * (n + 1)
p = 2 + n
for _ in range(m):
    a, b = int(data[p]), int(data[p + 1])
    p += 2
    adj[a].append(b)
    vao[b] += 1
bat_dau = [0] * (n + 1)
q = deque(i for i in range(1, n + 1) if vao[i] == 0)
da_xep = ans = 0
while q:
    u = q.popleft()
    da_xep += 1
    xong = bat_dau[u] + t[u]
    ans = max(ans, xong)
    for v in adj[u]:
        if xong > bat_dau[v]:
            bat_dau[v] = xong
        vao[v] -= 1
        if vao[v] == 0:
            q.append(v)
with open("THICONG.OUT", "w") as f:
    f.write(f"{ans if da_xep == n else -1}\n")
