const ALGO = {
  id: 't4-thang-thua', title: 'Trạng thái thắng / thua',
  desc: 'thang[i] cho biết người <b>sắp đi</b> khi còn i que có thắng không. thang[0] = sai (không đi được là thua). Trạng thái i <b>thắng</b> nếu có ít nhất một nước bốc p ≤ i đưa đối thủ tới trạng thái <b>thua</b>; ngược lại i thua.',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-9-tro-choi/',
  code: {
    py: ['thang = [False] * (n + 1)   ⟦khoi⟧', 'for i in range(1, n + 1):', '    for x in p:', '        if x <= i and not thang[i - x]:   ⟦xet⟧', '            thang[i] = True; break   ⟦w⟧', '    # không nước nào dẫn tới L: i là L   ⟦l⟧'],
    cpp: ['vector<char> thang(n + 1, 0);   ⟦khoi⟧', 'for (int i = 1; i <= n; i++)', '    for (int x : p)', '        if (x <= i && !thang[i - x]) {   ⟦xet⟧', '            thang[i] = 1; break; }   ⟦w⟧', '    // không nước nào dẫn tới L: i là L   ⟦l⟧'],
  },
  samples: [['10 3\n1 3 4', 'ví dụ trong bài'], ['12 2\n2 3', 'luật {2, 3}'], ['10 2\n1 2', 'luật {1, 2}: chu kỳ 3']],
  parse(t) { const v = U.ints(t, 3), [n, k] = v, p = v.slice(2, 2 + k); if (!(n >= 1 && n <= 16 && k >= 1 && k <= 4) || p.length < k) throw new Error('Hãy chọn n ≤ 16, 1 ≤ k ≤ 4 và đủ k số.'); if (p.some((x) => x < 1 || x > 9) || new Set(p).size < k) throw new Error('Các nước bốc khác nhau, trong 1..9.'); return { n, p }; },
  random() { const k = U.rnd(2, 3), p = U.shuffle([1, 2, 3, 4, 5, 6]).slice(0, k).sort((a, b) => a - b); return `${U.rnd(9, 14)} ${k}\n${p.join(' ')}`; },
  run({ n, p }) {
    const F = [], th = Array(n + 1).fill(null), lab = [...Array(n + 1).keys()].map(String), WL = (x) => (x === null ? '' : x ? 'W' : 'L');
    th[0] = false;
    const view = (hl = {}) => [{ name: 'Trạng thái (số que còn lại)', values: th.map(WL), labels: lab, hl }];
    F.push({ at: 'khoi', msg: `0 que: người sắp đi không bốc được, thua: L. Luật bốc: {${p.join(', ')}}.`, arrays: view({ 0: 'bad' }), vars: {}, fig: true });
    let nf = 0;
    for (let i = 1; i <= n; i++) {
      const hl = { [i]: 'cur' }, moves = p.filter((x) => x <= i); let win = null;
      for (const x of moves) { hl[i - x] = th[i - x] ? 'mark' : 'ok'; if (!th[i - x] && win === null) win = x; }
      th[i] = win !== null;
      const ds = moves.length ? moves.map((x) => `bốc ${x} → ${i - x} (${WL(th[i - x])})`).join(', ') : 'không bốc được';
      F.push({ at: win !== null ? 'xet w' : 'l', msg: `i = ${i}: ${ds}. ${win !== null ? `Bốc ${win} để đối thủ vào trạng thái L: i = ${i} là W.` : `Không nước nào dẫn tới L: i = ${i} là L.`}`, arrays: view(hl), vars: { i }, ask: { q: `${i} que là W hay L?`, choices: ['W', 'L'], answer: WL(th[i]) }, fig: (i >= 1 && i <= 3) || (i === 7 && nf++ === 0) });
    }
    F.push({ at: 'l', msg: `Kết quả cho i = 1..${n}.`, arrays: view(), vars: {}, out: th.slice(1).map(WL).join(''), fig: true });
    return F;
  },
};
