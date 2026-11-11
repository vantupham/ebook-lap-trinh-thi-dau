with open("TONGMAX.INP") as f:
    data = f.read().split()
n, q = int(data[0]), int(data[1])
N = 1
while N < n:
    N *= 2
tong = [0] * (2 * N); tien = [0] * (2 * N); hau = [0] * (2 * N); tot = [0] * (2 * N)

def dat_la(i, x):
    d = x if x > 0 else 0
    tong[i] = x; tien[i] = hau[i] = tot[i] = d

def gop(i):
    l, r = 2 * i, 2 * i + 1
    tong[i] = tong[l] + tong[r]
    tien[i] = max(tien[l], tong[l] + tien[r])
    hau[i] = max(hau[r], tong[r] + hau[l])
    tot[i] = max(tot[l], tot[r], hau[l] + tien[r])

for i in range(n):
    dat_la(N + i, int(data[2 + i]))
for i in range(N - 1, 0, -1):
    gop(i)
out = []
p = 2 + n
for _ in range(q):
    k, x = int(data[p]), int(data[p + 1])
    p += 2
    i = N + k - 1
    dat_la(i, x)
    i //= 2
    while i:
        gop(i)
        i //= 2
    out.append(tot[1])
with open("TONGMAX.OUT", "w") as f:
    f.write("\n".join(map(str, out)) + "\n")
