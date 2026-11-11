from collections import deque
with open("NHAYDA.INP") as fi:
    data = fi.read().split()
n, C = int(data[0]), int(data[1])
h = list(map(int, data[2:2 + n]))

def thua(l1, l2, l3):
    return (l3[1] - l1[1]) * (l1[0] - l2[0]) <= (l2[1] - l1[1]) * (l1[0] - l3[0])

dq = deque([(-2 * h[0], h[0] * h[0])])
dp = 0
for i in range(1, n):
    x = h[i]
    while len(dq) >= 2 and dq[1][0] * x + dq[1][1] <= dq[0][0] * x + dq[0][1]:
        dq.popleft()
    dp = dq[0][0] * x + dq[0][1] + x * x + C
    moi = (-2 * x, dp + x * x)
    while len(dq) >= 2 and thua(dq[-2], dq[-1], moi):
        dq.pop()
    dq.append(moi)
with open("NHAYDA.OUT", "w") as fo:
    fo.write(f"{dp}\n")
