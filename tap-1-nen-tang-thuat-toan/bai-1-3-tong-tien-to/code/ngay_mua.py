import sys
data = sys.stdin.buffer.read().split()
n, q = int(data[0]), int(data[1])
c = [0] * (n + 1)
for i in range(1, n + 1):
    c[i] = c[i - 1] + (1 if int(data[1 + i]) > 0 else 0)
out = []
for k in range(q):
    l, r = int(data[2 + n + 2 * k]), int(data[3 + n + 2 * k])
    out.append(c[r] - c[l - 1])
print('\n'.join(map(str, out)))
