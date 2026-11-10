from collections import deque
def main():
    with open("CUASO.INP", "rb") as f:
        data = f.read().split()
    n, k, d = int(data[0]), int(data[1]), int(data[2])
    a = list(map(int, data[3:3 + n]))
    mx, mn = deque(), deque()
    dem = 0
    for i in range(n):
        x = a[i]
        while mx and a[mx[-1]] <= x:
            mx.pop()
        while mn and a[mn[-1]] >= x:
            mn.pop()
        mx.append(i)
        mn.append(i)
        if mx[0] <= i - k:
            mx.popleft()
        if mn[0] <= i - k:
            mn.popleft()
        if i >= k - 1 and a[mx[0]] - a[mn[0]] <= d:
            dem += 1
    with open("CUASO.OUT", "w") as f:
        f.write(f"{dem}\n")
main()
