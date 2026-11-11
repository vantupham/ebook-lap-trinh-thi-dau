import sys
data = sys.stdin.buffer.read().split()
n, m = int(data[0]), int(data[1])
e = sorted((int(data[4 + 3 * i]), int(data[2 + 3 * i]), int(data[3 + 3 * i])) for i in range(m))
cha = list(range(n + 1))

def tim(u):
    while cha[u] != u:
        cha[u] = cha[cha[u]]
        u = cha[u]
    return u

tong = da_noi = 0
for c, a, b in e:
    x, y = tim(a), tim(b)
    if x != y:
        cha[x] = y
        tong += c
        da_noi += 1
print(tong if da_noi == n - 1 else "IMPOSSIBLE")
