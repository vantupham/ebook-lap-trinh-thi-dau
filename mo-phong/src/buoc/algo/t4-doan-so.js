const ALGO = {
  id: 't4-doan-so', title: 'Bài tương tác: đoán số bằng tìm kiếm nhị phân',
  desc: 'Chương trình chỉ biết x nằm trong [lo, hi]. Mỗi lần hỏi <b>? mid</b> với mid = ⌈(lo + hi)/2⌉, grader trả 1 nếu x ≥ mid, 0 nếu x &lt; mid. Đoạn [lo, hi] giảm một nửa sau mỗi câu, nên n = 10⁹ cần không quá 30 câu. Sau mỗi câu hỏi phải <b>flush</b>.',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-10-de-kieu-ioi/',
  code: {
    py: ['lo, hi = 1, n   # bất biến: lo ≤ x ≤ hi   ⟦khoi⟧', 'while lo < hi:', '    mid = (lo + hi + 1) // 2', '    print("?", mid, flush=True)   ⟦hoi⟧', '    if int(input()) == 1: lo = mid   ⟦mot⟧', '    else: hi = mid - 1   ⟦khong⟧', 'print("!", lo, flush=True)   ⟦tra⟧'],
    cpp: ['long long lo = 1, hi = n;   // bất biến: lo ≤ x ≤ hi   ⟦khoi⟧', 'while (lo < hi) {', '    long long mid = (lo + hi + 1) / 2;', '    cout << "? " << mid << endl;   ⟦hoi⟧', '    cin >> r; if (r == 1) lo = mid;   ⟦mot⟧', '    else hi = mid - 1;   ⟦khong⟧', '}', 'cout << "! " << lo << endl;   ⟦tra⟧'],
  },
  samples: [['10 7', 'phiên mẫu trong bài'], ['16 1', 'x nhỏ nhất'], ['1000000000 123456789', 'n = 10⁹: đếm số câu']],
  parse(t) { const v = U.ints(t, 2), [n, x] = v; if (!(n >= 1 && n <= 1e9 && x >= 1 && x <= n)) throw new Error('Cần 1 ≤ x ≤ n ≤ 10⁹.'); return { n, x }; },
  random() { const n = U.pick([U.rnd(8, 20), U.rnd(100, 1000)]); return `${n} ${U.rnd(1, n)}`; },
  run({ n, x }) {
    const F = [], log = [], small = n <= 20, lab = small ? [...Array(n).keys()].map((i) => String(i + 1)) : [];
    let lo = 1, hi = n, cau = 0;
    const view = (hl = {}) => [...(small ? [{ name: 'Các giá trị x còn có thể', values: lab.map((s, i) => (i + 1 >= lo && i + 1 <= hi ? s : '·')), noIdx: true, hl }] : []), { name: 'Nhật ký hỏi – đáp', values: log.slice(), noIdx: true, hl: {}, width: 70 }];
    F.push({ at: 'khoi', msg: `Grader đưa n = ${n}. x nằm trong [1, ${n}].`, arrays: view(), vars: { lo, hi, 'số câu': 0 }, fig: true });
    while (lo < hi) {
      const mid = Math.floor((lo + hi + 1) / 2), r = x >= mid ? 1 : 0; cau++;
      log.push(`? ${mid} → ${r}`);
      if (r) lo = mid; else hi = mid - 1;
      const hl = {}; if (small) for (let i = lo; i <= hi; i++) hl[i - 1] = 'ok';
      F.push({ at: r ? 'hoi mot' : 'hoi khong', msg: `Hỏi "? ${mid}". x ${r ? '≥' : '<'} ${mid} nên grader trả ${r}; đoạn còn lại [${lo}, ${hi}].`, arrays: view(hl), vars: { lo, hi, 'số câu': cau }, ask: { q: `Grader trả gì cho "? ${mid}"?`, choices: ['1', '0'], answer: String(r) }, fig: cau <= 3 });
    }
    F.push({ at: 'tra', msg: `lo = hi = ${lo}: in "! ${lo}" sau ${cau} câu hỏi.`, arrays: view(), vars: { 'số câu': cau }, out: `! ${lo}` });
    return F;
  },
};
