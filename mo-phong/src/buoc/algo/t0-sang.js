const ALGO = {
  id: 't0-sang', title: 'Sàng Eratosthenes',
  desc: 'Lấy số nhỏ nhất chưa bị gạch: đó là số nguyên tố p. Gạch mọi bội của p bắt đầu từ p². Dừng khi p² vượt N. Các số còn lại là số nguyên tố.',
  lesson: '../tap-0-nhap-mon/bai-0-8-so-hoc/',
  code: {
    py: ['nt = [True] * (n + 1)   ⟦khoi⟧', 'nt[0] = nt[1] = False', 'p = 2', 'while p * p <= n:   ⟦dk⟧', '    if nt[p]:   ⟦chon⟧', '        for k in range(p * p, n + 1, p):   ⟦gach⟧', '            nt[k] = False   ⟦gach⟧', '    p += 1', 'print(sum(nt))   ⟦in⟧'],
    cpp: ['vector<bool> nt(n + 1, true);   ⟦khoi⟧', 'nt[0] = nt[1] = false;', 'for (long long p = 2; p * p <= n; p++)   ⟦dk⟧', '    if (nt[p])   ⟦chon⟧', '        for (long long k = p * p; k <= n; k += p)   ⟦gach⟧', '            nt[k] = false;   ⟦gach⟧', "cout << count(nt.begin(), nt.end(), true);   ⟦in⟧"],
  },
  samples: [['30', 'N = 30 như trong bài'], ['50', 'N = 50'], ['100', 'N = 100']],
  parse(t) { const [n] = U.ints(t); if (n < 2 || n > 120) throw new Error('Để vừa màn hình, hãy chọn 2 ≤ N ≤ 120.'); return n; },
  random() { return String(U.rnd(20, 100)); },
  run(n) {
    const F = [], nt = Array(n + 1).fill(true); nt[0] = nt[1] = false;
    const by = Array(n + 1).fill(0);
    const A = (cur = {}) => {
      const hl = {};
      for (let v = 1; v <= n; v++) hl[v - 1] = cur[v] || (v === 1 ? 'dim' : nt[v] ? '' : 'bad');
      return [{ name: `Các số 1..${n}`, values: [...Array(n).keys()].map((k) => k + 1), noIdx: true, cols: 10, hl }];
    };
    F.push({ at: 'khoi', msg: `Viết các số từ 1 đến ${n}. Số 1 không phải số nguyên tố. Chưa số nào bị gạch.`, arrays: A(), fig: true });
    for (let p = 2; p * p <= n; p++) {
      if (!nt[p]) { F.push({ at: 'dk chon', msg: `${p} đã bị ${by[p]} gạch: không phải số nguyên tố, bỏ qua.`, arrays: A({ [p]: 'cur' }), vars: { p } }); continue; }
      F.push({ at: 'chon', msg: `${p} chưa bị gạch nên là số nguyên tố. Tiếp theo sẽ gạch các bội của ${p}.`, arrays: A({ [p]: 'ok' }), vars: { p }, fig: p <= 3 });
      const g = [];
      for (let k = p * p; k <= n; k += p) { if (nt[k]) { nt[k] = false; by[k] = p; g.push(k); } }
      const cur = { [p]: 'ok' }; g.forEach((k) => cur[k] = 'cur');
      F.push({ at: 'gach', msg: g.length ? `Bắt đầu từ ${p}² = ${p * p}, gạch ${g.join(', ')}. ${p * p > p * 2 ? `Các bội nhỏ hơn ${p * p} đã bị số nhỏ hơn gạch từ trước.` : ''}` : `Mọi bội của ${p} từ ${p * p} đã bị gạch sẵn.`, arrays: A(cur), vars: { p }, ask: { q: `Bội đầu tiên của ${p} cần gạch là số nào?`, choices: [2 * p, p * p, p * p + p].filter((x, i, s) => s.indexOf(x) === i), answer: p * p }, fig: p <= 3 });
    }
    const pr = []; for (let v = 2; v <= n; v++) if (nt[v]) pr.push(v);
    const last = Math.floor(Math.sqrt(n)) + 1;
    const cur = {}; pr.forEach((v) => cur[v] = 'ok');
    F.push({ at: 'dk in', msg: `p = ${last}: ${last}² = ${last * last} > ${n}, dừng. Mọi số chưa bị gạch đều là số nguyên tố: có ${pr.length} số.`, arrays: A(cur), vars: { 'số nguyên tố': pr.length }, out: String(pr.length), fig: true });
    return F;
  },
};
