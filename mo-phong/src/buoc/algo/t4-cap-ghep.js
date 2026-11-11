const ALGO = {
  id: 't4-cap-ghep', title: 'Cặp ghép hai phía: tìm đường mở rộng',
  desc: 'Lần lượt từng bạn nam u thử tìm bạn nữ: với mỗi v u thích, nếu v còn trống, hoặc người đang ghép với v <b>đổi được sang bạn khác</b> (thử đệ quy), thì ghép u với v. Mỗi lần thành công số cặp tăng 1. Đây chính là luồng cực đại với mọi khả năng bằng 1.',
  lesson: '../tap-4-chuyen-de-nang-cao/bai-4-6-luong/',
  code: {
    py: ['def thu(u):', '    for v in thich[u]:', '        if not tham[v]:', '            tham[v] = True', '            if khop[v] == -1 or thu(khop[v]):   ⟦thu⟧', '                khop[v] = u; return True   ⟦ghep⟧', '    return False', 'for u in nam: tham = [False]*...; dem += thu(u)   ⟦moi⟧'],
    cpp: ['bool thu(int u) {', '    for (int v : thich[u]) if (!tham[v]) {', '        tham[v] = true;', '        if (khop[v] == -1 || thu(khop[v]))   ⟦thu⟧', '            { khop[v] = u; return true; }   ⟦ghep⟧', '    }', '    return false;', '}', 'for (u : nam) { fill(tham, false); dem += thu(u); }   ⟦moi⟧'],
  },
  samples: [['3 3 5\n1 1\n1 2\n2 1\n3 2\n3 3', 'ví dụ trong bài'], ['3 3 4\n1 1\n2 1\n3 1\n3 2', 'nhiều người thích một bạn'], ['4 4 7\n1 1\n1 2\n2 1\n3 2\n3 3\n4 3\n4 4', 'chuỗi đổi dài']],
  parse(t) { const v = U.ints(t, 3), [a, b, k] = v; if (a < 1 || a > 6 || b < 1 || b > 6 || k < 0 || k > 14) throw new Error('Hãy chọn số nam, số nữ ≤ 6, số cặp thích ≤ 14.'); const e = []; for (let i = 0; i < k; i++) { const x = v[3 + 2 * i], y = v[4 + 2 * i]; if (!(x >= 1 && x <= a && y >= 1 && y <= b)) throw new Error('Mỗi dòng: nam x, nữ y.'); e.push([x, y]); } return { a, b, e }; },
  random() { const a = U.rnd(3, 5), b = U.rnd(3, 5), e = new Set(); for (let i = 0; i < U.rnd(a, a + 4); i++) e.add(`${U.rnd(1, a)} ${U.rnd(1, b)}`); return `${a} ${b} ${e.size}\n` + [...e].join('\n'); },
  run({ a, b, e }) {
    const F = [], th = Array.from({ length: a + 1 }, () => []); for (const [x, y] of e) th[x].push(y);
    const khop = Array(b + 1).fill(-1); let dem = 0;
    const view = (hl = {}, hu = {}) => [{ name: 'khop[v]: bạn nam đang ghép với bạn nữ v (— là trống)', values: khop.slice(1).map((x) => x < 0 ? '—' : x), labels: [...Array(b).keys()].map((k) => 'nữ ' + (k + 1)), hl }, { name: 'Danh sách thích của mỗi bạn nam', values: th.slice(1).map((l) => l.join(',') || '∅'), labels: [...Array(a).keys()].map((k) => 'nam ' + (k + 1)), hl: hu }];
    F.push({ at: 'moi', msg: 'Chưa ai được ghép.', arrays: view(), vars: { 'số cặp': 0 }, fig: true });
    for (let u = 1; u <= a; u++) {
      const tham = Array(b + 1).fill(false), doi = [];
      const thu = (x) => { for (const v of th[x]) if (!tham[v]) { tham[v] = true; if (khop[v] === -1 || thu(khop[v])) { doi.push([x, v]); khop[v] = x; return true; } } return false; };
      const ok = thu(u); if (ok) dem++;
      const hl = Object.fromEntries(doi.map(([, v]) => [v - 1, 'ok']));
      F.push({ at: ok ? 'thu ghep' : 'thu', msg: ok ? `Nam ${u}: ${doi.length > 1 ? `tìm được chuỗi đổi (${doi.slice().reverse().map(([x, v]) => `nam ${x}–nữ ${v}`).join(', ')}).` : `ghép với nữ ${doi[0][1]}.`} Số cặp = ${dem}.` : `Nam ${u}: không tìm được ai (kể cả khi đổi). Số cặp vẫn ${dem}.`, arrays: view(hl, { [u - 1]: ok ? 'cur' : 'bad' }), vars: { 'số cặp': dem }, ask: { q: `Thêm nam ${u}, số cặp thành bao nhiêu?`, choices: U.near(dem), answer: dem }, fig: true });
    }
    F.push({ at: 'moi', msg: `Số cặp nhiều nhất: ${dem}.`, arrays: view(), vars: { 'số cặp': dem }, out: String(dem) });
    return F;
  },
};
