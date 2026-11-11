n, S = map(int, input().split())
a = list(map(int, input().split()))
tong = l = 0
best = n + 1
for r in range(n):
    tong += a[r]
    while tong >= S:
        best = min(best, r - l + 1)
        tong -= a[l]
        l += 1
print(best if best <= n else 0)
