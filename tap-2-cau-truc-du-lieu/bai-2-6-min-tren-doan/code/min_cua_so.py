import sys
from collections import deque
data = sys.stdin.buffer.read().split()
n, k = int(data[0]), int(data[1])
a = list(map(int, data[2:2 + n]))
dq = deque()
kq = []
for i in range(n):
    while dq and a[dq[-1]] >= a[i]:
        dq.pop()
    dq.append(i)
    if dq[0] <= i - k:
        dq.popleft()
    if i >= k - 1:
        kq.append(a[dq[0]])
print(*kq)
