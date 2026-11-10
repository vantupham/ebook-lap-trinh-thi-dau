#!/usr/bin/env bash
# Stress test: so lời giải nhanh (C++ và Python) với lời giải vét cạn trên test ngẫu nhiên.
# Chạy trong thư mục code/:  bash stress.sh
set -e
g++ -O2 -o phao_hoa phao_hoa.cpp
for t in $(seq 1 500); do
  python3 -c "
import random
n = random.randint(1, 12); print(n); print(*[random.randint(1, 6) for _ in range(n)])" > in.txt
  a=$(./phao_hoa < in.txt); b=$(python3 phao_hoa.py < in.txt); c=$(python3 phao_hoa_vet_can.py < in.txt)
  if [ "$a" != "$c" ] || [ "$b" != "$c" ]; then echo "SAI với test:"; cat in.txt; exit 1; fi
done
echo "Đúng cả 500 test."
rm -f in.txt phao_hoa
