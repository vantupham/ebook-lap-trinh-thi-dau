import subprocess, sys
nhanh = sys.argv[1]                      # ví dụ: ./kadane_sai  (đã biên dịch)
for seed in range(1, 1001):
    test = subprocess.run([sys.executable, "sinh_test.py", str(seed)], capture_output=True, text=True).stdout
    a = subprocess.run([nhanh], input=test, capture_output=True, text=True).stdout.split()
    b = subprocess.run([sys.executable, "vet_can.py"], input=test, capture_output=True, text=True).stdout.split()
    if a != b:
        print("SAI với test:\n" + test + f"Lời giải nhanh: {a}, vét cạn: {b}")
        break
else:
    print("Đúng cả 1000 test")
