data = open("QUAYTHU.INP").read().split()
n = int(data[0])
ranh = 0
for i in range(n):
    t, d = int(data[1 + 2 * i]), int(data[2 + 2 * i])
    ranh = max(ranh, t) + d
open("QUAYTHU.OUT", "w").write(f"{ranh}\n")
