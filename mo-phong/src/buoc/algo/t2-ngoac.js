const ALGO = {
  id: 't2-ngoac', title: 'Ngăn xếp: kiểm tra dấu ngoặc',
  desc: 'Gặp ngoặc mở thì <b>đẩy</b> vào ngăn xếp. Gặp ngoặc đóng thì so với <b>đỉnh</b>: khớp loại thì bỏ đỉnh, không khớp (hoặc ngăn xếp rỗng) thì xâu sai. Hết xâu, ngăn xếp phải rỗng.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-1-ngan-xep-hang-doi/',
  code: {
    py: ['st = []   ⟦khoi⟧', 'for c in s:', '    if c in "([{": st.append(c)   ⟦day⟧', '    else:', '        if not st or st[-1] != mo[c]: ok = False; break   ⟦sai⟧', '        st.pop()   ⟦bo⟧', 'if st: ok = False   ⟦cuoi⟧', 'print("YES" if ok else "NO")   ⟦in⟧'],
    cpp: ['stack<char> st;   ⟦khoi⟧', 'for (char c : s) {', '    if (c == \'(\' || c == \'[\' || c == \'{\') st.push(c);   ⟦day⟧', '    else {', '        if (st.empty() || st.top() != mo(c)) { ok = false; break; }   ⟦sai⟧', '        st.pop();   ⟦bo⟧', '    }', '}', 'if (!st.empty()) ok = false;   ⟦cuoi⟧', 'cout << (ok ? "YES" : "NO");   ⟦in⟧'],
  },
  samples: [['([]{()})', 'hợp lệ'], ['([)]', 'đóng sai loại'], ['{[]}(', 'thừa ngoặc mở'], ['())(', 'đóng khi rỗng']],
  parse(t) { const s = t.replace(/\s+/g, ''); if (!s.length || s.length > 24) throw new Error('Nhập xâu dài 1–24 ký tự.'); if (/[^()[\]{}]/.test(s)) throw new Error('Xâu chỉ gồm các ký tự ()[]{}.'); return { s }; },
  random() { if (Math.random() < .5) { let s = ''; const go = (d) => { const k = U.rnd(1, 2); for (let i = 0; i < k && s.length < 14; i++) { const p = U.pick(['()', '[]', '{}']); s += p[0]; if (d < 2 && Math.random() < .6) go(d + 1); s += p[1]; } }; go(0); return s; } return Array.from({ length: U.rnd(4, 10) }, () => U.pick('()[]{}'.split(''))).join(''); },
  run({ s }) {
    const F = [], st = [], MO = { ')': '(', ']': '[', '}': '{' }; let ok = true, i = 0;
    const view = (hl = {}) => [{ name: 'Xâu (đang xét: ô vàng)', values: [...s], hl, noIdx: false }, { name: 'Ngăn xếp (đáy → đỉnh)', values: st.slice(), hl: st.length ? { [st.length - 1]: 'mark' } : {}, ptr: st.length ? { 'đỉnh': st.length - 1 } : {}, noIdx: true }];
    const done = (k) => Object.fromEntries([...Array(k).keys()].map((x) => [x, 'done']));
    F.push({ at: 'khoi', msg: 'Ngăn xếp rỗng. Duyệt từng ký tự từ trái sang phải.', arrays: view(), vars: { 'kích thước': 0 }, fig: true });
    for (i = 0; i < s.length; i++) {
      const c = s[i];
      if ('([{'.includes(c)) { st.push(c); F.push({ at: 'day', msg: `'${c}' là ngoặc mở: đẩy vào ngăn xếp.`, arrays: view({ ...done(i), [i]: 'cur' }), vars: { 'kích thước': st.length }, ask: { q: `Ký tự '${c}': làm gì?`, choices: ['đẩy vào', 'so với đỉnh'], answer: 'đẩy vào' }, fig: i < 4 }); continue; }
      const top = st.length ? st[st.length - 1] : null, kq = top === null ? 'ngăn xếp rỗng' : top === MO[c] ? 'khớp' : 'không khớp';
      const ask = { q: `Ký tự '${c}', đỉnh ngăn xếp ${top === null ? 'đang rỗng' : `là '${top}'`}. Kết quả?`, choices: ['khớp', 'không khớp', 'ngăn xếp rỗng'], answer: kq };
      if (kq !== 'khớp') { ok = false; F.push({ at: 'sai', msg: kq === 'ngăn xếp rỗng' ? `'${c}' đóng nhưng không còn ngoặc mở nào: xâu sai.` : `'${c}' cần '${MO[c]}' nhưng đỉnh là '${top}': xâu sai.`, arrays: view({ ...done(i), [i]: 'bad' }), vars: { 'kích thước': st.length }, ask, fig: true }); break; }
      st.pop(); F.push({ at: 'bo', msg: `'${c}' khớp với đỉnh '${top}': bỏ đỉnh.`, arrays: view({ ...done(i), [i]: 'ok' }), vars: { 'kích thước': st.length }, ask, fig: i < 4 });
    }
    if (ok && st.length) { ok = false; F.push({ at: 'cuoi', msg: `Hết xâu nhưng còn ${st.length} ngoặc mở chưa đóng: xâu sai.`, arrays: view(done(s.length)), vars: { 'kích thước': st.length }, fig: true }); }
    F.push({ at: 'in', msg: ok ? 'Hết xâu, ngăn xếp rỗng: hợp lệ.' : 'Kết luận: không hợp lệ.', arrays: view(done(Math.min(i + 1, s.length))), vars: { 'kích thước': st.length }, out: ok ? 'YES' : 'NO', fig: true });
    return F;
  },
};
