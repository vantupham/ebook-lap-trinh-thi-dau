import sys
sys.stdin = open("CAPSO.INP", "rb")
sys.stdout = open("CAPSO.OUT", "w")
data = sys.stdin.read().split()
n, X = int(data[0]), int(data[1])
a = sorted(map(int, data[2:2 + n]))
dem, r = 0, n - 1
for l in range(n):
    while r > l and a[l] + a[r] > X:
        r -= 1
    if r <= l:
        break
    dem += r - l
print(dem)
