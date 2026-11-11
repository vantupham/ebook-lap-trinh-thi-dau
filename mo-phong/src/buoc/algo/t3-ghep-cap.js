const ALGO = {
  id: 't3-ghep-cap', title: 'QHĐ trên cây: ghép cặp (Tree Matching)',
  desc: 'Treo cây ở đỉnh 1, lấy thứ tự BFS rồi duyệt <b>ngược</b> (con trước cha). f[v]: số cặp nhiều nhất trong cây con của v khi v còn rảnh = tổng g[c]. g[v]: không ràng buộc = max(f[v], f[v] − g[c] + f[c] + 1) với mỗi con c (ghép v với c).',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-8-qhd-tren-cay/',
  code: {
    py: ['thu_tu = BFS từ 1; cha[]   ⟦khoi⟧', 'for v in reversed(thu_tu):', '    f[v] = sum(g[c] for c in con[v])   ⟦f⟧', '    g[v] = f[v]', '    for c in con[v]: g[v] = max(g[v], f[v] - g[c] + f[c] + 1)   ⟦g⟧', 'print(g[1])   ⟦in⟧'],
    cpp: ['// thu_tu = BFS từ 1, cha[]   ⟦khoi⟧', 'for (int k = n - 1; k >= 0; k--) {', '    int v = thu_tu[k];', '    for (int c : con[v]) f[v] += g[c];   ⟦f⟧', '    g[v] = f[v];', '    for (int c : con[v]) g[v] = max(g[v], f[v] - g[c] + f[c] + 1);   ⟦g⟧', '}', 'cout << g[1];   ⟦in⟧'],
  },
  samples: [['7\n1 2\n1 3\n3 4\n3 5\n2 6\n6 7', 'ví dụ trong bài'], ['6\n1 2\n1 3\n1 4\n1 5\n1 6', 'hình sao'], ['6\n1 2\n2 3\n3 4\n4 5\n5 6', 'đường thẳng']],
  parse(t) { const v = U.ints(t, 1), n = v[0]; if (n < 1 || n > 12) throw new Error('Hãy chọn 1 ≤ n ≤ 12.'); const e = []; for (let i = 0; i < n - 1; i++) { const a = v[1 + 2 * i], b = v[2 + 2 * i]; if (!(a >= 1 && a <= n && b >= 1 && b <= n)) throw new Error('Cần n − 1 cạnh trong 1..n.'); e.push([a, b]); } const p = [...Array(n + 1).keys()], f = (x) => p[x] === x ? x : (p[x] = f(p[x])); for (const [a, b] of e) { if (f(a) === f(b)) throw new Error('Các cạnh phải tạo thành cây.'); p[f(a)] = f(b); } return { n, e }; },
  random() { const n = U.rnd(6, 10), e = []; for (let v = 2; v <= n; v++) e.push(`${U.rnd(1, v - 1)} ${v}`); return n + '\n' + e.join('\n'); },
  run({ n, e }) {
    const F = [], adj = Array.from({ length: n + 1 }, () => []); for (const [a, b] of e) { adj[a].push(b); adj[b].push(a); }
    const cha = Array(n + 1).fill(0), tt = [1]; cha[1] = -1; for (let k = 0; k < tt.length; k++) for (const v of adj[tt[k]]) if (v !== cha[tt[k]]) { cha[v] = tt[k]; tt.push(v); }
    const con = (v) => adj[v].filter((c) => c !== cha[v]), f = Array(n + 1).fill(null), g = Array(n + 1).fill(null);
    const lab = [...Array(n).keys()].map((k) => String(k + 1));
    const view = (hl = {}) => [{ name: 'Thứ tự BFS từ gốc 1 (duyệt từ phải sang trái)', values: tt, noIdx: true, hl: Object.fromEntries(tt.map((v, k) => [k, f[v] !== null ? 'done' : ''])) }, { name: 'cha[v]', values: cha.slice(1).map((x) => x < 0 ? '—' : x), labels: lab, hl: {} }, { name: 'f[v]: v còn rảnh', values: f.slice(1).map((x) => x ?? ''), labels: lab, hl }, { name: 'g[v]: không ràng buộc', values: g.slice(1).map((x) => x ?? ''), labels: lab, hl }];
    F.push({ at: 'khoi', msg: `BFS từ 1 cho thứ tự ${tt.join(', ')}: cha luôn đứng trước con. Duyệt ngược để mọi con được tính trước cha.`, arrays: view(), vars: {}, fig: true });
    for (let k = n - 1; k >= 0; k--) {
      const v = tt[k], cs = con(v); f[v] = cs.reduce((s, c) => s + g[c], 0); g[v] = f[v]; let best = null;
      for (const c of cs) { const x = f[v] - g[c] + f[c] + 1; if (x > g[v]) { g[v] = x; best = c; } }
      const hl = { [v - 1]: 'cur', ...Object.fromEntries(cs.map((c) => [c - 1, 'mark'])) };
      F.push({ at: 'f g', msg: cs.length ? `Đỉnh ${v}, các con ${cs.join(', ')}: f[${v}] = ${cs.map((c) => `g[${c}]`).join(' + ')} = ${f[v]}; g[${v}] = ${g[v]}${best ? ` (ghép ${v} với ${best})` : ' (không ghép thì tốt hơn hoặc bằng)'}.` : `Đỉnh ${v} là lá: f = g = 0.`, arrays: view(hl), vars: { v }, ask: cs.length ? { q: `g[${v}] = ?`, choices: U.near(g[v], [f[v]]), answer: g[v] } : undefined, fig: cs.length > 0 });
    }
    F.push({ at: 'in', msg: `Đáp án g[1] = ${g[1]} cặp.`, arrays: view({ 0: 'ok' }), vars: {}, out: String(g[1]), fig: true });
    return F;
  },
};
