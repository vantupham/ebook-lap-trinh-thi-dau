import sys
data = sys.stdin.buffer.read().split()
n = int(data[0])
viec = sorted((int(data[1 + 2 * i]), int(data[2 + 2 * i])) for i in range(n))
f = diem = 0
for t, d in viec:
    f += t
    diem += d - f
print(diem)
