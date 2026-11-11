s = input().strip()
mo = {')': '(', ']': '[', '}': '{'}
st = []
ok = True
for c in s:
    if c in "([{":
        st.append(c)
    else:
        if not st or st[-1] != mo[c]:
            ok = False
            break
        st.pop()
if st:
    ok = False
print("YES" if ok else "NO")
