# Subtask 40%: de quy chia tai gia tri nho nhat, O(N^2)
import sys
sys.setrecursionlimit(10000)
def solve(a, l, r, base):
    # dem so buoc cho doan a[l..r], moi o da co san 'base' vien
    res = 0
    i = l
    while i <= r:
        if a[i] == base:
            i += 1; continue
        j = i
        while j + 1 <= r and a[j + 1] > base: j += 1
        m = min(a[i:j + 1])
        res += 1 + solve(a, i, j, m)
        i = j + 1
    return res
d = open("XAYTUONG.INP").read().split(); n = int(d[0]); a = list(map(int, d[1:n+1]))
open("XAYTUONG.OUT", "w").write(str(solve(a, 0, n - 1, 0)) + "\n")
