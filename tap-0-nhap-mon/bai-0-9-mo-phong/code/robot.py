m = int(input())
s = input().strip()
vi_tri = 0
for lenh in s:
    if lenh == 'L' and vi_tri > 0:
        vi_tri -= 1
    elif lenh == 'R' and vi_tri < m:
        vi_tri += 1
print(vi_tri)
