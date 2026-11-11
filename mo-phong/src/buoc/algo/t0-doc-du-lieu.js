const ALGO = {
  id: 't0-doc-du-lieu', title: 'Đọc dữ liệu và cộng dồn',
  desc: 'Chương trình đọc n rồi n số và in tổng. Theo dõi <b>con trỏ đọc</b> trên dữ liệu vào: mỗi lệnh đọc lấy đúng một "từ" tiếp theo, không quan tâm xuống dòng.',
  lesson: '../tap-0-nhap-mon/bai-0-1-chuong-trinh-dau-tien/',
  code: {
    py: ['import sys', 'data = sys.stdin.buffer.read().split()   ⟦doc⟧', 'n = int(data[0])   ⟦n⟧', 's = 0   ⟦s0⟧', 'for i in range(1, n + 1):   ⟦lap⟧', '    x = int(data[i])   ⟦x⟧', '    s = s + x   ⟦cong⟧', 'print(s)   ⟦in⟧'],
    cpp: ['int n;', 'cin >> n;   ⟦doc_n⟧', 'long long s = 0;   ⟦s0⟧', 'for (int i = 1; i <= n; i++) {   ⟦lap⟧', '    long long x;', '    cin >> x;   ⟦x⟧', '    s = s + x;   ⟦cong⟧', '}', "cout << s << '\\n';   ⟦in⟧"],
  },
  samples: [['3\n7 8 9', 'ví dụ trong bài'], ['5\n4\n-2 10\n3 1', 'số trên nhiều dòng'], ['1\n1000000000', 'chỉ một số']],
  parse(t) {
    const a = U.ints(t, 1);
    if (a[0] < 1 || a[0] > 15) throw new Error('Để dễ theo dõi, hãy chọn 1 ≤ n ≤ 15.');
    if (a.length < a[0] + 1) throw new Error('Thiếu số: cần đủ n = ' + a[0] + ' số sau n.');
    return { tokens: t.trim().split(/\s+/), a };
  },
  random() { const n = U.rnd(2, 7); return n + '\n' + Array.from({ length: n }, () => U.rnd(-20, 50)).join(' '); },
  run({ tokens, a }) {
    const F = [], n = a[0]; let s = 0;
    const fr = (at, pos, msg, vars, extra = {}) => F.push({ at, msg, tape: { tokens, pos }, vars, ...extra });
    fr('doc', 0, 'Dữ liệu vào là một dãy các "từ" cách nhau bởi dấu cách hoặc xuống dòng. Con trỏ đọc đang ở từ đầu tiên.', {}, { fig: true });
    fr('n doc_n', 1, `Đọc n = ${n}. Con trỏ nhảy sang từ tiếp theo.`, { n });
    fr('s0', 1, 'Khởi tạo tổng s = 0 trước khi cộng dồn.', { n, s: 0 });
    for (let i = 1; i <= n; i++) {
      fr('lap', i, `Lần lặp i = ${i}: còn cần đọc ${n - i + 1} số nữa.`, { n, i, s });
      const x = a[i];
      fr('x', i + 1, `Đọc x = ${x}.`, { n, i, x, s }, { fig: i === 1 });
      const before = s; s += x;
      fr('cong', i + 1, `s = ${before} + ${x} = ${s}.`, { n, i, x, s }, { ask: { q: `s sau khi cộng x = ${x} là bao nhiêu?`, choices: U.near(s, [before]), answer: s } });
    }
    fr('in', n + 1, `Hết vòng lặp. In s = ${s}. Các từ còn thừa phía sau (nếu có) không được đọc.`, { n, s }, { out: String(s), fig: true });
    return U.limit(F);
  },
};
