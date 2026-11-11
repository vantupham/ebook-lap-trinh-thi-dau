const ALGO = {
  id: 't4-sa', title: 'Mảng hậu tố bằng nhân đôi',
  desc: 'rk[i] là hạng của đoạn dài k bắt đầu ở i. Đoạn dài 2k bắt đầu ở i so sánh bằng cặp <b>(rk[i], rk[i + k])</b>, với −1 khi i + k vượt ra ngoài xâu. Mỗi vòng: sắp xếp theo cặp, đánh lại hạng (cặp giống nhau thì cùng hạng), rồi gấp đôi k. Dừng khi mọi hạng đã khác nhau.',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-8-mang-hau-to/',
  code: {
    py: ['sa = list(range(n)); rk = [ord(c) for c in s]; k = 1   ⟦khoi⟧', 'while True:', '    key = lambda i: (rk[i], rk[i + k] if i + k < n else -1)   ⟦cap⟧', '    sa.sort(key=key)', '    đánh lại rk theo thứ tự sa (cặp giống nhau thì cùng hạng)   ⟦hang⟧', '    if rk[sa[-1]] == n - 1: break   ⟦xong⟧', '    k *= 2'],
    cpp: ['iota(sa.begin(), sa.end(), 0); rk[i] = s[i]; k = 1;   ⟦khoi⟧', 'for (;; k <<= 1) {', '    cặp của i = (rk[i], i + k < n ? rk[i + k] : -1)   ⟦cap⟧', '    sort(sa.begin(), sa.end(), cmp);', '    đánh lại rk theo thứ tự sa   ⟦hang⟧', '    if (rk[sa[n - 1]] == n - 1) break;   ⟦xong⟧', '}'],
  },
  samples: [['banana', 'ví dụ trong bài'], ['abaa', 'bài toán mở màn'], ['aaaaaaa', 'toàn chữ a: cần nhiều vòng']],
  parse(t) { const s = t.trim(); if (!/^[a-z]{1,10}$/.test(s)) throw new Error('Nhập một xâu 1–10 chữ cái thường.'); return { s }; },
  random() { return Array.from({ length: U.rnd(5, 9) }, () => U.pick(['a', 'b', 'a', 'n', 'c'])).join(''); },
  run({ s }) {
    const F = [], n = s.length, lab = [...Array(n).keys()].map(String);
    let rk = [...s].map((c) => c.charCodeAt(0) - 97), sa = [...Array(n).keys()], k = 1;
    const suf = () => sa.map((i) => s.slice(i));
    F.push({ at: 'khoi', msg: `k = 1: hạng ban đầu là mã chữ cái (a = 0, b = 1, …). sa chưa sắp.`, arrays: [{ name: 'Xâu s', values: [...s], labels: lab, hl: {} }, { name: 'rk[i]', values: rk.slice(), labels: lab, hl: {} }], vars: { k }, fig: true });
    let vong = 0;
    for (;;) {
      const key = (i) => [rk[i], i + k < n ? rk[i + k] : -1], pairs = [...Array(n).keys()].map((i) => `(${key(i).join(',')})`);
      sa.sort((a, b) => key(a)[0] - key(b)[0] || key(a)[1] - key(b)[1]);
      const nr = Array(n); nr[sa[0]] = 0; for (let r = 1; r < n; r++) { const A = key(sa[r - 1]), B = key(sa[r]); nr[sa[r]] = nr[sa[r - 1]] + (A[0] !== B[0] || A[1] !== B[1] ? 1 : 0); }
      F.push({ at: 'cap', msg: `Vòng k = ${k}: cặp (rk[i], rk[i + ${k}]) đại diện cho đoạn dài ${2 * k} bắt đầu ở i.`, arrays: [{ name: 'Xâu s', values: [...s], labels: lab, hl: {} }, { name: 'rk[i]', values: rk.slice(), labels: lab, hl: {} }, { name: `Cặp của i`, values: pairs, labels: lab, hl: { [sa[0]]: 'ok' }, width: 50 }], vars: { k }, ask: { q: 'Vị trí i nào có cặp nhỏ nhất?', choices: [...new Set([sa[0], sa[1] ?? (sa[0] + 1) % n, sa[n - 1]])].map(String), answer: String(sa[0]) }, fig: vong < 2 });
      rk = nr;
      const done = rk[sa[n - 1]] === n - 1;
      F.push({ at: done ? 'hang xong' : 'hang', msg: `Sắp theo cặp và đánh lại hạng. ${done ? 'Mọi hạng đã khác nhau: xong.' : `Còn hạng trùng: gấp đôi k thành ${2 * k}.`}`, arrays: [{ name: 'sa (thứ tự đã xếp)', values: sa.slice(), hl: {} }, { name: `Đoạn dài ${2 * k} đầu mỗi hậu tố`, values: sa.map((i) => s.slice(i, i + 2 * k)), hl: {}, width: 60 }, { name: 'rk[i] mới', values: rk.slice(), labels: lab, hl: {} }], vars: { k }, fig: vong < 2 || done });
      vong++;
      if (done) break;
      k *= 2;
    }
    F.push({ at: 'xong', msg: `Mảng hậu tố: ${sa.join(' ')}.`, arrays: [{ name: 'sa', values: sa.slice(), hl: {} }, { name: 'Hậu tố theo thứ tự từ điển', values: suf(), hl: {}, width: 70 }], vars: { 'số vòng': vong }, out: sa.join(' ') });
    return F;
  },
};
