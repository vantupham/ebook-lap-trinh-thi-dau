n = int(input())
a = []
for _ in range(n):
    ten, d = input().split()
    a.append((ten, int(d)))
a.sort(key=lambda x: (-x[1], x[0]))
hang = 0
for i, (ten, d) in enumerate(a):
    if i == 0 or d != a[i - 1][1]:
        hang = i + 1
    print(hang, ten, d)
