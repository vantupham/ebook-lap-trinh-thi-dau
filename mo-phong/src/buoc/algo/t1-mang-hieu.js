const ALGO = {
  id: 't1-mang-hieu', title: 'Mảng hiệu: cộng vào cả đoạn chỉ bằng hai dấu',
  desc: 'Mỗi thao tác "cộng v vào [l, r]" chỉ ghi d[l] += v và d[r+1] −= v. Cuối cùng lấy tổng tiền tố của d: dấu cộng có tác dụng từ l trở đi, dấu trừ tắt nó sau r.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-3-tong-tien-to/',
  code: {
    py: ['d = [0] * (n + 2)   ⟦khoi⟧', 'for l, r, v in thao_tac:   ⟦ghi⟧', '    d[l] += v   ⟦ghi⟧', '    d[r + 1] -= v   ⟦ghi⟧', 'cur = 0', 'for i in range(1, n + 1):   ⟦cong⟧', '    cur += d[i]   ⟦cong⟧', '    print(cur)   ⟦cong⟧'],
    cpp: ['vector<long long> d(n + 2, 0);   ⟦khoi⟧', 'while (q--) {   ⟦ghi⟧', '    cin >> l >> r >> v;', '    d[l] += v; d[r + 1] -= v;   ⟦ghi⟧', '}', 'long long cur = 0;', 'for (int i = 1; i <= n; i++) {   ⟦cong⟧', "    cur += d[i]; cout << cur << ' ';   ⟦cong⟧", '}'],
  },
  samples: [['5 2\n1 3 2\n2 5 1', 'ví dụ trong bài'], ['6 3\n1 6 1\n2 3 5\n3 4 -2', 'có số âm']],
  parse(t) {
    const v = U.ints(t, 2), [n, q] = v;
    if (n < 1 || n > 12 || q < 1 || q > 6) throw new Error('Hãy chọn 1 ≤ n ≤ 12 và 1 ≤ q ≤ 6.');
    if (v.length < 2 + 3 * q) throw new Error('Thiếu dữ liệu: mỗi thao tác "l r v".');
    const ops = []; for (let k = 0; k < q; k++) { const [l, r, x] = v.slice(2 + 3 * k, 5 + 3 * k); if (l < 1 || r > n || l > r) throw new Error(`Thao tác ${k + 1} cần 1 ≤ l ≤ r ≤ n.`); ops.push([l, r, x]); }
    return { n, ops };
  },
  random() { const n = U.rnd(5, 10), q = U.rnd(2, 4), L = [n + ' ' + q]; for (let k = 0; k < q; k++) { const l = U.rnd(1, n); L.push(l + ' ' + U.rnd(l, n) + ' ' + U.rnd(-3, 5)); } return L.join('\n'); },
  run({ n, ops }) {
    const F = [], d = Array(n + 2).fill(0), lab = [...Array(n + 2).keys()];
    const A = (hd = {}, res = null, hr = {}) => { const r = [{ name: 'd[0..n+1]', values: d.slice(), labels: lab, hl: { 0: 'dim', ...hd } }]; if (res) r.push({ name: 'Kết quả (tổng tiền tố của d)', values: [''].concat(res), labels: lab.slice(0, n + 1), hl: { 0: 'dim', ...hr } }); return r; };
    F.push({ at: 'khoi', msg: `Tạo d gồm n + 2 = ${n + 2} ô (ô d[n+1] để ghi dấu tắt khi r = n).`, arrays: A(), fig: true });
    ops.forEach(([l, r, v], k) => {
      d[l] += v; d[r + 1] -= v;
      F.push({ at: 'ghi', msg: `Cộng ${v} vào [${l}, ${r}]: chỉ ghi d[${l}] += ${v} và d[${r + 1}] −= ${v}. Hai thao tác, bất kể đoạn dài bao nhiêu.`, arrays: A({ [l]: 'ok', [r + 1]: 'bad' }), fig: k < 2 });
    });
    const res = []; let cur = 0;
    for (let i = 1; i <= n; i++) {
      cur += d[i]; res.push(cur);
      F.push({ at: 'cong', msg: `cur = cur + d[${i}] = ${cur}: hộp ${i} có giá trị ${cur}.`, arrays: A({ [i]: 'cur' }, res, { [i]: 'ok' }), vars: { cur }, ask: { q: `Hộp ${i} có giá trị bao nhiêu?`, choices: U.near(cur, [d[i]]), answer: cur }, fig: i === n });
    }
    F[F.length - 1].out = res.join(' ');
    return F;
  },
};
