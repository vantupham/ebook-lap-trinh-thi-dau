import sys
data = open("CHONQUA.INP").read().split()
n, B = int(data[0]), int(data[1])
c = [int(data[2 + 2 * i]) for i in range(n)]
v = [int(data[3 + 2 * i]) for i in range(n)]
best = 0

def thu(i, gia, diem):
    global best
    if i == n:
        if diem > best:
            best = diem
        return
    if gia + c[i] <= B:              # cắt nhánh: chỉ chọn khi còn đủ tiền
        thu(i + 1, gia + c[i], diem + v[i])
    thu(i + 1, gia, diem)

thu(0, 0, 0)
open("CHONQUA.OUT", "w").write(f"{best}\n")
