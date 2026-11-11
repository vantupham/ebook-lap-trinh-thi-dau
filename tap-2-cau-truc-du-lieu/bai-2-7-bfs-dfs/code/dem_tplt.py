import sys
data = sys.stdin.buffer.read().split()
n, m = int(data[0]), int(data[1])
adj = [[] for _ in range(n + 1)]
for i in range(m):
    u, v = int(data[2 + 2 * i]), int(data[3 + 2 * i])
    adj[u].append(v)
    adj[v].append(u)
tham = [False] * (n + 1)
dem = 0
for s in range(1, n + 1):
    if tham[s]:
        continue
    dem += 1
    tham[s] = True
    st = [s]
    while st:
        u = st.pop()
        for v in adj[u]:
            if not tham[v]:
                tham[v] = True
                st.append(v)
print(dem)
