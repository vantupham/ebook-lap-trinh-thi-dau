n, g, k = map(int, input().split())
can = n * g
print(max(0, can - k))
