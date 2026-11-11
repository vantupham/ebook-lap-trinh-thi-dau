def doi_neu_lon(a, b):
    return (b, a) if a > b else (a, b)

x, y, z = map(int, input().split())
x, y = doi_neu_lon(x, y)
y, z = doi_neu_lon(y, z)
x, y = doi_neu_lon(x, y)
print(x, y, z)
