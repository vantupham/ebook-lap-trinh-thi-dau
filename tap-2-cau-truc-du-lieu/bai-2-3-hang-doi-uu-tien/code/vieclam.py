import heapq
with open("VIECLAM.INP") as f:
    data = f.read().split()
n = int(data[0])
v = sorted((int(data[1 + 2 * i]), int(data[2 + 2 * i])) for i in range(n))
nhan = []
tong = 0
for d, p in v:
    heapq.heappush(nhan, p)
    tong += p
    if len(nhan) > d:
        tong -= heapq.heappop(nhan)
with open("VIECLAM.OUT", "w") as f:
    f.write(f"{tong}\n")
