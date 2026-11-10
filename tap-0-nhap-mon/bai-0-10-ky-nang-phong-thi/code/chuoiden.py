import sys
sys.stdin = open("CHUOIDEN.INP", "r")
sys.stdout = open("CHUOIDEN.OUT", "w")
s = sys.stdin.readline().strip()
n = len(s)
best = so_doan = cur = 0
for i in range(n):
    cur = cur + 1 if i > 0 and s[i] == s[i - 1] else 1
    if i == n - 1 or s[i + 1] != s[i]:      # đoạn kết thúc tại i
        if cur > best:
            best, so_doan = cur, 1
        elif cur == best:
            so_doan += 1
print(best, so_doan)
