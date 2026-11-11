const ALGO = {
  id: 't4-li-chao', title: 'Cây Li Chao: min của các đường thẳng tại điểm bất kỳ',
  desc: 'Mỗi nút quản lý đoạn x [l, r] và giữ một đường. Thêm đường mới: so tại điểm giữa m, giữ đường thấp hơn ở nút; đường còn lại chỉ có thể thấp hơn ở <b>một nửa</b>, đẩy nó xuống nửa đó. Hỏi tại x: đi từ gốc xuống lá chứa x, lấy min của các đường gặp trên đường đi. Không cần đơn điệu.',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-4-convex-hull-trick/',
  code: {
    py: ['def them(x, l, r, d):', '    m = (l + r) // 2', '    if d(m) < t[x](m): t[x], d = d, t[x]   # nút giữ đường thấp hơn tại m   ⟦giu⟧', '    if l == r: return', '    if d(l) < t[x](l): them(2x, l, m, d)   ⟦xuong⟧', '    elif d(r) < t[x](r): them(2x+1, m+1, r, d)   ⟦xuong⟧', 'def hoi(X): min các t[x](X) trên đường từ gốc tới lá X   ⟦hoi⟧'],
    cpp: ['void them(int x, int l, int r, Line d) {', '    int m = (l + r) / 2;', '    if (d.at(m) < t[x].at(m)) swap(t[x], d);   ⟦giu⟧', '    if (l == r) return;', '    if (d.at(l) < t[x].at(l)) them(2*x, l, m, d);   ⟦xuong⟧', '    else if (d.at(r) < t[x].at(r)) them(2*x+1, m+1, r, d);   ⟦xuong⟧', '}', 'll hoi(X): min các t[x].at(X) trên đường từ gốc tới lá X   ⟦hoi⟧'],
  },
  samples: [['4\n-1 6\n1 0\n0 3\n-2 12\n3\n1 4 7', 'ví dụ trong bài'], ['3\n2 0\n-1 7\n0 4\n2\n0 6', 'ba đường'], ['2\n0 5\n0 3\n1\n2', 'hai đường song song']],
  parse(t) { const v = U.ints(t, 1), k = v[0]; if (k < 1 || k > 6) throw new Error('Số đường 1..6.'); const L = []; for (let i = 0; i < k; i++) L.push([v[1 + 2 * i], v[2 + 2 * i]]); const q = v[1 + 2 * k]; if (!(q >= 1 && q <= 4)) throw new Error('Sau các đường: số câu hỏi q (≤ 4), rồi q giá trị x trong 0..7.'); const X = v.slice(2 + 2 * k, 2 + 2 * k + q); if (X.length < q || X.some((x) => x < 0 || x > 7)) throw new Error('x trong 0..7.'); return { L, X }; },
  random() { const k = U.rnd(3, 5); return `${k}\n` + Array.from({ length: k }, () => `${U.rnd(-3, 3)} ${U.rnd(0, 15)}`).join('\n') + `\n2\n${U.rnd(0, 7)} ${U.rnd(0, 7)}`; },
  run({ L, X }) {
    const F = [], N = 8, t = Array(2 * N).fill(null), seg = []; const at = (d, x) => d ? d[0] * x + d[1] : Infinity, ln = (d) => d ? `${d[0]}x${d[1] >= 0 ? '+' : '−'}${Math.abs(d[1])}` : '—';
    const mk = (x, l, r) => { seg[x] = [l, r]; if (l < r) { const m = (l + r) >> 1; mk(2 * x, l, m); mk(2 * x + 1, m + 1, r); } }; mk(1, 0, N - 1);
    const view = (hl = {}) => { const A = []; for (let s = 1; s < 2 * N; s *= 2) { const idx = [...Array(s).keys()].map((k) => s + k); A.push({ name: s === 1 ? 'Gốc: x ∈ [0, 7]' : s === N ? 'Lá' : `Tầng nút ${s}..${2 * s - 1}`, values: idx.map((x) => ln(t[x])), labels: idx.map((x) => `[${seg[x][0]},${seg[x][1]}]`), hl: Object.fromEntries(idx.map((x, k) => [k, hl[x]]).filter(([, c]) => c)), width: 70 }); } return A; };
    F.push({ at: 'giu', msg: 'Cây rỗng: mọi nút chưa có đường.', arrays: view(), vars: {}, fig: true });
    let nf = 0;
    L.forEach((d0) => { let x = 1, d = d0; const path = [], ev = [];
      for (;;) { const [l, r] = seg[x], m = (l + r) >> 1; path.push(x); if (at(d, m) < at(t[x], m)) { ev.push(`nút [${l},${r}] giữ ${ln(d)}`); [t[x], d] = [d, t[x]]; } if (!d || l === r) break; if (at(d, l) < at(t[x], l)) x = 2 * x; else if (at(d, r) < at(t[x], r)) x = 2 * x + 1; else break; }
      F.push({ at: 'giu xuong', msg: `Thêm ${ln(d0)}: đi qua ${path.length} nút${ev.length ? '; ' + ev.join('; ') : ''}.`, arrays: view(Object.fromEntries(path.map((p) => [p, 'ok']))), vars: {}, fig: nf++ < 5 }); });
    const out = [];
    X.forEach((xq) => { let x = 1, best = Infinity; const path = []; for (;;) { path.push(x); best = Math.min(best, at(t[x], xq)); const [l, r] = seg[x]; if (l === r) break; const m = (l + r) >> 1; x = xq <= m ? 2 * x : 2 * x + 1; } out.push(best);
      F.push({ at: 'hoi', msg: `Hỏi x = ${xq}: lấy min của các đường trên đường từ gốc tới lá ${xq}: ${best}.`, arrays: view(Object.fromEntries(path.map((p) => [p, 'cur']))), vars: { x: xq }, ask: { q: `min tại x = ${xq} = ?`, choices: U.near(best, L.map((d) => at(d, xq))).slice(0, 3), answer: best }, out: out.join('\n'), fig: nf++ < 7 }); });
    return F;
  },
};
