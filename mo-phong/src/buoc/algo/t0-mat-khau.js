const ALGO = {
  id: 't0-mat-khau', title: 'Mật khẩu mạnh: duyệt xâu và biến cờ',
  desc: 'Ba biến cờ <code>co_hoa</code>, <code>co_thuong</code>, <code>co_so</code> ban đầu là False. Duyệt từng ký tự, gặp loại nào thì bật cờ loại đó. Cuối cùng kiểm tra độ dài và cả ba cờ.',
  lesson: '../tap-0-nhap-mon/bai-0-6-xau-ky-tu/',
  code: {
    py: ['s = input()', 'co_hoa = co_thuong = co_so = False   ⟦khoi⟧', 'for ch in s:   ⟦lap⟧', "    if 'A' <= ch <= 'Z': co_hoa = True   ⟦hoa⟧", "    elif 'a' <= ch <= 'z': co_thuong = True   ⟦thuong⟧", "    elif '0' <= ch <= '9': co_so = True   ⟦so⟧", 'manh = len(s) >= 8 and co_hoa and co_thuong and co_so   ⟦kl⟧', 'print("MANH" if manh else "YEU")   ⟦kl⟧'],
    cpp: ['string s; cin >> s;', 'bool co_hoa = false, co_thuong = false, co_so = false;   ⟦khoi⟧', 'for (char ch : s) {   ⟦lap⟧', "    if ('A' <= ch && ch <= 'Z') co_hoa = true;   ⟦hoa⟧", "    else if ('a' <= ch && ch <= 'z') co_thuong = true;   ⟦thuong⟧", "    else if ('0' <= ch && ch <= '9') co_so = true;   ⟦so⟧", '}', 'bool manh = s.size() >= 8 && co_hoa && co_thuong && co_so;   ⟦kl⟧', 'cout << (manh ? "MANH" : "YEU");   ⟦kl⟧'],
  },
  samples: [['SaiGon2026', 'mạnh'], ['saigon2026', 'thiếu chữ hoa'], ['Ab1', 'quá ngắn'], ['Pho@Bo#99', 'có ký tự đặc biệt']],
  parse(t) { const s = t.trim(); if (!s || /\s/.test(s) || s.length > 24) throw new Error('Nhập một xâu không có dấu cách, dài 1–24.'); return s; },
  random() { return U.pick(['BenThanh1', 'hcmc2026', 'ABCDEFGH9', 'Qu4n1x', 'Cafe2Sua', 'xinchao']); },
  run(s) {
    const F = [], c = s.split(''); let hoa = false, thuong = false, so = false;
    const V = () => ({ co_hoa: hoa ? 'True' : 'False', co_thuong: thuong ? 'True' : 'False', co_so: so ? 'True' : 'False', 'len(s)': c.length });
    F.push({ at: 'khoi', msg: 'Ba cờ đều tắt (False): chưa thấy chữ hoa, chữ thường, chữ số nào.', arrays: [{ name: 'Mật khẩu s', values: c, hl: {} }], vars: V(), fig: true });
    c.forEach((ch, k) => {
      let kind = 'khác', at = 'lap';
      if (ch >= 'A' && ch <= 'Z') { hoa = true; kind = 'chữ hoa'; at = 'hoa'; } else if (ch >= 'a' && ch <= 'z') { thuong = true; kind = 'chữ thường'; at = 'thuong'; } else if (ch >= '0' && ch <= '9') { so = true; kind = 'chữ số'; at = 'so'; }
      F.push({ at, msg: `'${ch}' là ${kind}${kind === 'khác' ? ': không bật cờ nào' : ''}.`, arrays: [{ name: 'Mật khẩu s', values: c, hl: { ...Object.fromEntries([...Array(k).keys()].map((q) => [q, 'done'])), [k]: 'cur' } }], vars: V(), ask: { q: `'${ch}' thuộc loại nào?`, choices: ['chữ hoa', 'chữ thường', 'chữ số', 'khác'], answer: kind }, fig: k < 3 });
    });
    const manh = c.length >= 8 && hoa && thuong && so;
    const why = [c.length >= 8 ? null : `chỉ dài ${c.length} < 8`, hoa ? null : 'thiếu chữ hoa', thuong ? null : 'thiếu chữ thường', so ? null : 'thiếu chữ số'].filter(Boolean);
    F.push({ at: 'kl', msg: manh ? 'Dài ít nhất 8 và cả ba cờ đều bật: MANH.' : `YEU vì ${why.join(', ')}.`, arrays: [{ name: 'Mật khẩu s', values: c, hl: Object.fromEntries(c.map((_, k) => [k, manh ? 'ok' : 'done'])) }], vars: V(), out: manh ? 'MANH' : 'YEU', fig: true });
    return F;
  },
};
