const ALGO = {
  id: 't1-kadane', title: 'Kadane: đoạn con có tổng lớn nhất trong O(n)',
  desc: '<code>cur</code> là tổng lớn nhất của đoạn <b>kết thúc tại i</b>: hoặc nối a[i] vào đoạn cũ, hoặc bỏ đoạn cũ (nếu nó làm tổng nhỏ đi) và bắt đầu lại từ a[i]. <code>best</code> là cur lớn nhất từng thấy.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-1-do-phuc-tap/',
  code: {
    py: ['cur = best = a[0]   ⟦khoi⟧', 'for i in range(1, n):   ⟦lap⟧', '    cur = max(a[i], cur + a[i])   ⟦cur⟧', '    best = max(best, cur)   ⟦best⟧', 'print(best)   ⟦in⟧'],
    cpp: ['long long cur = a[0], best = a[0];   ⟦khoi⟧', 'for (int i = 1; i < n; i++) {   ⟦lap⟧', '    cur = max(a[i], cur + a[i]);   ⟦cur⟧', '    best = max(best, cur);   ⟦best⟧', '}', "cout << best << '\\n';   ⟦in⟧"],
  },
  samples: [['8\n-1 3 -2 5 3 -5 2 2', 'ví dụ trong bài'], ['5\n-4 -2 -7 -1 -3', 'toàn số âm'], ['6\n2 -1 2 -5 4 1', 'bắt đầu lại giữa chừng']],
  parse(t) { const a = U.ints(t, 2), n = a[0]; if (n < 1 || n > 20) throw new Error('Hãy chọn 1 ≤ n ≤ 20.'); if (a.length < n + 1) throw new Error('Thiếu số.'); return a.slice(1, n + 1); },
  random() { const n = U.rnd(5, 12); return n + '\n' + Array.from({ length: n }, () => U.rnd(-9, 9)).join(' '); },
  run(a) {
    const F = [], n = a.length; let cur = a[0], best = a[0], st = 0, bl = 0, br = 0;
    const A = (i, extra = {}) => { const hl = {}; for (let k = st; k <= i; k++) hl[k] = 'mark'; for (let k = bl; k <= br; k++) if (hl[k] !== 'mark') hl[k] = 'ok'; hl[i] = 'cur'; return [{ name: 'Dãy a (tô xanh dương: đoạn đang mang theo, kết thúc tại i)', values: a, hl: { ...hl, ...extra }, ptr: { i } }]; };
    F.push({ at: 'khoi', msg: `Bắt đầu: đoạn chỉ có a[0] = ${a[0]}. cur = best = ${a[0]}.`, arrays: A(0), vars: { cur, best }, fig: true });
    for (let i = 1; i < n; i++) {
      const noi = cur + a[i], bo = noi < a[i];
      F.push({ at: 'lap cur', msg: `i = ${i}: nối tiếp được ${cur} + ${a[i] < 0 ? `(${a[i]})` : a[i]} = ${noi}; bắt đầu lại được ${a[i]}. ${bo ? `Đoạn cũ có tổng âm (${cur}) chỉ làm hại: <b>bỏ đi, bắt đầu lại</b> từ i.` : 'Nối tiếp tốt hơn (hoặc bằng).'}`, arrays: A(i - 1), vars: { cur, best, 'a[i]': a[i] }, ask: { q: `cur mới tại i = ${i} là bao nhiêu?`, choices: [...new Set([Math.max(a[i], noi), Math.min(a[i], noi), noi + 1])].sort((x, y) => x - y), answer: Math.max(a[i], noi) }, fig: i <= 2 });
      if (bo) st = i; cur = Math.max(a[i], noi);
      const nb = cur > best; if (nb) { best = cur; bl = st; br = i; }
      F.push({ at: 'best', msg: `cur = ${cur}. ${nb ? `Lớn hơn best cũ: <b>best = ${best}</b> (đoạn ${bl}..${br}).` : `Không lớn hơn best = ${best}.`}`, arrays: A(i), vars: { cur, best }, fig: i === 4 });
    }
    F.push({ at: 'in', msg: `In best = ${best}. Đoạn tốt nhất là a[${bl}..${br}]. Chỉ một lượt duyệt: O(n).`, arrays: [{ name: 'Dãy a', values: a, hl: Object.fromEntries([...Array(br - bl + 1).keys()].map((k) => [bl + k, 'ok'])) }], vars: { cur, best }, out: String(best), fig: true });
    return F;
  },
};
