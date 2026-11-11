// Tiện ích dùng chung cho mọi thuật toán mô phỏng.
// Mỗi thuật toán khai báo ALGO = { id, title, desc, lesson, code: {py: [...], cpp: [...]}, samples, parse, random, run }.
// run(d) trả về mảng khung hình (frame): { at, msg, vars, arrays, stack, tape, out, ask, fig }.
//   at  : nhãn dòng mã đang chạy; dòng mã nào kết thúc bằng ⟦nhãn⟧ sẽ được tô sáng.
//   ask : { q, choices, answer } để chế độ "Đoán trước" hỏi trước khi hiện khung này.
//   fig : true nếu khung này được xuất thành hình SVG tĩnh cho bài học.
const U = {
  ints(text, min = 1) {
    const a = text.trim().split(/\s+/).filter(Boolean).map(Number);
    if (a.length < min || a.some((x) => !Number.isInteger(x))) throw new Error('Cần nhập ' + (min > 1 ? 'ít nhất ' + min + ' ' : '') + 'số nguyên, cách nhau bởi dấu cách.');
    return a;
  },
  rnd: (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1)),
  pick: (a) => a[Math.floor(Math.random() * a.length)],
  shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
  // ba lựa chọn gồm đáp án đúng và hai số gần đó, trộn ngẫu nhiên nhưng cố định theo giá trị
  near(ans, extra = []) {
    const s = new Set([ans, ...extra]);
    for (let d = 1; s.size < 3; d++) { s.add(ans + d); if (s.size < 3 && ans - d >= 0) s.add(ans - d); }
    return [...s].slice(0, 3).sort((x, y) => x - y);
  },
  limit(frames, max = 1500) {
    if (frames.length > max) throw new Error('Dữ liệu quá lớn để mô phỏng (hơn ' + max + ' bước). Hãy thử dữ liệu nhỏ hơn.');
    return frames;
  },
};
if (typeof module !== 'undefined') module.exports = { U };
