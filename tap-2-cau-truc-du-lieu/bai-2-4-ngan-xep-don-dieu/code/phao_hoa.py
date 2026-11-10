import sys

def main():
    data = sys.stdin.buffer.read().split()
    n = int(data[0])
    h = [0] + list(map(int, data[1:n + 1]))
    st = []                       # ngăn xếp chứa chỉ số
    res = []
    for i in range(1, n + 1):
        while st and h[st[-1]] <= h[i]:
            st.pop()
        res.append(st[-1] if st else 0)
        st.append(i)
    print(' '.join(map(str, res)))

main()
