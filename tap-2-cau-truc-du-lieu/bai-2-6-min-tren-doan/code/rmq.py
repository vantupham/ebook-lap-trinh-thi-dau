import sys
data = sys.stdin.buffer.read().split()
n, q = int(data[0]), int(data[1])
sp = [list(map(int, data[2:2 + n]))]
j = 1
while (1 << j) <= n:
    prev, h = sp[-1], 1 << (j - 1)
    sp.append([min(prev[i], prev[i + h]) for i in range(n - (1 << j) + 1)])
    j += 1
out = []
pos = 2 + n
for _ in range(q):
    l, r = int(data[pos]) - 1, int(data[pos + 1]) - 1
    pos += 2
    k = (r - l + 1).bit_length() - 1             # 2^k <= độ dài
    row = sp[k]
    out.append(min(row[l], row[r - (1 << k) + 1]))
print("\n".join(map(str, out)))
