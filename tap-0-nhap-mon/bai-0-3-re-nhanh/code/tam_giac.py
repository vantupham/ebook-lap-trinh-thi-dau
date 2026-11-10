a, b, c = sorted(map(int, input().split()))   # sau khi sắp xếp: a <= b <= c
if a + b <= c:
    print("KHONG")
elif a == c:                                   # a <= b <= c và a == c thì cả ba bằng nhau
    print("DEU")
elif a * a + b * b == c * c:
    print("VUONG")
elif a == b or b == c:
    print("CAN")
else:
    print("THUONG")
