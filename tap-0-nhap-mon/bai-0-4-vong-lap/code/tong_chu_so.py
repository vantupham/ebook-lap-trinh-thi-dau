n = int(input())
s = 0
while n > 0:
    s += n % 10     # lấy chữ số cuối
    n //= 10        # bỏ chữ số cuối
print(s)
