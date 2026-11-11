d, m, y = map(int, input().split())
nhuan = y % 400 == 0 or (y % 4 == 0 and y % 100 != 0)
if m < 1 or m > 12:
    toi_da = 0
elif m == 2:
    toi_da = 29 if nhuan else 28
elif m in (4, 6, 9, 11):
    toi_da = 30
else:
    toi_da = 31
print("YES" if 1 <= d <= toi_da else "NO")
