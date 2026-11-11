data = open("HOCBONG.INP", "rb").read().split()
n, k = int(data[0]), int(data[1])
d = sorted(map(int, data[2:2 + n]), reverse=True)
m = d[k - 1]
open("HOCBONG.OUT", "w").write(f"{sum(1 for x in d if x >= m)}\n")
