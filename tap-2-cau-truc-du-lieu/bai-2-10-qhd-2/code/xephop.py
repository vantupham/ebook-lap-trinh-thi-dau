from bisect import bisect_left
with open("XEPHOP.INP") as f:
    data = f.read().split()
n = int(data[0])
b = sorted(((int(data[1 + 2 * i]), int(data[2 + 2 * i])) for i in range(n)), key=lambda p: (p[0], -p[1]))
tails = []
for w, h in b:
    k = bisect_left(tails, h)
    if k == len(tails):
        tails.append(h)
    else:
        tails[k] = h
with open("XEPHOP.OUT", "w") as f:
    f.write(f"{len(tails)}\n")
