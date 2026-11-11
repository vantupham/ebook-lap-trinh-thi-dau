from collections import deque
n = int(input())
q = deque(range(1, n + 1))
loai = []
while q:
    q.append(q.popleft())      # bỏ qua: đưa xuống cuối hàng
    loai.append(q.popleft())
print(*loai)
