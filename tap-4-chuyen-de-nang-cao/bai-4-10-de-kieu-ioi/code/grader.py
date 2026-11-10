import subprocess, sys
def cham(chuong_trinh, n, x, toi_da=30):
    p = subprocess.Popen([chuong_trinh], stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
    p.stdin.write(f"{n}\n"); p.stdin.flush()
    so_cau = 0
    while True:
        dong = p.stdout.readline().split()
        if not dong: return "Chương trình dừng mà chưa trả lời"
        if dong[0] == "!":
            p.wait()
            return "OK" if int(dong[1]) == x else f"Sai: đoán {dong[1]}, đúng là {x}"
        so_cau += 1
        if so_cau > toi_da:
            p.kill(); return "Hỏi quá nhiều"
        p.stdin.write("1\n" if x >= int(dong[1]) else "0\n"); p.stdin.flush()
if __name__ == "__main__":
    print(cham(sys.argv[1], int(sys.argv[2]), int(sys.argv[3])))
