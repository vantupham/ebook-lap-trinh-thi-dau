import sys
data = sys.stdin.buffer.read().split()
n, q = int(data[0]), int(data[1])
p = [0] * (n + 1)
for i in range(1, n + 1):
    p[i] = p[i - 1] + int(data[1 + i])
out = []
pos = 2 + n
for _ in range(q):
    l, r = int(data[pos]), int(data[pos + 1])
    pos += 2
    out.append(p[r] - p[l - 1])
print('\n'.join(map(str, out)))
