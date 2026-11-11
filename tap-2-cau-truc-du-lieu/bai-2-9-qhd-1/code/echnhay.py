with open("ECHNHAY.INP") as f:
    data = f.read().split()
n, K = int(data[0]), int(data[1])
h = list(map(int, data[2:2 + n]))
dp = [0] * n
for i in range(1, n):
    hi = h[i]
    dp[i] = min(dp[j] + abs(hi - h[j]) for j in range(max(0, i - K), i))
with open("ECHNHAY.OUT", "w") as f:
    f.write(f"{dp[n - 1]}\n")
