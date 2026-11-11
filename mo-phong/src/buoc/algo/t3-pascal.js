const ALGO = {
  id: 't3-pascal', title: 'Tam giác Pascal: C(n, k) chỉ bằng phép cộng',
  desc: 'C(n, k) = C(n − 1, k − 1) + C(n − 1, k): chọn k người từ n người, xét người cuối có được chọn hay không. Mỗi hàng tính từ hàng trên, chỉ cần phép cộng (lấy dư m nếu có), nên dùng được với mọi modulo, kể cả không nguyên tố.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-6-to-hop/',
  code: {
    py: ['C[0][0] = 1   ⟦khoi⟧', 'for i in range(1, n + 1):', '    C[i][0] = 1', '    for j in range(1, i + 1):', '        C[i][j] = (C[i-1][j-1] + C[i-1][j]) % m   ⟦cong⟧', 'print(C[n][k])   ⟦in⟧'],
    cpp: ['C[0][0] = 1;   ⟦khoi⟧', 'for (int i = 1; i <= n; i++) {', '    C[i][0] = 1;', '    for (int j = 1; j <= i; j++)', '        C[i][j] = (C[i-1][j-1] + C[i-1][j]) % m;   ⟦cong⟧', '}', 'cout << C[n][k];   ⟦in⟧'],
  },
  samples: [['5 3 1000000007', 'C(5, 3)'], ['10 4 1000000007', 'C(10, 4)'], ['8 4 6', 'modulo không nguyên tố']],
  parse(t) { const [n, k, m] = U.ints(t, 3); if (n < 0 || n > 10 || k < 0 || k > n || m < 2) throw new Error('Cần 0 ≤ k ≤ n ≤ 10, m ≥ 2.'); return { n, k, m }; },
  random() { const n = U.rnd(4, 9); return `${n} ${U.rnd(0, n)} ${U.pick([1000000007, 10, 6])}`; },
  run({ n, k, m }) {
    const F = [], C = [[1 % m]];
    const view = (hl = {}) => C.map((r, i) => ({ name: `Hàng ${i}`, values: r, labels: r.map((_, j) => `k=${j}`), hl: hl[i] || {}, noIdx: i !== C.length - 1 }));
    F.push({ at: 'khoi', msg: 'Hàng 0: C(0, 0) = 1.', arrays: view(), vars: {}, fig: true });
    for (let i = 1; i <= n; i++) {
      const r = [1 % m]; for (let j = 1; j <= i; j++) r.push(((C[i - 1][j - 1] || 0) + (C[i - 1][j] || 0)) % m); C.push(r);
      const j = Math.floor(i / 2) || 1, x = r[j];
      F.push({ at: 'cong', msg: `Hàng ${i}: mỗi ô bằng tổng hai ô phía trên. Ví dụ C(${i}, ${j}) = ${C[i - 1][j - 1]} + ${C[i - 1][j] || 0}${m < 1e6 ? ` (mod ${m})` : ''} = ${x}.`, arrays: view({ [i - 1]: { [j - 1]: 'mark', ...(j < i ? { [j]: 'mark' } : {}) }, [i]: { [j]: 'ok' } }), vars: { i }, ask: { q: `C(${i}, ${j}) = ?`, choices: U.near(x, [C[i - 1][j - 1]]), answer: x }, fig: i <= 5 });
    }
    F.push({ at: 'in', msg: `C(${n}, ${k}) mod ${m} = ${C[n][k]}.`, arrays: view({ [n]: { [k]: 'ok' } }), vars: {}, out: String(C[n][k]), fig: true });
    return F;
  },
};
