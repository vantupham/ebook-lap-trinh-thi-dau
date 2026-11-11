with open("DONGHO.INP") as f:
    h, m, s, t = map(int, f.read().split())
x = (3600 * h + 60 * m + s + t) % 86400
with open("DONGHO.OUT", "w") as f:
    f.write(f"{x // 3600} {x % 3600 // 60} {x % 60}\n")
