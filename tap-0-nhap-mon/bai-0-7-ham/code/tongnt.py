def tong_chu_so(x):
    s = 0
    while x > 0:
        s += x % 10
        x //= 10
    return s

def la_nguyen_to(k):
    if k < 2:
        return False
    for d in range(2, k):
        if k % d == 0:
            return False
    return True

with open("TONGNT.INP") as f:
    a, b = map(int, f.read().split())
nt = [la_nguyen_to(k) for k in range(55)]      # tính trước cho mọi tổng có thể
dem = 0
for x in range(a, b + 1):
    if nt[tong_chu_so(x)]:
        dem += 1
with open("TONGNT.OUT", "w") as f:
    f.write(f"{dem}\n")
