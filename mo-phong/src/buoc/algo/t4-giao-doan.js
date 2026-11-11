const ALGO = {
  id: 't4-giao-doan', title: 'Hai đoạn thẳng có cắt nhau không',
  desc: 'cross(O, A, B) = (A.x − O.x)(B.y − O.y) − (A.y − O.y)(B.x − O.x): dương là rẽ trái, âm là rẽ phải, 0 là thẳng hàng. Đoạn AB và CD cắt nhau khi một đầu mút nằm <b>trên</b> đoạn kia, hoặc C, D ở <b>hai phía</b> đường AB và A, B ở hai phía đường CD. Chỉ so sánh <b>dấu</b>, không nhân hai tích với nhau.',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-7-hinh-hoc/',
  code: {
    py: ['c1, c2 = cross(A, B, C), cross(A, B, D)   ⟦ab⟧', 'c3, c4 = cross(C, D, A), cross(C, D, B)   ⟦cd⟧', 'if tren_doan(A,B,C) or tren_doan(A,B,D) or tren_doan(C,D,A) or tren_doan(C,D,B): YES   ⟦tren⟧', 'elif dau(c1) * dau(c2) < 0 and dau(c3) * dau(c4) < 0: YES   ⟦khac⟧', 'else: NO   ⟦no⟧'],
    cpp: ['ll c1 = cross(A, B, C), c2 = cross(A, B, D);   ⟦ab⟧', 'll c3 = cross(C, D, A), c4 = cross(C, D, B);   ⟦cd⟧', 'if (tren_doan(A,B,C) || tren_doan(A,B,D) || tren_doan(C,D,A) || tren_doan(C,D,B)) YES;   ⟦tren⟧', 'else if (dau(c1) * dau(c2) < 0 && dau(c3) * dau(c4) < 0) YES;   ⟦khac⟧', 'else NO;   ⟦no⟧'],
  },
  samples: [['3\n1 1 5 3 1 2 4 3\n1 1 5 3 2 3 4 1\n1 1 5 3 3 2 7 4', 'ba trường hợp trong bài'], ['2\n0 0 4 0 1 0 6 0\n0 0 2 0 3 0 5 0', 'thẳng hàng: chồng và rời'], ['2\n0 0 4 4 0 4 4 0\n0 0 4 4 1 0 4 1', 'chữ X và lệch']],
  parse(t) { const v = U.ints(t, 1), q = v[0]; if (!(q >= 1 && q <= 5)) throw new Error('Hãy chọn 1 ≤ số cặp ≤ 5.'); const Q = []; for (let i = 0; i < q; i++) { const r = v.slice(1 + 8 * i, 9 + 8 * i); if (r.length < 8) throw new Error('Mỗi dòng cần 8 số.'); if (r.some((x) => Math.abs(x) > 99)) throw new Error('Tọa độ trong −99..99.'); Q.push(r); } return { Q }; },
  random() { const q = U.rnd(2, 4), L = []; for (let i = 0; i < q; i++) { let r; do r = Array.from({ length: 8 }, () => U.rnd(0, 6)); while ((r[0] === r[2] && r[1] === r[3]) || (r[4] === r[6] && r[5] === r[7])); L.push(r.join(' ')); } return `${q}\n` + L.join('\n'); },
  run({ Q }) {
    const F = [], cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]), dau = (x) => (x > 0) - (x < 0);
    const tren = (a, b, c) => cr(a, b, c) === 0 && Math.min(a[0], b[0]) <= c[0] && c[0] <= Math.max(a[0], b[0]) && Math.min(a[1], b[1]) <= c[1] && c[1] <= Math.max(a[1], b[1]);
    const kq = [], kt = (x) => (x > 0 ? 'trái' : x < 0 ? 'phải' : 'thẳng'), lab = ['ABC', 'ABD', 'CDA', 'CDB'];
    const view = (c, hl = {}) => [{ name: 'Tích có hướng', values: c.map((x) => x ?? ''), labels: lab, hl }, { name: 'Hướng rẽ', values: c.map((x) => (x === null ? '' : kt(x))), labels: lab, hl }, { name: 'Kết quả', values: kq.slice(), hl: {} }];
    Q.forEach((r, qi) => {
      const A = [r[0], r[1]], B = [r[2], r[3]], C = [r[4], r[5]], D = [r[6], r[7]], P = (p) => `(${p[0]},${p[1]})`;
      const c1 = cr(A, B, C), c2 = cr(A, B, D), c3 = cr(C, D, A), c4 = cr(C, D, B);
      F.push({ at: 'ab', msg: `Cặp ${qi + 1}: A${P(A)} B${P(B)}, C${P(C)} D${P(D)}. Từ AB, C ở phía ${kt(c1)}, D ở phía ${kt(c2)}.`, arrays: view([c1, c2, null, null], { 0: 'cur', 1: 'cur' }), vars: { c1, c2 }, ask: { q: 'C và D có ở hai phía (ngặt) của đường AB không?', choices: ['có', 'không'], answer: dau(c1) * dau(c2) < 0 ? 'có' : 'không' }, fig: qi === 0 });
      F.push({ at: 'cd', msg: `Từ CD, A ở phía ${kt(c3)}, B ở phía ${kt(c4)}.`, arrays: view([c1, c2, c3, c4], { 2: 'cur', 3: 'cur' }), vars: { c1, c2, c3, c4 } });
      const t = tren(A, B, C) || tren(A, B, D) || tren(C, D, A) || tren(C, D, B), k = dau(c1) * dau(c2) < 0 && dau(c3) * dau(c4) < 0, ok = t || k;
      kq.push(ok ? 'YES' : 'NO');
      F.push({ at: t ? 'tren' : k ? 'khac' : 'no', msg: t ? 'Có đầu mút nằm trên đoạn kia (tích bằng 0 và nằm trong hình chữ nhật bao): YES.' : k ? 'Cả hai cặp đều trái dấu: hai đoạn cắt nhau, YES.' : 'Có một cặp không trái dấu và không đầu mút nào nằm trên đoạn kia: NO.', arrays: view([c1, c2, c3, c4], { 0: ok ? 'ok' : 'bad', 1: ok ? 'ok' : 'bad', 2: ok ? 'ok' : 'bad', 3: ok ? 'ok' : 'bad' }), vars: {}, ask: { q: `Cặp ${qi + 1} cắt nhau không?`, choices: ['YES', 'NO'], answer: ok ? 'YES' : 'NO' }, fig: qi < 3 });
    });
    F.push({ at: 'no', msg: 'Xong.', arrays: view([null, null, null, null]), vars: {}, out: kq.join('\n') });
    return F;
  },
};
