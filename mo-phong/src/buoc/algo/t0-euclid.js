const ALGO = {
  id: 't0-euclid', title: 'Thuật toán Euclid tìm ƯCLN',
  desc: 'ƯCLN(a, b) = ƯCLN(b, a mod b). Mỗi bước thay cặp (a, b) bằng (b, a mod b); khi b = 0 thì a là ƯCLN. Cuối cùng BCNN = a / ƯCLN × b.',
  lesson: '../tap-0-nhap-mon/bai-0-8-so-hoc/',
  code: {
    py: ['def ucln(a, b):', '    while b != 0:   ⟦dk⟧', '        a, b = b, a % b   ⟦buoc⟧', '    return a   ⟦ret⟧', '', 'a, b = map(int, input().split())', 'print(a // ucln(a, b) * b)   ⟦bcnn⟧'],
    cpp: ['long long ucln(long long a, long long b) {', '    while (b != 0) {   ⟦dk⟧', '        long long r = a % b; a = b; b = r;   ⟦buoc⟧', '    }', '    return a;   ⟦ret⟧', '}', '// trong main:', 'cout << a / ucln(a, b) * b;   ⟦bcnn⟧'],
  },
  samples: [['4 6', 'hai ngọn đèn'], ['84 36', 'bảng trong bài'], ['17 5', 'nguyên tố cùng nhau'], ['1000000000 999999999', 'số lớn, vẫn rất ít bước']],
  parse(t) { const [a, b] = U.ints(t, 2); if (a < 1 || b < 1 || a > 1e15 || b > 1e15) throw new Error('Cần hai số nguyên dương ≤ 10¹⁵.'); return [a, b]; },
  random() { const g = U.rnd(1, 12); return g * U.rnd(2, 40) + ' ' + g * U.rnd(2, 40); },
  run([a0, b0]) {
    const F = [], rows = [];
    let a = a0, b = b0;
    const tbl = () => [{ name: 'Các cặp (a, b) đã đi qua', values: rows.map(([x, y]) => `(${x}, ${y})`), noIdx: true, hl: { [rows.length - 1]: 'cur' }, width: 90 }];
    rows.push([a, b]);
    F.push({ at: 'dk', msg: `Bắt đầu với a = ${a}, b = ${b}.`, vars: { a, b }, arrays: tbl(), fig: true });
    while (b !== 0) {
      const r = a % b;
      F.push({ at: 'buoc', msg: `${a} mod ${b} = ${r}. Cặp mới: (${b}, ${r}).`, vars: { a, b, 'a mod b': r }, arrays: tbl(), ask: { q: `${a} mod ${b} = ?`, choices: U.near(r), answer: r }, fig: rows.length < 4 });
      a = b; b = r; rows.push([a, b]);
      F.push({ at: b ? 'dk' : 'dk ret', msg: b ? `b = ${b} ≠ 0: lặp tiếp.` : `b = 0: dừng. ƯCLN = a = ${a}.`, vars: { a, b }, arrays: tbl() });
    }
    const l = a0 / a * b0;
    F.push({ at: 'bcnn', msg: `BCNN = ${a0} / ${a} × ${b0} = ${l}. Chia trước rồi mới nhân để số trung gian không quá lớn. Chỉ mất ${rows.length - 1} bước chia.`, vars: { 'ƯCLN': a, 'BCNN': l }, arrays: tbl(), out: String(l), fig: true });
    return F;
  },
};
