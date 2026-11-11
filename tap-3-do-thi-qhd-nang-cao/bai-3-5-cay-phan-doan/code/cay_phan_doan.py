import sys
data = sys.stdin.buffer.read().split()
n, q = int(data[0]), int(data[1])
INF = float('inf')
t = [INF] * n + [int(x) for x in data[2:2 + n]]
for i in range(n - 1, 0, -1):
    t[i] = min(t[2 * i], t[2 * i + 1])
out = []
p = 2 + n
for _ in range(q):
    loai, a, b = int(data[p]), int(data[p + 1]), int(data[p + 2])
    p += 3
    if loai == 1:
        i = a - 1 + n
        t[i] = b
        while i > 1:
            i >>= 1
            t[i] = min(t[2 * i], t[2 * i + 1])
    else:
        l, r, kq = a - 1 + n, b + n, INF
        while l < r:
            if l & 1:
                kq = min(kq, t[l]); l += 1
            if r & 1:
                r -= 1; kq = min(kq, t[r])
            l >>= 1; r >>= 1
        out.append(kq)
print("\n".join(map(str, out)))
