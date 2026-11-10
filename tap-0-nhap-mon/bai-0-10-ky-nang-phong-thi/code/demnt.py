import sys
sys.stdin = open("DEMNT.INP", "r")
sys.stdout = open("DEMNT.OUT", "w")
MAX = 10 ** 6
nt = bytearray([1]) * (MAX + 1)
nt[0] = nt[1] = 0
p = 2
while p * p <= MAX:
    if nt[p]:
        nt[p * p::p] = bytearray(len(range(p * p, MAX + 1, p)))   # gạch mọi bội một lượt
    p += 1
dem = [0] * (MAX + 1)
for i in range(1, MAX + 1):
    dem[i] = dem[i - 1] + nt[i]
data = sys.stdin.read().split()
t = int(data[0])
out = []
for k in range(t):
    l, r = int(data[1 + 2 * k]), int(data[2 + 2 * k])
    out.append(dem[r] - dem[l - 1])
print('\n'.join(map(str, out)))
