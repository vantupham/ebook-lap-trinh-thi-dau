const ALGO = {
  id: 't4-lazy-max', title: 'Cây lười: cộng đoạn, max đoạn',
  desc: 'Cùng khuôn với cây lười cộng–tổng, chỉ đổi phép gộp thành max. Cộng v vào cả đoạn thì max của đoạn tăng đúng v (không nhân độ dài).',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-1-cay-phan-doan-luoi/',
  code: {
    py: ['def ap(x, l, r, v): gt[x] += v; no[x] += v   ⟦ap⟧', 'def day(x, l, r): nếu no[x]: ap(2x, …, no[x]); ap(2x+1, …, no[x]); no[x] = 0   ⟦day⟧', 'def cong(x, l, r, ql, qr, v):', '    if qr < l or r < ql: return   ⟦ngoai⟧', '    if ql <= l and r <= qr: ap(x, l, r, v); return   ⟦phu⟧', '    day(x, l, r); m = (l + r) // 2; cong(2x, …); cong(2x+1, …)   ⟦xuong⟧', '    gt[x] = max(gt[2x], gt[2x+1])', 'def hoi(x, l, r, ql, qr): tương tự, phủ trọn thì trả gt[x]   ⟦hoi⟧'],
    cpp: ['void ap(int x, int l, int r, ll v) { gt[x] += v; no[x] += v; }   ⟦ap⟧', 'void day(int x, int l, int r) { if (no[x]) { ap(2x…); ap(2x+1…); no[x] = 0; } }   ⟦day⟧', 'void cong(int x, int l, int r, int ql, int qr, ll v) {', '    if (qr < l || r < ql) return;   ⟦ngoai⟧', '    if (ql <= l && r <= qr) { ap(x, l, r, v); return; }   ⟦phu⟧', '    day(x, l, r); int m = (l + r) / 2; cong(2x…); cong(2x+1…);   ⟦xuong⟧', '    gt[x] = max(gt[2x], gt[2x+1]);', '}', 'll hoi(...): tương tự, phủ trọn thì trả gt[x];   ⟦hoi⟧'],
  },
  samples: [['8 4\n2 0 1 3 0 2 1 0\n2 2 5\n1 3 6 1\n2 1 8\n2 5 8', 'ví dụ trong bài'], ['4 3\n0 0 0 0\n1 1 2 3\n1 2 3 2\n2 1 4', 'hai đoạn chồng nhau'], ['8 2\n1 9 1 1 1 1 1 1\n1 3 8 5\n2 1 8', 'max đổi chỗ']],
  parse(t) { const v = U.ints(t, 2), [n, q] = v; if (![2, 4, 8].includes(n) || q < 1 || q > 5) throw new Error('Trang mô phỏng dùng n = 2, 4 hoặc 8 và q ≤ 5.'); const a = v.slice(2, 2 + n); if (a.length < n) throw new Error('Thiếu số.'); const ops = []; let p = 2 + n; for (let i = 0; i < q; i++) { const k = v[p]; if (k === 1) { ops.push([1, v[p + 1], v[p + 2], v[p + 3]]); p += 4; } else if (k === 2) { ops.push([2, v[p + 1], v[p + 2]]); p += 3; } else throw new Error('Thao tác "1 l r v" hoặc "2 l r".'); const o = ops[i]; if (!(o[1] >= 1 && o[1] <= o[2] && o[2] <= n)) throw new Error('Cần 1 ≤ l ≤ r ≤ n.'); } return { n, a, ops }; },
  random() { const n = 8, q = U.rnd(3, 5); return `${n} ${q}\n${Array.from({ length: n }, () => U.rnd(0, 9)).join(' ')}\n` + Array.from({ length: q }, (_, i) => { const l = U.rnd(1, n), r = U.rnd(l, n); return (i % 2 === 0) ? `1 ${l} ${r} ${U.rnd(1, 9)}` : `2 ${l} ${r}`; }).join('\n'); },
  run({ n, a, ops }) {
    const F = [], gt = Array(2 * n).fill(0), no = Array(2 * n).fill(0), seg = Array(2 * n);
    const gop = (x, y) => Math.max(x, y), NEU = -Infinity;
    const build = (x, l, r) => { seg[x] = [l, r]; if (l === r) { gt[x] = a[l - 1]; return; } const m = (l + r) >> 1; build(2 * x, l, m); build(2 * x + 1, m + 1, r); gt[x] = gop(gt[2 * x], gt[2 * x + 1]); };
    build(1, 1, n);
    const ap = (x, v) => { const [l, r] = seg[x]; gt[x] += v; no[x] += v; };
    const view = (hl = {}) => { const A = []; for (let s = 1; s < 2 * n; s *= 2) { const idx = [...Array(s).keys()].map((k) => s + k); A.push({ name: s === 1 ? 'Gốc' : s === n ? 'Lá' : `Tầng nút ${s}..${2 * s - 1}`, values: idx.map((x) => gt[x]), labels: idx.map((x) => `[${seg[x][0]},${seg[x][1]}]${no[x] ? ' nợ ' + no[x] : ''}`), hl: Object.fromEntries(idx.map((x, k) => [k, hl[x]]).filter(([, c]) => c)), width: 64 }); } return A; };
    F.push({ at: 'ap', msg: 'Dựng cây: mỗi nút giữ max của đoạn [l, r] ghi bên dưới; chưa nút nào có nợ.', arrays: view(), vars: {}, fig: true });
    const out = []; let qi = -1; const fq = (k) => k === 0 || k === 1 || k === 2;
    for (const op of ops) { qi++;
      if (op[0] === 1) { const [, ql, qr, v] = op; const hl = {}; const ev = [];
        const cong = (x) => { const [l, r] = seg[x]; if (qr < l || r < ql) { hl[x] = 'dim'; return; } if (ql <= l && r <= qr) { ap(x, v); hl[x] = 'ok'; ev.push(x); return; } if (no[x]) { ap(2 * x, no[x]); ap(2 * x + 1, no[x]); no[x] = 0; } hl[x] = 'cur'; cong(2 * x); cong(2 * x + 1); gt[x] = gop(gt[2 * x], gt[2 * x + 1]); };
        cong(1);
        F.push({ at: 'phu xuong', msg: `Cộng ${v} vào [${ql}, ${qr}]: các nút phủ trọn (xanh lá) ${ev.join(', ')} được cập nhật và ghi nợ, KHÔNG đi xuống con. Nút cam là nút phải đi xuống (đẩy nợ trước).`, arrays: view(hl), vars: { l: ql, r: qr, v }, ask: { q: `Cộng vào [${ql}, ${qr}]: bao nhiêu nút được ghi nợ (phủ trọn)?`, choices: U.near(ev.length), answer: ev.length }, fig: fq(qi) });
      } else { const [, ql, qr] = op; const hl = {}; const ev = [];
        const hoi = (x) => { const [l, r] = seg[x]; if (qr < l || r < ql) { hl[x] = 'dim'; return NEU; } if (ql <= l && r <= qr) { hl[x] = 'ok'; ev.push(x); return gt[x]; } if (no[x]) { ap(2 * x, no[x]); ap(2 * x + 1, no[x]); no[x] = 0; } hl[x] = 'cur'; return gop(hoi(2 * x), hoi(2 * x + 1)); };
        const kq = hoi(1); out.push(kq);
        F.push({ at: 'hoi day', msg: `Hỏi [${ql}, ${qr}]: lấy các nút phủ trọn ${ev.join(', ')} (xanh lá); nút cam phải đẩy nợ xuống con trước khi đi xuống. Kết quả ${kq}.`, arrays: view(hl), vars: { l: ql, r: qr }, ask: { q: `Max trên [${ql}, ${qr}] = ?`, choices: U.near(kq), answer: kq }, out: out.join('\n'), fig: fq(qi) });
      }
    }
    F.push({ at: 'hoi', msg: 'Hết thao tác.', arrays: view(), vars: {}, out: out.join('\n') });
    return F;
  },
};
