import sys
data = sys.stdin.buffer.read().split()
n = int(data[0])
p = sorted(((int(data[2 + 2 * i]), int(data[1 + 2 * i])) for i in range(n)))   # (kết thúc, bắt đầu)
ranh = dem = 0
for b, a in p:
    if a >= ranh:
        dem += 1
        ranh = b
print(dem)
