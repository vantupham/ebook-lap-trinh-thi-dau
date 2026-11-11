const ALGO = {
  id: 't2-heap', title: 'Bên trong hàng đợi ưu tiên: heap nhỏ nhất',
  desc: 'Heap là cây nhị phân đầy đủ lưu trong mảng: ô i có hai con 2i+1, 2i+2 và cha (i−1)/2; mỗi ô ≤ hai con của nó, nên gốc (ô 0) luôn nhỏ nhất. <b>Thêm</b>: đặt cuối mảng rồi đổi chỗ với cha khi còn nhỏ hơn cha (đi lên). <b>Lấy ra</b>: đưa ô cuối lên gốc rồi đổi chỗ với con nhỏ hơn khi còn lớn hơn nó (đi xuống). Mỗi việc đi tối đa log₂ n tầng.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-3-hang-doi-uu-tien/',
  code: {
    py: ['# thêm x (heapq.heappush)', 'h.append(x); i = len(h) - 1   ⟦dat⟧', 'while i > 0 and h[(i-1)//2] > h[i]:   ⟦len⟧', '    đổi h[i], h[(i-1)//2]; i = (i-1)//2   ⟦len⟧', '# lấy nhỏ nhất (heapq.heappop)', 'kq = h[0]; h[0] = h.pop() nếu còn   ⟦goc⟧', 'while con nhỏ hơn c của i có h[c] < h[i]:   ⟦xuong⟧', '    đổi h[i], h[c]; i = c   ⟦xuong⟧'],
    cpp: ['// pq.push(x)', 'a.push_back(x); int i = a.size() - 1;   ⟦dat⟧', 'while (i > 0 && a[(i-1)/2] > a[i])   ⟦len⟧', '    { swap(a[i], a[(i-1)/2]); i = (i-1)/2; }   ⟦len⟧', '// pq.top(); pq.pop()', 'kq = a[0]; a[0] = a.back(); a.pop_back();   ⟦goc⟧', 'while (con nhỏ hơn c của i có a[c] < a[i])   ⟦xuong⟧', '    { swap(a[i], a[c]); i = c; }   ⟦xuong⟧'],
  },
  samples: [['7\n+ 5\n+ 8\n+ 3\n+ 9\n+ 1\n-\n-', 'thêm 5 số, lấy 2 lần'], ['9\n+ 6\n+ 5\n+ 4\n+ 3\n+ 2\n+ 1\n-\n-\n-', 'thêm dãy giảm'], ['6\n+ 4\n+ 4\n+ 2\n-\n+ 7\n-', 'có giá trị trùng']],
  parse(t) {
    const L = t.trim().split(/\n/).map((s) => s.trim()).filter(Boolean), q = +L[0];
    if (!(q >= 1 && q <= 20)) throw new Error('Dòng đầu là q, 1 ≤ q ≤ 20.');
    const ops = L.slice(1, q + 1).map((s) => { if (s === '-') return ['-']; const m = s.match(/^\+\s+(-?\d+)$/); if (!m) throw new Error('Mỗi thao tác là "+ x" (thêm) hoặc "-" (lấy nhỏ nhất ra).'); return ['+', +m[1]]; });
    if (ops.length < q) throw new Error('Thiếu thao tác.'); let sz = 0; for (const o of ops) { sz += o[0] === '+' ? 1 : -1; if (sz < 0) throw new Error('Lấy ra khi heap rỗng.'); if (sz > 15) throw new Error('Heap tối đa 15 phần tử.'); }
    return { ops };
  },
  random() { const ops = []; let sz = 0; for (let i = 0; i < U.rnd(7, 11); i++) { if (sz > 2 && Math.random() < .35) { ops.push('-'); sz--; } else { ops.push('+ ' + U.rnd(1, 20)); sz++; } } return ops.length + '\n' + ops.join('\n'); },
  run({ ops }) {
    const F = [], h = [], out = [];
    const view = (hl = {}) => { const A = []; for (let lv = 0, s = 0; s < h.length; lv++, s = 2 * s + 1) { const e = Math.min(h.length, 2 * s + 1); A.push({ name: lv === 0 ? 'Tầng 0 (gốc: luôn nhỏ nhất)' : `Tầng ${lv}`, values: h.slice(s, e), labels: [...Array(e - s).keys()].map((k) => 'ô ' + (s + k)), hl: Object.fromEntries(Object.entries(hl).filter(([i]) => i >= s && i < e).map(([i, c]) => [i - s, c])) }); } A.push({ name: 'Mảng lưu heap', values: h.slice(), hl }); return A; };
    F.push({ at: 'dat', msg: 'Heap rỗng.', arrays: view(), vars: { 'kích thước': 0 } });
    let k = -1, nfig = 0; const fg = (stop) => (k >= 4 || (k === 3 && stop)) && nfig++ < 14;
    for (const op of ops) { k++;
      if (op[0] === '+') {
        const x = op[1]; h.push(x); let i = h.length - 1;
        F.push({ at: 'dat', msg: `Thêm ${x}: đặt vào ô cuối (ô ${i}).`, arrays: view({ [i]: 'cur' }), vars: { 'kích thước': h.length, i }, fig: fg() });
        while (i > 0 && h[(i - 1) >> 1] > h[i]) { const p = (i - 1) >> 1; F.push({ at: 'len', msg: `${h[i]} < cha ${h[p]} (ô ${p}): đổi chỗ, đi lên.`, arrays: view({ [i]: 'cur', [p]: 'bad' }), vars: { 'kích thước': h.length, i }, ask: { q: `${h[i]} ở ô ${i}, cha ở ô ${p} là ${h[p]}. Có đổi chỗ không?`, choices: ['có', 'không'], answer: 'có' }, fig: fg() }); [h[i], h[p]] = [h[p], h[i]]; i = p; }
        F.push({ at: 'len', msg: i === 0 ? `${x} lên tới gốc.` : `${x} ≥ cha ${h[(i - 1) >> 1]}: dừng.`, arrays: view({ [i]: 'ok' }), vars: { 'kích thước': h.length, i }, fig: fg(true) });
      } else {
        const kq = h[0]; out.push(kq); const last = h.pop();
        if (h.length) h[0] = last;
        F.push({ at: 'goc', msg: h.length ? `Lấy gốc ${kq} ra (nhỏ nhất). Đưa ô cuối (${last}) lên gốc.` : `Lấy gốc ${kq} ra; heap rỗng.`, arrays: view(h.length ? { 0: 'cur' } : {}), vars: { 'kích thước': h.length, 'lấy ra': kq }, out: out.join(' '), fig: fg() });
        let i = 0;
        for (;;) { const l = 2 * i + 1, r = l + 1; let c = i; if (l < h.length && h[l] < h[c]) c = l; if (r < h.length && h[r] < h[c]) c = r; if (c === i) break;
          const opts = [...new Set([h[c], ...[l, r].filter((k) => k < h.length).map((k) => h[k]), 'không đổi'])];
          F.push({ at: 'xuong', msg: `${h[i]} lớn hơn con nhỏ hơn là ${h[c]} (ô ${c}): đổi chỗ, đi xuống.`, arrays: view({ [i]: 'cur', [c]: 'bad' }), vars: { 'kích thước': h.length, i }, ask: { q: `${h[i]} ở ô ${i} đổi chỗ với con nào?`, choices: opts.map(String), answer: String(h[c]) }, out: out.join(' '), fig: fg() }); [h[i], h[c]] = [h[c], h[i]]; i = c; }
        if (h.length) F.push({ at: 'xuong', msg: `${h[i]} không lớn hơn con nào: dừng. Gốc mới là ${h[0]}.`, arrays: view({ [i]: 'ok' }), vars: { 'kích thước': h.length, i }, out: out.join(' '), fig: fg() });
      }
    }
    F.push({ at: 'goc', msg: `Hết thao tác. Các số lấy ra theo thứ tự: ${out.join(' ') || '(không có)'}.`, arrays: view(), vars: { 'kích thước': h.length }, out: out.join(' '), fig: false });
    return U.limit(F);
  },
};
