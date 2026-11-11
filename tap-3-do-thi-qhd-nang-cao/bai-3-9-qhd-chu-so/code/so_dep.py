from functools import lru_cache

def dem(N):
    if N < 0:
        return 0
    s = str(N)

    @lru_cache(None)
    def tu(i, truoc, bam, bat_dau):
        if i == len(s):
            return 1
        gh = int(s[i]) if bam else 9
        kq = 0
        for d in range(gh + 1):
            if bat_dau and d == truoc:
                continue
            bd = bat_dau or d != 0
            kq += tu(i + 1, d if bd else 10, bam and d == gh, bd)
        return kq

    return tu(0, 10, True, False)

a, b = map(int, input().split())
print(dem(b) - dem(a - 1))
