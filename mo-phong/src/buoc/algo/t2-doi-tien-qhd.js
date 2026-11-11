const ALGO = {
  id: 't2-doi-tien-qhd', title: 'Quy hoạch động: đổi tiền ít đồng nhất',
  desc: 'dp[s] = số đồng ít nhất để đổi s đồng. Đồng cuối cùng là một mệnh giá c nào đó, phần còn lại là bài toán nhỏ hơn s − c đã giải: dp[s] = min(dp[s − c] + 1). Tính s tăng dần; ∞ là chưa đổi được.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-9-qhd-1/',
  code: {
    py: ['dp = [VC] * (x + 1); dp[0] = 0   ⟦khoi⟧', 'for s in range(1, x + 1):', '    for c in coins:', '        if c <= s and dp[s - c] != VC:', '            dp[s] = min(dp[s], dp[s - c] + 1)   ⟦tinh⟧', 'print(-1 if dp[x] == VC else dp[x])   ⟦in⟧'],
    cpp: ['vector<int> dp(x + 1, VC); dp[0] = 0;   ⟦khoi⟧', 'for (int s = 1; s <= x; s++)', '    for (int c : coins)', '        if (c <= s && dp[s - c] != VC)', '            dp[s] = min(dp[s], dp[s - c] + 1);   ⟦tinh⟧', 'cout << (dp[x] == VC ? -1 : dp[x]);   ⟦in⟧'],
  },
  samples: [['3 6\n1 3 4', 'ví dụ trong bài (tham lam sai)'], ['2 11\n4 7', 'có số tiền không đổi được'], ['3 13\n2 5 6', 'mười ba đồng']],
  parse(t) { const v = U.ints(t, 3), [n, x] = v; if (n < 1 || n > 5 || x < 1 || x > 20) throw new Error('Hãy chọn n ≤ 5, x ≤ 20.'); const c = v.slice(2, 2 + n); if (c.length < n || c.some((y) => y < 1)) throw new Error('Cần n mệnh giá dương.'); return { c: [...new Set(c)].sort((a, b) => a - b), x }; },
  random() { const n = U.rnd(2, 3); return `${n} ${U.rnd(8, 16)}\n` + Array.from({ length: n }, () => U.rnd(1, 7)).join(' '); },
  run({ c, x }) {
    const F = [], VC = Infinity, dp = Array(x + 1).fill(VC); dp[0] = 0;
    const show = (v) => v === VC ? '∞' : v;
    const view = (hl = {}) => [{ name: `dp[s] (số dưới: s); mệnh giá ${c.join(', ')}`, values: dp.map(show), hl }];
    F.push({ at: 'khoi', msg: 'dp[0] = 0 (đổi 0 đồng cần 0 đồng xu). Các ô khác chưa biết: ∞.', arrays: view({ 0: 'ok' }), vars: {}, fig: true });
    for (let s = 1; s <= x; s++) {
      const cand = c.filter((v) => v <= s).map((v) => [v, dp[s - v]]);
      const best = Math.min(VC, ...cand.map(([, d]) => d + 1)); dp[s] = best;
      const hl = { [s]: 'cur' }; for (const [v] of cand) hl[s - v] = 'mark';
      const parts = cand.map(([v, d]) => `dp[${s - v}] + 1 = ${d === VC ? '∞' : d + 1}`).join(', ');
      F.push({ at: 'tinh', msg: cand.length ? `s = ${s}: đồng cuối là ${cand.map(([v]) => v).join(' / ')}: ${parts}. dp[${s}] = ${show(best)}.` : `s = ${s}: không mệnh giá nào ≤ ${s}: dp[${s}] = ∞.`, arrays: view(hl), vars: { s }, ask: { q: `dp[${s}] = ?`, choices: (best === VC ? ['∞', ...U.near(1).slice(0, 2)] : [...U.near(best).slice(0, 2), '∞']).map(String), answer: String(show(best)) }, fig: s <= 6 });
    }
    F.push({ at: 'in', msg: dp[x] === VC ? `dp[${x}] = ∞: không đổi được, in −1.` : `Đổi ${x} đồng cần ít nhất ${dp[x]} đồng xu.`, arrays: view({ [x]: dp[x] === VC ? 'bad' : 'ok' }), vars: {}, out: String(dp[x] === VC ? -1 : dp[x]), fig: true });
    return F;
  },
};
