n = int(input())
dem = 0
d = 1
while d * d <= n:
    if n % d == 0:
        dem += 1 if d * d == n else 2
    d += 1
print(dem)
