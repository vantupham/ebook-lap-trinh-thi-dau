import sys
data = sys.stdin.read().split()
R, C, M = int(data[0]), int(data[1]), int(data[2])
g = data[3:3 + R]
s = data[3 + R] if len(data) > 3 + R else ""
W = C + 1                                   # thêm một cột "vách ngăn" luôn bằng 0
trong = 0
for i in range(R):
    for j in range(C):
        if g[i][j] == '.':
            trong |= 1 << (i * W + j)
cu = trong
for ch in s:
    if ch == 'E':   b = cu << 1
    elif ch == 'W': b = cu >> 1
    elif ch == 'S': b = cu << W
    elif ch == 'N': b = cu >> W
    else:           b = (cu << 1) | (cu >> 1) | (cu << W) | (cu >> W)
    cu = b & trong
print(bin(cu).count('1'))
