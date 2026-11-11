const ALGO = {
  id: 't3-khach-san', title: 'Cây max: tìm vị trí đầu tiên ≥ x',
  desc: 'Mỗi nút giữ <b>max</b> số phòng trống trong đoạn của nó. Tìm khách sạn đầu tiên còn ≥ r phòng: từ gốc, nếu max của gốc &lt; r thì không có; ngược lại đi xuống <b>con trái</b> nếu con trái đủ (max ≥ r), không thì xuống con phải. Tới lá thì trừ r phòng và đi lên sửa lại.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-5-cay-phan-doan/',
  code: {
    py: ['if t[1] < r: print(0); continue   ⟦khong⟧', 'x = 1', 'while x < N: x = 2*x if t[2*x] >= r else 2*x + 1   ⟦xuong⟧', 'print(x - N + 1); t[x] -= r   ⟦lay⟧', 'while x > 1: x //= 2; t[x] = max(t[2*x], t[2*x+1])   ⟦sua⟧'],
    cpp: ['if (t[1] < r) { cout << 0; continue; }   ⟦khong⟧', 'int x = 1;', 'while (x < N) x = (t[2*x] >= r) ? 2*x : 2*x + 1;   ⟦xuong⟧', 'cout << x - N + 1; t[x] -= r;   ⟦lay⟧', 'for (x /= 2; x >= 1; x /= 2) t[x] = max(t[2*x], t[2*x+1]);   ⟦sua⟧'],
  },
  samples: [['8 5\n3 2 4 1 5 5 2 6\n4 4 7 1 1', 'ví dụ trong bài'], ['4 4\n1 1 1 9\n2 5 5 1', 'có đoàn không xếp được'], ['8 3\n2 2 2 2 2 2 2 8\n3 3 1', 'phải đi xuống nhánh phải']],
  parse(t) { const v = U.ints(t, 2), [n, m] = v; if (![1, 2, 4, 8, 16].includes(n) || m < 1 || m > 8) throw new Error('Trang mô phỏng dùng n là lũy thừa của 2 (1, 2, 4, 8, 16), m ≤ 8.'); const h = v.slice(2, 2 + n), r = v.slice(2 + n, 2 + n + m); if (h.length < n || r.length < m) throw new Error('Thiếu số.'); return { n, h, r }; },
  random() { const n = 8, m = U.rnd(4, 6); return `${n} ${m}\n${Array.from({ length: n }, () => U.rnd(1, 7)).join(' ')}\n${Array.from({ length: m }, () => U.rnd(1, 6)).join(' ')}`; },
  run({ n, h, r }) {
    const F = [], N = n, t = Array(2 * N).fill(0); for (let i = 0; i < N; i++) t[N + i] = h[i]; for (let i = N - 1; i >= 1; i--) t[i] = Math.max(t[2 * i], t[2 * i + 1]);
    const view = (hl = {}) => { const A = []; for (let s = 1; s < 2 * N; s *= 2) { const idx = [...Array(s).keys()].map((k) => s + k); A.push({ name: s === N ? `Lá: số phòng trống của khách sạn 1..${N}` : s === 1 ? 'Gốc: max cả dãy' : `Tầng nút ${s}..${2 * s - 1}`, values: idx.map((x) => t[x]), labels: s === N ? idx.map((x) => 'ks ' + (x - N + 1)) : idx.map(String), hl: Object.fromEntries(idx.map((x, k) => [k, hl[x]]).filter(([, c]) => c)) }); } return A; };
    F.push({ at: 'khong', msg: 'Dựng cây max.', arrays: view(), vars: {}, fig: true });
    const out = []; let nf = 0;
    r.forEach((need, g) => {
      if (t[1] < need) { out.push(0); F.push({ at: 'khong', msg: `Đoàn ${g + 1} cần ${need} phòng nhưng max ở gốc chỉ ${t[1]}: in 0.`, arrays: view({ 1: 'bad' }), vars: { r: need }, out: out.join(' '), fig: nf++ < 6 }); return; }
      let x = 1; const path = [1];
      while (x < N) { x = t[2 * x] >= need ? 2 * x : 2 * x + 1; path.push(x); }
      const ks = x - N + 1;
      F.push({ at: 'xuong', msg: `Đoàn ${g + 1} cần ${need} phòng. Từ gốc đi xuống: ${path.join(' → ')}. Khách sạn ${ks}.`, arrays: view(Object.fromEntries(path.map((p) => [p, 'cur']))), vars: { r: need }, ask: { q: `Đoàn ${g + 1} (${need} phòng) vào khách sạn nào?`, choices: [...new Set([ks, ...h.map((_, i) => i + 1).filter((i) => i !== ks).slice(0, 2)])].sort((a, b) => a - b), answer: ks }, fig: nf++ < 6 });
      t[x] -= need; out.push(ks); for (let y = x >> 1; y >= 1; y >>= 1) t[y] = Math.max(t[2 * y], t[2 * y + 1]);
      F.push({ at: 'lay sua', msg: `Khách sạn ${ks} còn ${t[x]} phòng; đi lên sửa lại max.`, arrays: view(Object.fromEntries(path.map((p) => [p, 'ok']))), vars: { r: need }, out: out.join(' '), fig: nf++ < 6 });
    });
    F.push({ at: 'sua', msg: `Kết quả: ${out.join(' ')}.`, arrays: view(), vars: {}, out: out.join(' ') });
    return F;
  },
};
