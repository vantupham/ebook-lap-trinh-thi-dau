import sys
sys.setrecursionlimit(10000)          # Python mặc định chỉ cho khoảng 1000 tầng đệ quy

def giai(l, r, nen):
    kq = 0
    i = l
    while i <= r:
        if a[i] == nen:
            i += 1
            continue
        j = i
        while j + 1 <= r and a[j + 1] > nen:
            j += 1
        m = min(a[i:j + 1])
        kq += 1 + giai(i, j, m)
        i = j + 1
    return kq

data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:n + 1]))
print(giai(0, n - 1, 0))
