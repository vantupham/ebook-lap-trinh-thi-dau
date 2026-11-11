const ALGO = {
  id: 't4-bao-loi', title: 'Bao lồi bằng chuỗi đơn điệu (Andrew)',
  desc: 'Sắp xếp điểm theo x rồi y. Dựng <b>nửa dưới</b> từ trái sang phải: trước khi thêm điểm p, bỏ đỉnh ngăn xếp khi hai đỉnh cuối và p <b>không rẽ trái</b> (cross ≤ 0). Dựng <b>nửa trên</b> giống hệt nhưng đi từ phải sang trái. Ghép hai nửa (bỏ điểm đầu mút trùng) được bao lồi ngược chiều kim đồng hồ.',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-7-hinh-hoc/',
  code: {
    py: ['P.sort()   ⟦sap⟧', 'for p in P (rồi for p in reversed(P) cho nửa trên):', '    while len(st) >= 2 and cross(st[-2], st[-1], p) <= 0: st.pop()   ⟦bo⟧', '    st.append(p)   ⟦them⟧', 'hull = duoi[:-1] + tren[:-1]   ⟦ghep⟧'],
    cpp: ['sort(P.begin(), P.end());   ⟦sap⟧', 'for (P p : pts) (rồi duyệt ngược cho nửa trên):', '    while (st.size() >= 2 && cross(st[st.size()-2], st.back(), p) <= 0) st.pop_back();   ⟦bo⟧', '    st.push_back(p);   ⟦them⟧', 'ghép duoi và tren, bỏ điểm cuối mỗi nửa   ⟦ghep⟧'],
  },
  samples: [['7\n0 0\n4 0\n2 1\n1 3\n4 4\n0 4\n2 2', 'ví dụ trong bài'], ['5\n0 0\n2 0\n4 0\n2 2\n2 -2', 'có ba điểm thẳng hàng'], ['4\n0 0\n3 0\n3 3\n0 3', 'hình vuông']],
  parse(t) { const v = U.ints(t, 1), n = v[0]; if (!(n >= 3 && n <= 10)) throw new Error('Hãy chọn 3 ≤ n ≤ 10.'); const P = []; for (let i = 0; i < n; i++) { if (v[2 + 2 * i] === undefined) throw new Error('Thiếu tọa độ.'); P.push([v[1 + 2 * i], v[2 + 2 * i]]); } if (P.some((p) => Math.abs(p[0]) > 99 || Math.abs(p[1]) > 99)) throw new Error('Tọa độ trong −99..99.'); if (new Set(P.map(String)).size < n) throw new Error('Các điểm phải khác nhau.'); return { P }; },
  random() { const n = U.rnd(5, 8), s = new Set(); while (s.size < n) s.add(`${U.rnd(0, 6)} ${U.rnd(0, 6)}`); return `${n}\n` + [...s].join('\n'); },
  run({ P }) {
    const F = [], cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]), S = (p) => `(${p[0]},${p[1]})`;
    const pts = P.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]); let st = [], duoi = [];
    const view = (seq, i, hl = {}) => [{ name: 'Các điểm theo thứ tự duyệt', values: seq.map(S), ptr: i === undefined ? {} : { p: i }, hl, width: 46 }, { name: 'Nửa dưới đã xong', values: duoi.map(S), noIdx: true, hl: {}, width: 46 }, { name: 'Ngăn xếp (nửa đang dựng)', values: st.map(S), noIdx: true, hl: { [st.length - 1]: 'cur' }, width: 46 }];
    F.push({ at: 'sap', msg: `Sắp theo x rồi y: ${pts.map(S).join(' ')}.`, arrays: view(pts), vars: {} });
    let np = 0;
    for (const [seq, ten] of [[pts, 'dưới'], [pts.slice().reverse(), 'trên']]) {
      st = [];
      seq.forEach((p, i) => {
        while (st.length >= 2) { const c = cr(st[st.length - 2], st[st.length - 1], p);
          F.push({ at: c <= 0 ? 'bo' : 'them', msg: `Nửa ${ten}, xét ${S(p)}: cross(${S(st[st.length - 2])}, ${S(st[st.length - 1])}, ${S(p)}) = ${c} ${c <= 0 ? `≤ 0, không rẽ trái: bỏ ${S(st[st.length - 1])}.` : '> 0, rẽ trái: giữ.'}`, arrays: view(seq, i, { [i]: 'mark' }), vars: { cross: c }, ask: { q: `Có bỏ ${S(st[st.length - 1])} khỏi ngăn xếp không?`, choices: ['bỏ', 'giữ'], answer: c <= 0 ? 'bỏ' : 'giữ' }, fig: c <= 0 && np++ < 2 });
          if (c <= 0) st.pop(); else break; }
        st.push(p);
      });
      F.push({ at: 'them', msg: `Xong nửa ${ten}: ${st.map(S).join(' → ')}.`, arrays: view(seq), vars: {}, fig: ten === 'dưới' });
      if (ten === 'dưới') duoi = st.slice();
    }
    const hull = duoi.slice(0, -1).concat(st.slice(0, -1)); let s2 = 0; hull.forEach((p, i) => { const q = hull[(i + 1) % hull.length]; s2 += p[0] * q[1] - q[0] * p[1]; });
    st = [];
    F.push({ at: 'ghep', msg: `Bao lồi (ngược chiều kim đồng hồ): ${hull.map(S).join(' → ')}; ${hull.length} đỉnh, 2·diện tích = ${Math.abs(s2)}.`, arrays: [{ name: 'Bao lồi', values: hull.map(S), hl: {}, width: 46 }], vars: { 'số đỉnh': hull.length, '2S': Math.abs(s2) }, out: String(hull.length), fig: true });
    return F;
  },
};
