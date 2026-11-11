const ALGO = {
  id: 't0-doi-xung', title: 'Xâu đối xứng: hai chỉ số đi vào giữa',
  desc: 'Trên xâu đã lọc (chỉ còn chữ và số, đã đổi về chữ thường), so ký tự đầu với ký tự cuối, rồi tiến i lên, lùi j xuống. Gặp một cặp khác nhau là kết luận ngay; i và j gặp nhau mà chưa thấy cặp khác thì xâu đối xứng.',
  lesson: '../tap-0-nhap-mon/bai-0-6-xau-ky-tu/',
  code: {
    py: ['s = input()', 'i, j = 0, len(s) - 1   ⟦khoi⟧', 'ok = True', 'while i < j:   ⟦dk⟧', '    if s[i] != s[j]:   ⟦ss⟧', '        ok = False   ⟦sai⟧', '        break', '    i += 1   ⟦tien⟧', '    j -= 1   ⟦tien⟧', 'print("YES" if ok else "NO")   ⟦in⟧'],
    cpp: ['string s; cin >> s;', 'int i = 0, j = (int)s.size() - 1;   ⟦khoi⟧', 'bool ok = true;', 'while (i < j) {   ⟦dk⟧', '    if (s[i] != s[j]) { ok = false; break; }   ⟦ss_sai⟧', '    i++; j--;   ⟦tien⟧', '}', 'cout << (ok ? "YES" : "NO");   ⟦in⟧'],
  },
  samples: [['racecar', 'đối xứng, độ dài lẻ'], ['abba', 'đối xứng, độ dài chẵn'], ['abcdba', 'không đối xứng'], ['a', 'một ký tự']],
  parse(t) { const s = t.trim(); if (!s || /\s/.test(s) || s.length > 30) throw new Error('Nhập một xâu không có dấu cách, dài 1–30.'); return s; },
  random() { const h = Array.from({ length: U.rnd(2, 5) }, () => U.pick('abc'.split(''))).join(''); const s = h + (Math.random() < .5 ? U.pick(['', 'x']) : '') + [...h].reverse().join(''); return Math.random() < .3 ? s.replace(/.$/, 'z') : s; },
  run(s) {
    const F = [], c = s.split(''); let i = 0, j = c.length - 1;
    const A = (hl) => [{ name: 'Xâu s', values: c, hl, ptr: i <= j ? { i, j } : {} }];
    F.push({ at: 'khoi', msg: `i ở đầu xâu (0), j ở cuối xâu (${j}).`, arrays: A({}), vars: { i, j }, fig: true });
    const doneHl = () => Object.fromEntries(c.map((_, k) => [k, k < i || k > j ? 'ok' : '']).filter(([, v]) => v));
    while (i < j) {
      const same = c[i] === c[j];
      F.push({ at: 'dk ss ss_sai', msg: `So s[${i}] = '${c[i]}' với s[${j}] = '${c[j]}': ${same ? 'giống nhau' : '<b>khác nhau</b>'}.`, arrays: A({ ...doneHl(), [i]: same ? 'cur' : 'bad', [j]: same ? 'cur' : 'bad' }), vars: { i, j }, ask: { q: `s[${i}] và s[${j}] giống hay khác?`, choices: ['giống', 'khác'], answer: same ? 'giống' : 'khác' }, fig: F.length < 4 || !same });
      if (!same) { F.push({ at: 'in', msg: 'Có một cặp khác nhau là đủ kết luận: xâu không đối xứng. Dừng ngay, không so tiếp.', arrays: A({ ...doneHl(), [i]: 'bad', [j]: 'bad' }), vars: { i, j }, out: 'NO', fig: true }); return F; }
      i++; j--;
      F.push({ at: 'tien', msg: `Cặp này khớp. Tiến i = ${i}, lùi j = ${j}.`, arrays: A(doneHl()), vars: { i, j } });
    }
    F.push({ at: 'in', msg: i === j ? `i = j = ${i}: ký tự giữa không cần so. Mọi cặp đều khớp, xâu đối xứng.` : 'i đã vượt j: mọi cặp đều khớp, xâu đối xứng.', arrays: [{ name: 'Xâu s', values: c, hl: Object.fromEntries(c.map((_, k) => [k, 'ok'])) }], vars: { i, j }, out: 'YES', fig: true });
    return F;
  },
};
