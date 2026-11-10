import sys
data = sys.stdin.buffer.read().split()
n, t = int(data[0]), int(data[1])
k = list(map(int, data[2:2 + n]))

def du(T):
    return sum(T // x for x in k) >= t

lo, hi = 0, min(k) * t
while lo < hi:
    mid = (lo + hi) // 2
    if du(mid):
        hi = mid
    else:
        lo = mid + 1
print(lo)
