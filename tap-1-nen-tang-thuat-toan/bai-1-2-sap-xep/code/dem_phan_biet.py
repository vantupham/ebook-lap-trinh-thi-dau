import sys
data = sys.stdin.buffer.read().split()
n = int(data[0])
a = sorted(map(int, data[1:n + 1]))
print(sum(1 for i in range(n) if i == 0 or a[i] != a[i - 1]))
