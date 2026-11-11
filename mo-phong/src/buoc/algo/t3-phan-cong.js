const ALGO = {
  id: 't3-phan-cong', title: 'QHĐ bitmask: Phân công việc',
  desc: 'dp[mask] = chi phí nhỏ nhất để giao các việc trong mask cho những người đầu tiên. Người tiếp theo là người thứ popcount(mask) (số việc đã giao). Từ dp[mask], thử giao việc j chưa có: dp[mask | 1&lt;&lt;j] = min(…, dp[mask] + c[người][j]).',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-7-qhd-bitmask/',
  code: {
    py: ['dp = [VC] * (1 << n); dp[0] = 0   ⟦khoi⟧', 'for mask in range(1 << n):', '    i = bin(mask).count("1")   # người tiếp theo   ⟦lay⟧', '    for j in range(n):', '        if not mask >> j & 1:', '            dp[mask | 1 << j] = min(dp[mask | 1 << j], dp[mask] + c[i][j])   ⟦cap⟧', 'print(dp[(1 << n) - 1])   ⟦in⟧'],
    cpp: ['dp.assign(1 << n, VC); dp[0] = 0;   ⟦khoi⟧', 'for (int mask = 0; mask < (1 << n); mask++) {', '    int i = __builtin_popcount(mask);   // người tiếp theo   ⟦lay⟧', '    for (int j = 0; j < n; j++)', '        if (!(mask >> j & 1))', '            dp[mask | 1 << j] = min(dp[mask | 1 << j], dp[mask] + c[i][j]);   ⟦cap⟧', '}', 'cout << dp[(1 << n) - 1];   ⟦in⟧'],
  },
  samples: [['3\n4 2 8\n4 3 7\n3 1 6', 'ví dụ trong bài'], ['4\n9 2 7 8\n6 4 3 7\n5 8 1 8\n7 6 9 4', 'bốn người'], ['2\n1 5\n5 1', 'hai người']],
  parse(t) { const v = U.ints(t, 1), n = v[0]; if (n < 1 || n > 4) throw new Error('Trang mô phỏng dùng 1 ≤ n ≤ 4.'); const c = []; for (let i = 0; i < n; i++) c.push(v.slice(1 + i * n, 1 + (i + 1) * n)); if (c.flat().length < n * n) throw new Error('Cần ma trận n × n.'); return { n, c }; },
  random() { const n = U.rnd(3, 4); return n + '\n' + Array.from({ length: n }, () => Array.from({ length: n }, () => U.rnd(1, 9)).join(' ')).join('\n'); },
  run({ n, c }) {
    const F = [], full = 1 << n, VC = Infinity, dp = Array(full).fill(VC); dp[0] = 0;
    const bin = (m) => m.toString(2).padStart(n, '0'), pc = (m) => m.toString(2).split('1').length - 1;
    const view = (hl = {}, row) => [{ name: 'Chi phí c[người][việc] (hàng: người, cột: việc)', values: c.flat(), cols: n, labels: c.flat().map((_, k) => k < n ? `việc ${k}` : ''), hl: row !== undefined ? Object.fromEntries([...Array(n).keys()].map((j) => [row * n + j, 'mark'])) : {} }, { name: 'dp[mask] (chữ dưới: mask = tập việc đã giao)', values: dp.map((x) => x === VC ? '∞' : x), labels: [...Array(full).keys()].map(bin), hl }];
    F.push({ at: 'khoi', msg: 'dp[0] = 0: chưa giao việc nào.', arrays: view({ 0: 'ok' }), vars: {}, fig: true });
    for (let mask = 0; mask < full - 1; mask++) {
      if (dp[mask] === VC) continue; const i = pc(mask), hl = { [mask]: 'cur' };
      for (let j = 0; j < n; j++) if (!(mask >> j & 1)) { const t = mask | 1 << j; if (dp[mask] + c[i][j] < dp[t]) { dp[t] = dp[mask] + c[i][j]; hl[t] = 'ok'; } else hl[t] = 'dim'; }
      F.push({ at: 'lay cap', msg: `dp[${bin(mask)}] = ${dp[mask]} là cuối cùng (mọi mask nhỏ hơn đã xét). Người ${i} nhận một việc chưa giao.`, arrays: view(hl, i), vars: { mask: bin(mask), 'người': i }, ask: { q: `dp[${bin(mask)}] bằng bao nhiêu?`, choices: U.near(dp[mask]), answer: dp[mask] }, fig: mask < 4 });
    }
    F.push({ at: 'in', msg: `Chi phí nhỏ nhất: dp[${bin(full - 1)}] = ${dp[full - 1]}.`, arrays: view({ [full - 1]: 'ok' }), vars: {}, out: String(dp[full - 1]), fig: true });
    return F;
  },
};
