def tong_uoc_nho_hon(x):
    s = 0
    for d in range(1, x):
        if x % d == 0:
            s += d
    return s

n = int(input())
for x in range(1, n + 1):
    if tong_uoc_nho_hon(x) == x:
        print(x)
