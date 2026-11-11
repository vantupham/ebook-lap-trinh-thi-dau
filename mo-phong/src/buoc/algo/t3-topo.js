const ALGO = {
  id: 't3-topo', title: 'Sắp xếp tô-pô (Kahn) với heap',
  desc: 'vao[v] = số môn phải học trước v. Môn có vao = 0 học được ngay; dùng heap nhỏ nhất để luôn chọn môn số nhỏ nhất. Học xong u thì giảm vao của mọi môn sau u; môn nào về 0 thì vào heap. Xếp không đủ n môn nghĩa là có chu trình.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-2-cay-khung-topo/',
  code: {
    py: ['pq = [i for i in 1..n if vao[i] == 0]; heapify(pq)   ⟦khoi⟧', 'while pq:', '    u = heappop(pq); thu_tu.append(u)   ⟦lay⟧', '    for v in adj[u]:', '        vao[v] -= 1', '        if vao[v] == 0: heappush(pq, v)   ⟦giam⟧', 'print(thu_tu if len(thu_tu) == n else "IMPOSSIBLE")   ⟦in⟧'],
    cpp: ['for (int i = 1; i <= n; i++) if (vao[i] == 0) pq.push(i);   ⟦khoi⟧', 'while (!pq.empty()) {', '    int u = pq.top(); pq.pop(); thu_tu.push_back(u);   ⟦lay⟧', '    for (int v : adj[u])', '        if (--vao[v] == 0) pq.push(v);   ⟦giam⟧', '}', 'thu_tu.size() < n ? "IMPOSSIBLE" : in thu_tu   ⟦in⟧'],
  },
  samples: [['5 3\n1 2\n3 1\n4 5', 'ví dụ trong bài'], ['4 4\n1 2\n2 3\n3 4\n4 2', 'có chu trình'], ['6 6\n6 1\n5 1\n5 2\n4 2\n2 3\n1 3', 'sáu môn']],
  parse(t) { const v = U.ints(t, 2), [n, m] = v; if (n < 1 || n > 10 || m < 0 || m > 15) throw new Error('Hãy chọn n ≤ 10, m ≤ 15.'); if (v.length < 2 + 2 * m) throw new Error('Thiếu ràng buộc.'); const e = []; for (let i = 0; i < m; i++) { const a = v[2 + 2 * i], b = v[3 + 2 * i]; if (a < 1 || a > n || b < 1 || b > n) throw new Error('Môn phải trong 1..n.'); e.push([a, b]); } return { n, e }; },
  random() { const n = U.rnd(5, 8), p = U.shuffle([...Array(n).keys()].map((x) => x + 1)), m = U.rnd(n - 1, n + 3), e = []; for (let i = 0; i < m; i++) { const x = U.rnd(0, n - 2), y = U.rnd(x + 1, n - 1); e.push(`${p[x]} ${p[y]}`); } if (Math.random() < .25) e.push(`${p[n - 1]} ${p[0]}`); return `${n} ${e.length}\n` + e.join('\n'); },
  run({ n, e }) {
    const F = [], adj = Array.from({ length: n + 1 }, () => []), vao = Array(n + 1).fill(0); for (const [a, b] of e) { adj[a].push(b); vao[b]++; }
    let pq = []; for (let i = 1; i <= n; i++) if (vao[i] === 0) pq.push(i); const tt = [];
    const view = (hl = {}) => [{ name: 'vao[v] (số dưới: môn v; xanh lá: đã học)', values: vao.slice(1), labels: [...Array(n).keys()].map((k) => String(k + 1)), hl: Object.assign(Object.fromEntries(tt.map((u) => [u - 1, 'ok'])), hl) }, { name: 'Heap: các môn học được ngay', values: pq.slice().sort((a, b) => a - b), noIdx: true, hl: pq.length ? { 0: 'mark' } : {} }, { name: 'Thứ tự học', values: tt.slice(), noIdx: true, hl: {} }];
    F.push({ at: 'khoi', msg: `Các môn có vao = 0 vào heap: ${pq.slice().sort((a, b) => a - b).join(', ') || '(không có)'}.`, arrays: view(), vars: {}, fig: true });
    while (pq.length) {
      pq.sort((a, b) => a - b); const ch = pq.slice(0, 4); const u = pq.shift(); tt.push(u); const moi = [];
      for (const v of adj[u]) if (--vao[v] === 0) { pq.push(v); moi.push(v); }
      F.push({ at: moi.length ? 'lay giam' : 'lay', msg: `Học môn ${u} (số nhỏ nhất trong heap). Giảm vao của ${adj[u].join(', ') || '(không môn nào)'}.${moi.length ? ` Môn ${moi.join(', ')} về 0, vào heap.` : ''}`, arrays: view({ [u - 1]: 'cur', ...Object.fromEntries(adj[u].map((v) => [v - 1, 'mark'])) }), vars: { u }, ask: { q: 'Học môn nào tiếp theo?', choices: [...new Set([u, ...ch, ...adj[u]])].slice(0, 4).sort((a, b) => a - b), answer: u }, fig: true });
    }
    const ok = tt.length === n;
    F.push({ at: 'in', msg: ok ? `Đã xếp đủ ${n} môn.` : `Chỉ xếp được ${tt.length}/${n} môn: các môn còn lại chờ nhau thành vòng. IMPOSSIBLE.`, arrays: view(ok ? {} : Object.fromEntries([...Array(n).keys()].filter((k) => !tt.includes(k + 1)).map((k) => [k, 'bad']))), vars: {}, out: ok ? tt.join(' ') : 'IMPOSSIBLE' });
    return F;
  },
};
