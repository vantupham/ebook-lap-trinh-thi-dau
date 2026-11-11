const ALGO = {
  id: 't3-bam-xau', title: 'Băm xâu: so sánh hai đoạn con trong O(1)',
  desc: 'Đổi ký tự thành số (a = 1, …, z = 26). h[i] = (h[i−1]·B + s[i−1]) mod M là mã của tiền tố dài i. Mã của đoạn s[l..r−1] = (h[r] − h[l]·B^(r−l)) mod M. Trang này dùng B, M nhỏ để em thấy <b>va chạm</b>: hai đoạn khác nhau nhưng cùng mã. Bài thật dùng M cỡ 10⁹ và hai modulo.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-10-xau-hash-kmp/',
  code: {
    py: ['for i in range(n):   ⟦khoi⟧', '    h[i+1] = (h[i] * B + s[i]) % M; p[i+1] = p[i] * B % M', 'def ma(l, r): return (h[r] - h[l] * p[r - l]) % M   ⟦ma⟧', '# câu hỏi (a, b, c, d), chỉ số từ 1', 'bang = b - a == d - c and ma(a-1, b) == ma(c-1, d)   ⟦so⟧', 'print("YES" if bang else "NO")   ⟦in⟧'],
    cpp: ['for (int i = 0; i < n; i++) {   ⟦khoi⟧', '    h[i+1] = (h[i] * B + s[i]) % M; p[i+1] = p[i] * B % M;', '}', 'auto ma = [&](int l, int r) { return ((h[r] - h[l] * p[r-l]) % M + M) % M; };   ⟦ma⟧', 'bool bang = (b - a == d - c) && ma(a-1, b) == ma(c-1, d);   ⟦so⟧', 'cout << (bang ? "YES" : "NO");   ⟦in⟧'],
  },
  samples: [['abcabcab\n31 1000003\n3\n1 3 4 6\n1 2 7 8\n2 4 3 5', 'ví dụ trong bài'], ['abacbcab\n2 7\n2\n1 2 7 8\n2 3 3 4', 'M quá nhỏ: va chạm'], ['banana\n31 101\n2\n2 4 4 6\n1 3 4 6', 'banana']],
  parse(t) { const L = t.trim().split(/\s+/); const s = L[0]; if (!/^[a-z]{1,14}$/.test(s)) throw new Error('Dòng đầu: xâu chữ thường, dài 1–14.'); const B = +L[1], M = +L[2], q = +L[3]; if (!(B >= 2 && M >= 2 && M <= 2e9 && q >= 1 && q <= 5)) throw new Error('Dòng hai: B M; dòng ba: q (≤ 5).'); const qs = []; for (let i = 0; i < q; i++) { const v = L.slice(4 + 4 * i, 8 + 4 * i).map(Number); if (v.length < 4 || v[0] > v[1] || v[2] > v[3] || v[0] < 1 || v[2] < 1 || v[1] > s.length || v[3] > s.length) throw new Error('Câu hỏi a b c d với 1 ≤ a ≤ b ≤ n, 1 ≤ c ≤ d ≤ n.'); qs.push(v); } return { s, B: BigInt(B), M: BigInt(M), qs }; },
  random() { const s = Array.from({ length: U.rnd(6, 10) }, () => U.pick(['a', 'b', 'c'])).join(''), n = s.length, q = 3; return `${s}\n${U.pick(['2 7', '31 101', '31 1000003'])}\n${q}\n` + Array.from({ length: q }, () => { const L = U.rnd(1, 3), a = U.rnd(1, n - L + 1), c = U.rnd(1, n - L + 1); return `${a} ${a + L - 1} ${c} ${c + L - 1}`; }).join('\n'); },
  run({ s, B, M, qs }) {
    const F = [], n = s.length, v = [...s].map((c) => BigInt(c.charCodeAt(0) - 96)), h = [0n], p = [1n];
    for (let i = 0; i < n; i++) { h.push((h[i] * B + v[i]) % M); p.push(p[i] * B % M); }
    const ma = (l, r) => (((h[r] - h[l] * p[r - l]) % M) + M) % M;
    const view = (hl = {}, hh = {}) => [{ name: 's (số dưới: giá trị ký tự)', values: [...s], labels: v.map(String), hl }, { name: `h[i] (mod ${M})`, values: h.map(String), labels: h.map((_, i) => 'h' + i), hl: hh }];
    F.push({ at: 'khoi', msg: `Dựng h với B = ${B}, M = ${M}.`, arrays: view(), vars: {}, fig: true });
    const out = [];
    qs.forEach(([a, b, c, d], k) => {
      const x = ma(a - 1, b), y = ma(c - 1, d), bang = (b - a === d - c) && x === y, that = s.slice(a - 1, b) === s.slice(c - 1, d); out.push(bang ? 'YES' : 'NO');
      const hl = {}; for (let i = a - 1; i < b; i++) hl[i] = 'mark'; for (let i = c - 1; i < d; i++) hl[i] = hl[i] ? 'cur' : 'ok';
      F.push({ at: 'ma so', msg: `"${s.slice(a - 1, b)}" có mã ${x}, "${s.slice(c - 1, d)}" có mã ${y}: ${bang ? 'YES' : 'NO'}.${bang && !that ? ' VA CHẠM: hai đoạn khác nhau mà trùng mã!' : ''}`, arrays: view(hl, { [a - 1]: 'mark', [b]: 'mark', [c - 1]: 'ok', [d]: 'ok' }), vars: { 'mã 1': String(x), 'mã 2': String(y) }, ask: { q: `Chương trình in YES hay NO cho (${a}, ${b}, ${c}, ${d})?`, choices: ['YES', 'NO'], answer: bang ? 'YES' : 'NO' }, out: out.join('\n'), fig: k < 3 });
    });
    return F;
  },
};
