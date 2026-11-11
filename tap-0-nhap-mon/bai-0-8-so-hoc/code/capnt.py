with open("CAPNT.INP") as f:
    n = int(f.read())
nt = bytearray([1]) * (n + 3)
nt[0] = nt[1] = 0
p = 2
while p * p <= n:
    if nt[p]:
        nt[p * p::p] = bytes(len(range(p * p, n + 3, p)))
    p += 1
dem = sum(1 for q in range(2, n - 1) if nt[q] and nt[q + 2])
with open("CAPNT.OUT", "w") as f:
    f.write(f"{dem}\n")
