const ALGO = {
  id: 't2-playlist', title: 'map + cửa sổ trượt: Danh sách phát',
  desc: 'Cửa sổ [l, r] không có mã bài lặp lại. <b>map</b> lưu vị trí gần nhất của mỗi mã. Thêm bài r: nếu mã của nó từng xuất hiện ở vị trí p ≥ l thì cửa sổ phải bắt đầu sau p, tức l = p + 1.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-2-set-map/',
  code: {
    py: ['gan_nhat = {}; l = best = 0   ⟦khoi⟧', 'for r in range(n):', '    k = a[r]   ⟦xet⟧', '    if k in gan_nhat and gan_nhat[k] >= l:', '        l = gan_nhat[k] + 1   ⟦day⟧', '    gan_nhat[k] = r   ⟦ghi⟧', '    best = max(best, r - l + 1)   ⟦ghi⟧', 'print(best)   ⟦in⟧'],
    cpp: ['map<long long,int> gan_nhat; int l = 0, best = 0;   ⟦khoi⟧', 'for (int r = 0; r < n; r++) {', '    long long k = a[r];   ⟦xet⟧', '    if (gan_nhat.count(k) && gan_nhat[k] >= l)', '        l = gan_nhat[k] + 1;   ⟦day⟧', '    gan_nhat[k] = r;   ⟦ghi⟧', '    best = max(best, r - l + 1);   ⟦ghi⟧', '}', 'cout << best;   ⟦in⟧'],
  },
  samples: [['8\n1 2 1 3 2 7 4 2', 'ví dụ trong bài'], ['6\n1 2 2 3 1 4', 'vị trí cũ nằm ngoài cửa sổ'], ['5\n9 9 9 9 9', 'toàn giống nhau']],
  parse(t) { const v = U.ints(t, 2), n = v[0]; if (n < 1 || n > 16) throw new Error('Hãy chọn 1 ≤ n ≤ 16.'); if (v.length < n + 1) throw new Error('Thiếu số.'); return { a: v.slice(1, n + 1) }; },
  random() { const n = U.rnd(7, 12); return n + '\n' + Array.from({ length: n }, () => U.rnd(1, 6)).join(' '); },
  run({ a }) {
    const F = [], n = a.length, m = new Map(); let l = 0, best = 0, bl = 0, br = -1;
    const view = (r, extra = {}, mk) => { const hl = {}; for (let k = 0; k < l; k++) hl[k] = 'dim'; for (let k = l; k <= r; k++) hl[k] = 'mark'; const keys = [...m.keys()].sort((x, y) => x - y);
      return [{ name: 'Dãy mã bài (xanh dương: cửa sổ [l, r])', values: a, hl: { ...hl, ...extra }, ptr: r >= 0 ? (l <= r ? { l, r } : { r }) : { l } },
        { name: 'map gan_nhat (ô trên: vị trí gần nhất; chữ dưới: mã bài)', values: keys.map((k) => m.get(k)), labels: keys.map((k) => 'mã ' + k), hl: mk !== undefined ? { [keys.indexOf(mk)]: 'cur' } : {} }]; };
    F.push({ at: 'khoi', msg: 'map rỗng, cửa sổ rỗng.', arrays: view(-1), vars: { l, best }, fig: true });
    for (let r = 0; r < n; r++) {
      const k = a[r], had = m.has(k), p = had ? m.get(k) : -1;
      const nl = had && p >= l ? p + 1 : l;
      const ask = { q: `Thêm bài r = ${r} (mã ${k}). l mới bằng bao nhiêu?`, choices: U.near(nl, [l]), answer: nl };
      if (had) F.push({ at: 'xet', msg: `Mã ${k} từng xuất hiện ở vị trí ${p}${p >= l ? ` ≥ l = ${l}: nằm trong cửa sổ, bị lặp.` : ` < l = ${l}: đã ở ngoài cửa sổ, không sao.`}`, arrays: view(r - 1, { [r]: 'cur', [p]: p >= l ? 'bad' : 'dim' }, k), vars: { l, best, r }, ask, fig: r >= 2 && r <= 4 });
      else F.push({ at: 'xet', msg: `Mã ${k} chưa có trong map: không lặp.`, arrays: view(r - 1, { [r]: 'cur' }), vars: { l, best, r }, ask, fig: r < 2 });
      if (nl !== l) { l = nl; F.push({ at: 'day', msg: `Đẩy l lên ${l} (ngay sau vị trí ${p}).`, arrays: view(r - 1, { [r]: 'cur' }, k), vars: { l, best, r }, fig: r >= 2 && r <= 4 }); }
      m.set(k, r); const len = r - l + 1; if (len > best) { best = len; bl = l; br = r; }
      F.push({ at: 'ghi', msg: `Ghi gan_nhat[${k}] = ${r}. Cửa sổ [${l}, ${r}] dài ${len}, best = ${best}.`, arrays: view(r, {}, k), vars: { l, best, r }, fig: r === 6 });
    }
    F.push({ at: 'in', msg: `Xong: đoạn dài nhất không lặp là [${bl}, ${br}], dài ${best}.`, arrays: [{ name: 'Đoạn dài nhất', values: a, hl: Object.fromEntries([...Array(Math.max(0, br - bl + 1)).keys()].map((x) => [bl + x, 'ok'])) }], vars: { best }, out: String(best), fig: true });
    return U.limit(F);
  },
};
