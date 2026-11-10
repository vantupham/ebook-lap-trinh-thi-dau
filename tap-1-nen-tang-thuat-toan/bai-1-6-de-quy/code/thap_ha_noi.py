n = int(input())
buoc = []

def chuyen(n, tu, toi, tg):
    if n == 0:
        return
    chuyen(n - 1, tu, tg, toi)
    buoc.append((tu, toi))
    chuyen(n - 1, tg, toi, tu)

chuyen(n, 1, 3, 2)
print(len(buoc))
print('\n'.join(f"{a} {b}" for a, b in buoc))
