const ALGO = {
  id: 't2-lis', title: 'Dãy con tăng dài nhất trong O(n log n)',
  desc: 'tails[k] = giá trị cuối <b>nhỏ nhất</b> của một dãy tăng dài k + 1 đã tìm được. tails luôn tăng dần, nên với mỗi x: tìm vị trí đầu tiên có tails[k] ≥ x (lower_bound). Không có thì x nối dài dãy dài nhất; có thì thay tails[k] = x (dãy dài k + 1 nay có đuôi nhỏ hơn, dễ nối hơn).',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-10-qhd-2/',
  code: {
    py: ['tails = []   ⟦khoi⟧', 'for x in a:', '    k = bisect_left(tails, x)   ⟦tim⟧', '    if k == len(tails): tails.append(x)   ⟦them⟧', '    else: tails[k] = x   ⟦thay⟧', 'print(len(tails))   ⟦in⟧'],
    cpp: ['vector<long long> tails;   ⟦khoi⟧', 'for (long long x : a) {', '    auto it = lower_bound(tails.begin(), tails.end(), x);   ⟦tim⟧', '    if (it == tails.end()) tails.push_back(x);   ⟦them⟧', '    else *it = x;   ⟦thay⟧', '}', 'cout << tails.size();   ⟦in⟧'],
  },
  samples: [['8\n7 3 5 3 6 2 9 8', 'ví dụ trong bài'], ['6\n2 2 2 2 2 2', 'toàn bằng nhau (tăng ngặt)'], ['9\n1 9 2 8 3 7 4 6 5', 'đan xen']],
  parse(t) { const v = U.ints(t, 2), n = v[0]; if (n < 1 || n > 14) throw new Error('Hãy chọn 1 ≤ n ≤ 14.'); if (v.length < n + 1) throw new Error('Thiếu số.'); return { a: v.slice(1, n + 1) }; },
  random() { const n = U.rnd(7, 11); return n + '\n' + Array.from({ length: n }, () => U.rnd(1, 12)).join(' '); },
  run({ a }) {
    const F = [], tails = [];
    const view = (i, thl = {}, ptr = {}) => [{ name: 'Dãy a', values: a, hl: Object.fromEntries(a.map((_, k) => [k, k < i ? 'done' : k === i ? 'cur' : ''])) }, { name: 'tails (số dưới: k; dãy tăng dài k + 1 có đuôi nhỏ nhất là tails[k])', values: tails.slice(), hl: thl, ptr }];
    F.push({ at: 'khoi', msg: 'tails rỗng.', arrays: view(-1), vars: { 'độ dài': 0 }, fig: true });
    a.forEach((x, i) => {
      let k = 0; while (k < tails.length && tails[k] < x) k++;
      const ask = { q: `x = ${x}: lower_bound trả về vị trí k = ?`, choices: U.near(k), answer: k };
      if (k === tails.length) { tails.push(x); F.push({ at: 'tim them', msg: `x = ${x} lớn hơn mọi phần tử của tails: thêm vào cuối, dãy tăng dài ${tails.length}.`, arrays: view(i, { [k]: 'ok' }, { k }), vars: { 'độ dài': tails.length }, ask, fig: true }); }
      else { const cu = tails[k]; tails[k] = x; F.push({ at: 'tim thay', msg: `tails[${k}] = ${cu} là phần tử đầu tiên ≥ ${x}: thay bằng ${x}${x < cu ? ' (đuôi nhỏ hơn, dễ nối hơn)' : ''}.`, arrays: view(i, { [k]: 'cur' }, { k }), vars: { 'độ dài': tails.length }, ask, fig: true }); }
    });
    F.push({ at: 'in', msg: `Độ dài tails = ${tails.length}: đó là độ dài dãy con tăng dài nhất. (Bản thân tails chưa chắc là một dãy con thật.)`, arrays: view(a.length), vars: { 'độ dài': tails.length }, out: String(tails.length), fig: false });
    return F;
  },
};
