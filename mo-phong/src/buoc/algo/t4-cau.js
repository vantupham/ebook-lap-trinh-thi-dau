const ALGO = {
  id: 't4-cau', title: 'Tìm cầu bằng vao/thap',
  desc: 'DFS (bằng ngăn xếp). vao[u] = thời điểm vào u. thap[u] = vao nhỏ nhất tới được từ cây con của u bằng các cạnh cây đi xuống và <b>một</b> cạnh ngược. Khi rời con u về cha p: thap[p] = min(thap[p], thap[u]); nếu thap[u] &gt; vao[p] thì cạnh p–u là <b>cầu</b> (cây con của u không có đường vòng lên trên p).',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-5-scc/',
  code: {
    py: ['vao[u] = thap[u] = t; t += 1   # khi vào u   ⟦vao⟧', 'cạnh u–v với v đã thăm (không phải cạnh tới cha): thap[u] = min(thap[u], vao[v])   ⟦nguoc⟧', 'khi rời u về cha p:', '    thap[p] = min(thap[p], thap[u])   ⟦ra⟧', '    if thap[u] > vao[p]: p–u là cầu   ⟦cau⟧'],
    cpp: ['vao[u] = thap[u] = t++;   // khi vào u   ⟦vao⟧', 'cạnh u–v với v đã thăm (không phải cạnh tới cha): thap[u] = min(thap[u], vao[v]);   ⟦nguoc⟧', 'khi rời u về cha p:', '    thap[p] = min(thap[p], thap[u]);   ⟦ra⟧', '    if (thap[u] > vao[p]) cầu++;   ⟦cau⟧'],
  },
  samples: [['7 8\n1 2\n2 3\n3 1\n3 4\n4 5\n5 6\n6 4\n5 7', 'ví dụ trong bài'], ['4 3\n1 2\n2 3\n3 4', 'đường thẳng: mọi cạnh là cầu'], ['4 4\n1 2\n2 3\n3 4\n4 1', 'một vòng: không có cầu']],
  parse(t) { const v = U.ints(t, 2), [n, m] = v; if (n < 1 || n > 10 || m < 0 || m > 14) throw new Error('Hãy chọn n ≤ 10, m ≤ 14.'); const e = []; for (let i = 0; i < m; i++) { const a = v[2 + 2 * i], b = v[3 + 2 * i]; if (!(a >= 1 && a <= n && b >= 1 && b <= n && a !== b)) throw new Error('Cạnh a b (a ≠ b) trong 1..n.'); e.push([a, b]); } return { n, e }; },
  random() { const n = U.rnd(5, 8), e = []; for (let v = 2; v <= n; v++) e.push(`${U.rnd(1, v - 1)} ${v}`); for (let k = 0; k < U.rnd(1, 3); k++) { const a = U.rnd(1, n); let b = U.rnd(1, n); if (b === a) b = a % n + 1; e.push(`${a} ${b}`); } return `${n} ${e.length}\n` + e.join('\n'); },
  run({ n, e }) {
    const F = [], adj = Array.from({ length: n + 1 }, () => []); e.forEach(([a, b], id) => { adj[a].push([b, id]); adj[b].push([a, id]); });
    const vao = Array(n + 1).fill(null), thap = Array(n + 1).fill(null), it = Array(n + 1).fill(0), pe = Array(n + 1).fill(-1), par = Array(n + 1).fill(0), cau = []; let t = 0;
    const lab = [...Array(n).keys()].map((k) => String(k + 1));
    const view = (hl = {}) => [{ name: 'vao[u]', values: vao.slice(1).map((x) => x ?? ''), labels: lab, hl }, { name: 'thap[u]', values: thap.slice(1).map((x) => x ?? ''), labels: lab, hl }, { name: 'Các cầu đã tìm', values: cau.slice(), noIdx: true, hl: {}, width: 52 }];
    let nf = 0;
    for (let s = 1; s <= n; s++) { if (vao[s] !== null) continue; vao[s] = thap[s] = t++; const st = [s];
      F.push({ at: 'vao', msg: `Bắt đầu DFS từ ${s}: vao = thap = ${vao[s]}.`, arrays: view({ [s - 1]: 'cur' }), vars: { t }, fig: nf++ < 1 });
      while (st.length) { const u = st[st.length - 1];
        if (it[u] < adj[u].length) { const [v, id] = adj[u][it[u]++]; if (id === pe[u]) continue;
          if (vao[v] === null) { vao[v] = thap[v] = t++; pe[v] = id; par[v] = u; st.push(v); }
          else if (vao[v] < thap[u]) { thap[u] = vao[v]; F.push({ at: 'nguoc', msg: `Cạnh ngược ${u}–${v}: thap[${u}] = vao[${v}] = ${vao[v]}.`, arrays: view({ [u - 1]: 'cur', [v - 1]: 'mark' }), vars: { t }, fig: nf++ < 6 }); } }
        else { st.pop(); const p = par[u]; if (p) { thap[p] = Math.min(thap[p], thap[u]); const la = thap[u] > vao[p]; if (la) cau.push(`${p}–${u}`);
            F.push({ at: la ? 'ra cau' : 'ra', msg: `Rời ${u} về ${p}: thap[${u}] = ${thap[u]} ${la ? '>' : '≤'} vao[${p}] = ${vao[p]}: ${la ? `cạnh ${p}–${u} là cầu.` : 'không phải cầu.'} thap[${p}] = ${thap[p]}.`, arrays: view({ [u - 1]: la ? 'bad' : 'ok', [p - 1]: 'cur' }), vars: { t }, ask: { q: `Cạnh ${p}–${u} có phải cầu không?`, choices: ['có', 'không'], answer: la ? 'có' : 'không' }, fig: nf++ < 10 }); } } } }
    F.push({ at: 'cau', msg: `Có ${cau.length} cầu: ${cau.join(', ') || '(không có)'}.`, arrays: view(), vars: {}, out: String(cau.length), fig: true });
    return F;
  },
};
