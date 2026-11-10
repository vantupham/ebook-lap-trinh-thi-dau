n = int(input())
a = list(map(int, input().split()))
dem = [0] * 11
for x in a:
    dem[x] += 1

cao = max(a)
print(cao, dem[cao])

tot = 0                       # điểm xuất hiện nhiều nhất
for k in range(11):           # duyệt từ nhỏ tới lớn, chỉ đổi khi lớn hơn HẲN
    if dem[k] > dem[tot]:
        tot = k
print(tot)
