import sys
data = sys.stdin.buffer.read().split()
n, q = int(data[0]), int(data[1])
cha = list(range(n + 1))
sz = [1] * (n + 1)

def tim(u):
    while cha[u] != u:
        cha[u] = cha[cha[u]]
        u = cha[u]
    return u

out = []
p = 2
for _ in range(q):
    t, u = int(data[p]), int(data[p + 1])
    if t == 3:
        out.append(str(sz[tim(u)]))
        p += 2
        continue
    v = int(data[p + 2])
    p += 3
    a, b = tim(u), tim(v)
    if t == 2:
        out.append("YES" if a == b else "NO")
    elif a != b:
        if sz[a] < sz[b]:
            a, b = b, a
        cha[b] = a
        sz[a] += sz[b]
print("\n".join(out))
