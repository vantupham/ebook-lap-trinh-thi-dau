import sys
sys.stdin = open("TONGDIEM.INP", "r")      # từ đây input() đọc từ tệp
sys.stdout = open("TONGDIEM.OUT", "w")     # từ đây print() ghi vào tệp

a, b, c = map(int, input().split())
print(a + b + c)
