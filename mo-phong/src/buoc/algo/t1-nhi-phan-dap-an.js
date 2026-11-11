const ALGO = {
  id: 't1-nhi-phan-dap-an', title: 'Tìm nhị phân trên đáp án: Nhà máy',
  desc: 'Không tìm trên mảng mà tìm trên <b>thời gian T</b>. Câu hỏi "trong T giây làm đủ t sản phẩm không?" có dạng sai…sai đúng…đúng, nên chia đôi khoảng T giống hệt tìm trên mảng.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-4-tim-kiem-nhi-phan/',
  code: {
    py: ['def du(T):   ⟦du⟧', '    return sum(T // x for x in k) >= t   ⟦du⟧', 'lo, hi = 0, min(k) * t   ⟦khoi⟧', 'while lo < hi:   ⟦dk⟧', '    mid = (lo + hi) // 2   ⟦mid⟧', '    if du(mid): hi = mid   ⟦hi⟧', '    else: lo = mid + 1   ⟦lo⟧', 'print(lo)   ⟦in⟧'],
    cpp: ['bool du(long long T) { /* tổng T / k[i] >= t ? */ }   ⟦du⟧', 'long long lo = 0, hi = *min_element(...) * t;   ⟦khoi⟧', 'while (lo < hi) {   ⟦dk⟧', '    long long mid = lo + (hi - lo) / 2;   ⟦mid⟧', '    if (du(mid)) hi = mid;   ⟦hi⟧', '    else lo = mid + 1;   ⟦lo⟧', '}', 'cout << lo;   ⟦in⟧'],
  },
  samples: [['3 7\n3 2 5', 'ví dụ trong bài'], ['2 10\n4 6', 'hai máy'], ['1 5\n7', 'một máy']],
  parse(t) { const v = U.ints(t, 3), [n, tt] = v; if (n < 1 || n > 8 || tt < 1 || tt > 1e6) throw new Error('Hãy chọn 1 ≤ n ≤ 8, 1 ≤ t ≤ 10⁶.'); if (v.length < 2 + n) throw new Error('Thiếu số.'); const k = v.slice(2, 2 + n); if (k.some((x) => x < 1)) throw new Error('kᵢ ≥ 1.'); return { k, t: tt }; },
  random() { const n = U.rnd(2, 5); return n + ' ' + U.rnd(5, 40) + '\n' + Array.from({ length: n }, () => U.rnd(1, 9)).join(' '); },
  run({ k, t }) {
    const F = [], cnt = (T) => k.reduce((s, x) => s + Math.floor(T / x), 0);
    let lo = 0, hi = Math.min(...k) * t, step = 0;
    const V = (mid) => ({ lo, hi, ...(mid !== undefined ? { mid, 'sản phẩm': cnt(mid) } : {}) });
    const A = (mid) => [{ name: 'Mỗi máy làm được trong mid giây (mid / kᵢ)', values: k.map((x) => mid === undefined ? '?' : Math.floor(mid / x)), labels: k.map((x) => `k = ${x}`), hl: {}, width: 70 }];
    F.push({ at: 'khoi', msg: `lo = 0; hi = min(k) × t = ${hi}: máy nhanh nhất làm một mình cũng xong trong ${hi} giây, nên đáp án ≤ ${hi}.`, arrays: A(), vars: V(), fig: true });
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2), c = cnt(mid), ok = c >= t; step++;
      F.push({ at: 'dk mid du', msg: `mid = ${mid}: các máy làm được ${k.map((x) => Math.floor(mid / x)).join(' + ')} = ${c} sản phẩm, ${ok ? `đủ ${t}` : `chưa đủ ${t}`}.`, arrays: A(mid), vars: V(mid), ask: { q: `Trong ${mid} giây có làm đủ ${t} sản phẩm không?`, choices: ['đủ', 'chưa đủ'], answer: ok ? 'đủ' : 'chưa đủ' }, fig: step <= 3 });
      if (ok) hi = mid; else lo = mid + 1;
      F.push({ at: ok ? 'hi' : 'lo', msg: ok ? `Đủ: đáp án ≤ ${mid}, hi = ${hi}.` : `Chưa đủ: đáp án > ${mid}, lo = ${lo}.`, arrays: A(mid), vars: V() });
    }
    F.push({ at: 'in', msg: `lo = hi = ${lo} sau ${step} lần kiểm tra. Kiểm tra lại: ${lo} giây làm được ${cnt(lo)} ≥ ${t}, còn ${lo - 1} giây chỉ được ${cnt(lo - 1)}.`, arrays: A(lo), vars: V(), out: String(lo), fig: true });
    return F;
  },
};
