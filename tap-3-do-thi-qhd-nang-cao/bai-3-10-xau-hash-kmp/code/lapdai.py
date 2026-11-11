import random
with open("LAPDAI.INP") as f:
    s = f.read().split()[0]
n = len(s)
M = (1 << 61) - 1                                       # một modulo rất lớn, Python tính số lớn được
B = random.randrange(10**5, 10**6)
h = [0] * (n + 1)
p = [1] * (n + 1)
for i, ch in enumerate(s):
    h[i + 1] = (h[i] * B + ord(ch)) % M
    p[i + 1] = p[i] * B % M

def co_lap(L):
    da_thay = set()
    pL = p[L]
    for i in range(n - L + 1):
        x = (h[i + L] - h[i] * pL) % M
        if x in da_thay:
            return True
        da_thay.add(x)
    return False

lo, hi = 0, n - 1
while lo < hi:
    mid = (lo + hi + 1) // 2
    if co_lap(mid):
        lo = mid
    else:
        hi = mid - 1
with open("LAPDAI.OUT", "w") as f:
    f.write(f"{lo}\n")
