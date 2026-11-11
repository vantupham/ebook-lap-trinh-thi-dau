const ALGO = {
  id: 't3-floyd', title: 'Floyd–Warshall: mọi cặp đỉnh',
  desc: 'd[i][j] ban đầu là cạnh trực tiếp. Lần lượt cho phép đi qua đỉnh trung gian k = 1, 2, …, n: d[i][j] = min(d[i][j], d[i][k] + d[k][j]). Sau bước k, d[i][j] là đường ngắn nhất chỉ đi qua các đỉnh trung gian thuộc {1..k}.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-1-duong-di-ngan-nhat/',
  code: {
    py: ['# d[i][j]: cạnh trực tiếp, d[i][i] = 0, còn lại VC   ⟦khoi⟧', 'for k in range(1, n + 1):   ⟦k⟧', '    for i in range(1, n + 1):', '        for j in range(1, n + 1):', '            d[i][j] = min(d[i][j], d[i][k] + d[k][j])   ⟦cap⟧'],
    cpp: ['// d[i][j]: cạnh trực tiếp, d[i][i] = 0, còn lại VC   ⟦khoi⟧', 'for (int k = 1; k <= n; k++)   ⟦k⟧', '    for (int i = 1; i <= n; i++)', '        for (int j = 1; j <= n; j++)', '            d[i][j] = min(d[i][j], d[i][k] + d[k][j]);   ⟦cap⟧'],
  },
  samples: [['4 4\n1 2 5\n1 3 9\n2 3 3\n3 4 1', 'bốn đỉnh, đường hai chiều'], ['4 5\n1 2 1\n2 3 1\n3 4 1\n1 4 10\n1 3 5', 'đường vòng ngắn hơn'], ['5 4\n1 2 2\n2 3 2\n3 4 2\n4 5 2', 'đường thẳng']],
  parse(t) { const v = U.ints(t, 2), [n, m] = v; if (n < 1 || n > 5 || m < 0 || m > 10) throw new Error('Hãy chọn n ≤ 5, m ≤ 10.'); if (v.length < 2 + 3 * m) throw new Error('Thiếu cạnh.'); const e = []; for (let i = 0; i < m; i++) { const [a, b, c] = v.slice(2 + 3 * i, 5 + 3 * i); if (a < 1 || a > n || b < 1 || b > n || c < 0) throw new Error('Cạnh a b c.'); e.push([a, b, c]); } return { n, e }; },
  random() { const n = U.rnd(3, 5), m = U.rnd(n - 1, n + 2), e = []; for (let i = 0; i < m; i++) { const a = U.rnd(1, n); let b = U.rnd(1, n); if (b === a) b = a % n + 1; e.push(`${a} ${b} ${U.rnd(1, 9)}`); } return `${n} ${m}\n` + e.join('\n'); },
  run({ n, e }) {
    const F = [], VC = Infinity, d = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i === j ? 0 : VC));
    for (const [a, b, c] of e) { d[a][b] = Math.min(d[a][b], c); d[b][a] = Math.min(d[b][a], c); }
    const sh = (x) => x === VC ? '∞' : x, id = (i, j) => (i - 1) * n + (j - 1);
    const view = (hl = {}, k) => [{ name: `Ma trận d (hàng i, cột j)${k ? `; ô xanh dương: hàng ${k} và cột ${k}` : ''}`, values: d.slice(1).flatMap((r) => r.slice(1).map(sh)), labels: d.slice(1).flatMap((r, i) => r.slice(1).map((_, j) => i === 0 ? `j=${j + 1}` : j === 0 ? `i=${i + 1}` : '')), cols: n, hl: Object.assign(k ? Object.fromEntries([...Array(n * n).keys()].filter((x) => Math.floor(x / n) === k - 1 || x % n === k - 1).map((x) => [x, 'mark'])) : {}, hl) }];
    F.push({ at: 'khoi', msg: 'Ban đầu: d[i][j] là độ dài cạnh trực tiếp (đường hai chiều), ∞ nếu không có.', arrays: view(), vars: {}, fig: true });
    let nf = 0;
    for (let k = 1; k <= n; k++) {
      const ok = []; for (let i = 1; i <= n; i++) for (let j = 1; j <= n; j++) if (d[i][k] + d[k][j] < d[i][j]) ok.push([i, j, d[i][k] + d[k][j]]);
      F.push({ at: 'k', msg: `k = ${k}: thử đi vòng qua đỉnh ${k}. Chỉ cần hàng ${k} và cột ${k}.`, arrays: view({}, k), vars: { k }, ask: { q: `Với k = ${k}, có bao nhiêu ô d[i][j] được cải thiện?`, choices: U.near(ok.length), answer: ok.length }, fig: k <= 3 });
      for (const [i, j, x] of ok) { const cu = d[i][j]; d[i][j] = x; F.push({ at: 'cap', msg: `d[${i}][${j}] = min(${sh(cu)}, d[${i}][${k}] + d[${k}][${j}] = ${d[i][k]} + ${d[k][j]}) = ${x}.`, arrays: view({ [id(i, j)]: 'ok', [id(i, k)]: 'cur', [id(k, j)]: 'cur' }, k), vars: { k, i, j }, fig: nf++ < 4 }); }
    }
    F.push({ at: 'cap', msg: 'Xong: d[i][j] là đường ngắn nhất giữa mọi cặp.', arrays: view(), vars: {}, out: d.slice(1).map((r) => r.slice(1).map((x) => x === VC ? -1 : x).join(' ')).join('\n'), fig: true });
    return F;
  },
};
