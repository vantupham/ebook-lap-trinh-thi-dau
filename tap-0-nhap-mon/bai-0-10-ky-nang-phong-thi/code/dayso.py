import sys
sys.stdin = open("DAYSO.INP", "r")
sys.stdout = open("DAYSO.OUT", "w")
data = sys.stdin.read().split()
n = int(data[0])
a = list(map(int, data[1:n + 1]))
print(sum(x for x in a if x > 0), sum(1 for x in a if x % 2 == 0))
