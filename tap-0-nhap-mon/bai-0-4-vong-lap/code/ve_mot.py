n = int(input())
buoc = 0
while n != 1:
    if n % 2 == 0:
        n //= 2
    else:
        n = 3 * n + 1
    buoc += 1
print(buoc)
