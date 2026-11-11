const ALGO = {
  id: 't4-tang-luong', title: 'Luồng cực đại: đường tăng luồng và cạnh ngược',
  desc: 'Mỗi cạnh a → b khả năng c có một <b>cạnh ngược</b> b → a với khả năng bằng luồng đang chảy qua a → b. Lặp: DFS tìm một đường bất kỳ từ s tới t trên các cạnh còn dư (kể cả cạnh ngược), đẩy thêm lượng bằng khả năng dư nhỏ nhất trên đường. Đi qua cạnh ngược nghĩa là <b>rút lại</b> luồng đã đẩy sai.',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-6-luong/',
  code: {
    py: ['while True:', '    tìm một đường s → t (DFS) trên các cạnh có con > 0   ⟦bfs⟧', '    if không có: break', '    d = min(con trên đường)   ⟦nut⟧', '    với mỗi cạnh id trên đường: E[id].con -= d; E[id ^ 1].con += d   ⟦day⟧', '    luong += d', 'print(luong)   ⟦in⟧'],
    cpp: ['while (true) {', '    tìm một đường s → t (DFS) trên các cạnh có con > 0;   ⟦bfs⟧', '    if (không có) break;', '    ll d = min(con trên đường);   ⟦nut⟧', '    với mỗi cạnh id trên đường: E[id].con -= d; E[id ^ 1].con += d;   ⟦day⟧', '    luong += d;', '}', 'cout << luong;   ⟦in⟧'],
  },
  samples: [['4 5\n1 2 1\n1 3 1\n2 3 1\n2 4 1\n3 4 1', 'cần cạnh ngược'], ['4 5\n1 2 3\n2 4 2\n1 3 4\n3 4 5\n4 1 3', 'ví dụ trong bài'], ['5 6\n1 2 10\n1 3 5\n2 3 15\n2 4 5\n3 5 10\n4 5 10', 'năm đỉnh']],
  parse(t) { const v = U.ints(t, 2), [n, m] = v; if (n < 2 || n > 8 || m < 0 || m > 10) throw new Error('Hãy chọn 2 ≤ n ≤ 8, m ≤ 10.'); const e = []; for (let i = 0; i < m; i++) { const [a, b, c] = v.slice(2 + 3 * i, 5 + 3 * i); if (!(a >= 1 && a <= n && b >= 1 && b <= n && c >= 0)) throw new Error('Cạnh a b c.'); e.push([a, b, c]); } return { n, e }; },
  random() { const n = U.rnd(4, 6), m = U.rnd(n, n + 3), e = []; for (let i = 0; i < m; i++) { const a = U.rnd(1, n - 1); let b = U.rnd(2, n); if (b === a) b = n; e.push(`${a} ${b} ${U.rnd(1, 9)}`); } return `${n} ${m}\n` + e.join('\n'); },
  run({ n, e }) {
    const F = [], E = [], g = Array.from({ length: n + 1 }, () => []);
    for (const [a, b, c] of e) { g[a].push(E.length); E.push({ a, b, con: c, cap: c }); g[b].push(E.length); E.push({ a: b, b: a, con: 0, cap: 0 }); }
    let luong = 0, k = 0;
    const view = (hl = {}) => [{ name: 'Các cạnh gốc (luồng / khả năng)', values: e.map((_, i) => `${E[2 * i].a}→${E[2 * i].b}: ${E[2 * i + 1].con}/${E[2 * i].cap}`), noIdx: true, hl, width: 80 }, { name: 'Khả năng dư của cạnh ngược (= luồng đang chảy)', values: e.map((_, i) => `${E[2 * i + 1].a}→${E[2 * i + 1].b}: ${E[2 * i + 1].con}`), noIdx: true, hl: {}, width: 80 }];
    F.push({ at: 'bfs', msg: 'Chưa có luồng. Mọi cạnh ngược có khả năng dư 0.', arrays: view(), vars: { 'luồng': 0 }, fig: true });
    for (;;) {
      const tr = Array(n + 1).fill(-1); tr[1] = -2;
      const dfs = (u) => { if (u === n) return true; for (const id of g[u]) if (E[id].con > 0 && tr[E[id].b] === -1) { tr[E[id].b] = id; if (dfs(E[id].b)) return true; } return false; };
      dfs(1);
      if (tr[n] === -1) break;
      const path = []; for (let v = n; v !== 1; v = E[tr[v]].a) path.unshift(tr[v]);
      const d = Math.min(...path.map((id) => E[id].con)); const nguoc = path.filter((id) => id & 1);
      for (const id of path) { E[id].con -= d; E[id ^ 1].con += d; } luong += d; k++;
      const hl = Object.fromEntries(path.map((id) => [id >> 1, id & 1 ? 'bad' : 'ok']));
      F.push({ at: 'bfs nut day', msg: `Đường tăng ${k}: ${[1, ...path.map((id) => E[id].b)].join(' → ')}, đẩy thêm ${d}.${nguoc.length ? ` Đi qua ${nguoc.length} cạnh ngược (đỏ): rút lại luồng cũ.` : ''} Luồng = ${luong}.`, arrays: view(hl), vars: { 'luồng': luong }, ask: { q: `Đường tăng ${k} đẩy thêm bao nhiêu?`, choices: U.near(d), answer: d }, fig: true });
    }
    F.push({ at: 'in', msg: `Không còn đường tăng: luồng cực đại = ${luong}.`, arrays: view(), vars: { 'luồng': luong }, out: String(luong), fig: true });
    return F;
  },
};
