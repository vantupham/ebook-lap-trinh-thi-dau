n, k = map(int, input().split())
chon = []
out = []

def thu(bat_dau):
    if len(chon) == k:
        out.append(" ".join(map(str, chon)))
        return
    for v in range(bat_dau, n + 1):
        chon.append(v)
        thu(v + 1)
        chon.pop()             # quay lui

thu(1)
print("\n".join(out))
