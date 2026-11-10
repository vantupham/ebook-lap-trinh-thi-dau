import sys
data = sys.stdin.read().split()
R, C, M = int(data[0]), int(data[1]), int(data[2])
g = data[3:3 + R]
s = data[3 + R] if len(data) > 3 + R else ""
co = [[g[i][j] == '.' for j in range(C)] for i in range(R)]
buoc = {'E': (0, 1), 'W': (0, -1), 'S': (1, 0), 'N': (-1, 0)}
for ch in s:
    huong = list(buoc.values()) if ch == '?' else [buoc[ch]]
    moi = [[False] * C for _ in range(R)]
    for i in range(R):
        for j in range(C):
            if co[i][j]:
                for di, dj in huong:
                    ni, nj = i + di, j + dj
                    if 0 <= ni < R and 0 <= nj < C and g[ni][nj] == '.':
                        moi[ni][nj] = True
    co = moi
print(sum(map(sum, co)))
