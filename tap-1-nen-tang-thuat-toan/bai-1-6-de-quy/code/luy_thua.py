def luy_thua(a, b, m):
    if b == 0:
        return 1 % m
    if b % 2 == 0:
        t = luy_thua(a, b // 2, m)
        return t * t % m
    return a * luy_thua(a, b - 1, m) % m

a, b, m = map(int, input().split())
print(luy_thua(a, b, m))
