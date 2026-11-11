const ALGO = {
  id: 't1-quay-lui', title: 'Quay lui: xếp chỗ ngồi',
  desc: 'Xếp lần lượt từng ghế. Ở ghế k thử từng bạn chưa ngồi; vi phạm thì <b>cắt nhánh</b> ngay; hợp lệ thì đặt vào, xếp ghế tiếp theo, rồi <b>nhấc ra</b> (quay lui) để thử bạn khác.',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-7-vet-can-quay-lui/',
  code: {
    py: ['def xep(k):   ⟦goi⟧', '    global dem', '    if k == n: dem += 1; return   ⟦du⟧', '    for v in range(1, n + 1):   ⟦thu⟧', '        if da_ngoi[v] or (k > 0 and abs(v - ghe[k - 1]) == 1):   ⟦cat⟧', '            continue   ⟦cat⟧', '        ghe[k] = v; da_ngoi[v] = True   ⟦dat⟧', '        xep(k + 1)   ⟦dat⟧', '        da_ngoi[v] = False   ⟦nhac⟧'],
    cpp: ['void xep(int k) {   ⟦goi⟧', '    if (k == n) { dem++; return; }   ⟦du⟧', '    for (int v = 1; v <= n; v++) {   ⟦thu⟧', '        if (da_ngoi[v]) continue;   ⟦cat⟧', '        if (k > 0 && abs(v - ghe[k - 1]) == 1) continue;   ⟦cat⟧', '        ghe[k] = v; da_ngoi[v] = true;   ⟦dat⟧', '        xep(k + 1);   ⟦dat⟧', '        da_ngoi[v] = false;   ⟦nhac⟧', '    }', '}'],
  },
  samples: [['4', 'n = 4: 2 cách'], ['3', 'n = 3: không có cách nào'], ['5', 'n = 5: 14 cách']],
  parse(t) { const [n] = U.ints(t); if (n < 1 || n > 6) throw new Error('Hãy chọn 1 ≤ n ≤ 6 để dễ theo dõi.'); return n; },
  random() { return String(U.rnd(3, 5)); },
  run(n) {
    const F = [], ghe = Array(n).fill(''), da = Array(n + 1).fill(false), found = []; let dem = 0;
    const A = (k, extra = {}) => [{ name: 'Các ghế', values: ghe.slice(), labels: ghe.map((_, i) => 'ghế ' + (i + 1)), hl: { ...Object.fromEntries(ghe.map((g, i) => [i, g === '' ? '' : 'mark'])), ...extra }, ptr: k < n ? { k } : {}, width: 54 }];
    const S = (k) => ['main', ...[...Array(k + 1).keys()].map((j) => `xep(${j})`)];
    const rec = (k) => {
      if (k === n) { dem++; found.push(ghe.join(' ')); F.push({ at: 'du', msg: `Xếp đủ ${n} ghế: <b>một cách hợp lệ</b> (${ghe.join(' ')}). dem = ${dem}.`, arrays: A(k, Object.fromEntries(ghe.map((_, i) => [i, 'ok']))), stack: S(k), vars: { dem }, out: found.join('\n'), fig: dem === 1 }); return; }
      for (let v = 1; v <= n; v++) {
        if (da[v]) continue;
        if (k > 0 && Math.abs(v - ghe[k - 1]) === 1) { F.push({ at: 'thu cat', msg: `Ghế ${k + 1}: thử bạn ${v}, nhưng ${v} và ${ghe[k - 1]} liền nhau: <b>cắt nhánh</b>, không xếp tiếp.`, arrays: A(k, { [k]: 'bad', [k - 1]: 'cur' }), stack: S(k), vars: { dem }, ask: { q: `Có đặt bạn ${v} vào ghế ${k + 1} được không?`, choices: ['được', 'cắt nhánh'], answer: 'cắt nhánh' }, fig: F.length < 6 }); continue; }
        ghe[k] = v; da[v] = true;
        F.push({ at: 'dat', msg: `Ghế ${k + 1}: đặt bạn ${v}, xếp tiếp ghế ${k + 2}.`, arrays: A(k, { [k]: 'cur' }), stack: S(k), vars: { dem }, ask: k > 0 ? { q: `Có đặt bạn ${v} vào ghế ${k + 1} được không?`, choices: ['được', 'cắt nhánh'], answer: 'được' } : undefined, fig: F.length < 6 });
        rec(k + 1);
        da[v] = false; ghe[k] = '';
        F.push({ at: 'nhac', msg: `Quay lui: nhấc bạn ${v} khỏi ghế ${k + 1} để thử bạn khác.`, arrays: A(k, { [k]: 'dim' }), stack: S(k), vars: { dem } });
      }
    };
    F.push({ at: 'goi', msg: 'Bắt đầu: mọi ghế trống, gọi xep(0).', arrays: A(0), stack: S(0), vars: { dem }, fig: true });
    rec(0);
    F.push({ at: 'goi', msg: `Đã thử hết: có ${dem} cách xếp.`, arrays: A(n), stack: ['main'], vars: { dem }, out: String(dem), fig: true });
    return U.limit(F, 2500);
  },
};
