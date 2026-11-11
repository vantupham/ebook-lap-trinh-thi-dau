const ALGO = {
  id: 't3-doc-lap', title: 'QHĐ trên cây: tập độc lập trọng số lớn nhất',
  desc: 'Chọn một tập đỉnh không có hai đỉnh kề nhau, tổng trọng số lớn nhất. chon[v] = w[v] + tổng khong[c] (chọn v thì không chọn con nào); khong[v] = tổng max(chon[c], khong[c]). Duyệt ngược thứ tự BFS.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-8-qhd-tren-cay/',
  code: {
    py: ['for v in reversed(thu_tu):', '    chon[v] = w[v] + sum(khong[c] for c in con[v])   ⟦chon⟧', '    khong[v] = sum(max(chon[c], khong[c]) for c in con[v])   ⟦khong⟧', 'print(max(chon[1], khong[1]))   ⟦in⟧'],
    cpp: ['for (int k = n - 1; k >= 0; k--) {', '    int v = thu_tu[k]; chon[v] = w[v];', '    for (int c : con[v]) chon[v] += khong[c];   ⟦chon⟧', '    for (int c : con[v]) khong[v] += max(chon[c], khong[c]);   ⟦khong⟧', '}', 'cout << max(chon[1], khong[1]);   ⟦in⟧'],
  },
  samples: [['6\n3 5 1 4 2 6\n1 2\n1 3\n2 4\n2 5\n3 6', 'ví dụ trong bài'], ['5\n10 1 1 1 1\n1 2\n1 3\n1 4\n1 5', 'gốc nặng'], ['5\n1 10 1 10 1\n1 2\n2 3\n3 4\n4 5', 'đường thẳng']],
  parse(t) { const v = U.ints(t, 1), n = v[0]; if (n < 1 || n > 12) throw new Error('Hãy chọn 1 ≤ n ≤ 12.'); const w = v.slice(1, 1 + n); const e = []; for (let i = 0; i < n - 1; i++) { const a = v[1 + n + 2 * i], b = v[2 + n + 2 * i]; if (!(a >= 1 && a <= n && b >= 1 && b <= n)) throw new Error('Cần n trọng số rồi n − 1 cạnh.'); e.push([a, b]); } const p = [...Array(n + 1).keys()], f = (x) => p[x] === x ? x : (p[x] = f(p[x])); for (const [a, b] of e) { if (f(a) === f(b)) throw new Error('Các cạnh phải tạo thành cây.'); p[f(a)] = f(b); } return { n, w: [0, ...w], e }; },
  random() { const n = U.rnd(6, 10), e = []; for (let v = 2; v <= n; v++) e.push(`${U.rnd(1, v - 1)} ${v}`); return `${n}\n${Array.from({ length: n }, () => U.rnd(1, 9)).join(' ')}\n` + e.join('\n'); },
  run({ n, w, e }) {
    const F = [], adj = Array.from({ length: n + 1 }, () => []); for (const [a, b] of e) { adj[a].push(b); adj[b].push(a); }
    const cha = Array(n + 1).fill(0), tt = [1]; cha[1] = -1; for (let k = 0; k < tt.length; k++) for (const v of adj[tt[k]]) if (v !== cha[tt[k]]) { cha[v] = tt[k]; tt.push(v); }
    const con = (v) => adj[v].filter((c) => c !== cha[v]), A = Array(n + 1).fill(null), B = Array(n + 1).fill(null), lab = [...Array(n).keys()].map((k) => String(k + 1));
    const view = (hl = {}) => [{ name: 'Trọng số w[v]', values: w.slice(1), labels: lab, hl }, { name: 'cha[v]', values: cha.slice(1).map((x) => x < 0 ? '—' : x), labels: lab, hl: {} }, { name: 'chon[v]: chọn v', values: A.slice(1).map((x) => x ?? ''), labels: lab, hl }, { name: 'khong[v]: không chọn v', values: B.slice(1).map((x) => x ?? ''), labels: lab, hl }];
    F.push({ at: 'chon', msg: `Thứ tự BFS: ${tt.join(', ')}. Duyệt ngược.`, arrays: view(), vars: {}, fig: true });
    for (let k = n - 1; k >= 0; k--) {
      const v = tt[k], cs = con(v); A[v] = w[v] + cs.reduce((s, c) => s + B[c], 0); B[v] = cs.reduce((s, c) => s + Math.max(A[c], B[c]), 0);
      F.push({ at: 'chon khong', msg: cs.length ? `Đỉnh ${v} (con ${cs.join(', ')}): chon = ${w[v]} + ${cs.map((c) => B[c]).join(' + ')} = ${A[v]}; khong = ${cs.map((c) => `max(${A[c]}, ${B[c]})`).join(' + ')} = ${B[v]}.` : `Lá ${v}: chon = ${w[v]}, khong = 0.`, arrays: view({ [v - 1]: 'cur', ...Object.fromEntries(cs.map((c) => [c - 1, 'mark'])) }), vars: { v }, ask: cs.length ? { q: `khong[${v}] = ?`, choices: U.near(B[v], [A[v]]), answer: B[v] } : undefined, fig: cs.length > 0 });
    }
    F.push({ at: 'in', msg: `Đáp án max(chon[1], khong[1]) = max(${A[1]}, ${B[1]}) = ${Math.max(A[1], B[1])}.`, arrays: view({ 0: 'ok' }), vars: {}, out: String(Math.max(A[1], B[1])), fig: true });
    return F;
  },
};
