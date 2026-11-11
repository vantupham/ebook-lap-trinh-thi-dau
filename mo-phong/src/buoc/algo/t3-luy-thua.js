const ALGO = {
  id: 't3-luy-thua', title: 'Lũy thừa nhanh theo modulo',
  desc: 'Duyệt các bit của số mũ b từ thấp tới cao. a lần lượt là a¹, a², a⁴, a⁸… (bình phương mỗi lượt). Bit nào của b bật thì nhân a hiện tại vào kết quả. Chỉ cần khoảng log₂ b lượt.',
  lesson: '../tap-3-do-thi-qhd-nang-cao/bai-3-6-to-hop/',
  code: {
    py: ['kq = 1; a %= p   ⟦khoi⟧', 'while b > 0:', '    if b & 1: kq = kq * a % p   ⟦nhan⟧', '    a = a * a % p   ⟦binh⟧', '    b >>= 1', 'print(kq)   ⟦in⟧'],
    cpp: ['long long kq = 1; a %= p;   ⟦khoi⟧', 'while (b > 0) {', '    if (b & 1) kq = kq * a % p;   ⟦nhan⟧', '    a = a * a % p;   ⟦binh⟧', '    b >>= 1;', '}', 'cout << kq;   ⟦in⟧'],
  },
  samples: [['3 13 1000000007', 'ví dụ trong bài: 3^13'], ['2 10 1000', '2^10 mod 1000'], ['7 100 13', 'số mũ lớn, modulo nhỏ']],
  parse(t) { const [a, b, p] = U.ints(t, 3); if (a < 0 || b < 0 || b > 1e9 || p < 2 || p > 2e9) throw new Error('Cần 0 ≤ a, 0 ≤ b ≤ 10⁹, 2 ≤ p ≤ 2·10⁹.'); return { a: BigInt(a), b, p: BigInt(p) }; },
  random() { return `${U.rnd(2, 9)} ${U.rnd(5, 60)} ${U.pick([1000000007, 1000, 97, 13])}`; },
  run({ a, b, p }) {
    const F = [], bits = b.toString(2).split('').reverse().map(Number); let kq = 1n, x = a % p, k = 0;
    const view = (hl = {}) => [{ name: `Các bit của b = ${b} (từ thấp tới cao)`, values: bits.length ? bits : [0], labels: bits.map((_, i) => '2^' + i), hl }];
    F.push({ at: 'khoi', msg: `kq = 1, a = ${a} mod ${p} = ${x}. b = ${b} = ${bits.slice().reverse().join('')}₂.`, arrays: view(), vars: { kq: String(kq), a: String(x) }, fig: true });
    for (let bb = b; bb > 0; bb = Math.floor(bb / 2), k++) {
      const on = bb % 2 === 1, hl = Object.fromEntries(bits.map((_, i) => [i, i < k ? 'done' : i === k ? (on ? 'ok' : 'dim') : '']));
      if (on) kq = kq * x % p;
      F.push({ at: on ? 'nhan' : 'binh', msg: on ? `Bit ${k} bật: kq = kq · a^${2 ** k} = ${kq}.` : `Bit ${k} tắt: không nhân.`, arrays: view(hl), vars: { kq: String(kq), [`a (= ${String(a)}^${2 ** k})`]: String(x) }, ask: { q: `Bit ${k} của b: có nhân a vào kq không?`, choices: ['có', 'không'], answer: on ? 'có' : 'không' }, fig: k < 6 });
      x = x * x % p;
    }
    F.push({ at: 'in', msg: `Sau ${bits.length} lượt: ${a}^${b} mod ${p} = ${kq}.`, arrays: view(Object.fromEntries(bits.map((v, i) => [i, v ? 'ok' : 'dim']))), vars: { kq: String(kq) }, out: String(kq), fig: true });
    return F;
  },
};
