n = int(input())
nt = [True] * (n + 1)
nt[0] = nt[1] = False
p = 2
while p * p <= n:
    if nt[p]:
        for k in range(p * p, n + 1, p):
            nt[k] = False
    p += 1
print(sum(nt))
