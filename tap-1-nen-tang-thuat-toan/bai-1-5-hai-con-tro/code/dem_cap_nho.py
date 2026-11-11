n, x = map(int, input().split())
a = sorted(map(int, input().split()))
l, r, dem = 0, n - 1, 0
while l < r:
    if a[l] + a[r] <= x:
        dem += r - l
        l += 1
    else:
        r -= 1
print(dem)
