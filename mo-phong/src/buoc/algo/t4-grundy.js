const ALGO = {
  id: 't4-grundy', title: 'Số Grundy và tổng các trò chơi',
  desc: 'g(i) = <b>mex</b> của tập {g(i − p) : p là nước bốc, p ≤ i}; mex là số tự nhiên nhỏ nhất không có trong tập. g = 0 là thua. Chơi nhiều đống cùng lúc (mỗi lượt chọn một đống): người đi trước thắng khi và chỉ khi <b>XOR</b> các g của các đống khác 0 (định lý Sprague–Grundy).',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-9-tro-choi/',
  code: {
    py: ['g[0] = 0   ⟦khoi⟧', 'for i in range(1, max(a) + 1):', '    tap = {g[i - x] for x in p if x <= i}   ⟦tap⟧', '    g[i] = mex(tap)   ⟦mex⟧', 'x = 0', 'for v in a: x ^= g[v]   ⟦xor⟧', 'print("THẮNG" if x else "THUA")   ⟦in⟧'],
    cpp: ['g[0] = 0;   ⟦khoi⟧', 'for (int i = 1; i <= maxa; i++) {', '    set<int> tap; for (int x : p) if (x <= i) tap.insert(g[i - x]);   ⟦tap⟧', '    g[i] = mex(tap);   ⟦mex⟧', '}', 'int x = 0; for (int v : a) x ^= g[v];   ⟦xor⟧', 'cout << (x ? "THẮNG" : "THUA");   ⟦in⟧'],
  },
  samples: [['2 3\n5 7\n1 3 4', 'ví dụ trong bài'], ['3 1\n4 6 9\n1', 'chỉ bốc 1: g là chẵn lẻ'], ['2 2\n6 6\n1 2', 'hai đống giống nhau: thua']],
  parse(t) { const v = U.ints(t, 4), [m, k] = v, a = v.slice(2, 2 + m), p = v.slice(2 + m, 2 + m + k); if (!(m >= 1 && m <= 4 && k >= 1 && k <= 4) || p.length < k) throw new Error('Hãy chọn 1 ≤ m ≤ 4 đống, 1 ≤ k ≤ 4 luật, đủ số.'); if (a.some((x) => x < 0 || x > 12)) throw new Error('Mỗi đống 0..12.'); if (p.some((x) => x < 1 || x > 9) || new Set(p).size < k) throw new Error('Các nước bốc khác nhau, trong 1..9.'); return { a, p }; },
  random() { const m = U.rnd(2, 3), k = U.rnd(2, 3), p = U.shuffle([1, 2, 3, 4, 5]).slice(0, k).sort((x, y) => x - y); return `${m} ${k}\n${Array.from({ length: m }, () => U.rnd(2, 10)).join(' ')}\n${p.join(' ')}`; },
  run({ a, p }) {
    const F = [], M = Math.max(...a), g = Array(M + 1).fill(''), lab = [...Array(M + 1).keys()].map(String);
    g[0] = 0;
    const view = (hl = {}, extra = []) => [{ name: 'g(i)', values: g.slice(), labels: lab, hl }, ...extra];
    F.push({ at: 'khoi', msg: `g(0) = 0: không đi được. Luật bốc {${p.join(', ')}}, các đống: ${a.join(', ')}.`, arrays: view({ 0: 'bad' }), vars: {} });
    let nf = 0;
    for (let i = 1; i <= M; i++) {
      const hl = { [i]: 'cur' }, tap = new Set(); for (const x of p) if (x <= i) { tap.add(g[i - x]); hl[i - x] = 'mark'; }
      let mex = 0; while (tap.has(mex)) mex++; g[i] = mex;
      F.push({ at: 'tap mex', msg: `i = ${i}: tập {${[...tap].sort((x, y) => x - y).join(', ')}}, số nhỏ nhất không có trong tập là ${mex}.`, arrays: view(hl), vars: { i, 'g(i)': mex }, ask: { q: `g(${i}) = ?`, choices: U.near(mex), answer: mex }, fig: i >= 3 && i <= 5 && nf++ < 3 });
    }
    let x = 0; for (const v of a) x ^= g[v];
    const hl = {}; a.forEach((v) => (hl[v] = 'ok'));
    F.push({ at: 'xor in', msg: `XOR = ${a.map((v) => `g(${v})`).join(' ⊕ ')} = ${a.map((v) => g[v]).join(' ⊕ ')} = ${x}: người đi trước ${x ? 'THẮNG' : 'THUA'}.`, arrays: view(hl, [{ name: 'Đống', values: a.slice(), hl: {} }, { name: 'g của đống', values: a.map((v) => g[v]), hl: {} }]), vars: { XOR: x }, ask: { q: 'Người đi trước thắng hay thua?', choices: ['THẮNG', 'THUA'], answer: x ? 'THẮNG' : 'THUA' }, out: x ? 'THẮNG' : 'THUA', fig: true });
    return F;
  },
};
