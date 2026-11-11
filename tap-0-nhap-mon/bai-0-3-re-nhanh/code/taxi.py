with open("TAXI.INP") as f:
    d = int(f.read())
if d == 1:
    tien = 15000
elif d <= 30:
    tien = 15000 + (d - 1) * 12000
else:
    tien = 15000 + 29 * 12000 + (d - 30) * 10000
with open("TAXI.OUT", "w") as f:
    f.write(f"{tien}\n")
