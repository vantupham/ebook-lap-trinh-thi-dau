const ALGO = {
  id: 't4-mo', title: 'Thuật toán Mo: đếm số giá trị khác nhau trên đoạn',
  desc: 'Đọc hết câu hỏi, sắp theo (khối chứa l, rồi r tăng dần). Giữ đoạn hiện tại [L, R] và mảng đếm; thêm/bớt một phần tử là O(1). Di chuyển hai đầu tới câu hỏi tiếp theo: mở rộng trước, thu hẹp sau. Tổng quãng đường O((n + q)√n).',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-2-chia-can/',
  code: {
    py: ['qs.sort(key=lambda t: (t[0] // B, t[1]))   ⟦sap⟧', 'for l, r, id in qs:', '    while R < r: R += 1; them(R)   ⟦mo⟧', '    while L > l: L -= 1; them(L)   ⟦mo⟧', '    while R > r: bot(R); R -= 1   ⟦thu⟧', '    while L < l: bot(L); L += 1   ⟦thu⟧', '    kq[id] = khac   ⟦ghi⟧'],
    cpp: ['sort(qs.begin(), qs.end(), theo (l / B, r));   ⟦sap⟧', 'for (auto [l, r, id] : qs) {', '    while (R < r) them(++R);   ⟦mo⟧', '    while (L > l) them(--L);   ⟦mo⟧', '    while (R > r) bot(R--);   ⟦thu⟧', '    while (L < l) bot(L++);   ⟦thu⟧', '    kq[id] = khac;   ⟦ghi⟧', '}'],
  },
  samples: [['9 4\n3 2 3 1 2 4 4 1 3\n1 4\n2 6\n5 9\n3 5', 'ví dụ trong bài'], ['5 3\n3 2 3 1 2\n1 3\n2 4\n1 5', 'năm phần tử'], ['8 3\n1 1 1 1 2 2 2 2\n1 8\n4 5\n2 3', 'nhiều phần tử trùng']],
  parse(t) { const v = U.ints(t, 2), [n, q] = v; if (n < 1 || n > 12 || q < 1 || q > 5) throw new Error('Hãy chọn n ≤ 12, q ≤ 5.'); const a = v.slice(2, 2 + n); if (a.length < n) throw new Error('Thiếu số.'); const qs = []; for (let i = 0; i < q; i++) { const l = v[2 + n + 2 * i], r = v[3 + n + 2 * i]; if (!(l >= 1 && l <= r && r <= n)) throw new Error('Câu hỏi l r với 1 ≤ l ≤ r ≤ n.'); qs.push([l - 1, r - 1, i]); } return { a, qs }; },
  random() { const n = U.rnd(8, 12), q = U.rnd(3, 4); return `${n} ${q}\n${Array.from({ length: n }, () => U.rnd(1, 5)).join(' ')}\n` + Array.from({ length: q }, () => { const l = U.rnd(1, n); return `${l} ${U.rnd(l, n)}`; }).join('\n'); },
  run({ a, qs }) {
    const F = [], n = a.length, B = Math.max(1, Math.floor(Math.sqrt(n))), vals = [...new Set(a)].sort((x, y) => x - y), cnt = Object.fromEntries(vals.map((x) => [x, 0]));
    const sq = qs.slice().sort((p, q) => Math.floor(p[0] / B) - Math.floor(q[0] / B) || p[1] - q[1]);
    let L = 0, R = -1, khac = 0, buoc = 0; const kq = Array(qs.length);
    const view = (hl = {}) => [{ name: `a (chữ dưới: chỉ số từ 1; khối B = ${B})`, values: a, labels: a.map((_, i) => String(i + 1)), hl: Object.assign(Object.fromEntries(a.map((_, i) => [i, i >= L && i <= R ? 'mark' : ''])), hl), ptr: R >= L ? { L, R } : {} }, { name: 'Số lần xuất hiện mỗi giá trị trong đoạn', values: vals.map((x) => cnt[x]), labels: vals.map((x) => 'giá trị ' + x), hl: {} }, { name: 'Câu hỏi đã sắp (l, r theo chỉ số từ 1)', values: sq.map(([l, r]) => `${l + 1}–${r + 1}`), noIdx: true, hl: {}, width: 52 }];
    F.push({ at: 'sap', msg: `Sắp câu hỏi theo (khối của l, r): ${sq.map(([l, r]) => `[${l + 1},${r + 1}]`).join(', ')}.`, arrays: view(), vars: { khac }, fig: true });
    const them = (i) => { if (cnt[a[i]]++ === 0) khac++; buoc++; }, bot = (i) => { if (--cnt[a[i]] === 0) khac--; buoc++; };
    sq.forEach(([l, r, id], k) => {
      const b0 = buoc;
      while (R < r) them(++R); while (L > l) them(--L); while (R > r) bot(R--); while (L < l) bot(L++);
      kq[id] = khac;
      F.push({ at: 'mo thu ghi', msg: `Câu hỏi [${l + 1}, ${r + 1}]: di chuyển hai đầu ${buoc - b0} bước. Có ${khac} giá trị khác nhau.`, arrays: view(), vars: { khac, 'tổng số bước': buoc }, ask: { q: `Đoạn [${l + 1}, ${r + 1}] có bao nhiêu giá trị khác nhau?`, choices: U.near(khac), answer: khac }, out: kq.map((x) => x ?? '?').join('\n'), fig: k < 4 });
    });
    F.push({ at: 'ghi', msg: `In đáp án theo thứ tự câu hỏi gốc. Tổng số lần thêm/bớt: ${buoc}.`, arrays: view(), vars: { 'tổng số bước': buoc }, out: kq.join('\n') });
    return F;
  },
};
