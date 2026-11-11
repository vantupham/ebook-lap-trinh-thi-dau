const ALGO = {
  id: 't1-doi-tien', title: 'Khi tham lam sai: đổi tiền',
  desc: 'Tham lam "lấy đồng lớn nhất có thể" so với lời giải tối ưu (thử hết). Với mệnh giá 1, 2, 5, 10 tham lam đúng; với 1, 3, 4 thì không.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-8-tham-lam/',
  code: {
    py: ['# Tham lam: luôn lấy đồng lớn nhất còn lấy được', 'for c in sorted(menh_gia, reverse=True):   ⟦tl⟧', '    while x >= c:   ⟦tl⟧', '        x -= c; so_dong += 1   ⟦tl⟧', '# Tối ưu: thử mọi cách (bài 2.9 làm bằng QHĐ)   ⟦tu⟧'],
    cpp: ['// Tham lam', 'for (int c : menh_gia_giam_dan)   ⟦tl⟧', '    while (x >= c) { x -= c; so_dong++; }   ⟦tl⟧', '// Tối ưu: thử mọi cách (bài 2.9 làm bằng QHĐ)   ⟦tu⟧'],
  },
  samples: [['3 6\n1 3 4', 'mệnh giá 1 3 4, đổi 6'], ['4 18\n1 2 5 10', 'mệnh giá Việt Nam'], ['3 12\n1 6 9', 'mệnh giá 1 6 9, đổi 12']],
  parse(t) { const v = U.ints(t, 3), [k, x] = v; if (k < 1 || k > 6 || x < 1 || x > 60) throw new Error('Hãy chọn 1 ≤ k ≤ 6 mệnh giá, 1 ≤ x ≤ 60.'); const c = [...new Set(v.slice(2, 2 + k))].sort((a, b) => b - a); if (!c.includes(1)) throw new Error('Cần có mệnh giá 1 để luôn đổi được.'); return { c, x }; },
  random() { return U.pick(['3 6\n1 3 4', '3 10\n1 5 6', '4 30\n1 10 15 25', '3 8\n1 4 5']); },
  run({ c, x }) {
    const F = [], lay = []; let r = x;
    for (const m of c) while (r >= m) { r -= m; lay.push(m); F.push({ at: 'tl', msg: `Tham lam: lấy đồng ${m}, còn phải đổi ${r}.`, arrays: [{ name: 'Tham lam đã lấy', values: lay.slice(), noIdx: true, hl: { [lay.length - 1]: 'cur' } }], vars: { 'còn lại': r, 'số đồng': lay.length }, fig: lay.length <= 3 }); }
    const best = Array(x + 1).fill(Infinity), tr = Array(x + 1).fill(0); best[0] = 0;
    for (let v = 1; v <= x; v++) for (const m of c) if (m <= v && best[v - m] + 1 < best[v]) { best[v] = best[v - m] + 1; tr[v] = m; }
    const tu = []; for (let v = x; v > 0; v -= tr[v]) tu.push(tr[v]);
    tu.sort((a, b) => b - a);
    const sai = tu.length < lay.length;
    F.push({ at: 'tu', msg: sai ? `Tối ưu chỉ cần ${tu.length} đồng (${tu.join(' + ')}), tham lam dùng ${lay.length} đồng: <b>tham lam sai</b> với bộ mệnh giá này.` : `Tối ưu cũng cần ${tu.length} đồng: tham lam đúng ở trường hợp này.`, arrays: [{ name: 'Tham lam', values: lay, noIdx: true, hl: Object.fromEntries(lay.map((_, k) => [k, sai ? 'bad' : 'ok'])) }, { name: 'Tối ưu', values: tu, noIdx: true, hl: Object.fromEntries(tu.map((_, k) => [k, 'ok'])) }], vars: { 'tham lam': lay.length, 'tối ưu': tu.length }, ask: { q: 'Tham lam có cho số đồng ít nhất không?', choices: ['có', 'không'], answer: sai ? 'không' : 'có' }, out: `${lay.length} ${tu.length}`, fig: true });
    return F;
  },
};
