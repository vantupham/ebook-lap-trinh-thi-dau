const ALGO = {
  id: 't4-euler', title: 'Euler tour: cây con thành đoạn liên tiếp',
  desc: 'DFS từ gốc 1 (bằng ngăn xếp). Lúc vào u: vao[u] = ++t. Lúc rời u (đã thăm hết con): ra[u] = t. Mọi đỉnh trong cây con của u có thứ tự vào nằm trong [vao[u], ra[u]]: cây con trở thành một đoạn liên tiếp trên mảng phẳng.',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-3-euler-hld/',
  code: {
    py: ['vao[1] = t = 1; st = [1]   ⟦khoi⟧', 'while st:', '    u = st[-1]', '    if còn con v chưa thăm của u:', '        cha[v] = u; t += 1; vao[v] = t; st.append(v)   ⟦vao⟧', '    else: ra[u] = t; st.pop()   ⟦ra⟧', '# cây con của u = đoạn [vao[u], ra[u]]   ⟦doan⟧'],
    cpp: ['vao[1] = ++t; st.push_back(1);   ⟦khoi⟧', 'while (!st.empty()) {', '    int u = st.back();', '    if (it[u] < adj[u].size()) { int v = adj[u][it[u]++]; if (v == cha[u]) continue;', '        cha[v] = u; vao[v] = ++t; st.push_back(v); }   ⟦vao⟧', '    else { ra[u] = t; st.pop_back(); }   ⟦ra⟧', '}', '// cây con của u = đoạn [vao[u], ra[u]]   ⟦doan⟧'],
  },
  samples: [['7\n1 2\n1 3\n2 4\n2 5\n3 6\n5 7', 'ví dụ trong bài'], ['5\n1 2\n2 3\n3 4\n4 5', 'đường thẳng'], ['6\n1 2\n1 3\n1 4\n1 5\n1 6', 'hình sao']],
  parse(t) { const v = U.ints(t, 1), n = v[0]; if (n < 1 || n > 12) throw new Error('Hãy chọn 1 ≤ n ≤ 12.'); const e = []; for (let i = 0; i < n - 1; i++) { const a = v[1 + 2 * i], b = v[2 + 2 * i]; if (!(a >= 1 && a <= n && b >= 1 && b <= n)) throw new Error('Cần n − 1 cạnh.'); e.push([a, b]); } const p = [...Array(n + 1).keys()], f = (x) => p[x] === x ? x : (p[x] = f(p[x])); for (const [a, b] of e) { if (f(a) === f(b)) throw new Error('Các cạnh phải tạo thành cây.'); p[f(a)] = f(b); } return { n, e }; },
  random() { const n = U.rnd(6, 10), e = []; for (let v = 2; v <= n; v++) e.push(`${U.rnd(1, v - 1)} ${v}`); return n + '\n' + e.join('\n'); },
  run({ n, e }) {
    const F = [], adj = Array.from({ length: n + 1 }, () => []); for (const [a, b] of e) { adj[a].push(b); adj[b].push(a); }
    const vao = Array(n + 1).fill(null), ra = Array(n + 1).fill(null), cha = Array(n + 1).fill(0), it = Array(n + 1).fill(0), phang = []; let t = 0; const st = [1];
    const lab = [...Array(n).keys()].map((k) => String(k + 1));
    const view = (hl = {}, hp = {}) => [{ name: 'vao[u]', values: vao.slice(1).map((x) => x ?? ''), labels: lab, hl }, { name: 'ra[u]', values: ra.slice(1).map((x) => x ?? ''), labels: lab, hl }, { name: 'Ngăn xếp DFS', values: st.slice(), noIdx: true, hl: st.length ? { [st.length - 1]: 'mark' } : {} }, { name: 'Mảng phẳng (vị trí t → đỉnh)', values: phang.slice(), labels: phang.map((_, k) => 't=' + (k + 1)), hl: hp }];
    vao[1] = ++t; phang.push(1);
    F.push({ at: 'khoi', msg: 'Vào gốc 1: vao[1] = 1.', arrays: view({ 0: 'cur' }), vars: { t }, fig: true });
    let nf = 0;
    while (st.length) {
      const u = st[st.length - 1];
      if (it[u] < adj[u].length) { const v = adj[u][it[u]++]; if (v === cha[u]) continue; cha[v] = u; vao[v] = ++t; phang.push(v); st.push(v);
        F.push({ at: 'vao', msg: `Từ ${u} đi xuống con ${v}: vao[${v}] = ${t}.`, arrays: view({ [v - 1]: 'cur' }), vars: { t }, ask: { q: `vao[${v}] = ?`, choices: U.near(t), answer: t }, fig: nf++ < 5 }); }
      else { ra[u] = t; st.pop(); F.push({ at: 'ra', msg: `Rời ${u}: ra[${u}] = ${t}. Cây con của ${u} là đoạn [${vao[u]}, ${ra[u]}].`, arrays: view({ [u - 1]: 'ok' }, Object.fromEntries([...Array(ra[u] - vao[u] + 1).keys()].map((k) => [vao[u] - 1 + k, 'ok']))), vars: { t }, ask: { q: `ra[${u}] = ?`, choices: U.near(t), answer: t }, fig: nf++ < 8 }); }
    }
    const big = [...Array(n).keys()].map((k) => k + 1).sort((a, b) => (ra[b] - vao[b]) - (ra[a] - vao[a]))[1] || 1;
    F.push({ at: 'doan', msg: `Ví dụ: cây con của ${big} là các vị trí ${vao[big]}..${ra[big]} trên mảng phẳng: ${phang.slice(vao[big] - 1, ra[big]).join(', ')}.`, arrays: view({}, Object.fromEntries([...Array(ra[big] - vao[big] + 1).keys()].map((k) => [vao[big] - 1 + k, 'ok']))), vars: {}, out: lab.map((x) => `${vao[+x]} ${ra[+x]}`).join('\n'), fig: true });
    return F;
  },
};
