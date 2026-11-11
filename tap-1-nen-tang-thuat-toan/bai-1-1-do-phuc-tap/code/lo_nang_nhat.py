n = int(input())
a = list(map(int, input().split()))
cur = best = a[0]
for i in range(1, n):
    cur = min(a[i], cur + a[i])
    best = min(best, cur)
print(best)
