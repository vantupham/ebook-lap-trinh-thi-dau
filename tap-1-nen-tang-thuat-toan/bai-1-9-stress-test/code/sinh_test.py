import random, sys
random.seed(int(sys.argv[1]))           # truyền hạt giống để tái tạo được test
n = random.randint(1, 6)
print(n)
print(*[random.randint(-5, 5) for _ in range(n)])
