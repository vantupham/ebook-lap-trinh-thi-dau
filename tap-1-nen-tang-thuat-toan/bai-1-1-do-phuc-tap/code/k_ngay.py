n, k = map(int, input().split())
a = list(map(int, input().split()))
s = sum(a[:k])
best = s
for i in range(k, n):
    s = s + a[i] - a[i - k]
    best = max(best, s)
print(best)
