n = int(input())
out = []

def sinh(s):
    if len(s) == n:
        out.append(s)
        return
    sinh(s + "0")
    if not s or s[-1] != "1":
        sinh(s + "1")

sinh("")
print("\n".join(out))
