const ALGO = {
  id: 't3-segtree', title: 'Cây phân đoạn (vòng lặp): sửa điểm, min đoạn',
  desc: 'Lá thứ i ở nút n + i; nút x có hai con 2x, 2x + 1 và giữ min của chúng. <b>Sửa</b>: đặt lá rồi đi lên cha, tính lại. <b>Hỏi [l, r)</b>: l += n, r += n; khi l &lt; r: l lẻ thì lấy nút l, tăng l; r lẻ thì giảm r, lấy nút r; rồi cả hai lên cha.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-5-cay-phan-doan/',
  code: {
    py: ['def sua(i, v):', '    i += n; t[i] = v', '    while i > 1: i //= 2; t[i] = min(t[2*i], t[2*i+1])   ⟦sua⟧', 'def hoi(l, r):   # [l, r), từ 0', '    kq = VC; l += n; r += n', '    while l < r:', '        if l & 1: kq = min(kq, t[l]); l += 1   ⟦trai⟧', '        if r & 1: r -= 1; kq = min(kq, t[r])   ⟦phai⟧', '        l //= 2; r //= 2   ⟦len⟧', '    return kq   ⟦in⟧'],
    cpp: ['void sua(int i, long long v) {', '    for (t[i += n] = v; i > 1; i /= 2) t[i/2] = min(t[i], t[i^1]);   ⟦sua⟧', '}', 'long long hoi(int l, int r) {   // [l, r), từ 0', '    long long kq = VC;', '    for (l += n, r += n; l < r; l /= 2, r /= 2) {   ⟦len⟧', '        if (l & 1) kq = min(kq, t[l++]);   ⟦trai⟧', '        if (r & 1) kq = min(kq, t[--r]);   ⟦phai⟧', '    }', '    return kq;   ⟦in⟧', '}'],
  },
  samples: [['8 4\n3 2 4 5 1 1 5 3\n2 2 7\n2 5 6\n1 2 3\n2 1 4', 'ví dụ trong bài'], ['8 2\n9 4 7 6 8 2 5 3\n2 2 7\n2 3 3', 'đoạn lệch'], ['16 2\n5 9 4 8 7 6 3 9 8 5 4 7 6 8 9 2\n2 3 14\n1 7 9', 'mười sáu phần tử']],
  parse(t) { const v = U.ints(t, 2), [n, q] = v; if (n < 1 || n > 16 || q < 1 || q > 5) throw new Error('Hãy chọn n ≤ 16, q ≤ 5.'); const a = v.slice(2, 2 + n); if (a.length < n) throw new Error('Thiếu số.'); const ops = []; for (let i = 0; i < q; i++) { const [k, x, y] = v.slice(2 + n + 3 * i, 5 + n + 3 * i); if (k === 1 && x >= 1 && x <= n) ops.push([1, x, y]); else if (k === 2 && x >= 1 && x <= y && y <= n) ops.push([2, x, y]); else throw new Error('Thao tác "1 k u" hoặc "2 a b".'); } return { n, a, ops }; },
  random() { const n = U.pick([8, 8, 6, 12]), q = U.rnd(2, 4); return `${n} ${q}\n${Array.from({ length: n }, () => U.rnd(1, 9)).join(' ')}\n` + Array.from({ length: q }, () => { if (Math.random() < .3) return `1 ${U.rnd(1, n)} ${U.rnd(1, 9)}`; const l = U.rnd(1, n); return `2 ${l} ${U.rnd(l, n)}`; }).join('\n'); },
  run({ n, a, ops }) {
    const F = [], VC = Infinity, t = Array(2 * n).fill(VC); for (let i = 0; i < n; i++) t[n + i] = a[i]; for (let i = n - 1; i >= 1; i--) t[i] = Math.min(t[2 * i], t[2 * i + 1]);
    const pow2 = (n & (n - 1)) === 0;
    const view = (hl = {}, ptr = {}) => { if (pow2) { const A = []; for (let s = 1; s < 2 * n; s *= 2) { const idx = [...Array(s).keys()].map((k) => s + k); A.push({ name: s === 1 ? 'Gốc (nút 1): min cả mảng' : s === n ? `Lá: nút ${n}..${2 * n - 1} (a[0..${n - 1}])` : `Tầng nút ${s}..${2 * s - 1}`, values: idx.map((x) => t[x] === VC ? '∞' : t[x]), labels: idx.map(String), hl: Object.fromEntries(idx.map((x, k) => [k, hl[x]]).filter(([, c]) => c)), ptr: Object.fromEntries(Object.entries(ptr).filter(([, x]) => x >= s && x < 2 * s).map(([nm, x]) => [nm, x - s])) }); } return A; }
      return [{ name: `Mảng t (nút 1..${2 * n - 1}; lá ở ${n}..${2 * n - 1})`, values: t.slice(1).map((x) => x === VC ? '∞' : x), labels: [...Array(2 * n - 1).keys()].map((k) => String(k + 1)), hl: Object.fromEntries(Object.entries(hl).map(([x, c]) => [x - 1, c])), ptr: Object.fromEntries(Object.entries(ptr).map(([nm, x]) => [nm, x - 1])) }]; };
    F.push({ at: 'sua', msg: `Dựng cây: lá n + i = a[i]; nút x = min(t[2x], t[2x + 1]) với x từ ${n - 1} về 1.`, arrays: view(), vars: {}, fig: true });
    const cnt = ops.map(([k, x, y]) => { if (k !== 2) return -1; let l = x - 1 + n, r = y + n, c = 0; for (; l < r; l >>= 1, r >>= 1) { if (l & 1) { c++; l++; } if (r & 1) { c++; r--; } } return c; }), qb = cnt.indexOf(Math.max(...cnt)), ub = ops.findIndex(([k]) => k === 1);
    const out = []; let nf = 0, qi = -1;
    for (const [k, x, y] of ops) { qi++; const fq = qi === qb || qi === ub;
      if (k === 1) { let i = x - 1 + n; t[i] = y; const path = [i]; while (i > 1) { i >>= 1; t[i] = Math.min(t[2 * i], t[2 * i + 1]); path.push(i); }
        F.push({ at: 'sua', msg: `Sửa a[${x - 1}] = ${y}: lá ${x - 1 + n}, rồi đi lên ${path.slice(1).join(' → ')}, tính lại min.`, arrays: view(Object.fromEntries(path.map((p) => [p, 'ok']))), vars: {}, ask: { q: `Sửa một phần tử (n = ${n}) phải tính lại bao nhiêu nút?`, choices: U.near(path.length), answer: path.length }, fig: fq });
      } else {
        let l = x - 1 + n, r = y + n, kq = VC; const lay = [];
        F.push({ at: 'len', msg: `Hỏi min [${x}, ${y}] (từ 1) = [${x - 1}, ${y}) từ 0: l = ${l}, r = ${r}.`, arrays: view({}, { l, r: r < 2 * n ? r : undefined }), vars: { l, r }, fig: fq });
        while (l < r) {
          const step = [];
          if (l & 1) { kq = Math.min(kq, t[l]); lay.push(l); step.push(`l = ${l} lẻ: lấy nút ${l} (${t[l]}), l → ${l + 1}`); l++; }
          if (r & 1) { r--; kq = Math.min(kq, t[r]); lay.push(r); step.push(`r lẻ: r → ${r}, lấy nút ${r} (${t[r]})`); }
          const hl = Object.fromEntries(lay.map((p) => [p, 'ok']));
          F.push({ at: step.length ? (step[0].startsWith('l') ? 'trai' : 'phai') : 'len', msg: (step.length ? step.join('; ') : 'l, r đều chẵn: không lấy nút nào') + `. kq = ${kq === VC ? '∞' : kq}. Lên cha.`, arrays: view(hl, l < r ? { l, r } : {}), vars: { l, r, kq: kq === VC ? '∞' : kq }, fig: fq });
          l >>= 1; r >>= 1;
        }
        out.push(kq);
        F.push({ at: 'in', msg: `Đã lấy các nút ${lay.join(', ')}: min = ${kq}.`, arrays: view(Object.fromEntries(lay.map((p) => [p, 'ok']))), vars: { kq }, ask: { q: `Min trên [${x}, ${y}] = ?`, choices: U.near(kq, a.slice(x - 1, y)).slice(0, 3), answer: kq }, out: out.join('\n'), fig: fq });
      }
    }
    F.push({ at: 'in', msg: 'Hết thao tác.', arrays: view(), vars: {}, out: out.join('\n') });
    return F;
  },
};
