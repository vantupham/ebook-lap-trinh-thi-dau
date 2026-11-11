data = open("CHOHANG.INP", "rb").read().split()
n, k = int(data[0]), int(data[1])
w = list(map(int, data[2:2 + n]))

def du(C):
    chuyen, dang = 1, 0
    for x in w:
        if dang + x > C:
            chuyen += 1
            dang = 0
        dang += x
    return chuyen <= k

lo, hi = max(w), sum(w)
while lo < hi:
    mid = (lo + hi) // 2
    if du(mid):
        hi = mid
    else:
        lo = mid + 1
open("CHOHANG.OUT", "w").write(f"{lo}\n")
