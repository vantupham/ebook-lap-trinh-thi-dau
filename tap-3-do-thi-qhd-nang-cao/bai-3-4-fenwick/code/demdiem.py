from bisect import bisect_left, bisect_right
with open("DEMDIEM.INP") as f:
    data = f.read().split()
n, q = int(data[0]), int(data[1])
p = sorted((int(data[2 + 2 * i]), int(data[3 + 2 * i])) for i in range(n))
base = 2 + 2 * n
hoi = sorted((int(data[base + 2 * i]), int(data[base + 2 * i + 1]), i) for i in range(q))
ys = sorted(set(y for _, y in p))
m = len(ys)
t = [0] * (m + 1)
kq = [0] * q
k = 0
for X, Y, idx in hoi:
    while k < n and p[k][0] <= X:
        i = bisect_left(ys, p[k][1]) + 1
        while i <= m:
            t[i] += 1
            i += i & -i
        k += 1
    i = bisect_right(ys, Y)
    s = 0
    while i > 0:
        s += t[i]
        i -= i & -i
    kq[idx] = s
with open("DEMDIEM.OUT", "w") as f:
    f.write("\n".join(map(str, kq)) + "\n")
