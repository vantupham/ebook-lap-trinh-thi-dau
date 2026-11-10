import sys
sys.stdin = open("DOANHTHU.INP", "rb")
sys.stdout = open("DOANHTHU.OUT", "w")
data = sys.stdin.read().split()
n, K, q = int(data[0]), int(data[1]), int(data[2])
p = [0] * (n + 1)
d = [0] * (n + 1)
for i in range(1, n + 1):
    x = int(data[2 + i])
    p[i] = p[i - 1] + x
    d[i] = d[i - 1] + (x >= K)
out = []
pos = 3 + n
for _ in range(q):
    l, r = int(data[pos]), int(data[pos + 1])
    pos += 2
    out.append(f"{p[r] - p[l - 1]} {d[r] - d[l - 1]}")
print('\n'.join(out))
