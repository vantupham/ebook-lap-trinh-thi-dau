import sys

def main():
    with open("XAYTUONG.INP", "rb") as f:
        data = f.read().split()
    n = int(data[0])
    st = [0]
    ans = 0
    for x in map(int, data[1:n + 1]):
        while st[-1] > x:
            st.pop()
        if st[-1] < x:
            st.append(x)
            ans += 1
    with open("XAYTUONG.OUT", "w") as f:
        f.write(str(ans) + "\n")

main()
