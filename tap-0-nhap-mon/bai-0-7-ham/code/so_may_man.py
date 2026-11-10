def tong_chu_so(n):
    s = 0
    while n > 0:
        s += n % 10
        n //= 10
    return s

def la_doi_xung(n):
    t = str(n)
    return t == t[::-1]

def may_man(n):
    return la_doi_xung(n) and tong_chu_so(n) % 3 == 0

a, b = map(int, input().split())
print(sum(1 for n in range(a, b + 1) if may_man(n)))
