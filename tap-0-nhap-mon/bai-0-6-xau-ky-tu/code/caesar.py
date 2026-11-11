with open("CAESAR.INP") as f:
    k = int(f.readline()) % 26
    s = f.readline().rstrip("\r\n")
kq = []
for ch in s:
    if 'a' <= ch <= 'z':
        kq.append(chr(ord('a') + (ord(ch) - ord('a') + k) % 26))
    elif 'A' <= ch <= 'Z':
        kq.append(chr(ord('A') + (ord(ch) - ord('A') + k) % 26))
    else:
        kq.append(ch)
with open("CAESAR.OUT", "w") as f:
    f.write("".join(kq) + "\n")
