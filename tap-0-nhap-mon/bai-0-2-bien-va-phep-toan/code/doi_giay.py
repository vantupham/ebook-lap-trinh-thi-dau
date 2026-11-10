t = int(input())
h = t // 3600            # số giờ tròn
m = t % 3600 // 60       # phần dư sau khi bỏ giờ, đổi ra phút
s = t % 60               # số giây lẻ
print(h, m, s)
