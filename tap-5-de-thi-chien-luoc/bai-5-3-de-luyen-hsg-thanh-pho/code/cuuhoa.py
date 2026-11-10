def main():
    with open("CUUHOA.INP") as f:
        data = f.read().split()
    r, c = int(data[0]), int(data[1])
    W = c + 2                                     # thêm viền '#' quanh lưới để khỏi kiểm tra biên
    g = "#" * W + "".join("#" + row + "#" for row in data[2:2 + r]) + "#" * W
    d = [-1] * len(g)
    q = [i for i, ch in enumerate(g) if ch == "F"]   # mảng một chiều làm hàng đợi: nhanh hơn deque
    for i in q:
        d[i] = 0
    for u in q:                                   # q dài thêm trong lúc duyệt: đúng thứ tự BFS
        du = d[u] + 1
        for v in (u - 1, u + 1, u - W, u + W):
            if d[v] == -1 and g[v] != "#":
                d[v] = du
                q.append(v)
    kq = 0
    for i, ch in enumerate(g):
        if ch == ".":
            if d[i] == -1:
                kq = -1
                break
            kq = max(kq, d[i])
    with open("CUUHOA.OUT", "w") as f:
        f.write(f"{kq}\n")
main()
