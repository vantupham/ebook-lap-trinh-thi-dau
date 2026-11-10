import sys
d = sys.stdin.read().split(); n = int(d[0]); h = [0] + list(map(int, d[1:n+1]))
out = []
for i in range(1, n+1):
    a = 0
    for j in range(i-1, 0, -1):
        if h[j] > h[i]: a = j; break
    out.append(a)
print(' '.join(map(str, out)))
