P = 10**9 + 7
with open("DUONGDI.INP") as fi:
    data = fi.read().split()
n, m = int(data[0]), int(data[1])
b = sorted((int(data[2 + 2 * i]), int(data[3 + 2 * i])) for i in range(m))
b.append((n, n))
N = 2 * n
gt = [1] * (N + 1)
for i in range(1, N + 1):
    gt[i] = gt[i - 1] * i % P
ngd = [1] * (N + 1)
ngd[N] = pow(gt[N], P - 2, P)
for i in range(N, 0, -1):
    ngd[i - 1] = ngd[i] * i % P

def duong(r1, c1, r2, c2):
    if r2 < r1 or c2 < c1:
        return 0
    a, k = (r2 - r1) + (c2 - c1), r2 - r1
    return gt[a] * ngd[k] % P * ngd[a - k] % P

f = []
for i, (r, c) in enumerate(b):
    v = duong(1, 1, r, c)
    for j in range(i):
        v -= f[j] * duong(b[j][0], b[j][1], r, c)
    f.append(v % P)
with open("DUONGDI.OUT", "w") as fo:
    fo.write(f"{f[-1]}\n")
