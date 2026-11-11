t = int(input())
h = t // 3600            # số giờ tròn
du = t % 3600            # số giây còn thừa sau khi bỏ các giờ tròn
m = du // 60             # số phút tròn trong phần thừa
s = du % 60              # số giây lẻ
print(h, m, s)
