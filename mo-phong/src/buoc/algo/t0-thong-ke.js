const ALGO = {
  id: 't0-thong-ke', title: 'Mảng đếm: thống kê điểm',
  desc: 'Thay vì so sánh từng cặp, dùng mảng <code>dem[0..10]</code>: gặp điểm x thì tăng <code>dem[x]</code>. Sau một lượt duyệt, mọi câu hỏi "điểm x xuất hiện mấy lần" đều có ngay đáp án.',
  lesson: '../tap-0-nhap-mon/bai-0-5-mang/',
  code: {
    py: ['n = int(input())', 'a = list(map(int, input().split()))', 'dem = [0] * 11   ⟦khoi⟧', 'for x in a:   ⟦lap⟧', '    dem[x] += 1   ⟦tang⟧', 'cao = 10', 'while dem[cao] == 0:   ⟦cao⟧', '    cao -= 1   ⟦giam⟧', 'print(cao, dem[cao])   ⟦in1⟧', 'tot = 0', 'for k in range(11):   ⟦mlap⟧', '    if dem[k] > dem[tot]:   ⟦mss⟧', '        tot = k   ⟦mgan⟧', 'print(tot)   ⟦in2⟧'],
    cpp: ['int n; cin >> n;', 'int dem[11] = {0};   ⟦khoi⟧', 'for (int i = 0; i < n; i++) {   ⟦lap⟧', '    int x; cin >> x;', '    dem[x]++;   ⟦tang⟧', '}', 'int cao = 10;', 'while (dem[cao] == 0) cao--;   ⟦cao_giam⟧', "cout << cao << ' ' << dem[cao] << '\\n';   ⟦in1⟧", 'int tot = 0;', 'for (int k = 0; k <= 10; k++)   ⟦mlap⟧', '    if (dem[k] > dem[tot]) tot = k;   ⟦mss_mgan⟧', "cout << tot << '\\n';   ⟦in2⟧"],
  },
  samples: [['7\n8 6 9 6 9 7 6', 'ví dụ trong bài'], ['5\n10 10 0 0 5', 'hai điểm cùng nhiều nhất'], ['1\n0', 'chỉ một bạn']],
  parse(t) {
    const a = U.ints(t, 2), n = a[0];
    if (n < 1 || n > 20) throw new Error('Để dễ theo dõi, hãy chọn 1 ≤ n ≤ 20.');
    if (a.length < n + 1) throw new Error('Thiếu điểm: cần đủ n số sau n.');
    const d = a.slice(1, n + 1); if (d.some((x) => x < 0 || x > 10)) throw new Error('Điểm phải từ 0 đến 10.');
    return d;
  },
  random() { const n = U.rnd(5, 12); return n + '\n' + Array.from({ length: n }, () => U.rnd(4, 10)).join(' '); },
  run(a) {
    const F = [], dem = Array(11).fill(0);
    const A = (hlA, hlD, ptrD = {}) => [{ name: 'Dãy điểm a', values: a, hl: hlA }, { name: 'Mảng đếm dem (chỉ số = điểm)', values: dem.slice(), hl: hlD, ptr: ptrD }];
    F.push({ at: 'khoi', msg: 'Tạo mảng dem gồm 11 ô, mọi ô bằng 0. Ô số x sẽ đếm số bạn được x điểm.', arrays: A({}, {}), fig: true });
    a.forEach((x, i) => {
      dem[x]++;
      F.push({ at: 'tang', msg: `Bạn thứ ${i + 1} được ${x} điểm: tăng dem[${x}] lên ${dem[x]}.`, arrays: A({ [i]: 'cur', ...Object.fromEntries([...Array(i).keys()].map((j) => [j, 'done'])) }, { [x]: 'cur' }), ask: { q: `Sau bước này dem[${x}] bằng bao nhiêu?`, choices: U.near(dem[x]), answer: dem[x] }, fig: i < 2 || i === a.length - 1 });
    });
    let cao = 10;
    while (dem[cao] === 0) { F.push({ at: 'cao cao_giam', msg: `dem[${cao}] = 0: không ai được ${cao} điểm, lùi xuống.`, arrays: A({}, { [cao]: 'bad' }, { cao }) }); cao--; }
    F.push({ at: 'in1', msg: `dem[${cao}] = ${dem[cao]} > 0: điểm cao nhất là ${cao}, có ${dem[cao]} bạn. Không cần duyệt lại dãy a.`, arrays: A({}, { [cao]: 'ok' }, { cao }), out: `${cao} ${dem[cao]}`, fig: true });
    let mode = 0;
    for (let v = 0; v <= 10; v++) {
      const better = dem[v] > dem[mode];
      if (better) mode = v;
      F.push({ at: better ? 'mgan mss_mgan' : 'mss mss_mgan', msg: better ? `dem[${v}] = ${dem[v]} lớn hơn hẳn số lần của điểm đang giữ: tot = ${v}.` : `dem[${v}] = ${dem[v]} không lớn hơn dem[${mode}] = ${dem[mode]}: giữ tot = ${mode}.`, arrays: A({}, { [v]: 'cur', [mode]: 'ok' }, { k: v, tot: mode }), out: `${cao} ${dem[cao]}` });
    }
    F.push({ at: 'in2', msg: `Điểm xuất hiện nhiều nhất là ${mode} (${dem[mode]} lần). Vì chỉ đổi khi lớn hơn <b>hẳn</b>, khi hòa ta giữ điểm nhỏ hơn.`, arrays: A({}, { [mode]: 'ok' }, { tot: mode }), out: `${cao} ${dem[cao]}\n${mode}`, fig: true });
    return F;
  },
};
