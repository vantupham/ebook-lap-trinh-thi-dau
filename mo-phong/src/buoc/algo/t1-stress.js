const ALGO = {
  id: 't1-stress', title: 'Stress test: tự làm máy chấm',
  desc: 'Sinh test nhỏ ngẫu nhiên, chạy lời giải nhanh (có lỗi <code>best = 0</code>) và lời giải vét cạn, so kết quả. Dừng ở test đầu tiên hai bên khác nhau: đó là manh mối để sửa lỗi.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-9-stress-test/',
  code: {
    py: ['for seed in range(1, 1001):   ⟦lap⟧', '    test = sinh_test(seed)   # n từ 1 tới 6, số từ −5 tới 5   ⟦sinh⟧', '    a = nhanh(test)          # Kadane khởi tạo best = 0 (sai)   ⟦chay⟧', '    b = vet_can(test)        # thử mọi đoạn: hiển nhiên đúng   ⟦chay⟧', '    if a != b:   ⟦so⟧', '        print("SAI với test", test); break   ⟦sai⟧'],
    cpp: ['for (int seed = 1; seed <= 1000; seed++) {   ⟦lap⟧', '    test = sinh_test(seed);   ⟦sinh⟧', '    a = nhanh(test); b = vet_can(test);   ⟦chay⟧', '    if (a != b) { in test; break; }   ⟦so_sai⟧', '}'],
  },
  samples: [['1', 'bắt đầu từ hạt giống 1'], ['10', 'bắt đầu từ hạt giống 10'], ['100', 'bắt đầu từ hạt giống 100']],
  parse(t) { const [s] = U.ints(t); if (s < 1 || s > 1e6) throw new Error('Hạt giống từ 1 tới 10⁶.'); return s; },
  random() { return String(U.rnd(1, 1000)); },
  run(seed0) {
    const F = [];
    const rng = (s) => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let x = Math.imul(s ^ s >>> 15, 1 | s); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; };
    const nhanh = (a) => { let cur = 0, best = 0; for (const x of a) { cur = Math.max(x, cur + x); best = Math.max(best, cur); } return best; };
    const vc = (a) => { let b = -Infinity; for (let l = 0; l < a.length; l++) { let s = 0; for (let r = l; r < a.length; r++) { s += a[r]; b = Math.max(b, s); } } return b; };
    for (let seed = seed0; seed < seed0 + 1000; seed++) {
      const R = rng(seed), n = 1 + Math.floor(R() * 6), a = Array.from({ length: n }, () => Math.floor(R() * 11) - 5);
      const x = nhanh(a), y = vc(a), sai = x !== y, k = seed - seed0 + 1;
      F.push({ at: sai ? 'so sai so_sai' : 'sinh chay so so_sai', msg: sai ? `Test thứ ${k} (hạt giống ${seed}): nhanh in ${x}, vét cạn in ${y}. <b>Khác nhau!</b> Dãy toàn số âm: khởi tạo best = 0 là sai.` : `Test thứ ${k} (hạt giống ${seed}): cả hai đều in ${x}. Sinh test tiếp.`, arrays: [{ name: `Test (n = ${n})`, values: a, hl: sai ? Object.fromEntries(a.map((_, i) => [i, 'bad'])) : {} }, { name: 'Kết quả', values: [x, y], labels: ['nhanh', 'vét cạn'], hl: { 0: sai ? 'bad' : 'ok', 1: 'ok' }, width: 80 }], vars: { 'số test đã thử': k }, ask: { q: `Với dãy ${a.join(' ')}, lời giải sai (best = 0) có in đúng không?`, choices: ['đúng', 'sai'], answer: sai ? 'sai' : 'đúng' }, fig: k <= 2 || sai });
      if (sai) { F[F.length - 1].out = `SAI với test:\n${n}\n${a.join(' ')}\nnhanh: ${x}, vét cạn: ${y}`; return F; }
    }
    F.push({ at: 'lap', msg: 'Đúng cả 1000 test.', out: 'Đúng cả 1000 test' });
    return F;
  },
};
