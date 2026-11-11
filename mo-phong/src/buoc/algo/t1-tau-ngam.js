const ALGO = {
  id: 't1-tau-ngam', title: 'Gộp trạng thái: Tàu ngầm',
  desc: 'Không thử từng đường đi (4^M đường), mà giữ <b>tập các ô tàu có thể đang ở</b>. Mỗi ký tự: từ mọi ô trong tập, đi theo hướng (hoặc cả 4 hướng nếu là ?), giữ những ô đích là nước. Ghi vào bảng mới, không sửa tại chỗ.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-7-vet-can-quay-lui/',
  code: {
    py: ['co = [[g[i][j] == "." for j in range(C)] for i in range(R)]   ⟦khoi⟧', 'for ch in s:   ⟦ky_tu⟧', '    moi = [[False] * C for _ in range(R)]   ⟦ky_tu⟧', '    for i, j trong tập co:   ⟦di⟧', '        với mỗi hướng (di, dj) của ch:   ⟦di⟧', '            nếu (i+di, j+dj) là nước: moi[i+di][j+dj] = True   ⟦di⟧', '    co = moi   ⟦xong⟧', 'print(số ô True trong co)   ⟦in⟧'],
    cpp: ['co[i][j] = (g[i][j] == \'.\');   ⟦khoi⟧', 'for (char ch : s) {   ⟦ky_tu⟧', '    moi = toàn 0;   ⟦ky_tu⟧', '    với mỗi ô (i, j) có co[i][j] = 1, mỗi hướng hợp với ch:   ⟦di⟧', '        nếu ô đích là nước: moi[ô đích] = 1;   ⟦di⟧', '    co = moi;   ⟦xong⟧', '}', 'cout << số ô bằng 1;   ⟦in⟧'],
  },
  samples: [['3 4 2\n....\n.#..\n....\nES', 'ví dụ trong bài'], ['4 5 3\n.....\n.#.#.\n.....\n..#..\nN?W', 'có ký tự ?'], ['3 3 2\n...\n...\n...\n??', 'toàn ?']],
  parse(t) {
    const L = t.trim().split(/\s+/), [R, C, M] = L.slice(0, 3).map(Number);
    if (!(R >= 1 && R <= 8 && C >= 1 && C <= 10 && M >= 0 && M <= 8)) throw new Error('Hãy chọn R ≤ 8, C ≤ 10, M ≤ 8.');
    const g = L.slice(3, 3 + R); if (g.length < R || g.some((r) => r.length !== C || /[^.#]/.test(r))) throw new Error(`Cần ${R} dòng, mỗi dòng ${C} ký tự '.' hoặc '#'.`);
    const s = (L[3 + R] || '').slice(0, M); if (s.length < M || /[^NSEW?]/.test(s)) throw new Error('Xâu hành trình gồm N, S, E, W, ?.');
    return { R, C, g, s };
  },
  random() { const R = U.rnd(3, 5), C = U.rnd(4, 7), M = U.rnd(2, 5); const g = Array.from({ length: R }, () => Array.from({ length: C }, () => Math.random() < .2 ? '#' : '.').join('')); return `${R} ${C} ${M}\n${g.join('\n')}\n${Array.from({ length: M }, () => U.pick('NSEW?'.split(''))).join('')}`; },
  run({ R, C, g, s }) {
    const F = [], D = { E: [0, 1], W: [0, -1], S: [1, 0], N: [-1, 0] };
    let co = g.map((r) => [...r].map((c) => c === '.'));
    const grid = (set, hlNew) => [{ name: 'Bản đồ (✓: tàu có thể đang ở đây)', values: g.flatMap((r, i) => [...r].map((c, j) => c === '#' ? '#' : set[i][j] ? '✓' : '')), noIdx: true, cols: C, hl: Object.fromEntries(g.flatMap((r, i) => [...r].map((c, j) => [i * C + j, c === '#' ? 'dim' : set[i][j] ? (hlNew ? 'ok' : 'mark') : '']))) }];
    const cnt = () => co.flat().filter(Boolean).length;
    F.push({ at: 'khoi', msg: `Trước hành trình, tàu có thể ở bất kỳ ô nước nào: ${cnt()} ô.`, arrays: grid(co), vars: { 'số ô': cnt() }, fig: true });
    [...s].forEach((ch, k) => {
      const dirs = ch === '?' ? Object.values(D) : [D[ch]], moi = co.map((r) => r.map(() => false));
      for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) if (co[i][j]) for (const [di, dj] of dirs) { const a = i + di, b = j + dj; if (a >= 0 && a < R && b >= 0 && b < C && g[a][b] === '.') moi[a][b] = true; }
      co = moi;
      const ten = { E: 'đông (sang phải)', W: 'tây (sang trái)', S: 'nam (xuống)', N: 'bắc (lên)', '?': 'bất kỳ hướng nào' }[ch];
      F.push({ at: 'ky_tu di xong', msg: `Ký tự ${k + 1} là '${ch}': mỗi ô ✓ đi về ${ten}; giữ những ô đích là nước. Còn ${cnt()} ô.`, arrays: grid(co, true), vars: { 'số ô': cnt(), 'ký tự': ch }, ask: { q: `Sau ký tự '${ch}', còn bao nhiêu ô có thể chứa tàu?`, choices: U.near(cnt()), answer: cnt() }, fig: true });
    });
    F.push({ at: 'in', msg: `Hết hành trình: tàu có thể đang ở ${cnt()} ô. Mỗi ký tự chỉ tốn R·C·4 phép, thay vì nhân 4 số đường đi.`, arrays: grid(co, true), vars: { 'số ô': cnt() }, out: String(cnt()), fig: true });
    return F;
  },
};
