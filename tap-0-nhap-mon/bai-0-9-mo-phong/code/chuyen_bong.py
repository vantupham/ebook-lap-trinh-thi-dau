n, k = map(int, input().split())
p = [0] + list(map(int, input().split()))   # p[1..n]
cur = 1
for _ in range(k):
    cur = p[cur]
print(cur)
