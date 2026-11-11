const ALGO = {
  id: 't4-kosaraju', title: 'Kosaraju: thành phần liên thông mạnh',
  desc: '<b>Bước 1:</b> DFS trên đồ thị gốc, ghi đỉnh theo thứ tự <b>hoàn thành</b>. <b>Bước 2:</b> lấy các đỉnh theo thứ tự hoàn thành ngược, DFS trên đồ thị <b>đảo chiều</b>; mỗi lần bắt đầu từ một đỉnh chưa thuộc SCC nào thu được đúng một SCC. Các SCC ra theo thứ tự tô-pô của đồ thị nén.',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-5-scc/',
  code: {
    py: ['# Bước 1: DFS trên g, xong.append(u) khi rời u   ⟦b1⟧', '# Bước 2:', 'for s in reversed(xong):', '    if comp[s] != -1: continue', '    DFS trên rg từ s, gán comp = c cho mọi đỉnh gặp   ⟦b2⟧', '    c += 1', 'print(c)   ⟦in⟧'],
    cpp: ['// Bước 1: DFS trên g, xong.push_back(u) khi rời u   ⟦b1⟧', '// Bước 2:', 'for (int i = n - 1; i >= 0; i--) {', '    int s = xong[i]; if (comp[s] != -1) continue;', '    DFS trên rg từ s, gán comp = c cho mọi đỉnh gặp;   ⟦b2⟧', '    c++;', '}', 'cout << c;   ⟦in⟧'],
  },
  samples: [['7 9\n1 2\n2 3\n3 1\n3 4\n4 5\n5 4\n5 6\n6 7\n7 6', 'ví dụ trong bài'], ['4 4\n1 2\n2 1\n1 3\n2 4', 'nhặt xu'], ['5 5\n1 2\n2 3\n3 4\n4 5\n5 1', 'một vòng lớn']],
  parse(t) { const v = U.ints(t, 2), [n, m] = v; if (n < 1 || n > 10 || m < 0 || m > 16) throw new Error('Hãy chọn n ≤ 10, m ≤ 16.'); const e = []; for (let i = 0; i < m; i++) { const a = v[2 + 2 * i], b = v[3 + 2 * i]; if (!(a >= 1 && a <= n && b >= 1 && b <= n)) throw new Error('Cạnh a b trong 1..n.'); e.push([a, b]); } return { n, e }; },
  random() { const n = U.rnd(5, 8), m = U.rnd(n, n + 4), e = []; for (let i = 0; i < m; i++) { const a = U.rnd(1, n); let b = U.rnd(1, n); if (b === a) b = a % n + 1; e.push(`${a} ${b}`); } return `${n} ${m}\n` + e.join('\n'); },
  run({ n, e }) {
    const F = [], g = Array.from({ length: n + 1 }, () => []), rg = Array.from({ length: n + 1 }, () => []); for (const [a, b] of e) { g[a].push(b); rg[b].push(a); }
    const lab = [...Array(n).keys()].map((k) => String(k + 1)), xong = [], tham = Array(n + 1).fill(false), it = Array(n + 1).fill(0), comp = Array(n + 1).fill(-1);
    const view = (hl = {}, hx = {}) => [{ name: 'comp[u] (SCC của đỉnh; trống là chưa gán)', values: comp.slice(1).map((x) => x < 0 ? '' : x), labels: lab, hl }, { name: 'Thứ tự hoàn thành (bước 1)', values: xong.slice(), noIdx: true, hl: hx }];
    F.push({ at: 'b1', msg: 'Bước 1: DFS trên đồ thị gốc, ghi đỉnh khi đã đi hết các cạnh ra của nó.', arrays: view(), vars: {}, fig: true });
    for (let s = 1; s <= n; s++) { if (tham[s]) continue; const st = [s]; tham[s] = true; const add = [];
      while (st.length) { const u = st[st.length - 1]; if (it[u] < g[u].length) { const v = g[u][it[u]++]; if (!tham[v]) { tham[v] = true; st.push(v); } } else { xong.push(u); add.push(u); st.pop(); } }
      F.push({ at: 'b1', msg: `DFS từ ${s}: hoàn thành lần lượt ${add.join(', ')}.`, arrays: view({}, Object.fromEntries(add.map((u) => [xong.indexOf(u), 'ok']))), vars: {}, fig: true }); }
    let c = 0;
    for (let i = n - 1; i >= 0; i--) { const s = xong[i]; if (comp[s] !== -1) continue; const st = [s], ds = [s]; comp[s] = c;
      while (st.length) { const u = st.pop(); for (const v of rg[u]) if (comp[v] === -1) { comp[v] = c; st.push(v); ds.push(v); } }
      F.push({ at: 'b2', msg: `Bước 2: đỉnh chưa gán hoàn thành muộn nhất là ${s}. DFS trên đồ thị đảo từ ${s}: SCC số ${c} = {${ds.sort((a, b) => a - b).join(', ')}}.`, arrays: view(Object.fromEntries(ds.map((u) => [u - 1, 'ok'])), { [i]: 'cur' }), vars: { c: c + 1 }, ask: { q: `SCC bắt đầu từ ${s} có bao nhiêu đỉnh?`, choices: U.near(ds.length), answer: ds.length }, fig: true }); c++; }
    F.push({ at: 'in', msg: `Có ${c} thành phần liên thông mạnh.`, arrays: view(), vars: { c }, out: String(c) });
    return F;
  },
};
