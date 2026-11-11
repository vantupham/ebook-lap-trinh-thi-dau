const ALGO = {
  id: 't3-fenwick', title: 'Cây Fenwick: sửa điểm, hỏi tổng',
  desc: 't[i] giữ tổng khối dài (i &amp; −i) kết thúc tại i. Hỏi tổng 1..i: cộng t[i] rồi i −= i &amp; −i (xóa bit 1 thấp nhất). Cộng v vào a[i]: cộng v vào t[i] rồi i += i &amp; −i. Mỗi việc tối đa log₂ n bước.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-4-fenwick/',
  code: {
    py: ['def cong(i, v):', '    while i <= n: t[i] += v; i += i & -i   ⟦cong⟧', 'def tong(i):', '    s = 0', '    while i > 0: s += t[i]; i -= i & -i   ⟦tong⟧', '    return s', '# 1 k u: cong(k, u - a[k]); a[k] = u', '# 2 l r: print(tong(r) - tong(l - 1))   ⟦in⟧'],
    cpp: ['void cong(int i, long long v) {', '    for (; i <= n; i += i & -i) t[i] += v;   ⟦cong⟧', '}', 'long long tong(int i) {', '    long long s = 0;', '    for (; i > 0; i -= i & -i) s += t[i];   ⟦tong⟧', '    return s;', '}', '// 1 k u: cong(k, u - a[k]); a[k] = u;', '// 2 l r: cout << tong(r) - tong(l - 1);   ⟦in⟧'],
  },
  samples: [['8 4\n3 2 4 5 1 1 5 3\n2 1 4\n1 4 9\n2 1 4\n2 3 5', 'ví dụ trong bài'], ['8 3\n1 1 1 1 1 1 1 1\n2 1 7\n1 3 5\n2 2 8', 'toàn số 1'], ['12 2\n5 3 8 1 9 2 7 4 6 0 3 1\n2 3 11\n1 6 10', 'mười hai phần tử']],
  parse(t) { const v = U.ints(t, 2), [n, q] = v; if (n < 1 || n > 16 || q < 1 || q > 5) throw new Error('Hãy chọn n ≤ 16, q ≤ 5.'); const a = v.slice(2, 2 + n); if (a.length < n) throw new Error('Thiếu số.'); const ops = []; for (let i = 0; i < q; i++) { const [k, x, y] = v.slice(2 + n + 3 * i, 5 + n + 3 * i); if (k === 1 && x >= 1 && x <= n) ops.push([1, x, y]); else if (k === 2 && x >= 1 && x <= y && y <= n) ops.push([2, x, y]); else throw new Error('Thao tác "1 k u" hoặc "2 l r".'); } return { n, a: [0, ...a], ops }; },
  random() { const n = U.rnd(8, 12), q = U.rnd(2, 4); return `${n} ${q}\n${Array.from({ length: n }, () => U.rnd(0, 9)).join(' ')}\n` + Array.from({ length: q }, () => { if (Math.random() < .4) return `1 ${U.rnd(1, n)} ${U.rnd(0, 9)}`; const l = U.rnd(1, n); return `2 ${l} ${U.rnd(l, n)}`; }).join('\n'); },
  run({ n, a, ops }) {
    const F = [], t = Array(n + 1).fill(0), A = a.slice();
    for (let i = 1; i <= n; i++) for (let j = i; j <= n; j += j & -j) t[j] += A[i];
    const lab = [...Array(n).keys()].map((k) => String(k + 1)), khoi = [...Array(n).keys()].map((k) => { const i = k + 1, l = i - (i & -i) + 1; return l === i ? `[${i}]` : `[${l}..${i}]`; });
    const view = (ht = {}, ha = {}) => [{ name: 'a[i]', values: A.slice(1), labels: lab, hl: ha }, { name: 't[i] (chữ dưới: khối mà t[i] giữ tổng)', values: t.slice(1), labels: khoi, hl: ht }];
    F.push({ at: 'cong', msg: 'Đã dựng t bằng cách cộng từng a[i] vào cây (n lần "cong").', arrays: view(), vars: {}, fig: true });
    const out = []; let nf = 0;
    for (const [k, x, y] of ops) {
      if (k === 1) { const dv = y - A[x]; A[x] = y; const path = []; for (let i = x; i <= n; i += i & -i) { t[i] += dv; path.push(i); }
        F.push({ at: 'cong', msg: `Đặt a[${x}] = ${y}: cộng ${dv} vào t tại ${path.join(' → ')} (mỗi bước i += i & −i).`, arrays: view(Object.fromEntries(path.map((i) => [i - 1, 'ok'])), { [x - 1]: 'cur' }), vars: { k: x }, ask: { q: `Sửa a[${x}] làm thay đổi bao nhiêu ô t?`, choices: U.near(path.length), answer: path.length }, fig: nf++ < 4 });
      } else {
        const go = (i) => { const p = []; let s = 0; for (; i > 0; i -= i & -i) { s += t[i]; p.push(i); } return [s, p]; };
        const [sr, pr] = go(y), [sl, pl] = go(x - 1), ans = sr - sl; out.push(ans);
        const ha = {}; for (let i = x; i <= y; i++) ha[i - 1] = 'mark';
        F.push({ at: 'tong', msg: `tong(${y}) = ${pr.map((i) => `t[${i}]`).join(' + ')} = ${sr}.`, arrays: view(Object.fromEntries(pr.map((i) => [i - 1, 'ok'])), ha), vars: { l: x, r: y }, ask: { q: `tong(${y}) cộng bao nhiêu ô t?`, choices: U.near(pr.length), answer: pr.length }, fig: nf++ < 4 });
        F.push({ at: 'tong in', msg: `tong(${x - 1}) = ${pl.length ? pl.map((i) => `t[${i}]`).join(' + ') : '0'} = ${sl}. Tổng [${x}, ${y}] = ${sr} − ${sl} = ${ans}.`, arrays: view(Object.fromEntries(pl.map((i) => [i - 1, 'bad'])), ha), vars: { l: x, r: y }, out: out.join('\n'), fig: nf++ < 4 });
      }
    }
    F.push({ at: 'in', msg: 'Hết thao tác.', arrays: view(), vars: {}, out: out.join('\n') });
    return F;
  },
};
