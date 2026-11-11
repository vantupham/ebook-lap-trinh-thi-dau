from functools import lru_cache
with open("SOLOC.INP") as f:
    a, b, K = map(int, f.read().split())

def dem(N):
    if N < 0:
        return 0
    s = str(N)

    @lru_cache(None)
    def tu(i, dem6, bam):
        if dem6 > K:
            return 0
        if i == len(s):
            return 1 if dem6 == K else 0
        gh = int(s[i]) if bam else 9
        return sum(tu(i + 1, dem6 + (d == 6), bam and d == gh) for d in range(gh + 1) if d != 4)

    return tu(0, 0, True)

with open("SOLOC.OUT", "w") as f:
    f.write(f"{dem(b) - dem(a - 1)}\n")
