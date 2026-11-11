const ALGO = {
  id: 't1-thap-ha-noi', title: 'Đệ quy: Tháp Hà Nội',
  desc: 'chuyen(n, từ, tới, qua) = chuyển n − 1 đĩa sang cọc trung gian, chuyển đĩa lớn nhất, rồi chuyển n − 1 đĩa từ trung gian sang đích. Xem ngăn gọi hàm cao lên, thấp xuống cùng các đĩa.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-6-de-quy/',
  code: {
    py: ['def chuyen(n, tu, toi, tg):   ⟦goi⟧', '    if n == 0:   ⟦co_so⟧', '        return   ⟦co_so⟧', '    chuyen(n - 1, tu, tg, toi)   ⟦truoc⟧', '    buoc.append((tu, toi))   ⟦chuyen⟧', '    chuyen(n - 1, tg, toi, tu)   ⟦sau⟧', '', 'chuyen(n, 1, 3, 2)   ⟦bd⟧'],
    cpp: ['void chuyen(int n, int tu, int toi, int tg) {   ⟦goi⟧', '    if (n == 0) return;   ⟦co_so⟧', '    chuyen(n - 1, tu, tg, toi);   ⟦truoc⟧', '    buoc.push_back({tu, toi});   ⟦chuyen⟧', '    chuyen(n - 1, tg, toi, tu);   ⟦sau⟧', '}', '// trong main: chuyen(n, 1, 3, 2);   ⟦bd⟧'],
  },
  samples: [['2', 'n = 2: 3 lần chuyển'], ['3', 'n = 3: 7 lần chuyển'], ['1', 'n = 1']],
  parse(t) { const [n] = U.ints(t); if (n < 1 || n > 5) throw new Error('Hãy chọn 1 ≤ n ≤ 5 (n = 5 đã có 31 lần chuyển).'); return n; },
  random() { return String(U.rnd(2, 4)); },
  run(n) {
    const F = [], coc = [[], [...Array(n).keys()].map((k) => n - k), [], []], stack = [], moves = [];
    const disk = (d) => '▬'.repeat(d) + ' ' + d;
    const A = (hl = {}) => [1, 2, 3].map((c) => ({ name: `Cọc ${c} (dưới → trên)`, values: coc[c].map(disk), noIdx: true, hl: hl[c] || {}, width: 40 + 12 * n }));
    const S = () => stack.map(([k, a, b, c]) => `chuyen(${k}, ${a}→${b}, qua ${c})`);
    F.push({ at: 'bd', msg: `Bắt đầu: ${n} đĩa ở cọc 1. Gọi chuyen(${n}, 1→3, qua 2).`, arrays: A(), stack: ['main'], fig: true });
    const rec = (k, a, b, c) => {
      stack.push([k, a, b, c]);
      if (k === 0) { F.push({ at: 'goi co_so', msg: 'n = 0: trường hợp cơ sở, không làm gì, trở về ngay.', arrays: A(), stack: ['main', ...S()] }); stack.pop(); return; }
      F.push({ at: 'goi truoc', msg: `chuyen(${k}, ${a}→${b}, qua ${c}): trước hết dời ${k - 1} đĩa nhỏ hơn từ cọc ${a} sang cọc trung gian ${c}.`, arrays: A(), stack: ['main', ...S()], fig: F.length < 4 });
      rec(k - 1, a, c, b);
      const d = coc[a].pop(); coc[b].push(d); moves.push(`${a} ${b}`);
      F.push({ at: 'chuyen', msg: `Đĩa lớn nhất của lời gọi này (đĩa ${d}) chuyển từ cọc ${a} sang cọc ${b}. Lần chuyển thứ ${moves.length}.`, arrays: A({ [b]: { [coc[b].length - 1]: 'cur' } }), stack: ['main', ...S()], ask: { q: `Lần chuyển thứ ${moves.length} là từ cọc nào sang cọc nào?`, choices: [...new Set([`${a} → ${b}`, `${a} → ${c}`, `${c} → ${b}`])], answer: `${a} → ${b}` }, out: moves.join('\n'), fig: moves.length <= 3 });
      rec(k - 1, c, b, a);
      stack.pop();
    };
    rec(n, 1, 3, 2);
    F.push({ at: 'bd', msg: `Xong: ${moves.length} = 2^${n} − 1 lần chuyển. Mọi đĩa đã ở cọc 3.`, arrays: A({ 3: Object.fromEntries(coc[3].map((_, k) => [k, 'ok'])) }), stack: ['main'], out: moves.length + '\n' + moves.join('\n'), fig: true });
    return U.limit(F);
  },
};
