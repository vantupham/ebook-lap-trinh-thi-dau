import sys
P = 10**9 + 7
data = sys.stdin.buffer.read().split()
q = int(data[0])
qs = [(int(data[1 + 2 * i]), int(data[2 + 2 * i])) for i in range(q)]
N = max(a for a, _ in qs)
gt = [1] * (N + 1)
for i in range(1, N + 1):
    gt[i] = gt[i - 1] * i % P
ngd = [1] * (N + 1)
ngd[N] = pow(gt[N], P - 2, P)              # pow(x, e, m) của Python là lũy thừa nhanh
for i in range(N, 0, -1):
    ngd[i - 1] = ngd[i] * i % P
print("\n".join(str(gt[a] * ngd[b] % P * ngd[a - b] % P) for a, b in qs))
