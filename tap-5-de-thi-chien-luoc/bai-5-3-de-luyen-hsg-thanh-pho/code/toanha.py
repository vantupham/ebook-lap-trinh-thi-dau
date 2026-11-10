import sys
def main():
    with open("TOANHA.INP", "rb") as f:
        data = f.read().split()
    n = int(data[0])
    h = list(map(int, data[1:1 + n]))
    st, kq = [], 0
    for j in range(n):
        x = h[j]
        while st and h[st[-1]] < x:
            kq += j - st.pop()
        st.append(j)
    with open("TOANHA.OUT", "w") as f:
        f.write(f"{kq}\n")
main()
