data = open("MUABAN.INP", "rb").read().split()
n = int(data[0])
p = list(map(int, data[1:n + 1]))
thap, lai = p[0], 0
for x in p[1:]:
    lai = max(lai, x - thap)
    thap = min(thap, x)
open("MUABAN.OUT", "w").write(f"{lai}\n")
