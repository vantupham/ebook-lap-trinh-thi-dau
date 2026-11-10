n = int(input())
ghe = [0] * n
da_ngoi = [False] * (n + 1)
dem = 0

def xep(k):
    global dem
    if k == n:
        dem += 1
        return
    for v in range(1, n + 1):
        if da_ngoi[v] or (k > 0 and abs(v - ghe[k - 1]) == 1):
            continue
        ghe[k] = v
        da_ngoi[v] = True
        xep(k + 1)
        da_ngoi[v] = False

xep(0)
print(dem)
