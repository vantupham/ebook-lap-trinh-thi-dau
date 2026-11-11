import sys
data = open("KHACNHAU.INP", "rb").read().split()
n = int(data[0])
co = bytearray(10**6 + 1)        # bytearray: mảng đánh dấu gọn và nhanh
kq = 0
for x in map(int, data[1:n + 1]):
    if not co[x]:
        co[x] = 1
        kq += 1
open("KHACNHAU.OUT", "w").write(f"{kq}\n")
