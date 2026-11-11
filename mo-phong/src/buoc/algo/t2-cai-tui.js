const ALGO = {
  id: 't2-cai-tui', title: 'Cái túi 0/1: Hiệu sách',
  desc: 'dp[j] = số trang nhiều nhất với tổng giá ≤ j, chỉ dùng các cuốn đã xét. Xét cuốn i (giá h, s trang): với j <b>giảm dần</b> từ x xuống h, dp[j] = max(dp[j], dp[j − h] + s). Giảm dần để dp[j − h] vẫn là giá trị <b>chưa</b> mua cuốn i.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-9-qhd-1/',
  code: {
    py: ['dp = [0] * (x + 1)   ⟦khoi⟧', 'for i in range(n):   ⟦cuon⟧', '    for j in range(x, h[i] - 1, -1):', '        dp[j] = max(dp[j], dp[j - h[i]] + s[i])   ⟦tinh⟧', 'print(dp[x])   ⟦in⟧'],
    cpp: ['vector<int> dp(x + 1, 0);   ⟦khoi⟧', 'for (int i = 0; i < n; i++)   ⟦cuon⟧', '    for (int j = x; j >= h[i]; j--)', '        dp[j] = max(dp[j], dp[j - h[i]] + s[i]);   ⟦tinh⟧', 'cout << dp[x];   ⟦in⟧'],
  },
  samples: [['4 10\n4 8 5 3\n5 12 8 1', 'ví dụ trong bài'], ['3 6\n2 3 4\n3 4 6', 'ba cuốn'], ['2 5\n2 2\n3 3', 'hai cuốn rẻ']],
  parse(t) { const v = U.ints(t, 2), [n, x] = v; if (n < 1 || n > 5 || x < 1 || x > 14) throw new Error('Hãy chọn n ≤ 5, x ≤ 14.'); if (v.length < 2 + 2 * n) throw new Error('Thiếu số.'); const h = v.slice(2, 2 + n), s = v.slice(2 + n, 2 + 2 * n); if (h.some((y) => y < 1)) throw new Error('Giá phải dương.'); return { h, s, x }; },
  random() { const n = U.rnd(2, 4), x = U.rnd(6, 12); return `${n} ${x}\n${Array.from({ length: n }, () => U.rnd(1, 6)).join(' ')}\n${Array.from({ length: n }, () => U.rnd(1, 9)).join(' ')}`; },
  run({ h, s, x }) {
    const F = [], n = h.length, dp = Array(x + 1).fill(0);
    const sach = (cur) => ({ name: 'Các cuốn (giá / trang)', values: h.map((g, i) => `${g}/${s[i]}`), noIdx: true, hl: Object.fromEntries(h.map((_, i) => [i, i < cur ? 'done' : i === cur ? 'cur' : ''])), width: 52 });
    F.push({ at: 'khoi', msg: 'Chưa xét cuốn nào: mọi dp[j] = 0.', arrays: [sach(-1), { name: 'dp[j] (số dưới: j đồng)', values: dp.slice(), hl: {} }], vars: {}, fig: true });
    for (let i = 0; i < n; i++) {
      const cu = dp.slice();
      F.push({ at: 'cuon', msg: `Xét cuốn ${i + 1}: giá ${h[i]}, ${s[i]} trang. Duyệt j từ ${x} giảm xuống ${h[i]}.`, arrays: [sach(i), { name: 'dp[j] trước khi xét cuốn này', values: cu, hl: {} }], vars: { i: i + 1 }, fig: i === 2 });
      for (let j = x; j >= h[i]; j--) {
        const mua = dp[j - h[i]] + s[i], kq = Math.max(dp[j], mua);
        const showStep = i === 2 && j >= x - 2;
        F.push({ at: 'tinh', msg: `j = ${j}: không mua: ${dp[j]}; mua: dp[${j - h[i]}] + ${s[i]} = ${mua}. dp[${j}] = ${kq}.`, arrays: [sach(i), { name: 'dp[j] (ô cam: j đang xét; xanh dương: j − h, vẫn là giá trị chưa mua cuốn này)', values: dp.slice(), hl: { [j]: 'cur', [j - h[i]]: 'mark' } }], vars: { i: i + 1, j }, ask: { q: `dp[${j}] mới = ?`, choices: U.near(kq, [dp[j], mua]).slice(0, 3), answer: kq }, fig: showStep });
        dp[j] = kq;
      }
      const ch = {}; dp.forEach((v, j) => { if (v !== cu[j]) ch[j] = 'ok'; });
      F.push({ at: 'tinh', msg: `Xong cuốn ${i + 1}. Ô xanh lá: dp[j] tăng nhờ mua cuốn này.`, arrays: [sach(i + 1), { name: 'dp[j] sau khi xét cuốn này', values: dp.slice(), hl: ch }], vars: { i: i + 1 }, fig: true });
    }
    F.push({ at: 'in', msg: `Kết quả dp[${x}] = ${dp[x]} trang.`, arrays: [sach(n), { name: 'dp[j]', values: dp.slice(), hl: { [x]: 'ok' } }], vars: {}, out: String(dp[x]), fig: false });
    return U.limit(F);
  },
};
