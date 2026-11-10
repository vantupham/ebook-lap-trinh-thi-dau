import sys, bisect
data = sys.stdin.buffer.read().split()
n, q = int(data[0]), int(data[1])
a = sorted(map(int, data[2:2 + n]))
out = []
pos = 2 + n
for _ in range(q):
    l, r = int(data[pos]), int(data[pos + 1])
    pos += 2
    out.append(bisect.bisect_right(a, r) - bisect.bisect_left(a, l))
print('\n'.join(map(str, out)))
