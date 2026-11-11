const ALGO = {
  id: 't2-dfs', title: 'DFS bằng ngăn xếp: đếm thành phần liên thông',
  desc: 'Duyệt đỉnh s = 1..n. Gặp đỉnh chưa thăm là gặp <b>thành phần mới</b>: đẩy s vào ngăn xếp, rồi lặp: lấy đỉnh u ở đỉnh ngăn xếp, đẩy mọi hàng xóm chưa thăm của u (đánh dấu ngay khi đẩy). Ngăn xếp rỗng là đã thăm hết thành phần đó.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-7-bfs-dfs/',
  code: {
    py: ['for s in range(1, n + 1):', '    if tham[s]: continue', '    dem += 1; tham[s] = True; st = [s]   ⟦moi⟧', '    while st:', '        u = st.pop()   ⟦lay⟧', '        for v in adj[u]:', '            if not tham[v]: tham[v] = True; st.append(v)   ⟦day⟧', 'print(dem)   ⟦in⟧'],
    cpp: ['for (int s = 1; s <= n; s++) {', '    if (tham[s]) continue;', '    dem++; tham[s] = true; st.push(s);   ⟦moi⟧', '    while (!st.empty()) {', '        int u = st.top(); st.pop();   ⟦lay⟧', '        for (int v : adj[u])', '            if (!tham[v]) { tham[v] = true; st.push(v); }   ⟦day⟧', '    }', '}', 'cout << dem;   ⟦in⟧'],
  },
  samples: [['5 3\n1 2\n2 3\n4 5', 'ví dụ trong bài'], ['7 6\n1 2\n1 3\n2 4\n3 4\n5 6\n4 1', 'có chu trình, đỉnh lẻ 7'], ['6 0', 'không có cạnh']],
  parse(t) { const v = U.ints(t, 2), [n, m] = v; if (n < 1 || n > 10 || m < 0 || m > 15) throw new Error('Hãy chọn n ≤ 10, m ≤ 15.'); if (v.length < 2 + 2 * m) throw new Error('Thiếu cạnh.'); const e = []; for (let i = 0; i < m; i++) { const a = v[2 + 2 * i], b = v[3 + 2 * i]; if (a < 1 || a > n || b < 1 || b > n) throw new Error('Đỉnh phải trong 1..n.'); e.push([a, b]); } return { n, e }; },
  random() { const n = U.rnd(5, 9), m = U.rnd(2, n), e = []; for (let i = 0; i < m; i++) { const a = U.rnd(1, n); let b = U.rnd(1, n); if (b === a) b = a % n + 1; e.push(`${a} ${b}`); } return `${n} ${m}\n` + e.join('\n'); },
  run({ n, e }) {
    const F = [], adj = Array.from({ length: n + 1 }, () => []); for (const [a, b] of e) { adj[a].push(b); adj[b].push(a); }
    const tham = Array(n + 1).fill(false), tp = Array(n + 1).fill(0), st = []; let dem = 0;
    const view = (hl = {}, u) => { const A = [{ name: 'Đỉnh (số dưới: đỉnh; trong ô: thuộc thành phần số mấy, trống là chưa thăm)', values: [...Array(n).keys()].map((k) => tp[k + 1] || ''), labels: [...Array(n).keys()].map((k) => String(k + 1)), hl: Object.assign(Object.fromEntries([...Array(n).keys()].map((k) => [k, tham[k + 1] ? 'done' : ''])), hl) },
      { name: 'Ngăn xếp (đáy → đỉnh)', values: st.slice(), noIdx: true, hl: st.length ? { [st.length - 1]: 'mark' } : {} }];
      if (u) A.push({ name: `adj[${u}] (hàng xóm của ${u})`, values: adj[u].slice(), noIdx: true, hl: {} }); return A; };
    F.push({ at: 'moi', msg: `Đồ thị ${n} đỉnh, ${e.length} cạnh hai chiều. Chưa thăm đỉnh nào.`, arrays: view(), vars: { dem }, fig: true });
    for (let s = 1; s <= n; s++) {
      if (tham[s]) continue;
      dem++; tham[s] = true; tp[s] = dem; st.push(s);
      F.push({ at: 'moi', msg: `Đỉnh ${s} chưa thăm: bắt đầu thành phần thứ ${dem}.`, arrays: view({ [s - 1]: 'cur' }), vars: { dem }, ask: { q: `Đỉnh ${s} chưa thăm. Đây là thành phần thứ mấy?`, choices: U.near(dem), answer: dem }, fig: dem <= 2 });
      while (st.length) {
        const u = st.pop(), moi = [];
        for (const v of adj[u]) if (!tham[v]) { tham[v] = true; tp[v] = dem; st.push(v); moi.push(v); }
        F.push({ at: moi.length ? 'lay day' : 'lay', msg: `Lấy ${u} khỏi ngăn xếp. ${moi.length ? `Hàng xóm chưa thăm: ${moi.join(', ')}: đánh dấu và đẩy vào.` : 'Mọi hàng xóm đã được thăm.'}`, arrays: view({ [u - 1]: 'cur', ...Object.fromEntries(moi.map((v) => [v - 1, 'ok'])) }, u), vars: { dem }, fig: dem <= 2 && moi.length > 0 });
      }
    }
    F.push({ at: 'in', msg: `Đã thăm hết. Có ${dem} thành phần liên thông.`, arrays: view(), vars: { dem }, out: String(dem), fig: true });
    return U.limit(F);
  },
};
