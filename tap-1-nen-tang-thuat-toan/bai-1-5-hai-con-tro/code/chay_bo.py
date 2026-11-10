import sys
data = sys.stdin.buffer.read().split()
n, S = int(data[0]), int(data[1])
a = list(map(int, data[2:2 + n]))
tong = l = best = 0
for r in range(n):
    tong += a[r]
    while tong > S:
        tong -= a[l]
        l += 1
    best = max(best, r - l + 1)
print(best)
