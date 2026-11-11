const ALGO = {
  id: 't1-hai-dau', title: 'Hai con trỏ từ hai đầu: tìm cặp có tổng bằng x',
  desc: 'Trên mảng đã sắp xếp: l ở đầu, r ở cuối. Tổng nhỏ quá thì tăng l, lớn quá thì giảm r. Mỗi bước loại hẳn một phần tử khỏi cuộc tìm kiếm.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-5-hai-con-tro/',
  code: {
    py: ['a.sort()', 'l, r = 0, n - 1   ⟦khoi⟧', 'while l < r:   ⟦dk⟧', '    s = a[l] + a[r]   ⟦ss⟧', '    if s == x: print(a[l], a[r]); break   ⟦bang⟧', '    elif s < x: l += 1   ⟦nho⟧', '    else: r -= 1   ⟦lon⟧', 'else: print("IMPOSSIBLE")   ⟦khong⟧'],
    cpp: ['sort(a.begin(), a.end());', 'int l = 0, r = n - 1;   ⟦khoi⟧', 'while (l < r) {   ⟦dk⟧', '    long long s = a[l] + a[r];   ⟦ss⟧', '    if (s == x) { /* tìm được */ break; }   ⟦bang⟧', '    else if (s < x) l++;   ⟦nho⟧', '    else r--;   ⟦lon⟧', '}   // l >= r: không có cặp nào   ⟦khong⟧'],
  },
  samples: [['8 13\n1 2 4 6 7 9 11 15', 'có cặp'], ['5 100\n10 20 30 40 50', 'không có cặp'], ['6 10\n7 1 9 3 2 8', 'chưa sắp xếp']],
  parse(t) { const v = U.ints(t, 3), [n, x] = v; if (n < 2 || n > 16) throw new Error('Hãy chọn 2 ≤ n ≤ 16.'); if (v.length < 2 + n) throw new Error('Thiếu số.'); return { a: v.slice(2, 2 + n).sort((p, q) => p - q), x }; },
  random() { const n = U.rnd(6, 12), a = Array.from({ length: n }, () => U.rnd(1, 30)); return n + ' ' + (Math.random() < .7 ? a[0] + a[n - 1] - U.rnd(0, 5) : U.rnd(1, 60)) + '\n' + a.join(' '); },
  run({ a, x }) {
    const F = [], n = a.length; let l = 0, r = n - 1;
    const A = (extra = {}) => { const hl = {}; for (let k = 0; k < n; k++) if (k < l || k > r) hl[k] = 'dim'; return [{ name: `Dãy đã sắp xếp; tìm a[l] + a[r] = ${x} (ô mờ: đã loại)`, values: a, hl: { ...hl, ...extra }, ptr: l < r ? { l, r } : l === r ? { 'l = r': l } : {} }]; };
    F.push({ at: 'khoi', msg: `Sau khi sắp xếp, đặt l = 0 và r = ${n - 1}.`, arrays: A(), vars: { l, r }, fig: true });
    let k = 0;
    while (l < r) {
      const s = a[l] + a[r]; k++;
      const kq = s === x ? 'bằng' : s < x ? 'nhỏ hơn' : 'lớn hơn';
      F.push({ at: 'dk ss', msg: `a[${l}] + a[${r}] = ${a[l]} + ${a[r]} = ${s}, ${kq} ${x}.`, arrays: A({ [l]: 'cur', [r]: 'cur' }), vars: { l, r, s }, ask: { q: `${a[l]} + ${a[r]} = ${s} so với x = ${x}: làm gì tiếp?`, choices: ['tăng l', 'giảm r', 'tìm được'], answer: s === x ? 'tìm được' : s < x ? 'tăng l' : 'giảm r' }, fig: k <= 3 });
      if (s === x) { F.push({ at: 'bang', msg: `Tìm được cặp ${a[l]} + ${a[r]} = ${x} sau ${k} lần so sánh.`, arrays: A({ [l]: 'ok', [r]: 'ok' }), vars: { l, r }, out: `${a[l]} ${a[r]}`, fig: true }); return F; }
      if (s < x) { l++; F.push({ at: 'nho', msg: `Tổng nhỏ quá. Với a[${l - 1}], kể cả cộng số lớn nhất còn lại cũng không đủ: loại a[${l - 1}], l = ${l}.`, arrays: A({ [l - 1]: 'bad' }), vars: { l, r } }); }
      else { r--; F.push({ at: 'lon', msg: `Tổng lớn quá. Với a[${r + 1}], kể cả cộng số nhỏ nhất còn lại cũng thừa: loại a[${r + 1}], r = ${r}.`, arrays: A({ [r + 1]: 'bad' }), vars: { l, r } }); }
    }
    F.push({ at: 'khong', msg: `l gặp r sau ${k} lần so sánh: mọi phần tử đã bị loại, không có cặp nào có tổng ${x}.`, arrays: A(), vars: { l, r }, out: 'IMPOSSIBLE', fig: true });
    return F;
  },
};
