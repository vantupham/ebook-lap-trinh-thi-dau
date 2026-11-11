const ALGO = {
  id: 't3-kruskal', title: 'Kruskal: cây khung nhỏ nhất',
  desc: 'Sắp các cạnh theo chi phí tăng dần. Xét lần lượt: nếu hai đầu đang ở <b>hai nhóm khác nhau</b> (DSU) thì nhận cạnh, gộp hai nhóm; nếu đã cùng nhóm thì bỏ (nhận chỉ tạo vòng). Đủ n − 1 cạnh là xong.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-2-cay-khung-topo/',
  code: {
    py: ['canh.sort()   # theo chi phí   ⟦khoi⟧', 'for c, a, b in canh:', '    x, y = tim(a), tim(b)   ⟦xet⟧', '    if x == y: continue   ⟦bo⟧', '    cha[x] = y; tong += c; da_noi += 1   ⟦nhan⟧', 'print(tong if da_noi == n - 1 else "IMPOSSIBLE")   ⟦in⟧'],
    cpp: ['sort(e.begin(), e.end());   // theo chi phí   ⟦khoi⟧', 'for (auto [c, a, b] : e) {', '    int x = tim(a), y = tim(b);   ⟦xet⟧', '    if (x == y) continue;   ⟦bo⟧', '    cha[x] = y; tong += c; da_noi++;   ⟦nhan⟧', '}', 'cout << (da_noi == n - 1 ? tong : "IMPOSSIBLE");   ⟦in⟧'],
  },
  samples: [['5 6\n1 2 3\n2 3 5\n2 4 2\n3 4 8\n5 1 7\n5 4 4', 'ví dụ trong bài'], ['4 2\n1 2 1\n3 4 1', 'không liên thông'], ['6 9\n1 2 4\n1 3 4\n2 3 2\n3 4 3\n3 6 4\n3 5 2\n4 6 3\n5 6 3\n2 4 5', 'sáu xã']],
  parse(t) { const v = U.ints(t, 2), [n, m] = v; if (n < 1 || n > 9 || m < 0 || m > 14) throw new Error('Hãy chọn n ≤ 9, m ≤ 14.'); if (v.length < 2 + 3 * m) throw new Error('Thiếu cạnh.'); const e = []; for (let i = 0; i < m; i++) { const [a, b, c] = v.slice(2 + 3 * i, 5 + 3 * i); if (a < 1 || a > n || b < 1 || b > n) throw new Error('Đỉnh phải trong 1..n.'); e.push([c, a, b]); } return { n, e }; },
  random() { const n = U.rnd(4, 7), m = U.rnd(n, 2 * n), e = []; for (let i = 0; i < m; i++) { const a = U.rnd(1, n); let b = U.rnd(1, n); if (b === a) b = a % n + 1; e.push(`${a} ${b} ${U.rnd(1, 9)}`); } return `${n} ${m}\n` + e.join('\n'); },
  run({ n, e }) {
    const F = [], s = e.map((x, i) => [...x, i]).sort((p, q) => p[0] - q[0] || p[3] - q[3]), cha = [...Array(n + 1).keys()], st = s.map(() => '');
    const tim = (u) => { while (cha[u] !== u) u = cha[u] = cha[cha[u]]; return u; };
    let tong = 0, da = 0;
    const view = (k) => [{ name: 'Các cạnh đã sắp (a–b: chi phí); xanh lá: nhận, xám: bỏ', values: s.map(([c, a, b]) => `${a}–${b}: ${c}`), noIdx: true, width: 64, hl: Object.assign(Object.fromEntries(st.map((x, i) => [i, x === 'nhan' ? 'ok' : x === 'bo' ? 'dim' : ''])), k !== undefined ? { [k]: 'cur' } : {}) },
      { name: 'Nhóm của mỗi xã (số dưới: xã; trong ô: trưởng nhóm)', values: [...Array(n).keys()].map((k) => tim(k + 1)), labels: [...Array(n).keys()].map((k) => String(k + 1)), hl: {} }];
    F.push({ at: 'khoi', msg: 'Sắp các cạnh theo chi phí tăng dần. Ban đầu mỗi xã một nhóm.', arrays: view(), vars: { tong, 'đã nối': da }, fig: true });
    s.forEach(([c, a, b], k) => {
      const x = tim(a), y = tim(b), cung = x === y;
      const ask = { q: `Cạnh ${a}–${b} (${c}): nhận hay bỏ?`, choices: ['nhận', 'bỏ'], answer: cung ? 'bỏ' : 'nhận' };
      if (cung) { st[k] = 'bo'; F.push({ at: 'xet bo', msg: `${a} và ${b} đã cùng nhóm ${x}: bỏ cạnh này (nhận chỉ tạo vòng).`, arrays: view(k), vars: { tong, 'đã nối': da }, ask, fig: true }); }
      else { cha[x] = y; tong += c; da++; st[k] = 'nhan'; F.push({ at: 'xet nhan', msg: `${a} (nhóm ${x}) và ${b} (nhóm ${y}) khác nhóm: nhận, gộp nhóm. Tổng = ${tong}.`, arrays: view(k), vars: { tong, 'đã nối': da }, ask, fig: true }); }
    });
    const ok = da === n - 1;
    F.push({ at: 'in', msg: ok ? `Đã nhận đủ ${n - 1} cạnh: tổng ${tong}.` : `Chỉ nhận được ${da} < ${n - 1} cạnh: không nối hết được, IMPOSSIBLE.`, arrays: view(), vars: { tong, 'đã nối': da }, out: ok ? String(tong) : 'IMPOSSIBLE' });
    return F;
  },
};
