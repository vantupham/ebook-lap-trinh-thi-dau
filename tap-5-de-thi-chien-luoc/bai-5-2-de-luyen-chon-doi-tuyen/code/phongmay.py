def main():
    with open("PHONGMAY.INP") as f:
        data = list(map(int, f.read().split()))
    n = data[0]
    lop = sorted((data[2 + 2 * i], data[1 + 2 * i]) for i in range(n))   # (kết thúc, bắt đầu)
    het, dem = float("-inf"), 0
    for e, s in lop:
        if s >= het:
            dem += 1
            het = e
    with open("PHONGMAY.OUT", "w") as f:
        f.write(f"{dem}\n")
main()
