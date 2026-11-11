const ALGO = {
  id: 't1-sap-xep-chen', title: 'Sắp xếp chèn: vì sao tự viết sắp xếp là O(n²)',
  desc: 'Giống xếp bài trên tay: lấy từng lá, đẩy dần sang trái tới khi gặp lá nhỏ hơn hoặc bằng. Đếm số lần so sánh để thấy vì sao thi đấu luôn dùng <code>sort</code> có sẵn (O(n log n)).',
  lesson: '../tap-1-nen-tang-thuat-toan/bai-1-2-sap-xep/',
  code: {
    py: ['for i in range(1, n):   ⟦lay⟧', '    x = a[i]   ⟦lay⟧', '    j = i - 1', '    while j >= 0 and a[j] > x:   ⟦ss⟧', '        a[j + 1] = a[j]   ⟦day⟧', '        j -= 1   ⟦day⟧', '    a[j + 1] = x   ⟦dat⟧', '# Thi đấu: chỉ cần a.sort()   ⟦xong⟧'],
    cpp: ['for (int i = 1; i < n; i++) {   ⟦lay⟧', '    int x = a[i], j = i - 1;   ⟦lay⟧', '    while (j >= 0 && a[j] > x) {   ⟦ss⟧', '        a[j + 1] = a[j]; j--;   ⟦day⟧', '    }', '    a[j + 1] = x;   ⟦dat⟧', '}', '// Thi đấu: chỉ cần sort(a.begin(), a.end());   ⟦xong⟧'],
  },
  samples: [['6\n5 2 4 6 1 3', 'dãy ngẫu nhiên'], ['5\n1 2 3 4 5', 'đã sắp xếp: rất nhanh'], ['5\n5 4 3 2 1', 'ngược hoàn toàn: chậm nhất']],
  parse(t) { const a = U.ints(t, 2), n = a[0]; if (n < 1 || n > 14) throw new Error('Hãy chọn 1 ≤ n ≤ 14.'); if (a.length < n + 1) throw new Error('Thiếu số.'); return a.slice(1, n + 1); },
  random() { const n = U.rnd(5, 10); return n + '\n' + Array.from({ length: n }, () => U.rnd(1, 20)).join(' '); },
  run(a0) {
    const a = a0.slice(), n = a.length, F = []; let ss = 0;
    const A = (hl, ptr = {}) => [{ name: 'Dãy a (xanh: phần đã sắp xếp)', values: a.slice(), hl, ptr }];
    const sorted = (i) => Object.fromEntries([...Array(i).keys()].map((k) => [k, 'done']));
    F.push({ at: 'lay', msg: 'Phần a[0..0] coi như đã sắp xếp. Lần lượt chèn a[1], a[2], … vào đúng chỗ.', arrays: A(sorted(1)), vars: { 'số so sánh': 0 }, fig: true });
    for (let i = 1; i < n; i++) {
      const x = a[i]; let j = i - 1;
      F.push({ at: 'lay', msg: `Lấy x = a[${i}] = ${x} ra khỏi dãy.`, arrays: A({ ...sorted(i), [i]: 'cur' }, { i }), vars: { x, 'số so sánh': ss }, fig: i === 1 });
      while (j >= 0) {
        ss++;
        if (a[j] > x) { a[j + 1] = a[j]; F.push({ at: 'ss day', msg: `a[${j}] = ${a[j]} > ${x}: đẩy ${a[j]} sang phải một ô.`, arrays: A({ ...sorted(i + 1), [j]: 'cur', [j + 1]: 'mark' }, { j }), vars: { x, 'số so sánh': ss } }); j--; }
        else { F.push({ at: 'ss', msg: `a[${j}] = ${a[j]} ≤ ${x}: dừng đẩy.`, arrays: A({ ...sorted(i + 1), [j]: 'ok' }, { j }), vars: { x, 'số so sánh': ss } }); break; }
      }
      a[j + 1] = x;
      F.push({ at: 'dat', msg: `Đặt x = ${x} vào ô ${j + 1}. Phần a[0..${i}] đã sắp xếp.`, arrays: A({ ...sorted(i + 1), [j + 1]: 'ok' }), vars: { x, 'số so sánh': ss }, ask: { q: `x = ${x} được đặt vào ô số mấy?`, choices: [...new Set([j + 1, i, 0])].sort((p, q) => p - q), answer: j + 1 }, fig: i === 1 || i === n - 1 });
    }
    F.push({ at: 'xong', msg: `Xong sau ${ss} lần so sánh. Dãy ngược hoàn toàn cần n(n−1)/2 = ${n * (n - 1) / 2} lần; với n = 10⁵ là 5·10⁹: quá chậm. Hàm sort có sẵn chỉ cần khoảng n·log₂n.`, arrays: A(Object.fromEntries(a.map((_, k) => [k, 'ok']))), vars: { 'số so sánh': ss }, out: a.join(' '), fig: true });
    return F;
  },
};
