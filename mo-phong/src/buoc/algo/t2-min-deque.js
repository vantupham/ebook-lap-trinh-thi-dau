const ALGO = {
  id: 't2-min-deque', title: 'Hàng đợi đơn điệu: min trên cửa sổ trượt',
  desc: 'deque lưu <b>chỉ số</b>, giá trị tăng dần từ đầu tới cuối. Thêm i: bỏ ở <b>cuối</b> mọi chỉ số có giá trị ≥ a[i] (chúng không bao giờ còn là min). Bỏ ở <b>đầu</b> chỉ số đã ra khỏi cửa sổ. Đầu deque là min của cửa sổ.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-6-min-tren-doan/',
  code: {
    py: ['dq = deque()   ⟦khoi⟧', 'for i in range(n):', '    while dq and a[dq[-1]] >= a[i]: dq.pop()   ⟦bo_cuoi⟧', '    dq.append(i)   ⟦them⟧', '    if dq[0] <= i - k: dq.popleft()   ⟦bo_dau⟧', '    if i >= k - 1: kq.append(a[dq[0]])   ⟦ghi⟧'],
    cpp: ['deque<int> dq;   ⟦khoi⟧', 'for (int i = 0; i < n; i++) {', '    while (!dq.empty() && a[dq.back()] >= a[i]) dq.pop_back();   ⟦bo_cuoi⟧', '    dq.push_back(i);   ⟦them⟧', '    if (dq.front() <= i - k) dq.pop_front();   ⟦bo_dau⟧', '    if (i >= k - 1) kq.push_back(a[dq.front()]);   ⟦ghi⟧', '}'],
  },
  samples: [['8 3\n1 3 -1 -3 5 3 6 7', 'ví dụ trong bài'], ['7 3\n1 2 3 4 5 6 7', 'dãy tăng: phần tử hết hạn'], ['6 2\n9 7 5 3 1 0', 'dãy giảm: bỏ cuối liên tục']],
  parse(t) { const v = U.ints(t, 3), [n, k] = v; if (n < 1 || n > 14 || k < 1 || k > n) throw new Error('Hãy chọn 1 ≤ k ≤ n ≤ 14.'); if (v.length < n + 2) throw new Error('Thiếu số.'); return { a: v.slice(2, n + 2), k }; },
  random() { const n = U.rnd(7, 12); return `${n} ${U.rnd(2, 4)}\n` + Array.from({ length: n }, () => U.rnd(-5, 9)).join(' '); },
  run({ a, k }) {
    const F = [], n = a.length, dq = [], kq = [];
    const view = (i, extra = {}) => { const hl = {}; for (let j = Math.max(0, i - k + 1); j <= i; j++) hl[j] = 'mark'; for (let j = 0; j <= i - k; j++) hl[j] = 'dim';
      return [{ name: `Dãy a (xanh dương: cửa sổ dài ${k})`, values: a, hl: { ...hl, ...extra }, ptr: i >= 0 ? { i } : {} }, { name: 'deque (giá trị; chữ dưới: chỉ số)', values: dq.map((j) => a[j]), labels: dq.map((j) => 'i=' + j), hl: dq.length ? { 0: 'ok' } : {}, ptr: dq.length ? { 'đầu (min)': 0 } : {} }, { name: 'Các min đã ghi', values: kq.slice(), noIdx: true, hl: {} }]; };
    F.push({ at: 'khoi', msg: 'deque rỗng.', arrays: view(-1), vars: {}, fig: true });
    for (let i = 0; i < n; i++) {
      const bo = []; while (dq.length && a[dq[dq.length - 1]] >= a[i]) bo.push(dq.pop());
      if (bo.length) F.push({ at: 'bo_cuoi', msg: `a[${i}] = ${a[i]}: bỏ ở cuối ${bo.map((j) => a[j]).join(', ')} (≥ ${a[i]}, sẽ không bao giờ là min nữa).`, arrays: view(i, { [i]: 'cur', ...Object.fromEntries(bo.map((j) => [j, 'bad'])) }), vars: { i }, ask: { q: `Thêm a[${i}] = ${a[i]}: bỏ ở cuối deque bao nhiêu phần tử?`, choices: U.near(bo.length), answer: bo.length }, fig: i < 7 });
      dq.push(i);
      F.push({ at: 'them', msg: `Thêm chỉ số ${i} vào cuối deque.`, arrays: view(i, { [i]: 'cur' }), vars: { i }, ...(bo.length ? {} : { ask: { q: `Thêm a[${i}] = ${a[i]}: bỏ ở cuối deque bao nhiêu phần tử?`, choices: U.near(0), answer: 0 } }), fig: i < 7 && (bo.length > 0 || i === 1) });
      if (dq[0] <= i - k) { const j = dq.shift(); F.push({ at: 'bo_dau', msg: `Chỉ số ${j} ≤ ${i} − ${k}: đã ra khỏi cửa sổ, bỏ ở đầu.`, arrays: view(i, { [j]: 'bad' }), vars: { i }, fig: i < 7 }); }
      if (i >= k - 1) { kq.push(a[dq[0]]); F.push({ at: 'ghi', msg: `Cửa sổ [${i - k + 1}, ${i}]: min = a[${dq[0]}] = ${a[dq[0]]}.`, arrays: view(i, { [dq[0]]: 'ok' }), vars: { i, min: a[dq[0]] }, ask: { q: `Min của cửa sổ [${i - k + 1}, ${i}]?`, choices: U.near(a[dq[0]], a.slice(i - k + 1, i + 1)).slice(0, 3), answer: a[dq[0]] }, out: kq.join(' '), fig: i < 7 }); }
    }
    F.push({ at: 'ghi', msg: `Xong. Mỗi chỉ số vào và ra deque tối đa một lần: O(n).`, arrays: view(n - 1), vars: {}, out: kq.join(' '), fig: false });
    return F;
  },
};
