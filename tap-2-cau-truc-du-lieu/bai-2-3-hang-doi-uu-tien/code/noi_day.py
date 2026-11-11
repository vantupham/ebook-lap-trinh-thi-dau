import sys, heapq
data = sys.stdin.buffer.read().split()
n = int(data[0])
h = list(map(int, data[1:1 + n]))
heapq.heapify(h)                   # biến list thành heap trong O(n)
tong = 0
while len(h) > 1:
    x = heapq.heappop(h)
    y = heapq.heappop(h)
    tong += x + y
    heapq.heappush(h, x + y)
print(tong)
