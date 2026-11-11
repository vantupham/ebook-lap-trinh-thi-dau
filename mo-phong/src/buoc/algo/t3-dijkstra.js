const ALGO = {
  id: 't3-dijkstra', title: 'Dijkstra: đường đi ngắn nhất, cạnh không âm',
  desc: 'Heap nhỏ nhất chứa các cặp (khoảng cách tạm, đỉnh). Mỗi lần lấy cặp nhỏ nhất: nếu là <b>bản cũ</b> (lớn hơn d hiện tại) thì bỏ qua; nếu không, đỉnh đó được <b>chốt</b>, và ta thử cải thiện mọi cạnh đi ra từ nó: d[u] + w &lt; d[v] thì cập nhật và đẩy (d[v], v) vào heap.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-1-duong-di-ngan-nhat/',
  code: {
    py: ['d = [VC] * (n + 1); d[1] = 0; pq = [(0, 1)]   ⟦khoi⟧', 'while pq:', '    du, u = heappop(pq)   ⟦lay⟧', '    if du > d[u]: continue   ⟦cu⟧', '    for v, w in adj[u]:', '        if d[u] + w < d[v]:', '            d[v] = d[u] + w; heappush(pq, (d[v], v))   ⟦cap⟧', 'in d (VC thì in -1)   ⟦in⟧'],
    cpp: ['d[1] = 0; pq.push({0, 1});   ⟦khoi⟧', 'while (!pq.empty()) {', '    auto [du, u] = pq.top(); pq.pop();   ⟦lay⟧', '    if (du > d[u]) continue;   ⟦cu⟧', '    for (auto [v, w] : adj[u])', '        if (d[u] + w < d[v])', '            { d[v] = d[u] + w; pq.push({d[v], v}); }   ⟦cap⟧', '}', 'in d (VC thì in -1)   ⟦in⟧'],
  },
  samples: [['3 4\n1 2 6\n1 3 2\n3 2 3\n1 3 4', 'ví dụ trong bài'], ['5 7\n1 2 4\n1 3 1\n3 2 2\n2 4 1\n3 4 5\n4 5 3\n2 5 7', 'năm đỉnh'], ['4 2\n1 2 3\n3 4 1', 'có đỉnh không tới được']],
  parse(t) { const v = U.ints(t, 2), [n, m] = v; if (n < 1 || n > 8 || m < 0 || m > 14) throw new Error('Hãy chọn n ≤ 8, m ≤ 14.'); if (v.length < 2 + 3 * m) throw new Error('Thiếu cạnh.'); const e = []; for (let i = 0; i < m; i++) { const [a, b, c] = v.slice(2 + 3 * i, 5 + 3 * i); if (a < 1 || a > n || b < 1 || b > n || c < 0) throw new Error('Cạnh a b c với 1 ≤ a, b ≤ n, c ≥ 0.'); e.push([a, b, c]); } return { n, e }; },
  random() { const n = U.rnd(4, 6), m = U.rnd(n, 2 * n), e = []; for (let i = 0; i < m; i++) { const a = U.rnd(1, n); let b = U.rnd(1, n); if (b === a) b = a % n + 1; e.push(`${a} ${b} ${U.rnd(1, 9)}`); } return `${n} ${m}\n` + e.join('\n'); },
  run({ n, e }) {
    const F = [], adj = Array.from({ length: n + 1 }, () => []); for (const [a, b, c] of e) adj[a].push([b, c]);
    const VC = Infinity, d = Array(n + 1).fill(VC), chot = Array(n + 1).fill(false); let pq = [[0, 1]]; d[1] = 0;
    const sh = (x) => x === VC ? '∞' : x;
    const view = (hl = {}, u) => { const A = [{ name: 'd[v] (số dưới: đỉnh v; xanh lá: đã chốt)', values: d.slice(1).map(sh), labels: [...Array(n).keys()].map((k) => String(k + 1)), hl: Object.assign(Object.fromEntries([...Array(n).keys()].map((k) => [k, chot[k + 1] ? 'ok' : ''])), hl) }, { name: 'Heap nhỏ nhất (khoảng cách:đỉnh)', values: pq.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(([x, v]) => `${x}:${v}`), noIdx: true, hl: pq.length ? { 0: 'mark' } : {}, width: 46 }];
      if (u) A.push({ name: `Cạnh đi ra từ ${u} (đích, độ dài)`, values: adj[u].map(([v, w]) => `→${v} (${w})`), noIdx: true, hl: {}, width: 58 }); return A; };
    F.push({ at: 'khoi', msg: 'd[1] = 0, các đỉnh khác ∞. Đẩy (0, 1) vào heap.', arrays: view(), vars: {}, fig: true });
    let nf = 0; const fg = () => nf++ < 10;
    while (pq.length) {
      pq.sort((a, b) => a[0] - b[0] || a[1] - b[1]); const [du, u] = pq.shift();
      const ch = [...new Set([u, ...pq.map((p) => p[1])])].sort((a, b) => a - b).slice(0, 4);
      if (du > d[u]) { F.push({ at: 'lay cu', msg: `Lấy (${du}, ${u}) ra: ${du} > d[${u}] = ${d[u]}, đây là bản cũ, bỏ qua.`, arrays: view({ [u - 1]: 'dim' }), vars: { u }, fig: fg() }); continue; }
      chot[u] = true; const moi = [];
      for (const [v, w] of adj[u]) if (d[u] + w < d[v]) { d[v] = d[u] + w; pq.push([d[v], v]); moi.push([v, d[v]]); }
      F.push({ at: moi.length ? 'lay cap' : 'lay', msg: `Lấy (${du}, ${u}): chốt d[${u}] = ${du}. ${moi.length ? 'Cải thiện: ' + moi.map(([v, x]) => `d[${v}] = ${x}`).join(', ') + '.' : 'Không cải thiện được đỉnh nào.'}`, arrays: view({ [u - 1]: 'cur', ...Object.fromEntries(moi.map(([v]) => [v - 1, 'mark'])) }, u), vars: { u }, ask: { q: 'Đỉnh nào được lấy ra (và chốt) tiếp theo?', choices: ch, answer: u }, fig: fg() });
    }
    const out = d.slice(1).map((x) => x === VC ? -1 : x).join(' ');
    F.push({ at: 'in', msg: `Heap rỗng. Kết quả: ${out}.`, arrays: view(), vars: {}, out, fig: true });
    return F;
  },
};
