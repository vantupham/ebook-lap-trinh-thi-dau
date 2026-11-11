n, x = map(int, input().split())
w = sorted(map(int, input().split()))
l, r, thuyen = 0, n - 1, 0
while l <= r:
    if l < r and w[l] + w[r] <= x:
        l += 1
    r -= 1
    thuyen += 1
print(thuyen)
