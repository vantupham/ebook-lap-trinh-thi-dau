n = int(input())
a = list(map(int, input().split()))
a.sort()
print(min(a[i] - a[i - 1] for i in range(1, n)))
