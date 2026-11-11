const ALGO = {
  id: 't3-chu-so', title: 'QHĐ chữ số: đếm số đẹp trong [0, N]',
  desc: 'Số đẹp: không có hai chữ số liền nhau bằng nhau. Viết số từ trái sang phải, đếm theo <b>chữ số cuối</b>. Tiền tố đã nhỏ hơn N thì chữ số tiếp theo tự do (0..9); tiền tố đang bám sát N thì chữ số tiếp theo không được vượt chữ số của N.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-9-qhd-chu-so/',
  code: {
    py: ['# free[d]: số cách viết phần đầu đã NHỎ HƠN N, đã bắt đầu, chữ số cuối d   ⟦khoi⟧', 'for i, nd in enumerate(s):', '    moi[d] += free[p] với mọi p, d hợp lệ   ⟦tudo⟧', '    if i > 0: moi[d] += 1 với d = 1..9   # bắt đầu sau các số 0   ⟦batdau⟧', '    if bam_hop_le: moi[d] += 1 với d < nd hợp lệ (bỏ d = 0 ở vị trí đầu)   ⟦bam⟧', '    bam_hop_le = bam_hop_le and (i == 0 or hop_le(s[i-1], nd))', 'dem = sum(free) + bam_hop_le + 1   # + chính N, + số 0   ⟦in⟧'],
    cpp: ['// free[d]: số cách viết phần đầu đã NHỎ HƠN N, đã bắt đầu, chữ số cuối d   ⟦khoi⟧', 'for (int i = 0; i < L; i++) {', '    moi[d] += free[p] với mọi p, d hợp lệ;   ⟦tudo⟧', '    if (i > 0) moi[d] += 1 với d = 1..9;   // bắt đầu sau các số 0   ⟦batdau⟧', '    if (bam_hop_le) moi[d] += 1 với d < N[i] hợp lệ (bỏ d = 0 ở vị trí đầu);   ⟦bam⟧', '    bam_hop_le = bam_hop_le && (i == 0 || hop_le(N[i-1], N[i]));', '}', 'dem = tổng free + bam_hop_le + 1;   // + chính N, + số 0   ⟦in⟧'],
  },
  samples: [['21', 'ví dụ trong bài: N = 21'], ['321', 'N = 321'], ['1000', 'N = 1000']],
  parse(t) { const [N] = U.ints(t, 1); if (N < 0 || N > 99999999) throw new Error('Hãy chọn 0 ≤ N ≤ 99 999 999.'); return { N }; },
  random() { return String(U.rnd(10, 99999)); },
  run({ N }) {
    const ok = (p, d) => p !== d;
    const F = [], s = String(N).split('').map(Number), L = s.length;
    if (N === 0) { F.push({ at: 'in', msg: 'N = 0: chỉ có số 0.', arrays: [], vars: {}, out: '1', fig: true }); return F; }
    let free = Array(10).fill(0), bam = true;
    const view = (i, hl = {}) => [{ name: 'Các chữ số của N', values: s, labels: s.map((_, k) => 'vị trí ' + k), hl: Object.fromEntries(s.map((_, k) => [k, k < i ? 'done' : k === i ? 'cur' : ''])) }, { name: 'free[d]: số cách viết phần đầu đã nhỏ hơn N, chữ số cuối là d', values: free, labels: [...Array(10).keys()].map((d) => 'd=' + d), hl }];
    F.push({ at: 'khoi', msg: `N = ${N}. Viết số từ trái sang phải. Ban đầu chưa có tiền tố nào nhỏ hơn N; nhánh "bám sát N" còn hợp lệ.`, arrays: view(-1), vars: { 'bám sát hợp lệ': 'có' }, fig: true });
    for (let i = 0; i < L; i++) {
      const nf = Array(10).fill(0), nd = s[i], parts = [];
      let a = 0; for (let p = 0; p < 10; p++) if (free[p]) for (let d = 0; d < 10; d++) if (ok(p, d)) { nf[d] += free[p]; a += free[p]; }
      if (a) parts.push(`${a} từ các tiền tố đã nhỏ hơn`);
      if (i > 0) { for (let d = 1; d < 10; d++) nf[d] += 1; parts.push('9 số bắt đầu ở vị trí này (trước đó toàn chữ số 0)'); }
      if (bam) { const ds = []; for (let d = 0; d < nd; d++) { if (i === 0 && d === 0) continue; if (i === 0 || ok(s[i - 1], d)) { nf[d] += 1; ds.push(d); } } if (ds.length) parts.push(`từ nhánh bám sát, chọn ${ds.join(', ')} (< ${nd})`); }
      const sum = nf.reduce((x, y) => x + y, 0);
      free = nf; bam = bam && (i === 0 || ok(s[i - 1], nd));
      F.push({ at: 'tudo batdau bam', msg: `Vị trí ${i} (N có chữ số ${nd}): ${parts.join('; ') || 'không có cách nào'}. Bám sát còn hợp lệ: ${bam ? 'có' : 'không'}.`, arrays: view(i, Object.fromEntries(nf.map((v, d) => [d, v ? 'ok' : '']))), vars: { 'bám sát hợp lệ': bam ? 'có' : 'không' }, ask: { q: `Sau vị trí ${i}, tổng các ô free là bao nhiêu?`, choices: U.near(sum), answer: sum }, fig: i < 4 });
    }
    const t = free.reduce((x, y) => x + y, 0), kq = t + (bam ? 1 : 0) + 1;
    F.push({ at: 'in', msg: `dem(${N}) = ${t} (các số nhỏ hơn N, từ 1 trở lên) + ${bam ? 1 : 0} (chính N) + 1 (số 0) = ${kq}.`, arrays: view(L), vars: {}, out: String(kq), fig: true });
    return F;
  },
};
