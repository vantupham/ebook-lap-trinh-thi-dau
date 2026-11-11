const ALGO = {
  id: 't2-lcs', title: 'Xâu con chung dài nhất: bảng hai chiều',
  desc: 'd[i][j] = LCS của i ký tự đầu của s và j ký tự đầu của t. Nếu s[i] = t[j] thì d[i][j] = d[i−1][j−1] + 1 (ô chéo trên trái); ngược lại d[i][j] = max(ô trên, ô trái). Điền theo hàng, mỗi hàng từ trái sang phải.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-10-qhd-2/',
  code: {
    py: ['d = [[0] * (m + 1) for _ in range(n + 1)]   ⟦khoi⟧', 'for i in range(1, n + 1):', '    for j in range(1, m + 1):', '        if s[i-1] == t[j-1]: d[i][j] = d[i-1][j-1] + 1   ⟦bang⟧', '        else: d[i][j] = max(d[i-1][j], d[i][j-1])   ⟦khac⟧', 'print(d[n][m])   ⟦in⟧'],
    cpp: ['vector<vector<int>> d(n + 1, vector<int>(m + 1, 0));   ⟦khoi⟧', 'for (int i = 1; i <= n; i++)', '    for (int j = 1; j <= m; j++)', '        if (s[i-1] == t[j-1]) d[i][j] = d[i-1][j-1] + 1;   ⟦bang⟧', '        else d[i][j] = max(d[i-1][j], d[i][j-1]);   ⟦khac⟧', 'cout << d[n][m];   ⟦in⟧'],
  },
  samples: [['SAIGON\nSANGO', 'ví dụ trong bài'], ['ABCBDAB\nBDCABA', 'ví dụ kinh điển'], ['ABC\nCBA', 'đảo ngược']],
  parse(t) { const L = t.trim().split(/\s+/); if (L.length < 2) throw new Error('Nhập hai xâu trên hai dòng.'); const [s, u] = L; if (s.length > 8 || u.length > 8 || !s.length || !u.length) throw new Error('Mỗi xâu dài 1–8 ký tự.'); return { s, t: u }; },
  random() { const g = () => Array.from({ length: U.rnd(4, 7) }, () => U.pick('ABCD'.split(''))).join(''); return g() + '\n' + g(); },
  run({ s, t }) {
    const F = [], n = s.length, m = t.length, d = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0)), done = Array.from({ length: n + 1 }, (_, i) => Array(m + 1).fill(i === 0));
    for (let i = 0; i <= n; i++) done[i][0] = true;
    const view = (hl = {}) => [{ name: `Bảng d: hàng i (∅, ${[...s].join(', ')}), cột j (∅, ${[...t].join(', ')})`, values: d.flatMap((r, i) => r.map((v, j) => done[i][j] ? v : '')), labels: d.flatMap((r, i) => r.map((_, j) => i === 0 ? (j === 0 ? '∅' : t[j - 1]) : j === 0 ? s[i - 1] : '')), cols: m + 1, hl: Object.assign(Object.fromEntries(d.flatMap((r, i) => r.map((_, j) => [i * (m + 1) + j, i === 0 || j === 0 ? 'dim' : ''])) ), hl) }];
    const id = (i, j) => i * (m + 1) + j;
    F.push({ at: 'khoi', msg: 'Hàng 0 và cột 0 bằng 0: một xâu rỗng thì không có ký tự chung.', arrays: view(), vars: {}, fig: true });
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const eq = s[i - 1] === t[j - 1]; d[i][j] = eq ? d[i - 1][j - 1] + 1 : Math.max(d[i - 1][j], d[i][j - 1]); done[i][j] = true;
        const hl = eq ? { [id(i, j)]: 'ok', [id(i - 1, j - 1)]: 'mark' } : { [id(i, j)]: 'cur', [id(i - 1, j)]: 'mark', [id(i, j - 1)]: 'mark' };
        F.push({ at: eq ? 'bang' : 'khac', msg: eq ? `s[${i}] = t[${j}] = '${s[i - 1]}': d[${i}][${j}] = d[${i - 1}][${j - 1}] + 1 = ${d[i][j]}.` : `'${s[i - 1]}' ≠ '${t[j - 1]}': d[${i}][${j}] = max(${d[i - 1][j]}, ${d[i][j - 1]}) = ${d[i][j]}.`, arrays: view(hl), vars: { i, j }, ask: { q: `d[${i}][${j}] = ?`, choices: U.near(d[i][j]), answer: d[i][j] }, fig: (i === 4 && j >= 3 && j <= 4) });
      }
      F.push({ at: 'khac', msg: `Xong hàng ${i} (ký tự '${s[i - 1]}').`, arrays: view(), vars: { i }, fig: i <= 2 || i === n });
    }
    F.push({ at: 'in', msg: `d[${n}][${m}] = ${d[n][m]}.`, arrays: view({ [id(n, m)]: 'ok' }), vars: {}, out: String(d[n][m]) });
    return U.limit(F);
  },
};
