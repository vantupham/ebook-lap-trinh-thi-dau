const ALGO = {
  id: 't2-do-thi-ham', title: 'Đồ thị hàm: đuôi và vòng',
  desc: 'Mỗi đỉnh x có đúng một cung ra x → sau[x]. Đi từ s theo các cung, ghi bước thứ mấy đã thăm mỗi đỉnh. Gặp lại một đỉnh đã thăm ở bước b khi đang ở bước t: đuôi dài b, vòng dài t − b. Hình dạng giống chữ ρ.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-8-dsu-do-thi-ham/',
  code: {
    py: ['buoc = [-1] * (n + 1); x = s; t = 0   ⟦khoi⟧', 'while buoc[x] == -1:', '    buoc[x] = t; x = sau[x]; t += 1   ⟦di⟧', 'duoi, vong = buoc[x], t - buoc[x]   ⟦gap⟧', 'print(duoi, vong)   ⟦in⟧'],
    cpp: ['vector<int> buoc(n + 1, -1); int x = s, t = 0;   ⟦khoi⟧', 'while (buoc[x] == -1) {', '    buoc[x] = t; x = sau[x]; t++;   ⟦di⟧', '}', 'int duoi = buoc[x], vong = t - buoc[x];   ⟦gap⟧', 'cout << duoi << \' \' << vong;   ⟦in⟧'],
  },
  samples: [['6 1\n2 3 4 5 3 1', 'ví dụ trong bài'], ['5 3\n2 3 1 3 4', 's nằm ngay trên vòng'], ['8 8\n2 3 4 5 6 7 7 1', 'vòng tự lặp']],
  parse(t) { const v = U.ints(t, 3), [n, s] = v; if (n < 1 || n > 14 || s < 1 || s > n) throw new Error('Hãy chọn n ≤ 14, 1 ≤ s ≤ n.'); const a = v.slice(2, 2 + n); if (a.length < n || a.some((x) => x < 1 || x > n)) throw new Error('Cần n số sau[1..n], mỗi số trong 1..n.'); return { n, s, sau: [0, ...a] }; },
  random() { const n = U.rnd(6, 11); return `${n} ${U.rnd(1, n)}\n` + Array.from({ length: n }, () => U.rnd(1, n)).join(' '); },
  run({ n, s, sau }) {
    const F = [], buoc = Array(n + 1).fill(-1); let x = s, t = 0;
    const view = (hl = {}, ptr = {}) => [{ name: 'sau[x] (số dưới: đỉnh x)', values: sau.slice(1), labels: [...Array(n).keys()].map((k) => String(k + 1)), hl, ptr }, { name: 'buoc[x]: bước thứ mấy đã thăm x (· là chưa thăm)', values: buoc.slice(1).map((b) => b < 0 ? '·' : b), labels: [...Array(n).keys()].map((k) => String(k + 1)), hl }];
    F.push({ at: 'khoi', msg: `Bắt đầu ở đỉnh ${s}, bước 0.`, arrays: view({ [s - 1]: 'cur' }, { x: s - 1 }), vars: { x, t }, fig: true });
    while (buoc[x] === -1) {
      buoc[x] = t; const y = sau[x]; t++;
      const hl = Object.fromEntries([...Array(n).keys()].filter((k) => buoc[k + 1] >= 0).map((k) => [k, 'done']));
      F.push({ at: 'di', msg: `Ghi buoc[${x}] = ${t - 1}, đi theo cung ${x} → ${y}.${buoc[y] >= 0 ? ` Đỉnh ${y} đã thăm ở bước ${buoc[y]}!` : ''}`, arrays: view({ ...hl, [y - 1]: buoc[y] >= 0 ? 'bad' : 'cur' }, { x: y - 1 }), vars: { x: y, t }, ask: { q: `Đỉnh tiếp theo sau ${x} là đỉnh nào?`, choices: [...new Set([y, sau[y], x % n + 1])].sort((a, b) => a - b), answer: y }, fig: t <= 6 || buoc[y] >= 0 });
      x = y;
    }
    const duoi = buoc[x], vong = t - buoc[x];
    const hl = {}; for (let k = 1; k <= n; k++) if (buoc[k] >= 0) hl[k - 1] = buoc[k] >= duoi ? 'ok' : 'mark';
    F.push({ at: 'gap in', msg: `Gặp lại ${x} (bước ${buoc[x]}) ở bước ${t}: đuôi dài ${duoi} (xanh dương), vòng dài ${t} − ${buoc[x]} = ${vong} (xanh lá).`, arrays: view(hl, { x: x - 1 }), vars: { duoi, vong }, ask: { q: 'Vòng dài bao nhiêu?', choices: U.near(vong), answer: vong }, out: `${duoi} ${vong}`, fig: true });
    return F;
  },
};
