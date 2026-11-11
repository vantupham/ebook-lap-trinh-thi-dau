const ALGO = {
  id: 't3-thang-may', title: 'QHĐ bitmask: Thang máy',
  desc: 'dp[mask] = cặp (số chuyến, kg của chuyến cuối) tốt nhất để chở xong đúng tập người mask. Duyệt mask tăng dần; từ dp[mask] thêm người i chưa có: vừa thì chất thêm vào chuyến cuối, không vừa thì mở chuyến mới. Giữ cặp nhỏ hơn (ít chuyến trước, nhẹ hơn sau).',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-7-qhd-bitmask/',
  code: {
    py: ['dp[0] = (1, 0)   ⟦khoi⟧', 'for mask in range(1 << n):', '    k, cur = dp[mask]   ⟦lay⟧', '    for i in range(n):', '        if mask >> i & 1: continue', '        moi = (k, cur + w[i]) if cur + w[i] <= x else (k + 1, w[i])', '        dp[mask | 1 << i] = min(dp[mask | 1 << i], moi)   ⟦cap⟧', 'print(dp[(1 << n) - 1][0])   ⟦in⟧'],
    cpp: ['dp[0] = {1, 0};   ⟦khoi⟧', 'for (int mask = 0; mask < (1 << n); mask++) {', '    auto [k, cur] = dp[mask];   ⟦lay⟧', '    for (int i = 0; i < n; i++) {', '        if (mask >> i & 1) continue;', '        auto moi = cur + w[i] <= x ? make_pair(k, cur + w[i]) : make_pair(k + 1, w[i]);', '        dp[mask | 1 << i] = min(dp[mask | 1 << i], moi);   ⟦cap⟧', '    }', '}', 'cout << dp[(1 << n) - 1].first;   ⟦in⟧'],
  },
  samples: [['4 10\n4 8 6 1', 'ví dụ trong bài'], ['3 10\n6 6 6', 'mỗi người một chuyến'], ['4 12\n5 7 3 9', 'bốn người khác']],
  parse(t) { const v = U.ints(t, 2), [n, x] = v; if (n < 1 || n > 4) throw new Error('Trang mô phỏng dùng 1 ≤ n ≤ 4 (16 tập con).'); const w = v.slice(2, 2 + n); if (w.length < n || w.some((y) => y < 1 || y > x)) throw new Error('Cần n cân nặng trong 1..x.'); return { n, x, w }; },
  random() { const n = U.rnd(3, 4), x = U.rnd(8, 14); return `${n} ${x}\n` + Array.from({ length: n }, () => U.rnd(1, x)).join(' '); },
  run({ n, x, w }) {
    const F = [], full = 1 << n, dp = Array(full).fill(null); dp[0] = [1, 0];
    const lt = (a, b) => !b || a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
    const bin = (m) => m.toString(2).padStart(n, '0');
    const view = (hl = {}) => [{ name: `Cân nặng (người 0..${n - 1}); x = ${x}`, values: w, hl: {}, noIdx: false }, { name: 'dp[mask] = (số chuyến, kg chuyến cuối); chữ dưới: mask (bit i bật = đã chở người i)', values: dp.map((p) => p ? `${p[0]},${p[1]}` : '—'), labels: [...Array(full).keys()].map(bin), hl, width: 46 }];
    F.push({ at: 'khoi', msg: 'dp[0] = (1, 0): một chuyến rỗng đang chờ.', arrays: view({ 0: 'ok' }), vars: {}, fig: true });
    for (let mask = 0; mask < full; mask++) {
      if (!dp[mask]) continue; const [k, cur] = dp[mask]; const hl = { [mask]: 'cur' }, ds = [];
      for (let i = 0; i < n; i++) { if (mask >> i & 1) continue; const moi = cur + w[i] <= x ? [k, cur + w[i]] : [k + 1, w[i]], t = mask | 1 << i; const better = lt(moi, dp[t]); if (better) dp[t] = moi; hl[t] = better ? 'ok' : 'dim'; ds.push(`+người ${i} → (${moi.join(', ')})${better ? '' : ' (không tốt hơn)'}`); }
      if (!ds.length) continue;
      F.push({ at: 'lay cap', msg: `Từ dp[${bin(mask)}] = (${k}, ${cur}): ${ds.join('; ')}.`, arrays: view(hl), vars: { mask: bin(mask) }, ask: { q: `dp[${bin(mask)}] = (${k}, ${cur}). Thêm người có cân nặng ${w[[...Array(n).keys()].find((i) => !(mask >> i & 1))]} thì được cặp nào?`, choices: (() => { const i = [...Array(n).keys()].find((j) => !(mask >> j & 1)), a = cur + w[i] <= x ? `${k},${cur + w[i]}` : `${k + 1},${w[i]}`; return [...new Set([a, `${k},${cur + w[i]}`, `${k + 1},${w[i]}`])].sort(); })(), answer: (() => { const i = [...Array(n).keys()].find((j) => !(mask >> j & 1)); return cur + w[i] <= x ? `${k},${cur + w[i]}` : `${k + 1},${w[i]}`; })() }, fig: [0, 1, 3, 5, 6].includes(mask) });
    }
    F.push({ at: 'in', msg: `dp[${bin(full - 1)}] = (${dp[full - 1].join(', ')}): cần ${dp[full - 1][0]} chuyến.`, arrays: view({ [full - 1]: 'ok' }), vars: {}, out: String(dp[full - 1][0]), fig: true });
    return F;
  },
};
