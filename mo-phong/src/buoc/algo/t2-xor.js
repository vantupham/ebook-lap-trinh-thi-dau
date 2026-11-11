const ALGO = {
  id: 't2-xor', title: 'XOR: tìm số lẻ loi',
  desc: 'XOR từng bit: 1 khi hai bit khác nhau. Vì x ^ x = 0 và x ^ 0 = x, lại không phụ thuộc thứ tự, XOR cả dãy thì mỗi cặp số giống nhau tự triệt tiêu, chỉ còn số lẻ loi. Theo dõi từng cột bit: mỗi cột của x chỉ là "số bit 1 trong cột đó là chẵn hay lẻ".',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-5-bit-bitset/',
  code: {
    py: ['x = 0   ⟦khoi⟧', 'for a in day:', '    x ^= a   ⟦xor⟧', 'print(x)   ⟦in⟧'],
    cpp: ['long long x = 0;   ⟦khoi⟧', 'for (int i = 0; i < n; i++) {', '    cin >> a; x ^= a;   ⟦xor⟧', '}', "cout << x << '\\n';   ⟦in⟧"],
  },
  samples: [['5\n7 3 7 9 3', 'ví dụ trong bài'], ['7\n12 10 6 12 6 10 5', 'bảy số'], ['1\n42', 'một số']],
  parse(t) { const v = U.ints(t, 2), n = v[0]; if (n < 1 || n > 11 || n % 2 === 0) throw new Error('Hãy chọn n lẻ, 1 ≤ n ≤ 11.'); const a = v.slice(1, n + 1); if (a.length < n || a.some((x) => x < 0 || x > 255)) throw new Error('Cần n số trong khoảng 0..255.'); return { a }; },
  random() { const k = U.rnd(1, 4), vals = Array.from({ length: k }, () => U.rnd(1, 63)), a = [...vals, ...vals, U.rnd(1, 63)]; U.shuffle(a); return a.length + '\n' + a.join(' '); },
  run({ a }) {
    const F = [], B = 8, bits = (v) => [...Array(B).keys()].map((k) => (v >> (B - 1 - k)) & 1), lab = [...Array(B).keys()].map((k) => String(1 << (B - 1 - k)));
    let x = 0;
    const view = (cur, prev, hlA = {}) => { const ch = {}; if (prev !== undefined) bits(x).forEach((b, k) => { if (b !== bits(prev)[k]) ch[k] = 'cur'; }); const A = [{ name: 'Dãy số', values: a, hl: hlA, noIdx: true }]; if (cur !== undefined) A.push({ name: `a = ${cur} (nhị phân)`, values: bits(cur), labels: lab, hl: Object.fromEntries(bits(cur).map((b, k) => [k, b ? 'mark' : 'dim'])) }); A.push({ name: `x = ${x} (nhị phân; ô cam: bit vừa đổi)`, values: bits(x), labels: lab, hl: ch }); return A; };
    F.push({ at: 'khoi', msg: 'x = 0: mọi bit đều 0.', arrays: view(), vars: { x }, fig: true });
    a.forEach((v, i) => { const prev = x; x ^= v; const done = Object.fromEntries([...Array(i).keys()].map((k) => [k, 'done']));
      F.push({ at: 'xor', msg: `x = ${prev} ^ ${v} = ${x}: bit nào của a là 1 thì bit đó của x bị lật.`, arrays: view(v, prev, { ...done, [i]: 'cur' }), vars: { x }, ask: { q: `${prev} ^ ${v} bằng bao nhiêu?`, choices: U.near(x, [prev + v]), answer: x }, fig: i < 4 }); });
    F.push({ at: 'in', msg: `Mỗi cặp số giống nhau lật cùng các bit hai lần, nên tự triệt tiêu. Còn lại số lẻ loi: ${x}.`, arrays: view(), vars: { x }, out: String(x), fig: true });
    return F;
  },
};
