with open("MATKHAU.INP") as f:
    s = f.readline().strip()
    L, R = map(int, f.readline().split())
n = len(s)
rk = [ord(c) for c in s]
sa = list(range(n))
k = 1
while True:
    key = [(rk[i], rk[i + k] if i + k < n else -1) for i in range(n)]
    sa.sort(key=lambda i: key[i])
    tmp = [0] * n
    for r in range(1, n):
        tmp[sa[r]] = tmp[sa[r - 1]] + (key[sa[r]] != key[sa[r - 1]])
    rk = tmp
    if rk[sa[-1]] == n - 1:
        break
    k *= 2
lcp = [0] * n
h = 0
for i in range(n):
    if rk[i] == 0:
        h = 0
        continue
    j = sa[rk[i] - 1]
    while i + h < n and j + h < n and s[i + h] == s[j + h]:
        h += 1
    lcp[rk[i]] = h
    if h:
        h -= 1
kq = 0
for r in range(n):
    tu, den = max(L, lcp[r] + 1), min(R, n - sa[r])
    if den >= tu:
        kq += den - tu + 1
with open("MATKHAU.OUT", "w") as f:
    f.write(str(kq) + "\n")
