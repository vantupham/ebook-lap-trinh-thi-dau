const ALGO = {
  id: 't1-cua-so', title: 'Hai con trỏ: cửa sổ trượt',
  desc: 'r tiến từng bước, thêm a[r] vào cửa sổ. Khi tổng vượt S thì đẩy l sang phải tới khi hợp lệ. Cả l và r chỉ đi một chiều, nên tổng cộng chỉ khoảng 2n bước.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-5-hai-con-tro/',
  code: {
    py: ['tong = l = best = 0   ⟦khoi⟧', 'for r in range(n):   ⟦them⟧', '    tong += a[r]   ⟦them⟧', '    while tong > S:   ⟦day⟧', '        tong -= a[l]; l += 1   ⟦day⟧', '    best = max(best, r - l + 1)   ⟦best⟧', 'print(best)   ⟦in⟧'],
    cpp: ['long long tong = 0; int l = 0, best = 0;   ⟦khoi⟧', 'for (int r = 0; r < n; r++) {   ⟦them⟧', '    tong += a[r];   ⟦them⟧', '    while (tong > S) tong -= a[l++];   ⟦day⟧', '    best = max(best, r - l + 1);   ⟦best⟧', '}', "cout << best << '\\n';   ⟦in⟧"],
  },
  samples: [['6 10\n4 2 3 6 1 2', 'ví dụ trong bài'], ['5 3\n1 5 1 1 1', 'có phần tử lớn hơn S'], ['8 7\n2 1 3 1 1 4 2 1', 'nhiều lần đẩy l']],
  parse(t) { const v = U.ints(t, 3), [n, S] = v; if (n < 1 || n > 16) throw new Error('Hãy chọn 1 ≤ n ≤ 16.'); if (v.length < 2 + n) throw new Error('Thiếu số.'); const a = v.slice(2, 2 + n); if (a.some((x) => x < 1)) throw new Error('Các phần tử phải dương (aᵢ ≥ 1).'); return { a, S }; },
  random() { const n = U.rnd(6, 12); return n + ' ' + U.rnd(5, 12) + '\n' + Array.from({ length: n }, () => U.rnd(1, 6)).join(' '); },
  run({ a, S }) {
    const F = [], n = a.length; let tong = 0, l = 0, best = 0, buoc = 0, bl = 0, br = -1;
    const A = (r, extra = {}) => { const hl = {}; for (let k = l; k <= r; k++) hl[k] = 'mark'; for (let k = 0; k < l; k++) hl[k] = 'dim'; return [{ name: `Dãy a (xanh dương: cửa sổ [l, r], tổng phải ≤ ${S})`, values: a, hl: { ...hl, ...extra }, ptr: r >= l ? { l, r } : { r } }]; };
    F.push({ at: 'khoi', msg: 'Cửa sổ rỗng: tong = 0, l = 0.', arrays: [{ name: 'Dãy a', values: a, hl: {}, ptr: { l: 0 } }], vars: { tong, l, best }, fig: true });
    for (let r = 0; r < n; r++) {
      tong += a[r]; buoc++;
      F.push({ at: 'them', msg: `r = ${r}: thêm a[${r}] = ${a[r]}, tổng = ${tong}${tong > S ? ` > ${S}: phải đẩy l.` : '.'}`, arrays: A(r, { [r]: 'cur' }), vars: { tong, l, best, 'số bước': buoc }, ask: { q: `Thêm a[${r}] = ${a[r]} xong, có phải đẩy l không?`, choices: ['có', 'không'], answer: tong > S ? 'có' : 'không' }, fig: r === 3 });
      while (tong > S) { tong -= a[l]; l++; buoc++; F.push({ at: 'day', msg: `Bỏ a[${l - 1}] = ${a[l - 1]}: tổng = ${tong}, l = ${l}.`, arrays: A(r, { [l - 1]: 'bad' }), vars: { tong, l, best, 'số bước': buoc }, fig: r === 3 }); }
      const len = r - l + 1; if (len > best) { best = len; bl = l; br = r; }
      F.push({ at: 'best', msg: `Cửa sổ [${l}, ${r}] dài ${len}${len === best && len > 0 && bl === l ? ' (tốt nhất tới giờ)' : ''}. best = ${best}.`, arrays: A(r), vars: { tong, l, best, 'số bước': buoc }, fig: r === 2 });
    }
    F.push({ at: 'in', msg: `Xong: best = ${best}. l và r mỗi con trỏ đi tối đa ${n} bước, tổng ${buoc} bước ≤ 2n = ${2 * n}.`, arrays: [{ name: 'Đoạn dài nhất', values: a, hl: Object.fromEntries([...Array(Math.max(0, br - bl + 1)).keys()].map((k) => [bl + k, 'ok'])) }], vars: { best }, out: String(best), fig: true });
    return F;
  },
};
