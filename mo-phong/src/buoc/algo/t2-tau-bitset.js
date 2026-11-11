const ALGO = {
  id: 't2-tau-bitset', title: 'Bitset: Tàu ngầm cả hàng một lúc',
  desc: 'Mỗi hàng của tập "tàu có thể ở đây" là một bitset (bit j = cột j). Một ký tự biến cả hàng bằng vài phép bit: E là dịch trái (cột j sang j+1), W là dịch phải, S lấy hàng phía trên, N lấy hàng phía dưới, ? là OR của cả bốn. Sau đó <b>&amp; trong[i]</b> để loại ô đá và bit lọt ra ngoài bản đồ.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-5-bit-bitset/',
  code: {
    py: ['cu = trong   # cả bản đồ là một số nguyên lớn   ⟦khoi⟧', 'for ch in s:', '    b = cu << 1 (E) | cu >> 1 (W) | cu << W (S) | cu >> W (N)   ⟦dich⟧', '    cu = b & trong   ⟦and⟧', 'print(số bit 1 của cu)   ⟦in⟧'],
    cpp: ['cu[i] = trong[i];   ⟦khoi⟧', 'for (char ch : s) {', '    for (int i = 0; i < R; i++) {', '        b = (E: cu[i] << 1) | (W: cu[i] >> 1) | (S: cu[i-1]) | (N: cu[i+1]);   ⟦dich⟧', '        moi[i] = b & trong[i];   ⟦and⟧', '    }', '    swap(cu, moi);', '}', 'cout << tổng cu[i].count();   ⟦in⟧'],
  },
  samples: [['3 4 2\n....\n.#..\n....\nES', 'ví dụ trong bài'], ['3 5 2\n..#..\n.....\n#...#\nW?', 'có ký tự ?'], ['2 6 3\n......\n.#..#.\nEEN', 'dịch nhiều lần']],
  parse(t) {
    const L = t.trim().split(/\s+/), [R, C, M] = L.slice(0, 3).map(Number);
    if (!(R >= 1 && R <= 6 && C >= 1 && C <= 10 && M >= 0 && M <= 6)) throw new Error('Hãy chọn R ≤ 6, C ≤ 10, M ≤ 6.');
    const g = L.slice(3, 3 + R); if (g.length < R || g.some((r) => r.length !== C || /[^.#]/.test(r))) throw new Error(`Cần ${R} dòng, mỗi dòng ${C} ký tự '.' hoặc '#'.`);
    const s = (L[3 + R] || '').slice(0, M); if (s.length < M || /[^NSEW?]/.test(s)) throw new Error('Xâu hành trình gồm N, S, E, W, ?.');
    return { R, C, g, s };
  },
  random() { const R = U.rnd(2, 4), C = U.rnd(4, 8), M = U.rnd(2, 4); const g = Array.from({ length: R }, () => Array.from({ length: C }, () => Math.random() < .2 ? '#' : '.').join('')); return `${R} ${C} ${M}\n${g.join('\n')}\n${Array.from({ length: M }, () => U.pick('NSEW?'.split(''))).join('')}`; },
  run({ R, C, g, s }) {
    const F = [], trong = g.map((r) => [...r].map((c) => c === '.' ? 1 : 0));
    let cu = trong.map((r) => r.slice());
    const cnt = (m) => m.flat().reduce((x, y) => x + y, 0);
    const rows = (m, title, hlf) => m.map((r, i) => ({ name: `${title} hàng ${i}`, values: r.slice(), hl: Object.fromEntries(r.map((v, j) => [j, hlf ? hlf(i, j, v) : v ? 'mark' : 'dim'])), noIdx: i !== 0 }));
    F.push({ at: 'khoi', msg: `trong[i]: bit j bật nếu ô (i, j) là nước. Ban đầu cu = trong: ${cnt(cu)} ô.`, arrays: rows(cu, 'cu', (i, j, v) => g[i][j] === '#' ? 'bad' : v ? 'mark' : 'dim'), vars: { 'số ô': cnt(cu) }, fig: true });
    [...s].forEach((ch, k) => {
      const b = cu.map(() => Array(C).fill(0)), on = (c) => ch === c || ch === '?';
      for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) {
        if (on('E') && j > 0 && cu[i][j - 1]) b[i][j] = 1;
        if (on('W') && j + 1 < C && cu[i][j + 1]) b[i][j] = 1;
        if (on('S') && i > 0 && cu[i - 1][j]) b[i][j] = 1;
        if (on('N') && i + 1 < R && cu[i + 1][j]) b[i][j] = 1;
      }
      const ten = { E: 'cu[i] << 1 (mọi bit sang phải một cột)', W: 'cu[i] >> 1 (mọi bit sang trái một cột)', S: 'b[i] = cu[i−1] (cả hàng rơi xuống)', N: 'b[i] = cu[i+1] (cả hàng đi lên)', '?': 'OR của cả bốn cách dịch' }[ch];
      F.push({ at: 'dich', msg: `Ký tự ${k + 1} '${ch}': b = ${ten}. Chưa xét ô đá.`, arrays: rows(b, 'b', (i, j, v) => v ? (g[i][j] === '#' ? 'bad' : 'cur') : 'dim'), vars: { 'ký tự': ch }, fig: true });
      cu = b.map((r, i) => r.map((v, j) => v & trong[i][j]));
      F.push({ at: 'and', msg: `cu = b & trong: bit rơi vào ô đá (đỏ ở hình trước) bị xóa. Còn ${cnt(cu)} ô.`, arrays: rows(cu, 'cu', (i, j, v) => g[i][j] === '#' ? (b[i][j] ? 'bad' : 'dim') : v ? 'ok' : 'dim'), vars: { 'số ô': cnt(cu), 'ký tự': ch }, ask: { q: `Sau '${ch}' và phép & trong, còn bao nhiêu bit 1?`, choices: U.near(cnt(cu)), answer: cnt(cu) }, fig: true });
    });
    F.push({ at: 'in', msg: `Đếm bit 1: ${cnt(cu)}. Mỗi hàng chỉ tốn vài phép trên C/64 số 64 bit.`, arrays: rows(cu, 'cu'), vars: { 'số ô': cnt(cu) }, out: String(cnt(cu)), fig: true });
    return F;
  },
};
