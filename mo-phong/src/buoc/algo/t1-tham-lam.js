const ALGO = {
  id: 't1-tham-lam', title: 'Tham lam: xem nhiều suất chiếu nhất',
  desc: 'Sắp các suất theo thời điểm <b>kết thúc</b>. Duyệt lần lượt: suất nào bắt đầu không sớm hơn lúc rảnh thì xem, và lúc rảnh mới là lúc suất đó kết thúc.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-8-tham-lam/',
  code: {
    py: ['p.sort()   # cặp (kết thúc, bắt đầu)   ⟦sx⟧', 'ranh = dem = 0', 'for b, a in p:   ⟦xet⟧', '    if a >= ranh:   ⟦xet⟧', '        dem += 1   ⟦xem⟧', '        ranh = b   ⟦xem⟧', 'print(dem)   ⟦in⟧'],
    cpp: ['sort(p.begin(), p.end());   // (kết thúc, bắt đầu)   ⟦sx⟧', 'long long ranh = 0; int dem = 0;', 'for (auto [b, a] : p)   ⟦xet⟧', '    if (a >= ranh) { dem++; ranh = b; }   ⟦xem⟧', "cout << dem << '\\n';   ⟦in⟧"],
  },
  samples: [['3\n3 5\n4 9\n5 8', 'ví dụ trong bài'], ['3\n1 100\n2 3\n4 5', 'phản ví dụ của An'], ['3\n1 5\n4 7\n6 10', 'phản ví dụ của Chi'], ['6\n1 4\n3 5\n0 6\n5 7\n3 9\n5 9', 'nhiều suất']],
  parse(t) { const v = U.ints(t, 3), n = v[0]; if (n < 1 || n > 12) throw new Error('Hãy chọn 1 ≤ n ≤ 12.'); if (v.length < 1 + 2 * n) throw new Error('Thiếu dữ liệu: mỗi suất "a b".'); const p = []; for (let i = 0; i < n; i++) { const a = v[1 + 2 * i], b = v[2 + 2 * i]; if (!(a < b)) throw new Error('Mỗi suất cần a < b.'); p.push([a, b]); } return p; },
  random() { const n = U.rnd(4, 8), L = [n]; for (let i = 0; i < n; i++) { const a = U.rnd(0, 12); L.push(a + ' ' + (a + U.rnd(1, 5))); } return L.join('\n'); },
  run(p0) {
    const F = [], p = p0.slice().sort((x, y) => x[1] - y[1] || x[0] - y[0]), st = {}; let ranh = 0, dem = 0;
    const lab = (x) => `${x[0]}→${x[1]}`;
    F.push({ at: 'sx', msg: 'Các suất theo thứ tự dữ liệu vào.', arrays: [{ name: 'Suất chiếu (bắt đầu → kết thúc)', values: p0.map(lab), hl: {}, width: 64 }], vars: { ranh, dem }, fig: true });
    F.push({ at: 'sx', msg: 'Sắp theo thời điểm kết thúc tăng dần.', arrays: [{ name: 'Đã sắp theo kết thúc', values: p.map(lab), hl: {}, width: 64 }], vars: { ranh, dem }, fig: true });
    p.forEach((x, i) => {
      const ok = x[0] >= ranh, truoc = ranh;
      if (ok) { dem++; ranh = x[1]; st[i] = 'ok'; } else st[i] = 'bad';
      F.push({ at: ok ? 'xet xem' : 'xet', msg: ok ? `Suất ${lab(x)} bắt đầu lúc ${x[0]} ≥ lúc rảnh: <b>xem</b>. Rảnh từ ${ranh}.` : `Suất ${lab(x)} bắt đầu lúc ${x[0]} < ${ranh} (còn đang xem suất trước): bỏ qua.`, arrays: [{ name: 'Đã sắp theo kết thúc (xanh: xem, đỏ: bỏ)', values: p.map(lab), hl: { ...st, [i]: ok ? 'ok' : 'bad' }, ptr: { 'đang xét': i }, width: 64 }], vars: { ranh, dem }, ask: { q: `Đang rảnh từ ${truoc}. Có xem suất ${lab(x)} không?`, choices: ['xem', 'bỏ qua'], answer: ok ? 'xem' : 'bỏ qua' }, fig: i < 3 });
    });
    F.push({ at: 'in', msg: `Xem được ${dem} suất.`, arrays: [{ name: 'Các suất được chọn', values: p.map(lab), hl: st, width: 64 }], vars: { ranh, dem }, out: String(dem), fig: true });
    return F;
  },
};
