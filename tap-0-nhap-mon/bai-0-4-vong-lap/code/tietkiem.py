with open("TIETKIEM.INP") as f:
    a, b, p = map(int, f.read().split())
thang = 0
while a < b:
    a += a * p // 100
    thang += 1
with open("TIETKIEM.OUT", "w") as f:
    f.write(f"{thang}\n")
