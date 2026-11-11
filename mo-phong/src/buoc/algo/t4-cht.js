const ALGO = {
  id: 't4-cht', title: 'Bao lồi (convex hull trick) với deque',
  desc: 'Mỗi j cho một đường thẳng y = f[j]·s + dp[j]. dp[i] = giá trị nhỏ nhất của các đường tại s = s[i]. Hệ số góc giảm dần, điểm hỏi tăng dần, nên giữ các đường trong deque: <b>hỏi</b> thì bỏ đầu khi đường thứ hai không cao hơn; <b>thêm</b> thì bỏ cuối khi đường cuối bị kẹp (không bao giờ thấp nhất).',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-4-convex-hull-trick/',
  code: {
    py: ['dq = deque([(x, 0)])   # đường (hệ số góc, tung độ gốc)   ⟦khoi⟧', 'for i in range(n):', '    while len(dq) >= 2 and at(dq[1], s[i]) <= at(dq[0], s[i]): dq.popleft()   ⟦bodau⟧', '    dp = at(dq[0], s[i])   ⟦hoi⟧', '    moi = (f[i], dp)', '    while len(dq) >= 2 and thua(dq[-2], dq[-1], moi): dq.pop()   ⟦bocuoi⟧', '    dq.append(moi)   ⟦them⟧', 'print(dp)   ⟦in⟧'],
    cpp: ['dq.push_back({x, 0});   // đường (hệ số góc, tung độ gốc)   ⟦khoi⟧', 'for (int i = 0; i < n; i++) {', '    while (dq.size() >= 2 && dq[1].at(s[i]) <= dq[0].at(s[i])) dq.pop_front();   ⟦bodau⟧', '    dp = dq[0].at(s[i]);   ⟦hoi⟧', '    Line moi = {f[i], dp};', '    while (dq.size() >= 2 && thua(dq[dq.size()-2], dq.back(), moi)) dq.pop_back();   ⟦bocuoi⟧', '    dq.push_back(moi);   ⟦them⟧', '}', 'cout << dp;   ⟦in⟧'],
  },
  samples: [['5 100\n20 30 30 50 90\n90 60 20 10 1', 'ví dụ trong bài'], ['4 10\n1 2 3 4\n9 5 2 1', 'bốn màn'], ['3 5\n10 20 30\n4 3 1', 'diệt hết']],
  parse(t) { const v = U.ints(t, 2), [n, x] = v; if (n < 1 || n > 8) throw new Error('Hãy chọn 1 ≤ n ≤ 8.'); const s = v.slice(2, 2 + n), f = v.slice(2 + n, 2 + 2 * n); if (f.length < n) throw new Error('Thiếu số.'); for (let i = 1; i < n; i++) if (s[i] < s[i - 1] || f[i] > f[i - 1]) throw new Error('Cần s không giảm và f không tăng.'); if (f[0] > x) throw new Error('Cần f[1] ≤ x.'); return { n, x, s, f }; },
  random() { const n = U.rnd(4, 7), s = Array.from({ length: n }, () => U.rnd(1, 30)).sort((a, b) => a - b), f = Array.from({ length: n }, () => U.rnd(1, 20)).sort((a, b) => b - a); return `${n} ${U.rnd(f[0], 25)}\n${s.join(' ')}\n${f.join(' ')}`; },
  run({ n, x, s, f }) {
    const F = [], at = (l, X) => l[0] * X + l[1], thua = (a, b, c) => (c[1] - a[1]) * (a[0] - b[0]) <= (b[1] - a[1]) * (a[0] - c[0]);
    let dq = [[x, 0]], dp = 0; const dps = [];
    const ln = (l) => `${l[0]}s${l[1] >= 0 ? '+' : '−'}${Math.abs(l[1])}`;
    const view = (hl = {}, X) => [{ name: 'Deque các đường (đầu → cuối)', values: dq.map(ln), noIdx: true, hl, width: 78 }, ...(X !== undefined ? [{ name: `Giá trị mỗi đường tại s = ${X}`, values: dq.map((l) => at(l, X)), noIdx: true, hl, width: 78 }] : []), { name: 'dp của các màn đã tính', values: dps.slice(), noIdx: true, hl: {} }];
    F.push({ at: 'khoi', msg: `Đường của "chưa diệt quái nào": hệ số góc x = ${x}, tung độ gốc 0.`, arrays: view(), vars: {}, fig: true });
    let nf = 0;
    for (let i = 0; i < n; i++) {
      const bo = []; while (dq.length >= 2 && at(dq[1], s[i]) <= at(dq[0], s[i])) bo.push(dq.shift());
      dp = at(dq[0], s[i]); dps.push(dp);
      F.push({ at: bo.length ? 'bodau hoi' : 'hoi', msg: `Màn ${i + 1}, s = ${s[i]}: ${bo.length ? `bỏ ${bo.length} đường ở đầu (không còn thấp nhất); ` : ''}đường đầu cho dp = ${dp}.`, arrays: view({ 0: 'ok' }, s[i]), vars: { dp }, ask: { q: `dp của màn ${i + 1} = ?`, choices: U.near(dp), answer: dp }, fig: nf++ < 6 });
      const moi = [f[i], dp]; const bc = []; while (dq.length >= 2 && thua(dq[dq.length - 2], dq[dq.length - 1], moi)) bc.push(dq.pop()); dq.push(moi);
      F.push({ at: bc.length ? 'bocuoi them' : 'them', msg: `Thêm đường ${ln(moi)}${bc.length ? `; bỏ ${bc.length} đường ở cuối vì bị kẹp` : ''}.`, arrays: view({ [dq.length - 1]: 'mark' }), vars: { dp }, fig: nf++ < 6 });
    }
    F.push({ at: 'in', msg: `Đáp án dp của màn ${n} = ${dp}.`, arrays: view(), vars: {}, out: String(dp), fig: true });
    return F;
  },
};
