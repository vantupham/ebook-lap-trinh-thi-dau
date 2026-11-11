import sys
from collections import deque
data = sys.stdin.read().split()
R, C = int(data[0]), int(data[1])
g = data[2:2 + R]
d = [[-1] * C for _ in range(R)]
q = deque()
for i in range(R):
    j = g[i].find('A')
    if j >= 0:
        d[i][j] = 0
        q.append((i, j))
ans = -1
while q:
    i, j = q.popleft()
    if g[i][j] == 'B':
        ans = d[i][j]
        break
    for ni, nj in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):
        if 0 <= ni < R and 0 <= nj < C and g[ni][nj] != '#' and d[ni][nj] == -1:
            d[ni][nj] = d[i][j] + 1
            q.append((ni, nj))
print(ans)
