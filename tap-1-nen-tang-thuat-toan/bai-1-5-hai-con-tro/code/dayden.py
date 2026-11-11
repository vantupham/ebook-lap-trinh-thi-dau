with open("DAYDEN.INP") as f:
    n, k = map(int, f.readline().split())
    s = f.readline().strip()
hong = l = best = 0
for r in range(n):
    if s[r] == '0':
        hong += 1
    while hong > k:
        if s[l] == '0':
            hong -= 1
        l += 1
    if r - l + 1 > best:
        best = r - l + 1
with open("DAYDEN.OUT", "w") as f:
    f.write(f"{best}\n")
