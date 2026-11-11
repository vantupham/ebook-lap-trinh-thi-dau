import sys
x = 0
it = iter(sys.stdin.buffer.read().split())
n = int(next(it))
for _ in range(n):
    x ^= int(next(it))
print(x)
