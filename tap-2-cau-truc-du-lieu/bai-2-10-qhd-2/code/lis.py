import sys
from bisect import bisect_left
data = sys.stdin.buffer.read().split()
n = int(data[0])
tails = []
for x in map(int, data[1:1 + n]):
    k = bisect_left(tails, x)          # vị trí đầu tiên >= x
    if k == len(tails):
        tails.append(x)
    else:
        tails[k] = x
print(len(tails))
