import sys
data = sys.stdin.buffer.read().split()
n, k = int(data[0]), int(data[1])
a = list(map(int, data[2:2 + n]))

def du(L):
    return sum(x // L for x in a) >= k

lo, hi = 1, max(a) + 1
while lo < hi:
    mid = (lo + hi) // 2
    if not du(mid):
        hi = mid
    else:
        lo = mid + 1
print(lo - 1)
