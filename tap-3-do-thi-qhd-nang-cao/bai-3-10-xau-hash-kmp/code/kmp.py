t = input().strip()
p = input().strip()
s = p + '#' + t
n, m = len(s), len(p)
pi = [0] * n
dem = 0
for i in range(1, n):
    k = pi[i - 1]
    while k > 0 and s[i] != s[k]:
        k = pi[k - 1]
    if s[i] == s[k]:
        k += 1
    pi[i] = k
    if k == m:
        dem += 1
print(dem)
