import sys
def ucln(a, b):
    while b != 0:
        a, b = b, a % b
    return a

data = sys.stdin.read().split()
n = int(data[0])
g = 0
for x in data[1:n + 1]:
    g = ucln(g, int(x))
print(g)
