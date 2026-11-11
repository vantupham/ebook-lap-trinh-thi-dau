const ALGO = {
  id: 't0-kenh-tv', title: 'Tranh điều khiển TV: tính trước rồi đi theo mảng',
  desc: 'Bước 1: duyệt người xem từ nhỏ tuổi tới lớn tuổi, ghi <code>sau[b] = a</code> nếu ô còn trống. Bước 2: đi từ kênh P theo mảng <code>sau</code>, đánh dấu kênh đã gặp; gặp lại một kênh nghĩa là chuyển mãi.',
  lesson: '../tap-0-nhap-mon/bai-0-9-mo-phong/',
  code: {
    py: ['sau = [0] * (m + 1)   ⟦khoi⟧', 'for i in range(n):   ⟦ghi⟧', '    if sau[b[i]] == 0:   ⟦ghi⟧', '        sau[b[i]] = a[i]   ⟦ghi⟧', 'da_gap = [False] * (m + 1)', 'cur, doi = p, 0   ⟦bd⟧', 'while sau[cur] != 0:   ⟦dk⟧', '    if da_gap[cur]:   ⟦lap⟧', '        doi = -1; break   ⟦lap⟧', '    da_gap[cur] = True   ⟦di⟧', '    cur = sau[cur]   ⟦di⟧', '    doi += 1   ⟦di⟧', 'print(doi)   ⟦in⟧'],
    cpp: ['vector<int> sau(m + 1, 0);   ⟦khoi⟧', 'for (int i = 0; i < n; i++)   ⟦ghi⟧', '    if (sau[b[i]] == 0) sau[b[i]] = a[i];   ⟦ghi⟧', 'vector<bool> da_gap(m + 1, false);', 'int cur = p, doi = 0;   ⟦bd⟧', 'while (sau[cur] != 0) {   ⟦dk⟧', '    if (da_gap[cur]) { doi = -1; break; }   ⟦lap⟧', '    da_gap[cur] = true;   ⟦di⟧', '    cur = sau[cur]; doi++;   ⟦di⟧', '}', 'cout << doi;   ⟦in⟧'],
  },
  samples: [['3 4 2\n3 2\n1 3\n2 4', 'ví dụ 1: dừng sau 2 lần'], ['4 4 1\n2 1\n3 2\n1 3\n4 1', 'ví dụ 2: chuyển mãi'], ['2 3 3\n1 2\n3 1', 'không ai ghét P: đáp án 0']],
  parse(t) {
    const v = U.ints(t, 3), [n, m, p] = v;
    if (n < 1 || m < 2 || m > 12 || n > 12) throw new Error('Để dễ theo dõi, hãy chọn 1 ≤ N ≤ 12 và 2 ≤ M ≤ 12.');
    if (p < 1 || p > m) throw new Error('Cần 1 ≤ P ≤ M.');
    if (v.length < 3 + 2 * n) throw new Error('Thiếu dữ liệu: cần N dòng, mỗi dòng a b.');
    const a = [], b = [];
    for (let i = 0; i < n; i++) { a.push(v[3 + 2 * i]); b.push(v[4 + 2 * i]); if (a[i] < 1 || a[i] > m || b[i] < 1 || b[i] > m || a[i] === b[i]) throw new Error(`Dòng người ${i + 1} không hợp lệ (cần 1 ≤ a, b ≤ M và a ≠ b).`); }
    return { n, m, p, a, b };
  },
  random() { const m = U.rnd(4, 8), n = U.rnd(3, 7), L = [n + ' ' + m + ' ' + U.rnd(1, m)]; for (let i = 0; i < n; i++) { const b = U.rnd(1, m); let a = U.rnd(1, m - 1); if (a >= b) a++; L.push(a + ' ' + b); } return L.join('\n'); },
  run({ n, m, p, a, b }) {
    const F = [], sau = Array(m + 1).fill(0), gap = Array(m + 1).fill(false);
    const lab = [...Array(m).keys()].map((k) => 'kênh ' + (k + 1));
    const A = (hS = {}, ptr = {}) => [
      { name: 'Người xem (a thích → b ghét), từ nhỏ tuổi tới lớn tuổi', values: a.map((x, i) => `${x}←${b[i]}`), labels: a.map((_, i) => 'người ' + (i + 1)), hl: {}, width: 64 },
      { name: 'sau[x] = kênh mà kênh x bị chuyển sang (0: không ai ghét)', values: sau.slice(1), labels: lab, hl: hS, ptr, width: 54 },
      { name: 'da_gap[x]', values: gap.slice(1).map((g) => g ? '✓' : ''), labels: lab, hl: Object.fromEntries(gap.slice(1).map((g, k) => [k, g ? 'mark' : '']).filter(([, v]) => v)), width: 54 },
    ];
    F.push({ at: 'khoi', msg: 'Bước 1: tạo mảng sau toàn 0.', arrays: A(), fig: true });
    for (let i = 0; i < n; i++) {
      const arr = A({ [b[i] - 1]: 'cur' }); arr[0].hl = { [i]: 'cur' };
      if (sau[b[i]] === 0) { sau[b[i]] = a[i]; const arr2 = A({ [b[i] - 1]: 'ok' }); arr2[0].hl = { [i]: 'cur' }; F.push({ at: 'ghi', msg: `Người ${i + 1} ghét kênh ${b[i]}, ô sau[${b[i]}] còn trống: ghi sau[${b[i]}] = ${a[i]}.`, arrays: arr2, ask: { q: `Có ghi sau[${b[i]}] = ${a[i]} không?`, choices: ['có', 'không'], answer: 'có' }, fig: i < 2 }); }
      else { const arr2 = A({ [b[i] - 1]: 'bad' }); arr2[0].hl = { [i]: 'bad' }; F.push({ at: 'ghi', msg: `Người ${i + 1} cũng ghét kênh ${b[i]}, nhưng một người nhỏ tuổi hơn đã ghi trước. Bỏ qua.`, arrays: arr2, ask: { q: `Có ghi sau[${b[i]}] = ${a[i]} không?`, choices: ['có', 'không'], answer: 'không' }, fig: true }); }
    }
    let cur = p, doi = 0;
    F.push({ at: 'bd', msg: `Bước 2: TV đang ở kênh ${p}. Bắt đầu đi theo mảng sau.`, arrays: A({ [cur - 1]: 'cur' }, { cur: cur - 1 }), vars: { cur, doi }, fig: true });
    while (sau[cur] !== 0) {
      if (gap[cur]) { doi = -1; F.push({ at: 'lap', msg: `Kênh ${cur} <b>đã gặp</b> trước đó: từ đây mọi bước sẽ lặp lại y hệt. In −1.`, arrays: A({ [cur - 1]: 'bad' }, { cur: cur - 1 }), vars: { cur, doi }, out: '-1', fig: true }); return F; }
      gap[cur] = true; const nx = sau[cur]; doi++;
      F.push({ at: 'di', msg: `Đánh dấu kênh ${cur}, chuyển sang sau[${cur}] = ${nx}. Số lần chuyển: ${doi}.`, arrays: A({ [nx - 1]: 'cur' }, { cur: nx - 1 }), vars: { cur: nx, doi }, ask: { q: `Từ kênh ${cur}, TV chuyển sang kênh nào?`, choices: [...new Set([nx, cur, p])].sort((x, y) => x - y), answer: nx }, fig: true });
      cur = nx;
    }
    F.push({ at: 'dk in', msg: `sau[${cur}] = 0: không ai ghét kênh ${cur}. Dừng, in ${doi}.`, arrays: A({ [cur - 1]: 'ok' }, { cur: cur - 1 }), vars: { cur, doi }, out: String(doi), fig: true });
    return F;
  },
};
