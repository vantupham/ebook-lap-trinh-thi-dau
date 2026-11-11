const ALGO = {
  id: 't1-xay-tuong-de-quy', title: 'Đệ quy chia đoạn: Xây tường',
  desc: 'giai(l, r, nền): trong đoạn mà mọi ô đã cao bằng nền, các ô cao đúng nền chia đoạn thành các phần. Mỗi phần: 1 bước phủ cả phần lên cao bằng ô thấp nhất của nó, rồi đệ quy với nền mới.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-6-de-quy/',
  code: {
    py: ['def giai(l, r, nen):   ⟦goi⟧', '    kq = 0; i = l', '    while i <= r:   ⟦quet⟧', '        if a[i] == nen: i += 1; continue   ⟦bo_qua⟧', '        j = i', '        while j + 1 <= r and a[j + 1] > nen: j += 1   ⟦phan⟧', '        m = min(a[i:j + 1])   ⟦phan⟧', '        kq += 1 + giai(i, j, m)   ⟦phu⟧', '        i = j + 1', '    return kq   ⟦tra⟧'],
    cpp: ['long long giai(int l, int r, long long nen) {   ⟦goi⟧', '    long long kq = 0; int i = l;', '    while (i <= r) {   ⟦quet⟧', '        if (a[i] == nen) { i++; continue; }   ⟦bo_qua⟧', '        int j = i; long long m = a[i];', '        while (j + 1 <= r && a[j + 1] > nen) { j++; m = min(m, a[j]); }   ⟦phan⟧', '        kq += 1 + giai(i, j, m);   ⟦phu⟧', '        i = j + 1;', '    }', '    return kq;   ⟦tra⟧', '}'],
  },
  samples: [['5\n2 4 2 3 3', 'ví dụ trong bài'], ['3\n3 1 3', 'hai phần tách nhau'], ['6\n1 3 2 4 2 1', 'lồng nhiều tầng']],
  parse(t) { const v = U.ints(t, 2), n = v[0]; if (n < 1 || n > 10) throw new Error('Hãy chọn 1 ≤ n ≤ 10.'); if (v.length < n + 1) throw new Error('Thiếu số.'); const a = v.slice(1, n + 1); if (a.some((x) => x < 0 || x > 9)) throw new Error('Để dễ nhìn, hãy chọn độ cao từ 0 tới 9.'); return a; },
  random() { const n = U.rnd(4, 8); return n + '\n' + Array.from({ length: n }, () => U.rnd(0, 5)).join(' '); },
  run(a) {
    const F = [], n = a.length, h = Array(n).fill(0), stack = []; let buoc = 0;
    const A = (l, r, extra = {}) => { const hl = {}; for (let k = 0; k < n; k++) hl[k] = k < l || k > r ? 'dim' : h[k] === a[k] ? 'ok' : ''; return [{ name: 'Độ cao cần đạt a', values: a, hl: { ...hl, ...extra } }, { name: 'Độ cao đã xây', values: h.slice(), hl: Object.fromEntries(h.map((x, k) => [k, x === a[k] ? 'ok' : x > 0 ? 'mark' : ''])) }]; };
    const S = () => ['main', ...stack.map(([l, r, nn]) => `giai(ô ${l + 1}..${r + 1}, nền ${nn})`)];
    const rec = (l, r, nen) => {
      stack.push([l, r, nen]);
      F.push({ at: 'goi quet', msg: `Gọi giai(ô ${l + 1}..${r + 1}, nền ${nen}): mọi ô trong đoạn đã cao ${nen}.`, arrays: A(l, r), stack: S(), vars: { 'số bước': buoc }, fig: F.length < 3 });
      let kq = 0, i = l;
      while (i <= r) {
        if (a[i] === nen) { i++; continue; }
        let j = i; while (j + 1 <= r && a[j + 1] > nen) j++;
        let m = Infinity; for (let k = i; k <= j; k++) m = Math.min(m, a[k]);
        for (let k = i; k <= j; k++) h[k] = m; buoc++;
        const hl = {}; for (let k = i; k <= j; k++) hl[k] = 'cur';
        F.push({ at: 'phan phu', msg: `Phần ô ${i + 1}..${j + 1} (các ô cao hơn nền ${nen}). Ô thấp nhất cao ${m}: <b>1 bước</b> phủ cả phần lên cao ${m}. Tổng số bước: ${buoc}.`, arrays: A(l, r, hl), stack: S(), vars: { 'số bước': buoc }, ask: { q: `Bước phủ phần ô ${i + 1}..${j + 1} lên cao bao nhiêu?`, choices: [...new Set([m, nen + 1, Math.max(...a.slice(i, j + 1))])].sort((p, q) => p - q), answer: m }, fig: buoc <= 3 });
        kq += 1 + rec(i, j, m);
        i = j + 1;
      }
      stack.pop();
      F.push({ at: 'tra', msg: `giai(ô ${l + 1}..${r + 1}, nền ${nen}) trả về ${kq}.`, arrays: A(l, r), stack: S().concat(stack.length ? [] : []), vars: { 'số bước': buoc } });
      return kq;
    };
    const kq = rec(0, n - 1, 0);
    F.push({ at: 'tra', msg: `Kết quả: ${kq} bước. Mỗi tầng đệ quy quét lại đoạn của nó; có thể tới n tầng nên O(n²).`, arrays: A(0, n - 1), stack: ['main'], vars: { 'số bước': buoc }, out: String(kq), fig: true });
    return U.limit(F);
  },
};
