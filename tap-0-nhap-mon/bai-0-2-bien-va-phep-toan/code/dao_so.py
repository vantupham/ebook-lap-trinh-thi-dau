n = int(input())
dv, ch, tr = n % 10, n // 10 % 10, n // 100
print(dv * 100 + ch * 10 + tr)
