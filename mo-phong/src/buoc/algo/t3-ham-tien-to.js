const ALGO = {
  id: 't3-ham-tien-to', title: 'Hàm tiền tố (KMP)',
  desc: 'π[i] = độ dài tiền tố dài nhất (khác cả đoạn) cũng là hậu tố của s[0..i]. Tính π[i]: bắt đầu từ k = π[i−1]; nếu s[i] ≠ s[k] thì lùi k = π[k−1] (đoạn khớp ngắn hơn) tới khi khớp hoặc k = 0; khớp thì k + 1. Tìm mẫu p trong t: tính π của p + "#" + t, vị trí nào có π = |p| là một lần xuất hiện.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-10-xau-hash-kmp/',
  code: {
    py: ['pi = [0] * n   ⟦khoi⟧', 'for i in range(1, n):', '    k = pi[i - 1]   ⟦batdau⟧', '    while k > 0 and s[i] != s[k]: k = pi[k - 1]   ⟦lui⟧', '    if s[i] == s[k]: k += 1', '    pi[i] = k   ⟦ghi⟧', '    if k == m: dem += 1   # tìm mẫu   ⟦gap⟧'],
    cpp: ['vector<int> pi(n, 0);   ⟦khoi⟧', 'for (int i = 1; i < n; i++) {', '    int k = pi[i - 1];   ⟦batdau⟧', '    while (k > 0 && s[i] != s[k]) k = pi[k - 1];   ⟦lui⟧', '    if (s[i] == s[k]) k++;', '    pi[i] = k;   ⟦ghi⟧', '    if (k == m) dem++;   // tìm mẫu   ⟦gap⟧', '}'],
  },
  samples: [['abacaba', 'ví dụ trong bài'], ['aab#aaabaab', 'tìm mẫu aab'], ['aabaaab', 'lùi nhiều bước']],
  parse(t) { const s = t.trim(); if (!s.length || s.length > 16 || /\s/.test(s)) throw new Error('Nhập một xâu dài 1–16 ký tự, không có dấu cách (có thể chứa # để tìm mẫu).'); return { s }; },
  random() { return Array.from({ length: U.rnd(7, 12) }, () => U.pick(['a', 'a', 'b', 'c'])).join(''); },
  run({ s }) {
    const F = [], n = s.length, pi = Array(n).fill(null), m = s.includes('#') ? s.indexOf('#') : -1; pi[0] = 0; let dem = 0;
    const view = (hl = {}, ptr = {}) => [{ name: 's', values: [...s], hl, ptr }, { name: 'π[i]', values: pi.map((x) => x ?? ''), hl: {} }];
    F.push({ at: 'khoi', msg: `π[0] = 0.${m > 0 ? ` Mẫu dài m = ${m}: π = ${m} ở đâu là mẫu kết thúc ở đó.` : ''}`, arrays: view({ 0: 'done' }), vars: {}, fig: true });
    for (let i = 1; i < n; i++) {
      let k = pi[i - 1]; const steps = [];
      while (k > 0 && s[i] !== s[k]) { steps.push(k); k = pi[k - 1]; }
      if (s[i] === s[k]) k++;
      pi[i] = k; const gap = k === m;
      if (gap) dem++;
      const hl = { [i]: gap ? 'ok' : 'cur' }; for (let j = i - k + 1; j <= i && k; j++) hl[j] = hl[j] || 'mark'; for (let j = 0; j < k; j++) hl[j] = hl[j] || 'mark';
      F.push({ at: steps.length ? 'lui ghi' : 'batdau ghi', msg: `i = ${i} ('${s[i]}'): bắt đầu k = π[${i - 1}] = ${pi[i - 1]}${steps.length ? `, lùi ${steps.map((x) => `${x}→${pi[x - 1]}`).join(', ')}` : ''}; ${s[i] === s[k - 1] && k > 0 ? `khớp s[${k - 1}], π[${i}] = ${k}` : `không khớp, π[${i}] = 0`}.${gap ? ' Bằng m: tìm thấy mẫu!' : ''}`, arrays: view(hl, { i }), vars: { i, k }, ask: { q: `π[${i}] = ?`, choices: U.near(k), answer: k }, fig: i <= 6 });
    }
    F.push({ at: 'gap', msg: m > 0 ? `Xong. Mẫu xuất hiện ${dem} lần.` : `Xong: π = ${pi.join(' ')}.`, arrays: view(), vars: {}, out: m > 0 ? String(dem) : pi.join(' '), fig: true });
    return F;
  },
};
