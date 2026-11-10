s = input().strip()
co_hoa = co_thuong = co_so = False
for ch in s:
    if 'A' <= ch <= 'Z':
        co_hoa = True
    elif 'a' <= ch <= 'z':
        co_thuong = True
    elif '0' <= ch <= '9':
        co_so = True
if len(s) >= 8 and co_hoa and co_thuong and co_so:
    print("MANH")
else:
    print("YEU")
