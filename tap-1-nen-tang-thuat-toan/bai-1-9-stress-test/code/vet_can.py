n = int(input())
a = list(map(int, input().split()))
print(max(sum(a[l:r + 1]) for l in range(n) for r in range(l, n)))
