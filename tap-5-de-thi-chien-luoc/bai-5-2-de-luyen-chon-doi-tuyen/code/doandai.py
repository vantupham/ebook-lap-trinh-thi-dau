def main():
    with open("DOANDAI.INP") as f:
        data = f.read().split()
    n, s = int(data[0]), int(data[1])
    a = list(map(int, data[2:2 + n]))
    tong = l = best = 0
    for r in range(n):
        tong += a[r]
        while tong > s:
            tong -= a[l]
            l += 1
        best = max(best, r - l + 1)
    with open("DOANDAI.OUT", "w") as f:
        f.write(f"{best}\n")
main()
