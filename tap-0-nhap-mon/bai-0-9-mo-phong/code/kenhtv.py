import sys
data = sys.stdin.buffer.read().split()
n, m, p = int(data[0]), int(data[1]), int(data[2])
sau = [0] * (m + 1)
for i in range(n):
    ai, bi = int(data[3 + 2 * i]), int(data[4 + 2 * i])
    if sau[bi] == 0:                # chỉ người nhỏ tuổi nhất ghét bi được ghi
        sau[bi] = ai

da_gap = [False] * (m + 1)
cur, doi = p, 0
while sau[cur] != 0:
    if da_gap[cur]:
        doi = -1
        break
    da_gap[cur] = True
    cur = sau[cur]
    doi += 1
print(doi)
