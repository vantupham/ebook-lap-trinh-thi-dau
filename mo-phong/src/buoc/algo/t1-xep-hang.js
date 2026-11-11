const ALGO = {
  id: 't1-xep-hang', title: 'Bảng xếp hạng: sắp xếp nhiều tiêu chí rồi tính hạng',
  desc: 'Sắp theo cặp (−điểm, tên): điểm cao đứng trước, cùng điểm thì tên theo từ điển. Sau đó một lượt duyệt: bạn cùng điểm với bạn ngay trước thì lấy hạng của bạn đó, ngược lại hạng = vị trí.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-2-sap-xep/',
  code: {
    py: ['a.sort(key=lambda x: (-x[1], x[0]))   ⟦sx⟧', 'hang = 0', 'for i, (ten, d) in enumerate(a):   ⟦lap⟧', '    if i == 0 or d != a[i - 1][1]:   ⟦ss⟧', '        hang = i + 1   ⟦moi⟧', '    print(hang, ten, d)   ⟦in⟧'],
    cpp: ['sort(a.begin(), a.end());   // cặp (−điểm, tên)   ⟦sx⟧', 'int hang = 0;', 'for (int i = 0; i < n; i++) {   ⟦lap⟧', '    if (i == 0 || a[i].first != a[i - 1].first)   ⟦ss⟧', '        hang = i + 1;   ⟦moi⟧', "    cout << hang << ' ' << a[i].second << ' ' << -a[i].first << '\\n';   ⟦in⟧", '}'],
  },
  samples: [['5\nAn 8\nBinh 9\nChi 9\nDung 7\nEm 8', 'ví dụ trong bài'], ['4\nTu 5\nNam 5\nLan 5\nHoa 5', 'tất cả đồng điểm']],
  parse(t) {
    const L = t.trim().split(/\s+/), n = +L[0];
    if (!Number.isInteger(n) || n < 1 || n > 10) throw new Error('Hãy chọn 1 ≤ n ≤ 10.');
    if (L.length < 1 + 2 * n) throw new Error('Thiếu dữ liệu: mỗi bạn một dòng "tên điểm".');
    const a = []; for (let i = 0; i < n; i++) { const d = +L[2 + 2 * i]; if (!Number.isInteger(d)) throw new Error('Điểm phải là số nguyên.'); a.push([L[1 + 2 * i], d]); }
    return a;
  },
  random() { const ten = U.shuffle(['An', 'Binh', 'Chi', 'Dung', 'Em', 'Giang', 'Hoa', 'Khoa']).slice(0, U.rnd(4, 7)); return ten.length + '\n' + ten.map((t) => t + ' ' + U.rnd(6, 9)).join('\n'); },
  run(a0) {
    const F = [], a = a0.slice(), lab = (x) => `${x[0]} ${x[1]}`;
    F.push({ at: 'sx', msg: 'Trước khi sắp xếp: thứ tự theo dữ liệu vào.', arrays: [{ name: 'Danh sách', values: a0.map(lab), hl: {}, width: 80 }], fig: true });
    a.sort((x, y) => y[1] - x[1] || (x[0] < y[0] ? -1 : x[0] > y[0] ? 1 : 0));
    F.push({ at: 'sx', msg: 'Sau khi sắp theo (−điểm, tên): điểm giảm dần, cùng điểm thì tên tăng dần.', arrays: [{ name: 'Danh sách đã sắp xếp', values: a.map(lab), hl: {}, width: 80 }], fig: true });
    const hang = []; let h = 0;
    a.forEach((x, i) => {
      const moi = i === 0 || x[1] !== a[i - 1][1]; if (moi) h = i + 1; hang.push(h);
      const A = [{ name: 'Danh sách đã sắp xếp', values: a.map(lab), hl: { [i]: 'cur', ...(i ? { [i - 1]: 'mark' } : {}) }, ptr: { i }, width: 80 }, { name: 'Hạng', values: hang.slice(), hl: { [i]: moi ? 'ok' : 'mark' }, width: 80 }];
      F.push({ at: moi ? 'ss moi' : 'ss', msg: i === 0 ? `Bạn đầu tiên: hạng 1.` : moi ? `${x[0]} (${x[1]}) khác điểm ${a[i - 1][0]} (${a[i - 1][1]}): hạng = vị trí = ${h}.` : `${x[0]} cùng ${x[1]} điểm với ${a[i - 1][0]}: <b>đồng hạng</b> ${h}.`, arrays: A, vars: { i, hang: h }, ask: i ? { q: `Hạng của ${x[0]} là bao nhiêu?`, choices: [...new Set([h, i + 1, hang[i - 1]])].sort((p, q) => p - q), answer: h } : undefined, fig: i >= 1 && i <= 2 });
    });
    F.push({ at: 'in', msg: 'Xong: hạng của bạn sau "nhảy" qua các bạn đồng hạng, như trong thể thao.', arrays: [{ name: 'Danh sách đã sắp xếp', values: a.map(lab), hl: {}, width: 80 }, { name: 'Hạng', values: hang, hl: Object.fromEntries(hang.map((_, k) => [k, 'ok'])), width: 80 }], out: a.map((x, i) => `${hang[i]} ${x[0]} ${x[1]}`).join('\n'), fig: true });
    return F;
  },
};
