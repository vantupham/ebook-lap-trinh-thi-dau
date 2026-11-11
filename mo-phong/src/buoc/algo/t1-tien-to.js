const ALGO = {
  id: 't1-tien-to', title: 'Mảng tổng tiền tố: trả lời tổng đoạn bằng một phép trừ',
  desc: 'Xây p[i] = p[i−1] + a[i] một lần. Sau đó mỗi câu hỏi tổng đoạn [l, r] chỉ là p[r] − p[l−1], bất kể đoạn dài bao nhiêu.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-3-tong-tien-to/',
  code: {
    py: ['p = [0] * (n + 1)   ⟦khoi⟧', 'for i in range(1, n + 1):   ⟦xay⟧', '    p[i] = p[i - 1] + a[i]   ⟦xay⟧', 'for l, r in cau_hoi:   ⟦hoi⟧', '    print(p[r] - p[l - 1])   ⟦hoi⟧'],
    cpp: ['vector<long long> p(n + 1, 0);   ⟦khoi⟧', 'for (int i = 1; i <= n; i++)   ⟦xay⟧', '    p[i] = p[i - 1] + a[i];   ⟦xay⟧', 'while (q--) {   ⟦hoi⟧', '    cin >> l >> r;', "    cout << p[r] - p[l - 1] << '\\n';   ⟦hoi⟧", '}'],
  },
  samples: [['5 3\n3 1 4 1 5\n1 3\n2 5\n4 4', 'ví dụ trong bài'], ['6 2\n2 7 1 8 2 8\n1 6\n2 4', 'đoạn cả dãy']],
  parse(t) {
    const v = U.ints(t, 2), [n, q] = v;
    if (n < 1 || n > 14 || q < 1 || q > 6) throw new Error('Hãy chọn 1 ≤ n ≤ 14 và 1 ≤ q ≤ 6.');
    if (v.length < 2 + n + 2 * q) throw new Error('Thiếu dữ liệu.');
    const a = v.slice(2, 2 + n), qs = [];
    for (let k = 0; k < q; k++) { const l = v[2 + n + 2 * k], r = v[3 + n + 2 * k]; if (l < 1 || r > n || l > r) throw new Error(`Câu hỏi ${k + 1} cần 1 ≤ l ≤ r ≤ n.`); qs.push([l, r]); }
    return { a, qs };
  },
  random() { const n = U.rnd(5, 10), q = U.rnd(2, 4); const L = [n + ' ' + q, Array.from({ length: n }, () => U.rnd(1, 9)).join(' ')]; for (let k = 0; k < q; k++) { const l = U.rnd(1, n); L.push(l + ' ' + U.rnd(l, n)); } return L.join('\n'); },
  run({ a, qs }) {
    const n = a.length, F = [], p = Array(n + 1).fill(null); p[0] = 0;
    const A = (hA = {}, hP = {}, ptr = {}) => [{ name: 'a[1..n]', values: [''].concat(a), labels: [...Array(n + 1).keys()], hl: { 0: 'dim', ...hA } }, { name: 'p[0..n]', values: p.map((x) => x === null ? '' : x), labels: [...Array(n + 1).keys()], hl: hP, ptr }];
    F.push({ at: 'khoi', msg: 'p[0] = 0: tổng của "không ngày nào".', arrays: A({}, { 0: 'ok' }), fig: true });
    for (let i = 1; i <= n; i++) {
      p[i] = p[i - 1] + a[i - 1];
      F.push({ at: 'xay', msg: `p[${i}] = p[${i - 1}] + a[${i}] = ${p[i - 1]} + ${a[i - 1]} = ${p[i]}.`, arrays: A({ [i]: 'cur' }, { [i - 1]: 'mark', [i]: 'ok' }), ask: { q: `p[${i}] bằng bao nhiêu?`, choices: U.near(p[i], [p[i - 1]]), answer: p[i] }, fig: i <= 2 });
    }
    const out = [];
    qs.forEach(([l, r], k) => {
      const s = p[r] - p[l - 1]; out.push(s);
      const hA = {}; for (let i = l; i <= r; i++) hA[i] = 'ok';
      F.push({ at: 'hoi', msg: `Câu hỏi (${l}, ${r}): p[${r}] − p[${l - 1}] = ${p[r]} − ${p[l - 1]} = ${s}. Phần p[${l - 1}] chứa a[1..${l - 1}], trừ đi là còn đúng a[${l}..${r}].`, arrays: A(hA, { [r]: 'cur', [l - 1]: 'bad' }, { r, 'l−1': l - 1 }), ask: { q: `Tổng a[${l}..${r}] bằng bao nhiêu?`, choices: U.near(s, [p[r]]), answer: s }, out: out.join('\n'), fig: k < 2 });
    });
    return F;
  },
};
