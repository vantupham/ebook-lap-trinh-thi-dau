const ALGO = {
  id: 't3-nghich-the', title: 'Đếm nghịch thế bằng Fenwick',
  desc: 'Nén giá trị về thứ hạng 1..m. Duyệt từ trái sang phải; cây Fenwick đếm số lần đã gặp mỗi thứ hạng. Với a[j] (thứ hạng r): số phần tử đã gặp lớn hơn a[j] = j − tong(r). Sau đó cong(r, 1).',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-4-fenwick/',
  code: {
    py: ['b = sorted(set(a))   # nén giá trị   ⟦nen⟧', 'for j in range(n):', '    r = bisect_left(b, a[j]) + 1', '    dem += j - tong(r)   ⟦dem⟧', '    cong(r, 1)   ⟦them⟧', 'print(dem)   ⟦in⟧'],
    cpp: ['sort b; unique; // nén giá trị   ⟦nen⟧', 'for (int j = 0; j < n; j++) {', '    int r = lower_bound(b.begin(), b.end(), a[j]) - b.begin() + 1;', '    dem += j - tong(r);   ⟦dem⟧', '    cong(r, 1);   ⟦them⟧', '}', 'cout << dem;   ⟦in⟧'],
  },
  samples: [['5\n3 1 4 1 2', 'ví dụ trong bài'], ['6\n600 500 400 300 200 100', 'dãy giảm'], ['7\n10 1000000000 20 20 5 999 7', 'giá trị lớn']],
  parse(t) { const v = U.ints(t, 1), n = v[0]; if (n < 1 || n > 12) throw new Error('Hãy chọn 1 ≤ n ≤ 12.'); if (v.length < n + 1) throw new Error('Thiếu số.'); return { a: v.slice(1, n + 1) }; },
  random() { const n = U.rnd(6, 10); return n + '\n' + Array.from({ length: n }, () => U.rnd(1, 9)).join(' '); },
  run({ a }) {
    const F = [], n = a.length, b = [...new Set(a)].sort((x, y) => x - y), m = b.length, cnt = Array(m + 1).fill(0); let dem = 0;
    const rk = a.map((x) => b.indexOf(x) + 1);
    const view = (j, hc = {}) => [{ name: 'Dãy a (chữ dưới: thứ hạng sau khi nén)', values: a, labels: rk.map(String), hl: Object.fromEntries(a.map((_, k) => [k, k < j ? 'done' : k === j ? 'cur' : ''])) }, { name: 'Số lần đã gặp mỗi thứ hạng (cây Fenwick lưu tổng tiền tố của dãy này)', values: cnt.slice(1), labels: b.map((x, i) => `${i + 1} (=${x})`), hl: hc }];
    F.push({ at: 'nen', msg: `Nén giá trị: ${b.map((x, i) => `${x}→${i + 1}`).join(', ')}.`, arrays: view(-1), vars: { dem }, fig: true });
    rk.forEach((r, j) => {
      let le = 0; for (let k = 1; k <= r; k++) le += cnt[k]; const them = j - le;
      const hc = {}; for (let k = 1; k <= m; k++) hc[k - 1] = k <= r ? 'mark' : 'bad';
      dem += them;
      F.push({ at: 'dem', msg: `a[${j}] = ${a[j]} (hạng ${r}): đã gặp ${j} số, trong đó tong(${r}) = ${le} số ≤ ${a[j]}. Thêm ${them} nghịch thế. Tổng ${dem}.`, arrays: view(j, hc), vars: { j, dem }, ask: { q: `a[${j}] = ${a[j]}: thêm bao nhiêu nghịch thế?`, choices: U.near(them), answer: them }, fig: true });
      cnt[r]++;
    });
    F.push({ at: 'in', msg: `Có ${dem} cặp nghịch thế.`, arrays: view(n), vars: { dem }, out: String(dem) });
    return F;
  },
};
