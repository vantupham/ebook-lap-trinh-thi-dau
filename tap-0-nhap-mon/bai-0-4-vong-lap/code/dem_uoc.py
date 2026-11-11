n = int(input())
dem = 0
for d in range(1, n + 1):
    if n % d == 0:
        dem += 1
print(dem)
