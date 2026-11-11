n = int(input())
a = list(map(int, input().split()))
dem = [0] * 11
for x in a:
    dem[x] += 1

cao = 10                      # dò từ điểm 10 xuống tới ô đầu tiên khác 0
while dem[cao] == 0:
    cao -= 1
print(cao, dem[cao])

tot = 0                       # điểm xuất hiện nhiều nhất
for k in range(11):           # duyệt từ nhỏ tới lớn, chỉ đổi khi lớn hơn HẲN
    if dem[k] > dem[tot]:
        tot = k
print(tot)
