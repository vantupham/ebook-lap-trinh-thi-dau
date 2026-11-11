data = open("LANGNHUA.INP", "rb").read().split()
n, q = int(data[0]), int(data[1])
d = [0] * (n + 2)
for k in range(q):
    l, r, v = int(data[2 + 3 * k]), int(data[3 + 3 * k]), int(data[4 + 3 * k])
    d[l] += v
    d[r + 1] -= v
cur, best, dem = 0, -1, 0
for i in range(1, n + 1):
    cur += d[i]
    if cur > best:
        best, dem = cur, 1
    elif cur == best:
        dem += 1
open("LANGNHUA.OUT", "w").write(f"{best} {dem}\n")
