import sys
with open("TOATAU.INP") as f:
    data = f.read().split()
n = int(data[0])
p = list(map(int, data[1:1 + n]))
st = []
ke = 1
ok = True
for x in p:
    while ke <= x:
        st.append(ke)
        ke += 1
    if st[-1] != x:
        ok = False
        break
    st.pop()
with open("TOATAU.OUT", "w") as f:
    f.write("YES\n" if ok else "NO\n")
