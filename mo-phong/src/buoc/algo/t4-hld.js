const ALGO = {
  id: 't4-hld', title: 'Phân rã nặng–nhẹ (HLD)',
  desc: 'Con nặng của u là con có cây con lớn nhất. Đi theo con nặng tạo thành <b>chuỗi</b>; mỗi chuỗi nhận các vị trí liên tiếp. Đường đi a–b: chừng nào a, b khác chuỗi, lấy đoạn từ đầu chuỗi tới đỉnh có <b>đầu chuỗi sâu hơn</b>, rồi nhảy lên cha của đầu chuỗi. Mỗi đường đi qua O(log n) chuỗi.',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-3-euler-hld/',
  code: {
    py: ['# sz, nang (con nặng) tính từ lá lên   ⟦sz⟧', '# mỗi chuỗi: đi theo nang, dau[u] = đầu chuỗi, vt[u] = vị trí liên tiếp   ⟦chuoi⟧', 'while dau[a] != dau[b]:', '    if sau[dau[a]] < sau[dau[b]]: a, b = b, a', '    lấy đoạn [vt[dau[a]], vt[a]]; a = cha[dau[a]]   ⟦nhay⟧', 'if sau[a] > sau[b]: a, b = b, a', 'lấy đoạn [vt[a], vt[b]]   # cùng chuỗi   ⟦cuoi⟧'],
    cpp: ['// sz, nang (con nặng) tính từ lá lên   ⟦sz⟧', '// mỗi chuỗi: đi theo nang, dau[u] = đầu chuỗi, vt[u] = vị trí liên tiếp   ⟦chuoi⟧', 'while (dau[a] != dau[b]) {', '    if (sau[dau[a]] < sau[dau[b]]) swap(a, b);', '    lấy đoạn [vt[dau[a]], vt[a]]; a = cha[dau[a]];   ⟦nhay⟧', '}', 'if (sau[a] > sau[b]) swap(a, b);', 'lấy đoạn [vt[a], vt[b]];   // cùng chuỗi   ⟦cuoi⟧'],
  },
  samples: [['10\n1 2\n1 3\n2 4\n2 5\n4 6\n4 7\n3 8\n8 9\n5 10\n7 9', 'ví dụ trong bài'], ['6\n1 2\n2 3\n3 4\n4 5\n5 6\n6 1', 'đường thẳng: một chuỗi'], ['7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n4 7', 'cây nhị phân']],
  parse(t) { const v = U.ints(t, 1), n = v[0]; if (n < 2 || n > 12) throw new Error('Hãy chọn 2 ≤ n ≤ 12.'); const e = []; for (let i = 0; i < n - 1; i++) { const a = v[1 + 2 * i], b = v[2 + 2 * i]; if (!(a >= 1 && a <= n && b >= 1 && b <= n)) throw new Error('Cần n − 1 cạnh, rồi một dòng a b.'); e.push([a, b]); } const qa = v[2 * n - 1], qb = v[2 * n]; if (!(qa >= 1 && qa <= n && qb >= 1 && qb <= n)) throw new Error('Dòng cuối: hai đỉnh a b của câu hỏi.'); const p = [...Array(n + 1).keys()], f = (x) => p[x] === x ? x : (p[x] = f(p[x])); for (const [a, b] of e) { if (f(a) === f(b)) throw new Error('Các cạnh phải tạo thành cây.'); p[f(a)] = f(b); } return { n, e, qa, qb }; },
  random() { const n = U.rnd(7, 11), e = []; for (let v = 2; v <= n; v++) e.push(`${U.rnd(Math.max(1, v - 3), v - 1)} ${v}`); return n + '\n' + e.join('\n') + `\n${U.rnd(1, n)} ${U.rnd(1, n)}`; },
  run({ n, e, qa, qb }) {
    const F = [], adj = Array.from({ length: n + 1 }, () => []); for (const [a, b] of e) { adj[a].push(b); adj[b].push(a); }
    const cha = Array(n + 1).fill(0), sau = Array(n + 1).fill(0), sz = Array(n + 1).fill(1), nang = Array(n + 1).fill(0), dau = Array(n + 1).fill(0), vt = Array(n + 1).fill(-1), bfs = [1];
    for (let k = 0; k < bfs.length; k++) for (const v of adj[bfs[k]]) if (v !== cha[bfs[k]]) { cha[v] = bfs[k]; sau[v] = sau[bfs[k]] + 1; bfs.push(v); }
    for (let k = n - 1; k > 0; k--) { const u = bfs[k], p = cha[u]; sz[p] += sz[u]; if (!nang[p] || sz[u] > sz[nang[p]]) nang[p] = u; }
    const lab = [...Array(n).keys()].map((k) => String(k + 1)), phang = Array(n).fill('');
    const view = (hv = {}, hp = {}) => [{ name: 'sz[u] (kích thước cây con)', values: sz.slice(1), labels: lab, hl: hv }, { name: 'nang[u] (con nặng; 0 nếu là lá)', values: nang.slice(1), labels: lab, hl: hv }, { name: 'dau[u] (đầu chuỗi)', values: dau.slice(1).map((x) => x || ''), labels: lab, hl: hv }, { name: 'Mảng phẳng: vị trí → đỉnh (mỗi chuỗi là một đoạn)', values: phang.slice(), labels: phang.map((_, k) => 'vt ' + k), hl: hp }];
    F.push({ at: 'sz', msg: 'Tính sz từ lá lên (thứ tự BFS ngược), chọn con nặng của mỗi đỉnh.', arrays: view(), vars: {}, fig: true });
    let t = 0; const st = [1], chuoi = [];
    while (st.length) { const h = st.pop(), ds = []; for (let u = h; u; u = nang[u]) { dau[u] = h; vt[u] = t; phang[t++] = u; ds.push(u); for (const v of adj[u]) if (v !== cha[u] && v !== nang[u]) st.push(v); } chuoi.push(ds);
      F.push({ at: 'chuoi', msg: `Chuỗi bắt đầu ở ${h}: ${ds.join(' → ')} nhận vị trí ${vt[h]}..${vt[ds[ds.length - 1]]}.`, arrays: view(Object.fromEntries(ds.map((u) => [u - 1, 'ok'])), Object.fromEntries(ds.map((u) => [vt[u], 'ok']))), vars: { 'số chuỗi': chuoi.length }, fig: chuoi.length <= 3 }); }
    let a = qa, b = qb; const doan = [];
    F.push({ at: 'nhay', msg: `Câu hỏi đường đi ${qa} – ${qb}.`, arrays: view({ [a - 1]: 'cur', [b - 1]: 'cur' }), vars: { a, b }, fig: true });
    while (dau[a] !== dau[b]) { if (sau[dau[a]] < sau[dau[b]]) [a, b] = [b, a]; const l = vt[dau[a]], r = vt[a]; doan.push([l, r]); const hp = {}; for (const [x, y] of doan) for (let k = x; k <= y; k++) hp[k] = 'ok';
      F.push({ at: 'nhay', msg: `Đầu chuỗi của ${a} (là ${dau[a]}) sâu hơn: lấy đoạn vị trí [${l}, ${r}], nhảy lên cha của ${dau[a]} là ${cha[dau[a]]}.`, arrays: view({ [a - 1]: 'cur', [b - 1]: 'cur' }, hp), vars: { a, b }, fig: true }); a = cha[dau[a]]; }
    if (sau[a] > sau[b]) [a, b] = [b, a]; doan.push([vt[a], vt[b]]); const hp = {}; for (const [x, y] of doan) for (let k = x; k <= y; k++) hp[k] = 'ok';
    F.push({ at: 'cuoi', msg: `${a} và ${b} cùng chuỗi: lấy đoạn [${vt[a]}, ${vt[b]}]. Đường đi gồm ${doan.length} đoạn liên tiếp.`, arrays: view({ [a - 1]: 'cur', [b - 1]: 'cur' }, hp), vars: { 'số đoạn': doan.length }, ask: { q: `Đường đi ${qa} – ${qb} được chia thành bao nhiêu đoạn?`, choices: U.near(doan.length), answer: doan.length }, out: String(doan.reduce((s, [x, y]) => s + y - x + 1, 0)), fig: true });
    return F;
  },
};
