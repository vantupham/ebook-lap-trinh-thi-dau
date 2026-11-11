const ALGO = {
  id: 't0-doi-giay', title: 'Đổi giây ra giờ, phút, giây',
  desc: 'Chia nguyên <code>//</code> lấy phần nguyên, chia lấy dư <code>%</code> lấy phần thừa. Xem từng phép tính biến đổi t thành h, m, s.',
  lesson: '../tap-0-nhap-mon/bai-0-2-bien-va-phep-toan/',
  code: {
    py: ['t = int(input())   ⟦doc⟧', 'h = t // 3600   ⟦h⟧', 'du = t % 3600   ⟦du⟧', 'm = du // 60   ⟦m⟧', 's = du % 60   ⟦s⟧', 'print(h, m, s)   ⟦in⟧'],
    cpp: ['long long t;', 'cin >> t;   ⟦doc⟧', 'long long h = t / 3600;   ⟦h⟧', 'long long du = t % 3600;   ⟦du⟧', 'long long m = du / 60;   ⟦m⟧', 'long long s = du % 60;   ⟦s⟧', "cout << h << ' ' << m << ' ' << s << '\\n';   ⟦in⟧"],
  },
  samples: [['3725', 'ví dụ trong bài'], ['59', 'chưa tới 1 phút'], ['86399', '23:59:59'], ['1000000000', 't lớn nhất']],
  parse(t) { const [x] = U.ints(t); if (x < 0 || x > 1e9) throw new Error('Cần 0 ≤ t ≤ 10⁹.'); return x; },
  random() { return String(U.rnd(0, 200000)); },
  run(t) {
    const F = [], h = Math.floor(t / 3600), du = t % 3600, m = Math.floor(du / 60), s = du % 60;
    F.push({ at: 'doc', msg: `Đọc t = ${t} giây.`, vars: { t }, fig: true });
    F.push({ at: 'h', msg: `Mỗi giờ có 3600 giây. ${t} chia nguyên 3600 được h = ${h}.`, vars: { t, h }, ask: { q: `${t} // 3600 = ?`, choices: U.near(h), answer: h }, fig: true });
    F.push({ at: 'du', msg: `Phần giây còn thừa sau khi bỏ ${h} giờ: ${t} % 3600 = ${du}.`, vars: { t, h, du }, ask: { q: `${t} % 3600 = ?`, choices: U.near(du), answer: du }, fig: true });
    F.push({ at: 'm', msg: `Trong ${du} giây còn lại có ${du} // 60 = ${m} phút trọn.`, vars: { t, h, du, m }, ask: { q: `${du} // 60 = ?`, choices: U.near(m), answer: m }, fig: true });
    F.push({ at: 's', msg: `Còn lại ${du} % 60 = ${s} giây lẻ.`, vars: { t, h, du, m, s }, ask: { q: `${du} % 60 = ?`, choices: U.near(s), answer: s }, fig: true });
    F.push({ at: 'in', msg: `Kiểm tra: ${h}·3600 + ${m}·60 + ${s} = ${h * 3600 + m * 60 + s} = t. In "${h} ${m} ${s}".`, vars: { t, h, du, m, s }, out: `${h} ${m} ${s}` });
    return F;
  },
};
