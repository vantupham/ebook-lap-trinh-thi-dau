with open("CHUYENTHU.INP") as f:
    data = f.read().split()
n = int(data[0])
p = [0] + [int(x) for x in data[1:1 + n]]
kq = [0] * (n + 1)
vitri = [-1] * (n + 1)
for s in range(1, n + 1):
    if kq[s]:
        continue
    duong = []
    x = s
    while not kq[x] and vitri[x] == -1:
        vitri[x] = len(duong)
        duong.append(x)
        x = p[x]
    het = len(duong)
    if not kq[x]:
        dau = vitri[x]
        for k in range(dau, het):
            kq[duong[k]] = het - dau
        het = dau
    for k in range(het - 1, -1, -1):
        kq[duong[k]] = kq[p[duong[k]]] + 1
    for y in duong:
        vitri[y] = -1
with open("CHUYENTHU.OUT", "w") as f:
    f.write(" ".join(map(str, kq[1:])) + "\n")
