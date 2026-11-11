m, n = map(int, input().split())
phieu = list(map(int, input().split()))
dem = [0] * (m + 1)
for x in phieu:
    dem[x] += 1
tot = 1
for k in range(2, m + 1):
    if dem[k] > dem[tot]:
        tot = k
print(tot)
