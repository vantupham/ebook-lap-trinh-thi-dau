with open("SOTHICH.INP") as f:
    data = f.read().split()
n, m = int(data[0]), int(data[1])
a = [int(t, 2) for t in data[2:2 + n]]
dem = 0
for i in range(n):
    x = a[i]
    for j in range(i + 1, n):
        if x & a[j]:
            dem += 1
with open("SOTHICH.OUT", "w") as f:
    f.write(f"{dem}\n")
