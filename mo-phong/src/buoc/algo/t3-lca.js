const ALGO = {
  id: 't3-lca', title: 'Nhảy nhị phân và LCA',
  desc: 'up[j][v] = tổ tiên cách v đúng 2^j bước (0 nếu vượt gốc), tính bằng up[j][v] = up[j−1][up[j−1][v]]. LCA(a, b): đưa đỉnh sâu hơn lên cùng độ sâu (nhảy theo các bit của hiệu độ sâu); nếu chưa trùng, xét j từ lớn tới nhỏ, cùng nhảy khi up[j][a] ≠ up[j][b]; cuối cùng đáp án là cha của a.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-3-cay-lca/',
  code: {
    py: ['for j in range(1, LOG): up[j][v] = up[j-1][up[j-1][v]]   ⟦xay⟧', 'if sau[a] < sau[b]: a, b = b, a', 'k = sau[a] - sau[b]', 'for j in range(LOG): if k >> j & 1: a = up[j][a]   ⟦bang⟧', 'if a != b:', '    for j in range(LOG - 1, -1, -1):', '        if up[j][a] != up[j][b]: a, b = up[j][a], up[j][b]   ⟦nhay⟧', '    a = up[0][a]', 'print(a)   ⟦in⟧'],
    cpp: ['for (j = 1; j < LOG; j++) up[j][v] = up[j-1][up[j-1][v]];   ⟦xay⟧', 'if (sau[a] < sau[b]) swap(a, b);', 'int k = sau[a] - sau[b];', 'for (j = 0; j < LOG; j++) if (k >> j & 1) a = up[j][a];   ⟦bang⟧', 'if (a != b) {', '    for (j = LOG - 1; j >= 0; j--)', '        if (up[j][a] != up[j][b]) { a = up[j][a]; b = up[j][b]; }   ⟦nhay⟧', '    a = up[0][a];', '}', 'cout << a;   ⟦in⟧'],
  },
  samples: [['12 3\n1 2 3 4 5 6 2 8 9 10 4\n7 11\n12 7\n10 6', 'ví dụ trong bài'], ['5 3\n1 1 3 3\n4 5\n2 5\n1 4', 'cây nhỏ'], ['8 2\n1 1 2 2 3 3 4\n8 5\n8 7', 'cây nhị phân']],
  parse(t) { const v = U.ints(t, 2), [n, q] = v; if (n < 2 || n > 16 || q < 1 || q > 4) throw new Error('Hãy chọn 2 ≤ n ≤ 16, q ≤ 4.'); const p = v.slice(2, n + 1); if (p.length < n - 1 || p.some((x, i) => x < 1 || x >= i + 2)) throw new Error('Cha của v phải nhỏ hơn v (đỉnh 1 là gốc).'); const qs = []; for (let i = 0; i < q; i++) { const a = v[n + 1 + 2 * i], b = v[n + 2 + 2 * i]; if (!(a >= 1 && a <= n && b >= 1 && b <= n)) throw new Error('Câu hỏi a b với 1 ≤ a, b ≤ n.'); qs.push([a, b]); } return { n, p: [0, 0, ...p], qs }; },
  random() { const n = U.rnd(8, 14), p = []; for (let v = 2; v <= n; v++) p.push(U.rnd(Math.max(1, v - 3), v - 1)); const q = U.rnd(2, 3); return `${n} ${q}\n${p.join(' ')}\n` + Array.from({ length: q }, () => `${U.rnd(1, n)} ${U.rnd(1, n)}`).join('\n'); },
  run({ n, p, qs }) {
    const F = [], LOG = Math.max(1, Math.ceil(Math.log2(n + 1))), up = [p.slice()], sau = Array(n + 1).fill(0);
    for (let v = 2; v <= n; v++) sau[v] = sau[p[v]] + 1;
    const lab = [...Array(n).keys()].map((k) => String(k + 1));
    const view = (hl = {}, ptr = {}, rowhl = {}) => [{ name: 'Độ sâu sau[v] (số dưới: v)', values: sau.slice(1), labels: lab, hl, ptr }, ...up.map((r, j) => ({ name: `up[${j}][v]: tổ tiên cách ${1 << j} bước (0: vượt gốc)`, values: r.slice(1), labels: lab, hl: rowhl[j] || {} }))];
    F.push({ at: 'xay', msg: 'up[0][v] là cha của v; gốc 1 có cha 0 (đỉnh ảo).', arrays: view(), vars: {}, fig: true });
    for (let j = 1; j < LOG; j++) { const r = [0]; for (let v = 1; v <= n; v++) r.push(up[j - 1][up[j - 1][v]]); up.push(r);
      F.push({ at: 'xay', msg: `up[${j}][v] = up[${j - 1}][up[${j - 1}][v]]: nhảy ${1 << j} bước = hai lần nhảy ${1 << (j - 1)} bước.`, arrays: view({}, {}, { [j]: Object.fromEntries([...Array(n).keys()].map((k) => [k, 'ok'])) }), vars: { j }, fig: j === 1 }); }
    const out = [], sc = qs.map(([a, b]) => { const k = Math.abs(sau[a] - sau[b]); let s = k ? 1 : 0; for (let j = 0; j < LOG; j++) s += k >> j & 1; return s + (a === b ? -5 : 0); }), qf = sc.indexOf(Math.max(...sc));
    qs.forEach(([A, B], qi) => {
      let a = A, b = B; const fq = qi === qf;
      if (sau[a] < sau[b]) [a, b] = [b, a];
      const k = sau[a] - sau[b];
      F.push({ at: 'bang', msg: `Câu hỏi (${A}, ${B}). Đỉnh sâu hơn là ${a} (độ sâu ${sau[a]}), hiệu độ sâu k = ${k}${k && (k & (k - 1)) ? ` = ${[...Array(LOG).keys()].filter((j) => k >> j & 1).map((j) => 1 << j).join(' + ')}` : ''}.`, arrays: view({ [a - 1]: 'cur', [b - 1]: 'mark' }, a === b ? { 'a=b': a - 1 } : { a: a - 1, b: b - 1 }), vars: { a, b, k }, fig: fq });
      for (let j = 0; j < LOG; j++) if (k >> j & 1) { const na = up[j][a]; F.push({ at: 'bang', msg: `Bit ${j} của k bật: a = up[${j}][${a}] = ${na}.`, arrays: view({ [na - 1]: 'cur', [b - 1]: 'mark' }, na === b ? { 'a=b': b - 1 } : { a: na - 1, b: b - 1 }, { [j]: { [a - 1]: 'cur' } }), vars: { a: na, b }, fig: fq }); a = na; }
      if (a !== b) {
        for (let j = LOG - 1; j >= 0; j--) { const x = up[j][a], y = up[j][b], kh = x !== y;
          F.push({ at: 'nhay', msg: `j = ${j}: up[${j}][${a}] = ${x}, up[${j}][${b}] = ${y}: ${kh ? 'khác nhau, cùng nhảy lên.' : 'trùng nhau (có thể đã vượt LCA), không nhảy.'}`, arrays: view({ [a - 1]: 'cur', [b - 1]: 'mark' }, { a: a - 1, b: b - 1 }, { [j]: { [a - 1]: kh ? 'ok' : 'dim', [b - 1]: kh ? 'ok' : 'dim' } }), vars: { a, b, j }, ask: { q: `j = ${j}: a và b có cùng nhảy lên không?`, choices: ['có', 'không'], answer: kh ? 'có' : 'không' }, fig: fq });
          if (kh) { a = x; b = y; } }
        a = up[0][a];
      }
      out.push(a);
      F.push({ at: 'in', msg: `LCA(${A}, ${B}) = ${a}.`, arrays: view({ [a - 1]: 'ok' }, { LCA: a - 1 }), vars: { LCA: a }, ask: { q: `LCA(${A}, ${B}) = ?`, choices: [...new Set([a, A, B, p[a] || 1])].sort((x, y) => x - y), answer: a }, out: out.join('\n'), fig: fq });
    });
    return F;
  },
};
