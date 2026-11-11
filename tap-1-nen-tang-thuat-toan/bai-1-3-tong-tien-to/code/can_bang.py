import sys
data = sys.stdin.read().split()
s, q = data[0], int(data[1])
n = len(s)
p = [0] * (n + 1)
for i in range(1, n + 1):
    p[i] = p[i - 1] + (1 if s[i - 1] == 'A' else -1)
out = []
for k in range(q):
    l, r = int(data[2 + 2 * k]), int(data[3 + 2 * k])
    out.append("YES" if p[r] == p[l - 1] else "NO")
print('\n'.join(out))
