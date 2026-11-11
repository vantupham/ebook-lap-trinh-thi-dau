n, x = map(int, input().split())
c = list(map(int, input().split()))
VC = 10**9
dp = [VC] * (x + 1)
dp[0] = 0
for s in range(1, x + 1):
    best = VC
    for v in c:
        if v <= s and dp[s - v] + 1 < best:
            best = dp[s - v] + 1
    dp[s] = best
print(-1 if dp[x] >= VC else dp[x])
