from math import gcd
with open("VUONCAY.INP") as f:
    v = list(map(int, f.read().split()))
n = v[0]
x, y = v[1::2][:n], v[2::2][:n]
s2 = b = 0
for i in range(n):
    j = (i + 1) % n
    s2 += x[i] * y[j] - x[j] * y[i]
    b += gcd(abs(x[j] - x[i]), abs(y[j] - y[i]))
with open("VUONCAY.OUT", "w") as f:
    f.write(str((abs(s2) - b + 2) // 2) + "\n")
