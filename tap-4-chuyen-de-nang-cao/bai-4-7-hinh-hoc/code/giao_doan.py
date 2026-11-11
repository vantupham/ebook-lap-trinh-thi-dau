import sys
def cross(o, a, b): return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
def dau(v): return (v > 0) - (v < 0)
def tren_doan(a, b, c):
    return (cross(a, b, c) == 0 and min(a[0], b[0]) <= c[0] <= max(a[0], b[0])
            and min(a[1], b[1]) <= c[1] <= max(a[1], b[1]))
def cat(a, b, c, d):
    if tren_doan(a, b, c) or tren_doan(a, b, d) or tren_doan(c, d, a) or tren_doan(c, d, b):
        return True
    return dau(cross(a, b, c)) * dau(cross(a, b, d)) < 0 and dau(cross(c, d, a)) * dau(cross(c, d, b)) < 0
data = list(map(int, sys.stdin.buffer.read().split()))
out = []
for i in range(data[0]):
    v = data[1 + 8 * i: 9 + 8 * i]
    out.append("YES" if cat(v[0:2], v[2:4], v[4:6], v[6:8]) else "NO")
print("\n".join(out))
