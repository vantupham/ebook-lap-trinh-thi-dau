import sys
from collections import deque
data = sys.stdin.buffer.read().split()
n, x = int(data[0]), int(data[1])
s = list(map(int, data[2:2 + n]))
f = list(map(int, data[2 + n:2 + 2 * n]))

def thua(l1, l2, l3):                       # Python không tràn số, nhân thẳng được
    return (l3[1] - l1[1]) * (l1[0] - l2[0]) <= (l2[1] - l1[1]) * (l1[0] - l3[0])

dq = deque([(x, 0)])
dp = 0
for i in range(n):
    si = s[i]
    while len(dq) >= 2 and dq[1][0] * si + dq[1][1] <= dq[0][0] * si + dq[0][1]:
        dq.popleft()
    dp = dq[0][0] * si + dq[0][1]
    moi = (f[i], dp)
    while len(dq) >= 2 and thua(dq[-2], dq[-1], moi):
        dq.pop()
    dq.append(moi)
print(dp)
