const ALGO = {
  id: 't4-chia-can', title: 'Chia căn: khối √n cho sửa điểm và tổng đoạn',
  desc: 'Chia mảng thành các khối dài B ≈ √n, lưu tổng mỗi khối. Sửa a[i]: sửa a[i] và tổng khối chứa i (O(1)). Hỏi [l, r]: cộng từng phần tử ở hai <b>phần lẻ</b> hai đầu, cộng nguyên tổng của các <b>khối trọn</b> ở giữa: O(√n).',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-2-chia-can/',
  code: {
    py: ['B = isqrt(n) or 1; kh[i // B] += a[i]   ⟦khoi⟧', '# 1 i v: kh[i // B] += v - a[i]; a[i] = v   ⟦sua⟧', 'def tong(l, r):   # từ 0, đóng', '    s = 0', '    while l <= r and l % B: s += a[l]; l += 1   # phần lẻ trái   ⟦le⟧', '    while l + B - 1 <= r: s += kh[l // B]; l += B   # khối trọn   ⟦tron⟧', '    while l <= r: s += a[l]; l += 1   # phần lẻ phải   ⟦le⟧', '    return s   ⟦in⟧'],
    cpp: ['int B = max(1, (int)sqrt(n)); kh[i / B] += a[i];   ⟦khoi⟧', '// 1 i v: kh[i / B] += v - a[i]; a[i] = v;   ⟦sua⟧', 'll tong(int l, int r) {   // từ 0, đóng', '    ll s = 0;', '    while (l <= r && l % B) s += a[l++];   // phần lẻ trái   ⟦le⟧', '    while (l + B - 1 <= r) { s += kh[l / B]; l += B; }   // khối trọn   ⟦tron⟧', '    while (l <= r) s += a[l++];   // phần lẻ phải   ⟦le⟧', '    return s;   ⟦in⟧', '}'],
  },
  samples: [['16 3\n3 1 4 1 5 9 2 6 5 3 5 8 9 7 9 3\n2 3 14\n1 7 10\n2 3 14', 'ví dụ trong bài'], ['9 2\n1 1 1 1 1 1 1 1 1\n2 1 9\n2 2 2', 'n = 9, B = 3'], ['10 2\n5 4 3 2 1 1 2 3 4 5\n2 2 9\n1 5 0', 'n không chính phương']],
  parse(t) { const v = U.ints(t, 2), [n, q] = v; if (n < 1 || n > 16 || q < 1 || q > 4) throw new Error('Hãy chọn n ≤ 16, q ≤ 4.'); const a = v.slice(2, 2 + n); if (a.length < n) throw new Error('Thiếu số.'); const ops = []; for (let i = 0; i < q; i++) { const [k, x, y] = v.slice(2 + n + 3 * i, 5 + n + 3 * i); if (k === 1 && x >= 1 && x <= n) ops.push([1, x, y]); else if (k === 2 && x >= 1 && x <= y && y <= n) ops.push([2, x, y]); else throw new Error('Thao tác "1 i v" hoặc "2 l r" (từ 1).'); } return { a, ops }; },
  random() { const n = U.rnd(9, 16), q = 3; return `${n} ${q}\n${Array.from({ length: n }, () => U.rnd(0, 9)).join(' ')}\n` + Array.from({ length: q }, () => { if (Math.random() < .3) return `1 ${U.rnd(1, n)} ${U.rnd(0, 9)}`; const l = U.rnd(1, n); return `2 ${l} ${U.rnd(l, n)}`; }).join('\n'); },
  run({ a, ops }) {
    const F = [], n = a.length, B = Math.max(1, Math.floor(Math.sqrt(n))), A = a.slice(), nb = Math.ceil(n / B), kh = Array(nb).fill(0); A.forEach((x, i) => kh[Math.floor(i / B)] += x);
    const view = (ha = {}, hk = {}) => [{ name: `a (chỉ số từ 1; chữ dưới: khối, B = ${B})`, values: A.slice(), labels: A.map((_, i) => `${i + 1}·k${Math.floor(i / B)}`), hl: ha }, { name: 'Tổng mỗi khối', values: kh.slice(), labels: kh.map((_, k) => 'khối ' + k), hl: hk }];
    F.push({ at: 'khoi', msg: `n = ${n}, B = ⌊√${n}⌋ = ${B}: ${nb} khối.`, arrays: view(), vars: {}, fig: true });
    const out = [];
    for (const [k, x, y] of ops) {
      if (k === 1) { const i = x - 1, d = y - A[i]; A[i] = y; kh[Math.floor(i / B)] += d; F.push({ at: 'sua', msg: `Đặt a[${x}] = ${y}: sửa một ô và tổng khối ${Math.floor(i / B)} (cộng ${d}).`, arrays: view({ [i]: 'ok' }, { [Math.floor(i / B)]: 'ok' }), vars: {}, fig: true }); continue; }
      let l = x - 1; const r = y - 1, ha = {}, hk = {}; let s = 0, le = 0, tron = 0;
      while (l <= r && l % B) { s += A[l]; ha[l] = 'cur'; le++; l++; }
      while (l + B - 1 <= r) { s += kh[l / B]; hk[l / B] = 'ok'; for (let j = l; j < l + B; j++) ha[j] = 'mark'; tron++; l += B; }
      while (l <= r) { s += A[l]; ha[l] = 'cur'; le++; l++; }
      out.push(s);
      F.push({ at: 'le tron in', msg: `Tổng [${x}, ${y}] = ${s}: cộng ${le} phần tử lẻ (cam) và ${tron} khối trọn (xanh) thay vì ${y - x + 1} phần tử.`, arrays: view(ha, hk), vars: { 'phần tử lẻ': le, 'khối trọn': tron }, ask: { q: `Đoạn [${x}, ${y}] dùng bao nhiêu khối trọn?`, choices: U.near(tron), answer: tron }, out: out.join('\n'), fig: true });
    }
    F.push({ at: 'in', msg: 'Hết thao tác.', arrays: view(), vars: {}, out: out.join('\n') });
    return F;
  },
};
