const ALGO = {
  id: 't1-nhi-phan', title: 'Tìm kiếm nhị phân: vị trí đầu tiên ≥ x',
  desc: 'Đáp án luôn nằm trong [lo, hi]. Mỗi bước xem phần tử giữa: nếu a[mid] ≥ x thì mid có thể là đáp án, giữ lại (hi = mid); ngược lại mid chắc chắn không phải (lo = mid + 1). Mỗi bước loại một nửa.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-4-tim-kiem-nhi-phan/',
  code: {
    py: ['lo, hi = 0, n   ⟦khoi⟧', 'while lo < hi:   ⟦dk⟧', '    mid = (lo + hi) // 2   ⟦mid⟧', '    if a[mid] >= x:   ⟦ss⟧', '        hi = mid   ⟦hi⟧', '    else:', '        lo = mid + 1   ⟦lo⟧', 'print(lo)   # = bisect_left(a, x)   ⟦in⟧'],
    cpp: ['int lo = 0, hi = n;   ⟦khoi⟧', 'while (lo < hi) {   ⟦dk⟧', '    int mid = (lo + hi) / 2;   ⟦mid⟧', '    if (a[mid] >= x) hi = mid;   ⟦ss_hi⟧', '    else lo = mid + 1;   ⟦lo⟧', '}', 'cout << lo;   // = lower_bound(...) - a.begin()   ⟦in⟧'],
  },
  samples: [['6 4\n1 3 3 5 7 9', 'ví dụ trong bài: x = 4'], ['6 3\n1 3 3 5 7 9', 'x = 3 có hai bản'], ['6 10\n1 3 3 5 7 9', 'x lớn hơn mọi số'], ['16 23\n2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53', '16 phần tử: chỉ 4 bước']],
  parse(t) {
    const v = U.ints(t, 3), [n, x] = v;
    if (n < 1 || n > 20) throw new Error('Hãy chọn 1 ≤ n ≤ 20 (dòng đầu: n x).');
    if (v.length < 2 + n) throw new Error('Thiếu số.');
    const a = v.slice(2, 2 + n);
    for (let i = 1; i < n; i++) if (a[i] < a[i - 1]) throw new Error('Dãy phải được sắp xếp tăng dần (không giảm).');
    return { a, x };
  },
  random() { const n = U.rnd(6, 16), a = Array.from({ length: n }, () => U.rnd(1, 40)).sort((p, q) => p - q); return n + ' ' + U.pick([a[U.rnd(0, n - 1)], U.rnd(0, 45)]) + '\n' + a.join(' '); },
  run({ a, x }) {
    const F = [], n = a.length; let lo = 0, hi = n, step = 0;
    const A = (mid) => { const hl = {}; for (let k = 0; k < n; k++) hl[k] = k < lo || k >= hi ? 'dim' : ''; if (mid !== undefined) hl[mid] = 'cur'; const ptr = { lo }; if (hi < n) ptr.hi = hi; if (mid !== undefined) ptr.mid = mid; return [{ name: `Dãy a đã sắp xếp; tìm vị trí đầu tiên có a[i] ≥ ${x} (ô mờ: đã loại)`, values: a, hl, ptr }]; };
    F.push({ at: 'khoi', msg: `lo = 0, hi = n = ${n}. Đáp án nằm trong [0, ${n}]; nếu ra ${n} nghĩa là không có số nào ≥ ${x}.`, arrays: A(), vars: { lo, hi }, fig: true });
    while (lo < hi) {
      const mid = (lo + hi) >> 1, ok = a[mid] >= x; step++;
      F.push({ at: 'dk mid ss ss_hi', msg: `Bước ${step}: mid = (${lo} + ${hi}) / 2 = ${mid}, a[${mid}] = ${a[mid]} ${ok ? '≥' : '<'} ${x}.`, arrays: A(mid), vars: { lo, hi, mid }, ask: { q: `a[${mid}] = ${a[mid]} có ≥ ${x} không? Nửa nào bị loại?`, choices: ['≥: loại nửa phải', '<: loại nửa trái'], answer: ok ? '≥: loại nửa phải' : '<: loại nửa trái' }, fig: step <= 2 });
      if (ok) hi = mid; else lo = mid + 1;
      F.push({ at: ok ? 'hi ss_hi' : 'lo', msg: ok ? `mid có thể là đáp án nên giữ lại: hi = ${hi}. Mọi ô sau mid bị loại.` : `mid chắc chắn không phải đáp án: lo = ${lo}. Mọi ô từ mid trở về trước bị loại.`, arrays: A(), vars: { lo, hi }, fig: step <= 2 });
    }
    F.push({ at: 'dk in', msg: `lo = hi = ${lo}: dừng sau ${step} bước. ${lo < n ? `a[${lo}] = ${a[lo]} là số đầu tiên ≥ ${x}.` : `Không có số nào ≥ ${x}.`} Với n = 2·10⁵ chỉ cần khoảng 18 bước.`, arrays: [{ name: 'Kết quả', values: a, hl: lo < n ? { [lo]: 'ok' } : {}, ptr: lo < n ? { 'đáp án': lo } : {} }], vars: { lo, hi }, out: String(lo), fig: true });
    return F;
  },
};
