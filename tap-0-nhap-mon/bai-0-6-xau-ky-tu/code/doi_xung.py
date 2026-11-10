s = input()
t = [ch.lower() for ch in s if ch.isalnum()]   # lọc chữ và số, đổi về thường
print("YES" if t == t[::-1] else "NO")         # t[::-1] là t đảo ngược
