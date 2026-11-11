from collections import deque
with open("LANTIN.INP") as f:
    data = f.read().split()
R, C = int(data[0]), int(data[1])
g = "".join(data[2:2 + R])                  # lưới thành một xâu: ô (i, j) là g[i*C + j]
d = [-1] * (R * C)
q = deque()
for k, ch in enumerate(g):
    if ch == '*':
        d[k] = 0
        q.append(k)
while q:
    k = q.popleft()
    i, j = divmod(k, C)
    for nk, ok in ((k - C, i > 0), (k + C, i < R - 1), (k - 1, j > 0), (k + 1, j < C - 1)):
        if ok and g[nk] != '#' and d[nk] == -1:
            d[nk] = d[k] + 1
            q.append(nk)
ans = 0
for k, ch in enumerate(g):
    if ch == '.':
        if d[k] == -1:
            ans = -1
            break
        ans = max(ans, d[k])
with open("LANTIN.OUT", "w") as f:
    f.write(f"{ans}\n")
