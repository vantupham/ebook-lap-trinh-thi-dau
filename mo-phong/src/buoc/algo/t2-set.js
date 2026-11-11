const ALGO = {
  id: 't2-set', title: 'set: tập hợp có thứ tự và lower_bound',
  desc: '<b>set</b> luôn giữ các giá trị khác nhau theo thứ tự tăng. Thêm, xóa, và tìm "phần tử nhỏ nhất ≥ x" (<code>lower_bound</code>) đều O(log n), kể cả khi tập thay đổi liên tục.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-2-set-map/',
  code: {
    py: ['# Python không có set có thứ tự sẵn; dùng SortedList (thư viện ngoài) hoặc bisect trên list', 's = SortedList()   ⟦khoi⟧', 'if op == "+": s.add(x) nếu x chưa có   ⟦them⟧', 'elif op == "-": s.discard(x)   ⟦xoa⟧', 'else:', '    i = s.bisect_left(x)   ⟦tim⟧', '    print(s[i] if i < len(s) else -1)   ⟦tim⟧'],
    cpp: ['set<long long> s;   ⟦khoi⟧', 'if (op == \'+\') s.insert(x);   ⟦them⟧', 'else if (op == \'-\') s.erase(x);   ⟦xoa⟧', 'else {', '    auto it = s.lower_bound(x);   ⟦tim⟧', '    cout << (it == s.end() ? -1 : *it);   ⟦tim⟧', '}'],
  },
  samples: [['6\n+ 5\n+ 2\n? 3\n- 5\n? 3\n? 1', 'ví dụ trong bài'], ['8\n+ 7\n+ 3\n+ 7\n+ 10\n? 4\n? 10\n- 3\n? 1', 'thêm trùng'], ['5\n+ 4\n? 5\n+ 9\n? 5\n? 9', 'không có phần tử ≥ x']],
  parse(t) {
    const L = t.trim().split(/\n/).map((s) => s.trim()).filter(Boolean), q = +L[0];
    if (!(q >= 1 && q <= 20)) throw new Error('Dòng đầu là q, 1 ≤ q ≤ 20.');
    const ops = L.slice(1, q + 1).map((s) => { const m = s.match(/^([+\-?])\s+(-?\d+)$/); if (!m) throw new Error('Mỗi thao tác có dạng "+ x", "- x" hoặc "? x".'); return [m[1], +m[2]]; });
    if (ops.length < q) throw new Error('Thiếu thao tác.'); return { ops };
  },
  random() { const q = U.rnd(6, 10); return q + '\n' + Array.from({ length: q }, (_, i) => `${i < 2 ? '+' : U.pick(['+', '+', '-', '?', '?'])} ${U.rnd(1, 12)}`).join('\n'); },
  run({ ops }) {
    const F = [], s = [], out = [];
    const view = (hl = {}, ptr = {}) => [{ name: 'set s (luôn tăng dần)', values: s.slice(), hl, ptr, noIdx: true }, { name: 'Các thao tác', values: ops.map(([o, x]) => `${o} ${x}`), hl: {}, noIdx: true, width: 52 }];
    const opsView = (k, base) => { base[1].hl = Object.fromEntries(ops.map((_, j) => [j, j < k ? 'done' : j === k ? 'cur' : ''])); return base; };
    F.push({ at: 'khoi', msg: 'Tập rỗng.', arrays: opsView(-1, view()), vars: { 'kích thước': 0 }, fig: true });
    ops.forEach(([o, x], k) => {
      if (o === '+') { const had = s.includes(x); if (!had) { s.push(x); s.sort((p, q) => p - q); } F.push({ at: 'them', msg: had ? `${x} đã có trong set: không thêm gì (set không chứa giá trị lặp).` : `Thêm ${x}: set tự đặt nó vào đúng chỗ để giữ thứ tự.`, arrays: opsView(k, view({ [s.indexOf(x)]: had ? 'dim' : 'ok' })), vars: { 'kích thước': s.length }, fig: k < 3 }); }
      else if (o === '-') { const i = s.indexOf(x); if (i >= 0) s.splice(i, 1); F.push({ at: 'xoa', msg: i >= 0 ? `Xóa ${x}.` : `${x} không có trong set: không làm gì.`, arrays: opsView(k, view()), vars: { 'kích thước': s.length }, fig: k < 6 }); }
      else { const i = s.findIndex((v) => v >= x), ans = i < 0 ? -1 : s[i]; out.push(ans);
        const ch = [...new Set([ans, -1, ...s.slice(Math.max(0, i - 1), i + 2)])].slice(0, 4).sort((p, q) => p - q);
        F.push({ at: 'tim', msg: i < 0 ? `Mọi phần tử đều < ${x}: lower_bound trả về end(), in −1.` : `lower_bound(${x}) trỏ tới ${ans}: phần tử nhỏ nhất ≥ ${x}.`, arrays: opsView(k, view(i < 0 ? {} : { [i]: 'cur' }, i < 0 ? {} : { lower_bound: i })), vars: { 'kích thước': s.length, x }, ask: { q: `? ${x}: in ra số nào?`, choices: ch, answer: ans }, out: out.join('\n'), fig: k < 6 }); }
    });
    F.push({ at: 'tim', msg: `Hết thao tác. Kết quả các câu hỏi: ${out.join(', ') || '(không có câu hỏi)'}.`, arrays: opsView(ops.length, view()), vars: { 'kích thước': s.length }, out: out.join('\n'), fig: false });
    return F;
  },
};
