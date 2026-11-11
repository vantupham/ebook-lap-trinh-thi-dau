import sys
data = sys.stdin.buffer.read().split()
n = int(data[0])
gan_nhat = {}                      # dict của Python: khóa bất kỳ, trung bình O(1)
l = best = 0
for r in range(n):
    k = data[1 + r]
    p = gan_nhat.get(k, -1)
    if p >= l:
        l = p + 1
    gan_nhat[k] = r
    best = max(best, r - l + 1)
print(best)
