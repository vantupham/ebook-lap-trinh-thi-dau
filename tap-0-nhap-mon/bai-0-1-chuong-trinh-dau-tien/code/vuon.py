import sys
sys.stdin = open("VUON.INP", "r")
sys.stdout = open("VUON.OUT", "w")
d, r = map(int, input().split())
print(2 * (d + r))
print(d * r)
