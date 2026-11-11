data = open("TRAMSAC.INP").read().split()
D, K, n = int(data[0]), int(data[1]), int(data[2])
x = [0] + [int(v) for v in data[3:3 + n]] + [D]
cho_sac, lan = 0, 0
kq = None
for i in range(1, len(x)):
    if x[i] - cho_sac > K:          # không với tới x[i]: phải sạc ở điểm ngay trước
        if x[i - 1] == cho_sac or x[i] - x[i - 1] > K:
            kq = -1
            break
        cho_sac = x[i - 1]
        lan += 1
open("TRAMSAC.OUT", "w").write(f"{lan if kq is None else kq}\n")
