const ALGO = {
  id: 't2-josephus', title: 'Hàng đợi: trò chơi vòng tròn',
  desc: 'Xếp mọi người vào <b>hàng đợi</b>. Lặp: lấy người đầu hàng, cho xếp lại <b>cuối hàng</b> (được bỏ qua); rồi lấy người đầu hàng tiếp theo ra và <b>loại</b>. Vòng tròn trở thành một hàng đợi quay vòng.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-1-ngan-xep-hang-doi/',
  code: {
    py: ['q = deque(range(1, n + 1))   ⟦khoi⟧', 'while q:', '    q.append(q.popleft())   ⟦qua⟧', '    loai.append(q.popleft())   ⟦loai⟧', 'print(*loai)   ⟦in⟧'],
    cpp: ['for (int i = 1; i <= n; i++) q.push(i);   ⟦khoi⟧', 'while (!q.empty()) {', '    q.push(q.front()); q.pop();   ⟦qua⟧', '    loai.push_back(q.front()); q.pop();   ⟦loai⟧', '}', 'in loai;   ⟦in⟧'],
  },
  samples: [['7', 'ví dụ trong bài'], ['1', 'một người'], ['10', 'mười người']],
  parse(t) { const [n] = U.ints(t, 1); if (n < 1 || n > 16) throw new Error('Hãy chọn 1 ≤ n ≤ 16.'); return { n }; },
  random() { return String(U.rnd(4, 12)); },
  run({ n }) {
    const F = [], q = [...Array(n).keys()].map((x) => x + 1), loai = [];
    const view = (hl = {}) => [{ name: 'Hàng đợi (đầu ← … ← cuối)', values: q.slice(), hl, ptr: q.length ? { 'đầu': 0, 'cuối': q.length - 1 } : {}, noIdx: true }, { name: 'Đã bị loại (theo thứ tự)', values: loai.slice(), hl: {}, noIdx: true }];
    F.push({ at: 'khoi', msg: `Xếp ${n} người vào hàng đợi.`, arrays: view(), vars: { 'còn lại': n }, fig: true });
    while (q.length) {
      const x = q.shift(); q.push(x);
      F.push({ at: 'qua', msg: `Người ${x} được bỏ qua: rời đầu hàng, xếp lại cuối hàng.`, arrays: view({ [q.length - 1]: 'mark' }), vars: { 'còn lại': q.length }, fig: loai.length < 2 });
      const y = q[0];
      const ch = [...new Set([y, ...q.slice(1, 3), x])].slice(0, 3).sort((a, b) => a - b);
      F.push({ at: 'loai', msg: `Người đầu hàng là ${y}: bị loại.`, arrays: view({ 0: 'bad' }), vars: { 'còn lại': q.length }, ask: { q: 'Ai bị loại tiếp theo?', choices: ch, answer: y }, fig: loai.length < 2 });
      q.shift(); loai.push(y);
    }
    F.push({ at: 'in', msg: `Thứ tự bị loại: ${loai.join(' ')}. Mỗi người vào/ra hàng đợi O(1) lần mỗi vòng.`, arrays: view(), vars: { 'còn lại': 0 }, out: loai.join(' '), fig: true });
    return F;
  },
};
