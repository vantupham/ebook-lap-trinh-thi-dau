import sys
data = sys.stdin.buffer.read().split()
n = int(data[0])
cur = best = None
for x in map(int, data[1:n + 1]):
    cur = x if cur is None else max(x, cur + x)
    best = cur if best is None else max(best, cur)
print(best)
