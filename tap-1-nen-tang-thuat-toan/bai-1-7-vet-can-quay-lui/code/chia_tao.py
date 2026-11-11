import sys
sys.setrecursionlimit(100)
n = int(input())
p = list(map(int, input().split()))
tong_ca = sum(p)
best = tong_ca

def thu(i, s):                 # đã xét i quả đầu, nhóm 1 có tổng s
    global best
    if i == n:
        best = min(best, abs(tong_ca - 2 * s))
        return
    thu(i + 1, s + p[i])       # chọn quả i vào nhóm 1
    thu(i + 1, s)              # không chọn

thu(0, 0)
print(best)
