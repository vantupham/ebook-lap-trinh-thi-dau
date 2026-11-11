const ALGO = {
  id: 't0-ve-mot', title: 'Trò chơi về 1: vòng lặp while',
  desc: 'Lặp <b>khi điều kiện còn đúng</b>. Mỗi vòng: kiểm tra n chẵn hay lẻ, biến đổi n, tăng bộ đếm. Bật "Đoán trước" để tự tính n tiếp theo.',
  lesson: '../tap-0-nhap-mon/bai-0-4-vong-lap/',
  code: {
    py: ['n = int(input())', 'buoc = 0   ⟦khoi⟧', 'while n != 1:   ⟦dk⟧', '    if n % 2 == 0:   ⟦chan⟧', '        n = n // 2   ⟦chia⟧', '    else:', '        n = 3 * n + 1   ⟦nhan⟧', '    buoc += 1   ⟦dem⟧', 'print(buoc)   ⟦in⟧'],
    cpp: ['long long n;', 'cin >> n;', 'int buoc = 0;   ⟦khoi⟧', 'while (n != 1) {   ⟦dk⟧', '    if (n % 2 == 0) n = n / 2;   ⟦chan_chia⟧', '    else n = 3 * n + 1;   ⟦nhan⟧', '    buoc++;   ⟦dem⟧', '}', "cout << buoc << '\\n';   ⟦in⟧"],
  },
  samples: [['6', 'ví dụ trong bài'], ['1', 'không cần bước nào'], ['7', '16 bước'], ['27', 'rất dài: 111 bước']],
  parse(t) { const [n] = U.ints(t); if (n < 1 || n > 1e6) throw new Error('Cần 1 ≤ n ≤ 10⁶.'); return n; },
  random() { return String(U.rnd(2, 40)); },
  run(n0) {
    const F = [], hist = [n0]; let n = n0, dem = 0;
    const arr = (hl) => [{ name: 'Các giá trị n đã đi qua', values: hist.slice(), noIdx: true, hl }];
    F.push({ at: 'khoi', msg: `Bắt đầu với n = ${n}, bộ đếm buoc = 0.`, vars: { n, buoc: dem }, arrays: arr({ 0: 'cur' }), fig: true });
    while (true) {
      F.push({ at: 'dk', msg: n !== 1 ? `n = ${n} ≠ 1 nên vào vòng lặp.` : 'n = 1: điều kiện n != 1 sai, thoát vòng lặp.', vars: { n, buoc: dem }, arrays: arr({ [hist.length - 1]: 'cur' }) });
      if (n === 1) break;
      const chan = n % 2 === 0, nn = chan ? n / 2 : 3 * n + 1;
      F.push({ at: chan ? 'chan_chia chia' : 'chan', msg: `${n} % 2 = ${n % 2}: n ${chan ? 'chẵn' : 'lẻ'}.`, vars: { n, buoc: dem }, arrays: arr({ [hist.length - 1]: 'cur' }) });
      n = nn; hist.push(n);
      F.push({ at: chan ? 'chia' : 'nhan', msg: chan ? `Chia đôi: n = ${n}.` : `Nhân 3 cộng 1: n = ${n}.`, vars: { n, buoc: dem }, arrays: arr({ [hist.length - 1]: 'cur', [hist.length - 2]: 'done' }), ask: { q: `n tiếp theo là bao nhiêu?`, choices: U.near(n, [chan ? 3 * hist[hist.length - 2] + 1 : Math.floor(hist[hist.length - 2] / 2)]), answer: n }, fig: dem < 2 });
      dem++;
      F.push({ at: 'dem', msg: `Tăng bộ đếm: buoc = ${dem}.`, vars: { n, buoc: dem }, arrays: arr({ [hist.length - 1]: 'cur' }) });
    }
    F.push({ at: 'in', msg: `In buoc = ${dem}. Dãy đã đi qua ${hist.length} giá trị, nên có ${hist.length - 1} bước.`, vars: { n, buoc: dem }, arrays: arr(Object.fromEntries(hist.map((_, i) => [i, 'ok']))), out: String(dem), fig: true });
    return U.limit(F);
  },
};
