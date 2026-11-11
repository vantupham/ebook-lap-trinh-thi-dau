const ALGO = {
  id: 't2-bfs-luoi', title: 'BFS trên lưới: mê cung',
  desc: 'BFS lan theo <b>từng lớp</b>: lấy ô ở đầu hàng đợi, ghi khoảng cách d + 1 cho mọi ô kề chưa thăm rồi đưa chúng vào cuối hàng. Vì hàng đợi vào trước ra trước, mọi ô cách k bước được xử lý trước mọi ô cách k + 1 bước, nên số ghi lần đầu là ngắn nhất.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-7-bfs-dfs/',
  code: {
    py: ['d[A] = 0; q = deque([A])   ⟦khoi⟧', 'while q:', '    i, j = q.popleft()   ⟦lay⟧', '    if g[i][j] == "B": print(d[i][j]); break   ⟦dich⟧', '    for ô (ni, nj) kề (i, j):', '        if trong lưới, không phải "#", d[ni][nj] == -1:', '            d[ni][nj] = d[i][j] + 1; q.append((ni, nj))   ⟦day⟧', 'else: print(-1)   ⟦khong⟧'],
    cpp: ['d[A] = 0; q.push(A);   ⟦khoi⟧', 'while (!q.empty()) {', '    auto [i, j] = q.front(); q.pop();   ⟦lay⟧', '    if (g[i][j] == \'B\') { cout << d[i][j]; return 0; }   ⟦dich⟧', '    for (4 hướng) {', '        if (ra ngoài || g[ni][nj] == \'#\' || d[ni][nj] != -1) continue;', '        d[ni][nj] = d[i][j] + 1; q.push({ni, nj});   ⟦day⟧', '    }', '}', 'cout << -1;   ⟦khong⟧'],
  },
  samples: [['5 8\n########\n#.A#...#\n#.##.#B#\n#......#\n########', 'ví dụ trong bài'], ['4 5\nA....\n.###.\n.#B#.\n.....', 'không tới được'], ['3 6\nA.....\n......\n.....B', 'lưới trống']],
  parse(t) {
    const L = t.trim().split(/\s+/), [R, C] = L.slice(0, 2).map(Number);
    if (!(R >= 1 && R <= 7 && C >= 1 && C <= 10)) throw new Error('Hãy chọn R ≤ 7, C ≤ 10.');
    const g = L.slice(2, 2 + R); if (g.length < R || g.some((r) => r.length !== C || /[^.#AB]/.test(r))) throw new Error(`Cần ${R} dòng, mỗi dòng ${C} ký tự trong . # A B.`);
    if (g.join('').split('A').length !== 2 || g.join('').split('B').length !== 2) throw new Error('Cần đúng một ô A và một ô B.');
    return { R, C, g };
  },
  random() { const R = U.rnd(4, 6), C = U.rnd(5, 8); const g = Array.from({ length: R }, () => Array.from({ length: C }, () => Math.random() < .25 ? '#' : '.')); const c = U.shuffle([...Array(R * C).keys()]); g[Math.floor(c[0] / C)][c[0] % C] = 'A'; g[Math.floor(c[1] / C)][c[1] % C] = 'B'; return `${R} ${C}\n` + g.map((r) => r.join('')).join('\n'); },
  run({ R, C, g }) {
    const F = [], d = g.map((r) => [...r].map(() => -1)), q = []; let A, B;
    g.forEach((r, i) => [...r].forEach((c, j) => { if (c === 'A') A = [i, j]; if (c === 'B') B = [i, j]; }));
    const grid = (hl = {}) => [{ name: 'Lưới (số trong ô: khoảng cách d; ô B ghi "B" khi chưa tới)', values: g.flatMap((r, i) => [...r].map((c, j) => c === '#' ? '#' : d[i][j] >= 0 ? d[i][j] : c === 'B' ? 'B' : c === 'A' ? 'A' : '')), noIdx: true, cols: C, hl: Object.assign(Object.fromEntries(g.flatMap((r, i) => [...r].map((c, j) => [i * C + j, c === '#' ? 'dim' : d[i][j] >= 0 ? 'done' : '']))), hl) },
      { name: 'Hàng đợi (đầu → cuối), mỗi phần tử là (hàng, cột)', values: q.map(([i, j]) => `${i},${j}`), noIdx: true, hl: q.length ? { 0: 'mark' } : {}, width: 52 }];
    const id = (i, j) => i * C + j;
    d[A[0]][A[1]] = 0; q.push(A);
    F.push({ at: 'khoi', msg: `Ô A (${A[0]}, ${A[1]}) có d = 0, đưa vào hàng đợi.`, arrays: grid({ [id(...A)]: 'cur' }), vars: { 'lớp': 0 }, fig: true });
    let lop = 0, ans = -1;
    while (q.length) {
      const [i, j] = q[0];
      if (d[i][j] > lop) { lop = d[i][j]; F.push({ at: 'lay', msg: `Đã xử lý xong mọi ô cách ${lop - 1} bước. Bắt đầu lớp ${lop}: mọi ô trong hàng đợi có d = ${lop}.`, arrays: grid(), vars: { 'lớp': lop }, fig: lop <= 3 || lop % 3 === 0 }); }
      q.shift();
      if (i === B[0] && j === B[1]) { ans = d[i][j]; F.push({ at: 'dich', msg: `Lấy ra ô B: d = ${ans}. Đây là số bước ít nhất.`, arrays: grid({ [id(i, j)]: 'ok' }), vars: { 'lớp': lop }, out: String(ans), fig: true }); break; }
      const moi = [];
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const ni = i + a, nj = j + b; if (ni < 0 || ni >= R || nj < 0 || nj >= C || g[ni][nj] === '#' || d[ni][nj] !== -1) continue; d[ni][nj] = d[i][j] + 1; q.push([ni, nj]); moi.push([ni, nj]); }
      F.push({ at: moi.length ? 'lay day' : 'lay', msg: `Lấy (${i}, ${j}) có d = ${d[i][j]}. ${moi.length ? `Ô kề chưa thăm: ${moi.map(([a, b]) => `(${a}, ${b})`).join(', ')}, ghi d = ${d[i][j] + 1}, đưa vào cuối hàng.` : 'Không có ô kề nào chưa thăm.'}`, arrays: grid({ [id(i, j)]: 'cur', ...Object.fromEntries(moi.map(([a, b]) => [id(a, b), 'ok'])) }), vars: { 'lớp': lop }, ask: { q: `Lấy (${i}, ${j}) ra: có bao nhiêu ô mới được đưa vào hàng đợi?`, choices: U.near(moi.length), answer: moi.length } });
    }
    if (ans < 0) F.push({ at: 'khong', msg: 'Hàng đợi rỗng mà chưa gặp B: không tới được, in −1.', arrays: grid({ [id(...B)]: 'bad' }), vars: { 'lớp': lop }, out: '-1', fig: true });
    return U.limit(F);
  },
};
