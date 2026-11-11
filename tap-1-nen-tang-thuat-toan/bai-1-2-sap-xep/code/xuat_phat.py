n = int(input())
t = list(map(int, input().split()))
cap = sorted((t[i], i + 1) for i in range(n))
print(*[sbd for _, sbd in cap])
