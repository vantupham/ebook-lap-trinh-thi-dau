// Bộ sinh "khung hình" cho mô phỏng ngăn xếp đơn điệu.
// Thuần logic, không đụng tới DOM, để kiểm thử được bằng Node.

const CMP = {
  gt: { label: 'lớn hơn hẳn', keep: (t, x) => t > x, popSym: '≤' },
  lt: { label: 'nhỏ hơn hẳn', keep: (t, x) => t < x, popSym: '≥' },
  ge: { label: 'lớn hơn hoặc bằng', keep: (t, x) => t >= x, popSym: '<' },
  le: { label: 'nhỏ hơn hoặc bằng', keep: (t, x) => t <= x, popSym: '>' },
};

// Chế độ "gần nhất": dir = 'left' | 'right', cmp = 'gt' | 'lt' | 'ge' | 'le'
// h: mảng giá trị, chỉ số hiển thị bắt đầu từ 1.
function nearestFrames(h, dir, cmp) {
  const n = h.length;
  const c = CMP[cmp];
  const frames = [];
  const st = [];
  const ans = Array(n).fill(null);
  const removed = new Set();
  let pushes = 0, pops = 0, compares = 0;
  const order = [];
  for (let k = 0; k < n; k++) order.push(dir === 'left' ? k : n - 1 - k);
  const done = new Set();
  const snap = (extra) => frames.push({
    stack: st.slice(), ans: ans.slice(), removed: [...removed], done: [...done],
    pushes, pops, compares, ...extra,
  });
  snap({ i: null, line: 1, msg: 'Bắt đầu với ngăn xếp rỗng. Ngăn xếp sẽ chứa chỉ số của các phần tử còn có thể là đáp án.' });
  for (const i of order) {
    snap({ i, line: 2, msg: `Xét phần tử ${i + 1} (giá trị ${h[i]}).` });
    while (true) {
      if (st.length === 0) {
        snap({ i, line: 3, msg: 'Ngăn xếp rỗng nên dừng vòng lặp.' });
        break;
      }
      const t = st[st.length - 1];
      compares++;
      if (c.keep(h[t], h[i])) {
        snap({ i, line: 3, cmpWith: t, msg: `Đỉnh là phần tử ${t + 1} (giá trị ${h[t]}). ${h[t]} ${symKeep(cmp)} ${h[i]} nên nó thỏa điều kiện: dừng, giữ lại.` });
        break;
      }
      snap({ i, line: 3, cmpWith: t, msg: `Đỉnh là phần tử ${t + 1} (giá trị ${h[t]}). ${h[t]} ${c.popSym} ${h[i]} nên nó không thỏa điều kiện.` });
      st.pop(); pops++; removed.add(t);
      snap({ i, line: 4, popped: t, msg: `Bỏ phần tử ${t + 1}. Từ nay nó không thể là đáp án của ai: phần tử ${i + 1} gần hơn và "mạnh" hơn nó.` });
    }
    const a = st.length ? st[st.length - 1] : -1;
    ans[i] = a;
    snap({ i, line: 5, answer: a, msg: a >= 0
      ? `Đỉnh còn lại là phần tử ${a + 1}, đó chính là đáp án của phần tử ${i + 1}.`
      : `Ngăn xếp rỗng: phần tử ${i + 1} không có đáp án, ghi 0.` });
    st.push(i); pushes++; done.add(i);
    snap({ i, line: 6, pushed: i, msg: `Đẩy phần tử ${i + 1} vào ngăn xếp. Giá trị trong ngăn xếp vẫn đơn điệu.` });
  }
  snap({ i: null, line: 0, finished: true, msg: `Xong. Có ${pushes} lần đẩy và ${pops} lần bỏ, tổng ${pushes + pops} ≤ 2n = ${2 * n} thao tác.` });
  return frames;
}

function symKeep(cmp) {
  return { gt: '>', lt: '<', ge: '≥', le: '≤' }[cmp];
}

// Chế độ Xây tường: ngăn xếp các "nấc" độ cao, đáy là mặt đất 0.
// Mỗi nấc mở ra = 1 bước xếp: đoạn [start, end], từ độ cao parent lên level.
function brickFrames(a) {
  const n = a.length;
  const frames = [];
  const st = [{ level: 0, start: 0, parent: 0, step: 0 }];
  const blocks = []; // nấc đã đóng: {start, end, parent, level, step}
  let ans = 0, pops = 0;
  const snap = (extra) => frames.push({
    stack: st.map(s => ({ ...s })), blocks: blocks.map(b => ({ ...b })), ans, pops, ...extra,
  });
  snap({ i: null, line: 1, msg: 'Ngăn xếp chỉ có mặt đất (độ cao 0). Chưa có bước xếp nào.' });
  for (let i = 0; i < n; i++) {
    const x = a[i];
    snap({ i, line: 2, msg: `Xét ô ${i + 1}, cần cao ${x}.` });
    while (st[st.length - 1].level > x) {
      const t = st[st.length - 1];
      snap({ i, line: 3, cmpLevel: t.level, msg: `Nấc trên cùng cao ${t.level} > ${x}: nấc này không thể kéo sang ô ${i + 1}.` });
      st.pop(); pops++;
      blocks.push({ start: t.start, end: i - 1, parent: t.parent, level: t.level, step: t.step });
      snap({ i, line: 4, closed: t.step, msg: `Đóng nấc cao ${t.level}: đó là bước ${t.step}, đặt tấm dày ${t.level - t.parent} lên ${t.start + 1 === i ? 'ô ' + i : 'các ô ' + (t.start + 1) + '..' + i}.` });
    }
    const top = st[st.length - 1];
    if (top.level < x) {
      ans++;
      st.push({ level: x, start: i, parent: top.level, step: ans });
      snap({ i, line: 6, opened: ans, msg: `Nấc trên cùng cao ${top.level} < ${x}: mở nấc mới cao ${x}. Đây là bước ${ans}.` });
    } else {
      snap({ i, line: 5, kept: top.step, msg: x === 0
        ? `Ô ${i + 1} cao 0: không cần xếp gì.`
        : `Nấc trên cùng cao đúng ${x}: nấc đó kéo dài thêm tới ô ${i + 1}, không tốn bước mới.` });
    }
  }
  while (st.length > 1) {
    const t = st.pop(); pops++;
    blocks.push({ start: t.start, end: n - 1, parent: t.parent, level: t.level, step: t.step });
  }
  snap({ i: null, line: 0, finished: true, msg: `Hết dãy, đóng mọi nấc còn mở. Số bước ít nhất là ${ans}.` });
  return frames;
}

if (typeof module !== 'undefined') module.exports = { nearestFrames, brickFrames, CMP };
