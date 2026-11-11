const ALGO = {
  id: 't2-dsu', title: 'DSU: gộp nhóm và hỏi cùng nhóm',
  desc: 'Mỗi người lưu cha[u]: người u báo cáo lên. Trưởng nhóm là người có cha[u] = u. <b>tim(u)</b> đi theo cha tới trưởng nhóm, đồng thời nén đường (nhảy cóc cha[u] = cha[cha[u]]). <b>gop(u, v)</b> nối trưởng nhóm nhỏ vào trưởng nhóm lớn. Kích thước chỉ đúng tại trưởng nhóm.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-8-dsu-do-thi-ham/',
  code: {
    py: ['def tim(u):', '    while cha[u] != u:   ⟦tim⟧', '        cha[u] = cha[cha[u]]; u = cha[u]   ⟦tim⟧', '    return u', 'def gop(u, v):', '    u, v = tim(u), tim(v)', '    if u == v: return   ⟦cung⟧', '    if sz[u] < sz[v]: u, v = v, u', '    cha[v] = u; sz[u] += sz[v]   ⟦gop⟧', '# 2 u v: in YES nếu tim(u) == tim(v)   ⟦hoi⟧', '# 3 u: in sz[tim(u)]   ⟦co⟧'],
    cpp: ['int tim(int u) {', '    while (cha[u] != u) { cha[u] = cha[cha[u]]; u = cha[u]; }   ⟦tim⟧', '    return u;', '}', 'void gop(int u, int v) {', '    u = tim(u); v = tim(v);', '    if (u == v) return;   ⟦cung⟧', '    if (sz[u] < sz[v]) swap(u, v);', '    cha[v] = u; sz[u] += sz[v];   ⟦gop⟧', '}', '// 2 u v: tim(u) == tim(v) ? "YES" : "NO"   ⟦hoi⟧', '// 3 u: sz[tim(u)]   ⟦co⟧'],
  },
  samples: [['5 6\n1 1 2\n2 1 3\n1 2 3\n2 1 3\n3 3\n3 5', 'ví dụ trong bài'], ['8 9\n1 1 2\n1 3 4\n1 1 3\n1 5 6\n1 7 8\n1 5 7\n1 6 2\n2 8 4\n3 1', 'hai nhóm lớn gộp lại'], ['4 4\n1 1 2\n1 2 1\n3 1\n2 3 4', 'gộp hai người đã cùng nhóm']],
  parse(t) {
    const v = U.ints(t, 2), [n, q] = v; if (n < 1 || n > 12 || q < 1 || q > 14) throw new Error('Hãy chọn n ≤ 12, q ≤ 14.');
    const ops = []; let p = 2; for (let i = 0; i < q; i++) { const k = v[p]; if (k === 1 || k === 2) { ops.push([k, v[p + 1], v[p + 2]]); p += 3; } else if (k === 3) { ops.push([3, v[p + 1]]); p += 2; } else throw new Error('Mỗi thao tác bắt đầu bằng 1, 2 hoặc 3.'); if (ops[i].slice(1).some((x) => !(x >= 1 && x <= n))) throw new Error('Người phải trong 1..n.'); }
    return { n, ops };
  },
  random() { const n = U.rnd(6, 9), q = U.rnd(7, 11), o = []; for (let i = 0; i < q; i++) { const k = i < 3 ? 1 : U.pick([1, 1, 2, 3]); o.push(k === 3 ? `3 ${U.rnd(1, n)}` : `${k} ${U.rnd(1, n)} ${U.rnd(1, n)}`); } return `${n} ${q}\n` + o.join('\n'); },
  run({ n, ops }) {
    const F = [], cha = [...Array(n + 1).keys()], sz = Array(n + 1).fill(1), out = [];
    const view = (hl = {}, ptr = {}) => [{ name: 'cha[u] (số dưới: u; ô xanh lá: trưởng nhóm)', values: cha.slice(1), labels: [...Array(n).keys()].map((k) => String(k + 1)), hl: Object.assign(Object.fromEntries([...Array(n).keys()].map((k) => [k, cha[k + 1] === k + 1 ? 'ok' : ''])), hl), ptr },
      { name: 'sz[u] (chỉ có nghĩa tại trưởng nhóm)', values: sz.slice(1).map((s, k) => cha[k + 1] === k + 1 ? s : '·'), labels: [...Array(n).keys()].map((k) => String(k + 1)), hl: {} }];
    const tim = (u, ten) => { const path = [u]; while (cha[u] !== u) { cha[u] = cha[cha[u]]; u = cha[u]; path.push(u); } return { r: u, path }; };
    F.push({ at: 'tim', msg: `Ban đầu mỗi người là trưởng nhóm của chính mình: cha[u] = u.`, arrays: view(), vars: { 'số nhóm': n }, fig: true });
    let nhom = n, nf = 0; const fg = () => nf++ < 9;
    for (const op of ops) {
      if (op[0] === 1) {
        const [, u, v] = op, a = tim(u), b = tim(v), hl = Object.fromEntries([...a.path, ...b.path].map((x) => [x - 1, 'cur']));
        if (a.r === b.r) { F.push({ at: 'cung', msg: `Gộp ${u} và ${v}: tim(${u}) = tim(${v}) = ${a.r}, đã cùng nhóm, không làm gì.`, arrays: view(hl, { u: u - 1, v: v - 1 }), vars: { 'số nhóm': nhom }, fig: fg() }); continue; }
        let r1 = a.r, r2 = b.r; if (sz[r1] < sz[r2]) [r1, r2] = [r2, r1];
        F.push({ at: 'tim', msg: `Gộp ${u} và ${v}: đường đi lên trưởng nhóm ${a.path.join(' → ')} và ${b.path.join(' → ')}.`, arrays: view(hl, { u: u - 1, v: v - 1 }), vars: { 'số nhóm': nhom }, ask: { q: `Gộp ${u} và ${v}: ai làm trưởng nhóm mới?`, choices: [...new Set([r1, r2, u, v])].sort((x, y) => x - y), answer: r1 }, fig: fg() });
        cha[r2] = r1; sz[r1] += sz[r2]; nhom--;
        F.push({ at: 'gop', msg: `Nhóm của ${r2} (${sz[r2]} người) nhỏ hơn hoặc bằng nhóm của ${r1}: đặt cha[${r2}] = ${r1}. Nhóm mới có ${sz[r1]} người.`, arrays: view({ [r2 - 1]: 'mark', [r1 - 1]: 'ok' }), vars: { 'số nhóm': nhom }, fig: fg() });
      } else if (op[0] === 2) {
        const [, u, v] = op, a = tim(u), b = tim(v), kq = a.r === b.r ? 'YES' : 'NO'; out.push(kq);
        F.push({ at: 'tim hoi', msg: `Hỏi ${u} và ${v}: tim(${u}) = ${a.r}, tim(${v}) = ${b.r}: ${kq}.`, arrays: view(Object.fromEntries([...a.path, ...b.path].map((x) => [x - 1, 'cur'])), { u: u - 1, v: v - 1 }), vars: { 'số nhóm': nhom }, ask: { q: `${u} và ${v} có cùng nhóm không?`, choices: ['YES', 'NO'], answer: kq }, out: out.join('\n'), fig: fg() });
      } else {
        const [, u] = op, a = tim(u); out.push(sz[a.r]);
        F.push({ at: 'tim co', msg: `Hỏi cỡ nhóm của ${u}: trưởng nhóm là ${a.r}, sz[${a.r}] = ${sz[a.r]}.`, arrays: view(Object.fromEntries(a.path.map((x) => [x - 1, 'cur'])), { u: u - 1 }), vars: { 'số nhóm': nhom }, ask: { q: `Nhóm của ${u} có bao nhiêu người?`, choices: U.near(sz[a.r]), answer: sz[a.r] }, out: out.join('\n'), fig: fg() });
      }
    }
    F.push({ at: 'hoi', msg: `Hết thao tác. Còn ${nhom} nhóm.`, arrays: view(), vars: { 'số nhóm': nhom }, out: out.join('\n') });
    return F;
  },
};
