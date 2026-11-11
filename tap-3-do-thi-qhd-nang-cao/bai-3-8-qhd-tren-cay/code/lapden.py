with open("LAPDEN.INP") as fi:
    data = fi.read().split()
n = int(data[0])
adj = [[] for _ in range(n + 1)]
for i in range(n - 1):
    x, y = int(data[1 + 2 * i]), int(data[2 + 2 * i])
    adj[x].append(y)
    adj[y].append(x)
cha = [0] * (n + 1)
cha[1] = -1
thu_tu = [1]
for u in thu_tu:
    for v in adj[u]:
        if v != cha[u]:
            cha[v] = u
            thu_tu.append(v)
VC = 10**9
a = [0] * (n + 1); b = [0] * (n + 1); c = [0] * (n + 1)
for v in reversed(thu_tu):
    sa, sb, sc, them, co_den = 1, 0, 0, VC, False
    for u in adj[v]:
        if u == cha[v]:
            continue
        sa += min(a[u], b[u], c[u])
        sb += min(a[u], b[u])
        if a[u] <= b[u]:
            co_den = True
        else:
            them = min(them, a[u] - b[u])
        sc += b[u]
    a[v] = sa
    b[v] = sb if co_den else (VC if them >= VC else sb + them)
    c[v] = min(sc, VC)
with open("LAPDEN.OUT", "w") as fo:
    fo.write(f"{min(a[1], b[1])}\n")
