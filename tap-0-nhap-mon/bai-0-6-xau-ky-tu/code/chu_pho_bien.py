s = input().strip()
dem = [0] * 26
for ch in s:
    dem[ord(ch) - ord('a')] += 1
tot = 0
for k in range(26):
    if dem[k] > dem[tot]:
        tot = k
print(chr(ord('a') + tot), dem[tot])
