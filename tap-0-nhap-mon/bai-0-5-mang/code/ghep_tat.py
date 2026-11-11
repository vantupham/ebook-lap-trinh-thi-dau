n = int(input())
c = list(map(int, input().split()))
dem = [0] * 1001
for x in c:
    dem[x] += 1
print(sum(k // 2 for k in dem))
