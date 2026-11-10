def main():
    with open("NHAMAY.INP") as f:
        data = f.read().split()
    n, m = int(data[0]), int(data[1])
    t = list(map(int, data[2:2 + n]))
    lo, hi = 1, min(t) * m
    while lo < hi:
        mid = (lo + hi) // 2
        if sum(mid // x for x in t) >= m:
            hi = mid
        else:
            lo = mid + 1
    with open("NHAMAY.OUT", "w") as f:
        f.write(f"{lo}\n")
main()
