import sys
data = sys.stdin.buffer.read().split()
n, k = int(data[0]), int(data[1])
p = sorted(int(x) for x in data[2:2 + k])
thang = bytearray(n + 1)
for i in range(1, n + 1):
    for x in p:
        if x > i:
            break
        if not thang[i - x]:
            thang[i] = 1
            break
print("".join("W" if thang[i] else "L" for i in range(1, n + 1)))
