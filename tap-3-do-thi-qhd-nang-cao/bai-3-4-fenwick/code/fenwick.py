import sys
data = sys.stdin.buffer.read().split()
n, q = int(data[0]), int(data[1])
a = [0] + [int(x) for x in data[2:2 + n]]
t = [0] * (n + 1)
for i in range(1, n + 1):                  # dựng trong O(n): đẩy giá trị lên ô cha
    t[i] += a[i]
    j = i + (i & -i)
    if j <= n:
        t[j] += t[i]

def cong(i, v):
    while i <= n:
        t[i] += v
        i += i & -i

def tong(i):
    s = 0
    while i > 0:
        s += t[i]
        i -= i & -i
    return s

out = []
p = 2 + n
for _ in range(q):
    loai, x, y = int(data[p]), int(data[p + 1]), int(data[p + 2])
    p += 3
    if loai == 1:
        cong(x, y - a[x])
        a[x] = y
    else:
        out.append(tong(y) - tong(x - 1))
print("\n".join(map(str, out)))
