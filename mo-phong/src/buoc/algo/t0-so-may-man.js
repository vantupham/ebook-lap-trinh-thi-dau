const ALGO = {
  id: 't0-so-may-man', title: 'Hàm gọi hàm: số may mắn',
  desc: 'Mỗi lần gọi hàm, máy đặt một "khung" lên <b>ngăn gọi hàm</b> với biến riêng của nó; <code>return</code> thì gỡ khung xuống và mang giá trị về chỗ gọi.',
  lesson: '../tap-0-nhap-mon/bai-0-7-ham/',
  code: {
    py: ['def tong_chu_so(n):   ⟦tcs⟧', '    s = 0', '    while n > 0:   ⟦tlap⟧', '        s += n % 10   ⟦tlap⟧', '        n //= 10   ⟦tlap⟧', '    return s   ⟦tret⟧', '', 'def la_doi_xung(n):   ⟦dx⟧', '    t = str(n)', '    return t == t[::-1]   ⟦dxret⟧', '', 'def may_man(n):   ⟦mm⟧', '    return la_doi_xung(n) and tong_chu_so(n) % 3 == 0   ⟦mmret⟧', '', 'a, b = map(int, input().split())', 'dem = 0', 'for n in range(a, b + 1):   ⟦lap⟧', '    if may_man(n):   ⟦goi⟧', '        dem += 1   ⟦tang⟧', 'print(dem)   ⟦in⟧'],
    cpp: ['int tong_chu_so(int n) {   ⟦tcs⟧', '    int s = 0;', '    while (n > 0) { s += n % 10; n /= 10; }   ⟦tlap⟧', '    return s;   ⟦tret⟧', '}', 'bool la_doi_xung(int n) {   ⟦dx⟧', '    int goc = n, dao = 0;', '    while (n > 0) { dao = dao * 10 + n % 10; n /= 10; }', '    return dao == goc;   ⟦dxret⟧', '}', 'bool may_man(int n) {   ⟦mm⟧', '    return la_doi_xung(n) && tong_chu_so(n) % 3 == 0;   ⟦mmret⟧', '}', 'int main() {', '    int a, b, dem = 0; cin >> a >> b;', '    for (int n = a; n <= b; n++)   ⟦lap⟧', '        if (may_man(n)) dem++;   ⟦goi_tang⟧', "    cout << dem << '\\n';   ⟦in⟧", '}'],
  },
  samples: [['1 30', 'ví dụ 1'], ['30 70', 'ví dụ 2'], ['118 125', 'số ba chữ số']],
  parse(t) { const [a, b] = U.ints(t, 2); if (a < 1 || b < a || b - a > 40) throw new Error('Cần 1 ≤ a ≤ b và b − a ≤ 40 để dễ theo dõi.'); return [a, b]; },
  random() { const a = U.rnd(1, 300); return a + ' ' + (a + U.rnd(5, 20)); },
  run([a, b]) {
    const F = [], tcs = (n) => String(n).split('').reduce((x, y) => x + +y, 0), dx = (n) => String(n) === String(n).split('').reverse().join('');
    let dem = 0;
    const main = (n) => `main: n = ${n}, dem = ${dem}`;
    for (let n = a; n <= b; n++) {
      const detail = F.length < 60;   // chỉ trình bày chi tiết các số đầu, sau đó tóm tắt
      F.push({ at: 'lap', msg: `Xét n = ${n}.`, stack: [main(n)], vars: { n, dem } });
      if (detail) F.push({ at: 'mm goi goi_tang', msg: `Gọi may_man(${n}): đặt khung mới lên ngăn gọi hàm.`, stack: [main(n), `may_man(n = ${n})`], vars: { n, dem }, fig: n === a });
      const d = dx(n);
      if (detail) {
        F.push({ at: 'dx', msg: `may_man gọi la_doi_xung(${n}). Ngăn gọi hàm cao thêm một tầng.`, stack: [main(n), `may_man(n = ${n})`, `la_doi_xung(n = ${n})`], vars: { n, dem }, fig: n === a });
        F.push({ at: 'dxret', msg: `"${n}" đảo ngược là "${String(n).split('').reverse().join('')}": trả về ${d ? 'True' : 'False'}, gỡ khung la_doi_xung.`, stack: [main(n), `may_man(n = ${n})  ← la_doi_xung trả ${d ? 'True' : 'False'}`], vars: { n, dem }, ask: { q: `la_doi_xung(${n}) trả về gì?`, choices: ['True', 'False'], answer: d ? 'True' : 'False' } });
      }
      let ok = false;
      if (d) {
        const t = tcs(n); ok = t % 3 === 0;
        if (detail) {
          F.push({ at: 'tcs tlap', msg: `Vì la_doi_xung đúng nên mới gọi tiếp tong_chu_so(${n}).`, stack: [main(n), `may_man(n = ${n})`, `tong_chu_so(n = ${n})`], vars: { n, dem }, fig: n === 3 });
          F.push({ at: 'tret', msg: `Tổng chữ số = ${t}, trả về ${t}. ${t} % 3 = ${t % 3}.`, stack: [main(n), `may_man(n = ${n})  ← tong_chu_so trả ${t}`], vars: { n, dem }, ask: { q: `Tổng chữ số của ${n} là bao nhiêu?`, choices: U.near(t), answer: t }, fig: n === 3 });
        }
      } else if (detail) F.push({ at: 'mmret', msg: 'la_doi_xung đã sai nên <b>không cần</b> gọi tong_chu_so (toán tử and dừng sớm).', stack: [main(n), `may_man(n = ${n})`], vars: { n, dem } });
      if (ok) dem++;
      F.push({ at: ok ? 'tang goi_tang' : 'goi', msg: `may_man(${n}) trả về ${ok ? 'True: tăng dem' : 'False'}. Khung may_man được gỡ, quay về main.`, stack: [main(n)], vars: { n, dem }, arrays: [{ name: 'Các số may mắn đã tìm', values: [...Array(b - a + 1).keys()].map((k) => a + k).filter((x) => x <= n && dx(x) && tcs(x) % 3 === 0), noIdx: true, hl: {} }] });
    }
    F.push({ at: 'in', msg: `In dem = ${dem}.`, stack: [`main: dem = ${dem}`], vars: { dem }, out: String(dem), fig: true });
    return U.limit(F);
  },
};
