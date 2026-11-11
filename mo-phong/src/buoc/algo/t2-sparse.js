const ALGO = {
  id: 't2-sparse', title: 'Sparse table: min đoạn bất kỳ trong O(1)',
  desc: 'sp[j][i] = min của 2^j phần tử bắt đầu tại i, tính từ hai nửa: sp[j][i] = min(sp[j−1][i], sp[j−1][i + 2^(j−1)]). Câu hỏi [l, r]: lấy k lớn nhất với 2^k ≤ độ dài; hai đoạn dài 2^k, một bắt đầu ở l, một kết thúc ở r, phủ kín [l, r].',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-6-min-tren-doan/',
  code: {
    py: ['sp = [a[:]]   ⟦khoi⟧', 'for j in range(1, LOG):', '    sp.append([min(sp[j-1][i], sp[j-1][i + (1 << (j-1))]) for i in range(n - (1 << j) + 1)])   ⟦xay⟧', '# câu hỏi [l, r] (chỉ số từ 0)', 'k = (r - l + 1).bit_length() - 1   ⟦k⟧', 'print(min(sp[k][l], sp[k][r - (1 << k) + 1]))   ⟦tl⟧'],
    cpp: ['sp[0] = a;   ⟦khoi⟧', 'for (int j = 1; j < LOG; j++)', '    for (int i = 0; i + (1 << j) <= n; i++)', '        sp[j][i] = min(sp[j-1][i], sp[j-1][i + (1 << (j-1))]);   ⟦xay⟧', '// câu hỏi [l, r] (chỉ số từ 0)', 'int k = __lg(r - l + 1);   ⟦k⟧', 'cout << min(sp[k][l], sp[k][r - (1 << k) + 1]);   ⟦tl⟧'],
  },
  samples: [['8 4\n3 2 4 5 1 1 5 3\n2 4\n5 6\n1 8\n3 3', 'ví dụ trong bài'], ['10 3\n7 9 4 8 6 2 5 3 9 1\n1 10\n2 7\n4 9', 'mười phần tử']],
  parse(t) { const v = U.ints(t, 2), [n, q] = v; if (n < 1 || n > 12 || q < 1 || q > 6) throw new Error('Hãy chọn n ≤ 12, q ≤ 6.'); if (v.length < 2 + n + 2 * q) throw new Error('Thiếu số.'); const a = v.slice(2, 2 + n), qs = []; for (let i = 0; i < q; i++) { const l = v[2 + n + 2 * i], r = v[3 + n + 2 * i]; if (!(1 <= l && l <= r && r <= n)) throw new Error('Cần 1 ≤ l ≤ r ≤ n.'); qs.push([l, r]); } return { a, qs }; },
  random() { const n = U.rnd(6, 12), q = U.rnd(2, 4); return `${n} ${q}\n${Array.from({ length: n }, () => U.rnd(1, 9)).join(' ')}\n` + Array.from({ length: q }, () => { const l = U.rnd(1, n), r = U.rnd(l, n); return `${l} ${r}`; }).join('\n'); },
  run({ a, qs }) {
    const F = [], n = a.length, sp = [a.slice()], out = [];
    const rows = (hl = {}) => [{ name: 'a', values: a, hl: hl.a || {} }, ...sp.map((r, j) => ({ name: `sp[${j}]: min của ${1 << j} phần tử bắt đầu tại i`, values: r, hl: hl[j] || {} }))];
    F.push({ at: 'khoi', msg: 'sp[0] chính là mảng a: đoạn dài 1.', arrays: rows(), vars: {}, fig: true });
    for (let j = 1; (1 << j) <= n; j++) {
      const r = []; for (let i = 0; i + (1 << j) <= n; i++) r.push(Math.min(sp[j - 1][i], sp[j - 1][i + (1 << (j - 1))]));
      sp.push(r);
      F.push({ at: 'xay', msg: `sp[${j}][i] = min(sp[${j - 1}][i], sp[${j - 1}][i + ${1 << (j - 1)}]): ghép hai đoạn dài ${1 << (j - 1)}. Ví dụ sp[${j}][0] = min(${sp[j - 1][0]}, ${sp[j - 1][1 << (j - 1)]}) = ${r[0]}.`, arrays: rows({ [j - 1]: { 0: 'cur', [1 << (j - 1)]: 'cur' }, [j]: { 0: 'ok' } }), vars: { j }, ask: { q: `sp[${j}][0] = ?`, choices: U.near(r[0], [sp[j - 1][0]]), answer: r[0] }, fig: true });
    }
    qs.forEach(([L, R], qi) => { const fq = qi === 0 || qi === 2; const l = L - 1, r = R - 1, len = r - l + 1, k = 31 - Math.clz32(len), x = sp[k][l], y = sp[k][r - (1 << k) + 1], m = Math.min(x, y);
      const ha = {}; for (let i = l; i <= r; i++) ha[i] = 'mark';
      F.push({ at: 'k', msg: `Câu hỏi [${L}, ${R}] (chỉ số từ 0: [${l}, ${r}]), độ dài ${len}: k = ${k} vì 2^${k} = ${1 << k} ≤ ${len} < ${2 << k}.`, arrays: rows({ a: ha }), vars: { l, r, k }, ask: { q: `Độ dài ${len}: k bằng bao nhiêu?`, choices: U.near(k), answer: k }, fig: fq });
      out.push(m);
      F.push({ at: 'tl', msg: `min(sp[${k}][${l}], sp[${k}][${r - (1 << k) + 1}]) = min(${x}, ${y}) = ${m}. Hai đoạn chồng nhau cũng không sao.`, arrays: rows({ a: ha, [k]: { [l]: 'cur', [r - (1 << k) + 1]: 'cur' } }), vars: { l, r, k }, out: out.join('\n'), fig: fq });
    });
    return F;
  },
};
