from collections import deque
with open("KYHAN.INP") as f:
    data = f.read().split()
n, A, B = int(data[0]), int(data[1]), int(data[2])
p = [0] * (n + 1)
for i in range(1, n + 1):
    p[i] = p[i - 1] + int(data[2 + i])
dq = deque()
best = None
for r in range(A, n + 1):
    j = r - A
    while dq and p[dq[-1]] >= p[j]:
        dq.pop()
    dq.append(j)
    if dq[0] < r - B:
        dq.popleft()
    v = p[r] - p[dq[0]]
    if best is None or v > best:
        best = v
with open("KYHAN.OUT", "w") as f:
    f.write(f"{best}\n")
