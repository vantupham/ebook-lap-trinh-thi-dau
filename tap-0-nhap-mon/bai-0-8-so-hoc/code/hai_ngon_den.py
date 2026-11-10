def ucln(a, b):
    while b != 0:
        a, b = b, a % b
    return a

a, b = map(int, input().split())
print(a // ucln(a, b) * b)      # chia TRƯỚC rồi mới nhân
