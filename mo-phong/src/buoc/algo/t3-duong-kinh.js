const ALGO = {
  id: 't3-duong-kinh', title: 'Đường kính cây bằng hai lần BFS',
  desc: 'BFS từ một đỉnh bất kỳ (ở đây là 1), lấy đỉnh xa nhất u. BFS lần hai từ u, đỉnh xa nhất v: đường u–v là <b>đường kính</b> (đường dài nhất trong cây), độ dài là khoảng cách d[v].',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-3-cay-lca/',
  code: {
    py: ['d1 = bfs(1); u = đỉnh có d1 lớn nhất   ⟦lan1⟧', 'd2 = bfs(u); v = đỉnh có d2 lớn nhất   ⟦lan2⟧', 'print(d2[v])   ⟦in⟧'],
    cpp: ['auto d1 = bfs(1); int u = max_element(...) - d1.begin();   ⟦lan1⟧', 'auto d2 = bfs(u); int v = max_element(...) - d2.begin();   ⟦lan2⟧', 'cout << d2[v];   ⟦in⟧'],
  },
  samples: [['8\n1 2\n1 3\n3 4\n3 5\n5 6\n2 7\n7 8', 'ví dụ trong bài'], ['6\n1 2\n1 3\n1 4\n1 5\n1 6', 'hình sao'], ['7\n4 1\n4 2\n4 3\n3 5\n5 6\n6 7', 'gốc lệch']],
  parse(t) { const v = U.ints(t, 1), n = v[0]; if (n < 1 || n > 14) throw new Error('Hãy chọn 1 ≤ n ≤ 14.'); if (v.length < 1 + 2 * (n - 1)) throw new Error('Cần n − 1 cạnh.'); const e = []; for (let i = 0; i < n - 1; i++) { const a = v[1 + 2 * i], b = v[2 + 2 * i]; if (a < 1 || a > n || b < 1 || b > n) throw new Error('Đỉnh phải trong 1..n.'); e.push([a, b]); }
    const p = [...Array(n + 1).keys()], f = (x) => p[x] === x ? x : (p[x] = f(p[x])); for (const [a, b] of e) { if (f(a) === f(b)) throw new Error('Các cạnh phải tạo thành một cây (không có vòng).'); p[f(a)] = f(b); } return { n, e }; },
  random() { const n = U.rnd(7, 12), e = []; for (let v = 2; v <= n; v++) e.push(`${U.rnd(1, v - 1)} ${v}`); return n + '\n' + e.join('\n'); },
  run({ n, e }) {
    const F = [], adj = Array.from({ length: n + 1 }, () => []); for (const [a, b] of e) { adj[a].push(b); adj[b].push(a); }
    const bfs = (s) => { const d = Array(n + 1).fill(-1); d[s] = 0; const q = [s]; while (q.length) { const u = q.shift(); for (const v of adj[u]) if (d[v] < 0) { d[v] = d[u] + 1; q.push(v); } } return d; };
    const lab = [...Array(n).keys()].map((k) => String(k + 1));
    const arg = (d) => { let b = 1; for (let i = 1; i <= n; i++) if (d[i] > d[b]) b = i; return b; };
    const d1 = bfs(1), u = arg(d1);
    F.push({ at: 'lan1', msg: `BFS từ 1. Đỉnh xa nhất là u = ${u} (khoảng cách ${d1[u]}).`, arrays: [{ name: 'd1[v]: khoảng cách từ 1', values: d1.slice(1), labels: lab, hl: { 0: 'mark', [u - 1]: 'ok' } }], vars: { u }, ask: { q: 'Đỉnh nào xa đỉnh 1 nhất (chọn số nhỏ nhất nếu hòa)?', choices: [...new Set([u, ...lab.map(Number).filter((x) => x !== u).slice(-2)])].sort((a, b) => a - b), answer: u }, fig: true });
    const d2 = bfs(u), v = arg(d2);
    F.push({ at: 'lan2', msg: `BFS lần hai từ u = ${u}. Đỉnh xa nhất là v = ${v}, cách u ${d2[v]} cạnh.`, arrays: [{ name: 'd1[v]: khoảng cách từ 1', values: d1.slice(1), labels: lab, hl: { [u - 1]: 'ok' } }, { name: `d2[v]: khoảng cách từ u = ${u}`, values: d2.slice(1), labels: lab, hl: { [u - 1]: 'mark', [v - 1]: 'ok' } }], vars: { u, v }, ask: { q: 'Đường kính dài bao nhiêu cạnh?', choices: U.near(d2[v], [d1[u]]), answer: d2[v] }, fig: true });
    const path = []; for (let x = v; ; ) { path.push(x); if (x === u) break; x = adj[x].find((y) => d2[y] === d2[x] - 1); }
    F.push({ at: 'in', msg: `Đường kính: ${path.join(' – ')}, dài ${d2[v]} cạnh.`, arrays: [{ name: `d2[v]: khoảng cách từ u = ${u}`, values: d2.slice(1), labels: lab, hl: Object.fromEntries(path.map((x) => [x - 1, 'ok'])) }], vars: { u, v }, out: String(d2[v]), fig: true });
    return F;
  },
};
