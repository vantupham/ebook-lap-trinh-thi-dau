n = int(input())

def tong_boi(k):            # tổng k + 2k + ... + mk, với m = n // k
    m = n // k
    return k * m * (m + 1) // 2

print(tong_boi(3) + tong_boi(5) - tong_boi(15))
