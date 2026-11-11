const ALGO = {
  id: 't2-noi-day', title: 'Heap + tham lam: Nối dây',
  desc: 'Mỗi lần lấy <b>hai đoạn ngắn nhất</b> ra khỏi heap nhỏ nhất, nối lại (tốn tổng hai độ dài), rồi đẩy đoạn mới vào heap. Lặp tới khi còn một đoạn.',
  lesson: '../tap-2-cau-truc-du-lieu/bai-2-3-hang-doi-uu-tien/',
  code: {
    py: ['h = a[:]; heapq.heapify(h); tong = 0   ⟦khoi⟧', 'while len(h) > 1:', '    x = heapq.heappop(h); y = heapq.heappop(h)   ⟦lay⟧', '    tong += x + y   ⟦noi⟧', '    heapq.heappush(h, x + y)   ⟦noi⟧', 'print(tong)   ⟦in⟧'],
    cpp: ['priority_queue<ll, vector<ll>, greater<ll>> pq(a.begin(), a.end());   ⟦khoi⟧', 'long long tong = 0;', 'while (pq.size() > 1) {', '    ll x = pq.top(); pq.pop(); ll y = pq.top(); pq.pop();   ⟦lay⟧', '    tong += x + y;   ⟦noi⟧', '    pq.push(x + y);   ⟦noi⟧', '}', 'cout << tong;   ⟦in⟧'],
  },
  samples: [['4\n4 3 2 6', 'ví dụ trong bài'], ['4\n1 1 1 1', 'bốn đoạn bằng nhau'], ['6\n5 2 8 1 9 3', 'sáu đoạn']],
  parse(t) { const v = U.ints(t, 2), n = v[0]; if (n < 1 || n > 12) throw new Error('Hãy chọn 1 ≤ n ≤ 12.'); if (v.length < n + 1 || v.slice(1, n + 1).some((x) => x < 1)) throw new Error('Cần n độ dài dương.'); return { a: v.slice(1, n + 1) }; },
  random() { const n = U.rnd(4, 8); return n + '\n' + Array.from({ length: n }, () => U.rnd(1, 12)).join(' '); },
  run({ a }) {
    const F = [], h = a.slice().sort((x, y) => x - y); let tong = 0, buoc = 0;
    const view = (hl = {}) => [{ name: 'Các đoạn đang có (heap; xếp tăng dần để dễ nhìn)', values: h.slice(), hl, noIdx: true }];
    F.push({ at: 'khoi', msg: `Đưa ${a.length} đoạn vào heap nhỏ nhất. Tổng chi phí = 0.`, arrays: view(), vars: { tong }, fig: true });
    while (h.length > 1) {
      const x = h[0], y = h[1]; buoc++;
      F.push({ at: 'lay', msg: `Lấy hai đoạn ngắn nhất: ${x} và ${y}.`, arrays: view({ 0: 'cur', 1: 'cur' }), vars: { tong, 'lần nối': buoc }, ask: { q: `Lần nối ${buoc} tốn bao nhiêu?`, choices: U.near(x + y, [h.length > 2 ? h[1] + h[2] : x + y + 1]), answer: x + y }, fig: true });
      h.splice(0, 2); tong += x + y; h.push(x + y); h.sort((p, q) => p - q);
      F.push({ at: 'noi', msg: `Nối thành ${x + y}, tốn ${x + y}. Tổng = ${tong}. Đẩy ${x + y} vào heap.`, arrays: view({ [h.indexOf(x + y)]: 'ok' }), vars: { tong, 'lần nối': buoc }, fig: true });
    }
    F.push({ at: 'in', msg: `Còn một đoạn. Chi phí nhỏ nhất: ${tong}.`, arrays: view(), vars: { tong }, out: String(tong), fig: true });
    return F;
  },
};
