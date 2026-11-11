const ALGO = {
  id: 't0-tam-giac', title: 'Phân loại tam giác: đi qua các nhánh if',
  desc: 'Chương trình xét các trường hợp <b>theo thứ tự</b>: gặp điều kiện đúng đầu tiên thì dừng. Xem điều kiện nào được kiểm tra, đúng hay sai.',
  lesson: '../tap-0-nhap-mon/bai-0-3-re-nhanh/',
  code: {
    py: ['a, b, c = sorted(map(int, input().split()))   ⟦sx⟧', 'if a + b <= c:   ⟦k⟧', '    print("KHONG")   ⟦pk⟧', 'elif a == c:   ⟦d⟧', '    print("DEU")   ⟦pd⟧', 'elif a * a + b * b == c * c:   ⟦v⟧', '    print("VUONG")   ⟦pv⟧', 'elif a == b or b == c:   ⟦c⟧', '    print("CAN")   ⟦pc⟧', 'else:', '    print("THUONG")   ⟦pt⟧'],
    cpp: ['long long x[3];', 'cin >> x[0] >> x[1] >> x[2];', 'sort(x, x + 3);   ⟦sx⟧', 'long long a = x[0], b = x[1], c = x[2];', 'if (a + b <= c) cout << "KHONG";   ⟦k_pk⟧', 'else if (a == c) cout << "DEU";   ⟦d_pd⟧', 'else if (a * a + b * b == c * c) cout << "VUONG";   ⟦v_pv⟧', 'else if (a == b || b == c) cout << "CAN";   ⟦c_pc⟧', 'else cout << "THUONG";   ⟦pt⟧'],
  },
  samples: [['3 4 5', 'vuông'], ['2 2 3', 'cân'], ['1 2 3', 'không ghép được'], ['7 7 7', 'đều'], ['5 3 4', 'chưa sắp xếp'], ['4 5 6', 'thường']],
  parse(t) { const a = U.ints(t, 3).slice(0, 3); if (a.some((x) => x < 1)) throw new Error('Độ dài phải là số nguyên dương.'); return a; },
  random() { return U.pick([[3, 4, 5], [6, 8, 10], [2, 2, 3], [5, 5, 5], [1, 1, 5], [4, 6, 7], [5, 12, 13], [3, 3, 3]]).map(String).join(' '); },
  run(x) {
    const F = [], [a, b, c] = [...x].sort((p, q) => p - q);
    const arr = (hl = {}) => [{ name: 'Ba cạnh sau khi sắp xếp (a ≤ b ≤ c)', values: [a, b, c], labels: ['a', 'b', 'c'], hl }];
    F.push({ at: 'sx', msg: `Đọc ${x.join(', ')} rồi sắp xếp tăng dần: a = ${a}, b = ${b}, c = ${c}. Nhờ vậy c luôn là cạnh dài nhất.`, arrays: arr(), fig: true });
    const checks = [
      ['k', 'pk', `a + b ≤ c ?  ${a} + ${b} = ${a + b} ${a + b <= c ? '≤' : '>'} ${c}`, a + b <= c, 'KHONG', { 0: 'cur', 1: 'cur', 2: 'mark' }],
      ['d', 'pd', `a == c ?  ${a} ${a === c ? '=' : '≠'} ${c}`, a === c, 'DEU', { 0: 'cur', 2: 'cur' }],
      ['v', 'pv', `a² + b² == c² ?  ${a * a} + ${b * b} = ${a * a + b * b} ${a * a + b * b === c * c ? '=' : '≠'} ${c * c}`, a * a + b * b === c * c, 'VUONG', { 0: 'cur', 1: 'cur', 2: 'mark' }],
      ['c', 'pc', `a == b hoặc b == c ?  ${a === b ? 'a = b' : b === c ? 'b = c' : 'cả hai đều sai'}`, a === b || b === c, 'CAN', { 0: 'cur', 1: 'cur', 2: 'cur' }],
    ];
    for (const [at, pat, txt, ok, word, hl] of checks) {
      F.push({ at, msg: `Kiểm tra ${txt} → <b>${ok ? 'ĐÚNG' : 'sai'}</b>.`, arrays: arr(hl), ask: { q: `Điều kiện "${txt.split('?')[0].trim()}" đúng hay sai?`, choices: ['ĐÚNG', 'sai'], answer: ok ? 'ĐÚNG' : 'sai' }, fig: true });
      if (ok) { F.push({ at: pat, msg: `Điều kiện đúng đầu tiên: in ${word}. Các nhánh phía sau <b>không được xét nữa</b>.`, arrays: arr({ 0: 'ok', 1: 'ok', 2: 'ok' }), out: word, fig: true }); return F; }
    }
    F.push({ at: 'pt', msg: 'Mọi điều kiện đều sai: rơi vào nhánh else, in THUONG.', arrays: arr({ 0: 'ok', 1: 'ok', 2: 'ok' }), out: 'THUONG', fig: true });
    return F;
  },
};
