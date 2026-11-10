n, m, p = map(int, input().split())
a = [0] * (n + 1)
b = [0] * (n + 1)
for i in range(1, n + 1):
    a[i], b[i] = map(int, input().split())

da_gap = [False] * (m + 1)
cur, doi = p, 0
while True:
    if da_gap[cur]:                 # kênh lặp lại: chuyển mãi không dừng
        print(-1)
        break
    da_gap[cur] = True
    nguoi = 0
    for i in range(1, n + 1):       # tìm người nhỏ tuổi nhất ghét cur
        if b[i] == cur:
            nguoi = i
            break
    if nguoi == 0:                  # không ai ghét: xong
        print(doi)
        break
    cur = a[nguoi]
    doi += 1
