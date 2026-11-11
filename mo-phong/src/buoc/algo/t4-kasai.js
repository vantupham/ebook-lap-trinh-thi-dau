const ALGO = {
  id: 't4-kasai', title: 'Mảng LCP bằng Kasai',
  desc: 'Duyệt i = 0, 1, …, n − 1 theo thứ tự trong <b>xâu gốc</b>. So hậu tố i với hậu tố đứng ngay trước nó trong sa, bắt đầu từ h đã biết (không so lại từ đầu). Sau đó h giảm 1: bỏ chữ đầu của hai hậu tố thì phần chung chỉ ngắn đi 1. Tổng số lần tăng h là O(n). Cuối cùng: số xâu con khác nhau = n(n + 1)/2 − Σ LCP.',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-8-mang-hau-to/',
  code: {
    py: ['h = 0', 'for i in range(n):', '    if rk[i] == 0: h = 0; continue   ⟦dau⟧', '    j = sa[rk[i] - 1]', '    while i + h < n and j + h < n and s[i + h] == s[j + h]: h += 1   ⟦mo⟧', '    lcp[rk[i]] = h', '    if h > 0: h -= 1   ⟦giam⟧', 'print(n * (n + 1) // 2 - sum(lcp))   ⟦in⟧'],
    cpp: ['int h = 0;', 'for (int i = 0; i < n; i++) {', '    if (rk[i] == 0) { h = 0; continue; }   ⟦dau⟧', '    int j = sa[rk[i] - 1];', '    while (i + h < n && j + h < n && s[i + h] == s[j + h]) h++;   ⟦mo⟧', '    lcp[rk[i]] = h;', '    if (h > 0) h--;   ⟦giam⟧', '}', 'cout << 1LL * n * (n + 1) / 2 - tổng lcp;   ⟦in⟧'],
  },
  samples: [['banana', 'ví dụ trong bài'], ['abaa', 'bài toán mở màn'], ['abcabcab', 'h giữ được qua nhiều bước']],
  parse(t) { const s = t.trim(); if (!/^[a-z]{1,10}$/.test(s)) throw new Error('Nhập một xâu 1–10 chữ cái thường.'); return { s }; },
  random() { return Array.from({ length: U.rnd(5, 9) }, () => U.pick(['a', 'b', 'a', 'n', 'c'])).join(''); },
  run({ s }) {
    const F = [], n = s.length, sa = [...Array(n).keys()].sort((a, b) => (s.slice(a) < s.slice(b) ? -1 : 1)), rk = Array(n), lcp = Array(n).fill('');
    sa.forEach((i, r) => (rk[i] = r));
    const view = (hl = {}) => [{ name: 'Hậu tố theo sa', values: sa.map((i) => `${i}: ${s.slice(i)}`), hl, width: 72 }, { name: 'lcp với hậu tố đứng trước', values: lcp.slice(), hl }];
    F.push({ at: 'dau', msg: `Đã có sa = ${sa.join(' ')}. Bắt đầu h = 0.`, arrays: view(), vars: { h: 0 }, fig: true });
    let h = 0, nf = 0;
    for (let i = 0; i < n; i++) {
      if (rk[i] === 0) { h = 0; lcp[0] = '–'; F.push({ at: 'dau', msg: `i = ${i}: hậu tố "${s.slice(i)}" đứng đầu sa, không có hậu tố trước. Đặt h = 0.`, arrays: view({ 0: 'cur' }), vars: { i, h } }); continue; }
      const j = sa[rk[i] - 1], h0 = h; while (i + h < n && j + h < n && s[i + h] === s[j + h]) h++;
      lcp[rk[i]] = h;
      F.push({ at: 'mo', msg: `i = ${i}: so "${s.slice(i)}" với hậu tố đứng trước "${s.slice(j)}". Bắt đầu từ h = ${h0}${h0 ? ' (bỏ qua ' + h0 + ' chữ đã biết khớp)' : ''}, mở rộng tới h = ${h}.`, arrays: view({ [rk[i]]: 'cur', [rk[i] - 1]: 'mark' }), vars: { i, j, h }, ask: { q: `LCP của "${s.slice(i)}" và "${s.slice(j)}" = ?`, choices: U.near(h), answer: h }, fig: nf++ < 3 });
      if (h > 0) h--;
    }
    const tong = lcp.reduce((a, x) => a + (typeof x === 'number' ? x : 0), 0), kq = n * (n + 1) / 2 - tong;
    F.push({ at: 'in', msg: `Σ LCP = ${tong}. Số xâu con khác nhau = ${n * (n + 1) / 2} − ${tong} = ${kq}.`, arrays: view(), vars: { 'Σ lcp': tong }, out: String(kq), fig: true });
    return F;
  },
};
