const ALGO = {
  id: 't1-so-phep', title: 'Đếm số phép: O(n³), O(n²) hay O(n)?',
  desc: 'Nhập n, xem ba cách giải bài đoạn con tổng lớn nhất cần bao nhiêu phép và chạy hết bao lâu (ước lượng C++ làm 10⁸ phép mỗi giây, Python 10⁷).',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-1-do-phuc-tap/',
  code: {
    py: ['# Cách 1: O(n³)', 'for l in range(n):   ⟦c1⟧', '    for r in range(l, n):   ⟦c1⟧', '        s = sum(a[l:r + 1])   ⟦c1⟧', '# Cách 2: O(n²)', 'for l in range(n):   ⟦c2⟧', '    s = 0', '    for r in range(l, n): s += a[r]   ⟦c2⟧', '# Cách 3: O(n) – Kadane', 'for i in range(1, n):   ⟦c3⟧', '    cur = max(a[i], cur + a[i])   ⟦c3⟧'],
    cpp: ['// Cách 1: O(n^3)', 'for l, for r, for k: s += a[k]   ⟦c1⟧', '// Cách 2: O(n^2)', 'for l, for r: s += a[r]   ⟦c2⟧', '// Cách 3: O(n)', 'for i: cur = max(a[i], cur + a[i])   ⟦c3⟧'],
  },
  samples: [['200000', 'n lớn nhất của đề'], ['500', 'subtask nhỏ'], ['5000', 'subtask vừa']],
  parse(t) { const [n] = U.ints(t); if (n < 1 || n > 1e9) throw new Error('Cần 1 ≤ n ≤ 10⁹.'); return n; },
  random() { return String(U.pick([100, 1000, 3000, 10000, 100000, 1000000])); },
  run(n) {
    const f = (x) => x >= 1e6 ? x.toExponential(1).replace('e+', '·10^') : String(Math.round(x));
    const t = (ops, sp) => { const s = ops / sp; return s < 0.01 ? 'tức thì' : s < 1 ? s.toFixed(2) + ' giây' : s < 3600 ? Math.round(s) + ' giây' : s < 86400 * 365 ? (s / 3600).toFixed(1) + ' giờ' : (s / 86400 / 365).toExponential(1) + ' năm'; };
    const c = [n * n * n / 6, n * n / 2, n];
    const vals = (k) => c.slice(0, k).map(f);
    const F = [];
    F.push({ at: 'c1', msg: `Cách 1 thử mọi đoạn và cộng lại từ đầu: khoảng n³/6 = ${f(c[0])} phép. C++: ${t(c[0], 1e8)}; Python: ${t(c[0], 1e7)}.`, arrays: [{ name: 'Số phép (xấp xỉ)', values: vals(1), labels: ['O(n³)'], hl: { 0: c[0] > 1e8 ? 'bad' : 'ok' }, width: 150 }], vars: { n }, fig: true });
    F.push({ at: 'c2', msg: `Cách 2 cộng dồn khi tăng r: khoảng n²/2 = ${f(c[1])} phép. C++: ${t(c[1], 1e8)}; Python: ${t(c[1], 1e7)}.`, arrays: [{ name: 'Số phép (xấp xỉ)', values: vals(2), labels: ['O(n³)', 'O(n²)'], hl: { 0: c[0] > 1e8 ? 'bad' : 'ok', 1: c[1] > 1e8 ? 'bad' : 'ok' }, width: 150 }], vars: { n }, ask: { q: `Với n = ${n}, cách O(n²) có kịp 1 giây trong C++ không?`, choices: ['kịp', 'không kịp'], answer: c[1] <= 1e8 ? 'kịp' : 'không kịp' }, fig: true });
    F.push({ at: 'c3', msg: `Cách 3 (Kadane) duyệt một lượt: ${f(c[2])} phép. C++: ${t(c[2], 1e8)}; Python: ${t(c[2], 1e7)}.`, arrays: [{ name: 'Số phép (xấp xỉ)', values: vals(3), labels: ['O(n³)', 'O(n²)', 'O(n)'], hl: { 0: c[0] > 1e8 ? 'bad' : 'ok', 1: c[1] > 1e8 ? 'bad' : 'ok', 2: c[2] > 1e8 ? 'bad' : 'ok' }, width: 150 }], vars: { n }, out: c[1] <= 1e8 ? 'Cả O(n²) và O(n) đều kịp' : 'Chỉ O(n) kịp', fig: true });
    return F;
  },
};
