import sys
sys.stdin = open("CHIAKEO.INP", "r")
sys.stdout = open("CHIAKEO.OUT", "w")
data = sys.stdin.read().split()
n = int(data[0])
w = list(map(int, data[1:n + 1]))
s = [0, 0, 0]
best = None

def chia(i):
    global best
    if i == n:
        d = max(s) - min(s)
        if best is None or d < best:
            best = d
        return
    for b in range(1 if i == 0 else 3):
        s[b] += w[i]
        chia(i + 1)
        s[b] -= w[i]

chia(0)
print(best)
