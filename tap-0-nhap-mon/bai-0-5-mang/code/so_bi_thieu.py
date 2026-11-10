import sys
data = sys.stdin.buffer.read().split()
n = int(data[0])
co = [False] * (n + 1)          # dùng chỉ số 1..n, bỏ trống ô 0
for x in data[1:n]:
    co[int(x)] = True
for v in range(1, n + 1):
    if not co[v]:
        print(v)
        break
