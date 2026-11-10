def la_nguyen_to(n):
    if n < 2:
        return False
    d = 2
    while d * d <= n:          # tương đương d <= căn n, nhưng không dùng số thực
        if n % d == 0:
            return False
        d += 1
    return True

n = int(input())
print("YES" if la_nguyen_to(n) else "NO")
