// Sinh hình SVG tĩnh từng bước cho bài 2.4 (dùng chung engine với trang mô phỏng).
// Chạy: node make_svgs.js <thư-mục-đích>
const fs = require('fs');
const path = require('path');
const { nearestFrames, brickFrames } = require('./engine.js');

const OUT = process.argv[2] || 'hinh';
fs.mkdirSync(OUT, { recursive: true });

const C = {
  bg: '#ffffff', ink: '#13252b', muted: '#587077', line: '#d3dee0',
  accent: '#0f7488', accentSoft: '#d6eef2', cur: '#c9730a', curSoft: '#fbe9cf', removed: '#a84c64',
};
const PALETTE = ['#0f7488', '#c9730a', '#6b4fa3', '#1f7a4d', '#a84c64', '#3b6fb6'];
const FONT = "font-family=\"'Be Vietnam Pro','Segoe UI',Arial,sans-serif\"";
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(s, w) {
  const out = []; let cur = '';
  for (const word of s.split(' ')) { if ((cur + ' ' + word).trim().length > w) { out.push(cur); cur = word; } else cur = (cur + ' ' + word).trim(); }
  if (cur) out.push(cur); return out;
}
function txt(x, y, s, o = {}) {
  return `<text x="${x}" y="${y}" font-size="${o.size || 13}" fill="${o.fill || C.ink}"${o.anchor ? ` text-anchor="${o.anchor}"` : ''}${o.weight ? ` font-weight="${o.weight}"` : ''}>${esc(s)}</text>`;
}

// ---------- Ngắm pháo hoa: một hình cho mỗi bước i (trạng thái sau khi ghi đáp án) ----------
function nearSvg(h, f, title, sub) {
  const W = 640, H = 440, base = 310, unit = 30, bw = 56, gap = 18;
  const n = h.length, x0 = 100;
  const X = (k) => x0 + k * (bw + gap);
  const inStack = new Set(f.stack), removed = new Set(f.removed), done = new Set(f.done);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" ${FONT}>`;
  s += `<rect width="${W}" height="${H}" fill="${C.bg}"/>`;
  s += `<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.cur}"/></marker></defs>`;
  s += txt(24, 30, title, { size: 16, weight: 600 });
  wrap(sub, 88).forEach((ln, k) => { s += txt(24, 52 + k * 17, ln, { size: 12.5, fill: C.muted }); });
  s += `<line x1="24" x2="${X(n - 1) + bw + 16}" y1="${base}" y2="${base}" stroke="${C.line}" stroke-width="1.5"/>`;
  for (let k = 0; k < n; k++) {
    const hh = h[k] * unit, y = base - hh;
    let fill = C.line, stroke = 'none', dash = '', sw = 1.5;
    if (k === f.i) { fill = C.curSoft; stroke = C.cur; sw = 2.5; }
    else if (inStack.has(k)) { fill = C.accentSoft; stroke = C.accent; }
    else if (removed.has(k)) { fill = 'none'; stroke = C.removed; dash = ' stroke-dasharray="5 4"'; }
    else if (done.has(k)) { fill = C.line; }
    s += `<rect x="${X(k)}" y="${y}" width="${bw}" height="${hh}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash}/>`;
    s += txt(X(k) + bw / 2, y - 7, h[k], { anchor: 'middle', fill: C.muted });
    s += txt(X(k) + bw / 2, base + 20, k + 1, { anchor: 'middle', weight: k === f.i ? 700 : 400 });
  }
  if (f.answer >= 0) {
    const xi = X(f.i) + bw / 2, xa = X(f.answer) + bw / 2;
    const yi = base - h[f.i] * unit - 24, ya = base - h[f.answer] * unit - 24;
    const peak = Math.max(96, Math.min(yi, ya) - 26);
    s += `<path d="M${xi} ${yi} Q${(xi + xa) / 2} ${peak} ${xa} ${ya}" fill="none" stroke="${C.cur}" stroke-width="2" marker-end="url(#a)"/>`;
  }
  // ô ngăn xếp
  const sy = 350;
  s += txt(24, sy + 20, `Ngăn xếp lúc ghi đáp án, chưa đẩy tòa ${f.i + 1} (đáy → đỉnh):`, { weight: 600 });
  let sx = 400;
  if (!f.stack.length) s += txt(sx, sy + 20, 'rỗng', { fill: C.muted });
  for (const k of f.stack) {
    const label = `${k + 1} (cao ${h[k]})`;
    const w = 14 + label.length * 7.4;
    s += `<rect x="${sx}" y="${sy + 4}" width="${w}" height="24" rx="6" fill="${C.accentSoft}" stroke="${C.accent}"/>`;
    s += txt(sx + w / 2, sy + 21, label, { anchor: 'middle', size: 12.5 });
    sx += w + 8;
  }
  s += txt(24, sy + 56, `Đáp án tới bước này: ${f.ans.map((v) => (v === null ? '·' : v + 1)).join(' ')}`, { fill: C.muted, size: 12.5 });
  // chú thích
  const ly = 380, lx = 420;
  s += `<rect x="${lx}" y="${ly + 30}" width="12" height="12" rx="2" fill="${C.curSoft}" stroke="${C.cur}" stroke-width="2"/>` + txt(lx + 18, ly + 41, 'đang xét', { size: 12, fill: C.muted });
  s += `<rect x="${lx + 80}" y="${ly + 30}" width="12" height="12" rx="2" fill="${C.accentSoft}" stroke="${C.accent}" stroke-width="1.5"/>` + txt(lx + 98, ly + 41, 'trong ngăn xếp', { size: 12, fill: C.muted });
  s += `<rect x="${lx - 100}" y="${ly + 30}" width="12" height="12" rx="2" fill="none" stroke="${C.removed}" stroke-dasharray="3 2" stroke-width="1.5"/>` + txt(lx - 82, ly + 41, 'đã bị bỏ', { size: 12, fill: C.muted });
  s += '</svg>';
  return s;
}

const h = [5, 3, 4, 1, 6, 2];
const fr = nearestFrames(h, 'left', 'gt');
const answerFrames = fr.filter((f) => f.line === 5);
const after = answerFrames.map((f) => fr[fr.indexOf(f)]);
after.forEach((f, idx) => {
  const i = f.i;
  const poppedNow = fr.filter((g) => g.i === i && g.line === 4).map((g) => g.popped + 1);
  const sub = poppedNow.length
    ? `Bỏ ${poppedNow.map((p) => 'tòa ' + p).join(', ')} vì không cao hơn tòa ${i + 1}. ` + (f.answer >= 0 ? `Đỉnh còn lại: tòa ${f.answer + 1}.` : 'Ngăn xếp rỗng: đáp án 0.')
    : (f.answer >= 0 ? `Đỉnh là tòa ${f.answer + 1}, cao hơn tòa ${i + 1}: không bỏ ai, đáp án là ${f.answer + 1}.` : 'Ngăn xếp rỗng: đáp án 0.');
  fs.writeFileSync(path.join(OUT, `phao-hoa-buoc-${i + 1}.svg`), nearSvg(h, f, `Bước ${i + 1}: xét tòa ${i + 1} (cao ${h[i]})`, sub));
});

// ---------- Xây tường: một hình cho mỗi ô, cộng hình kết quả ----------
function brickSvg(a, f, title, sub) {
  const W = 640, H = 330, base = 250, unit = 50, bw = 90, gap = 6, x0 = 60;
  const n = a.length, X = (k) => x0 + k * (bw + gap), Y = (v) => base - v * unit;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" ${FONT}>`;
  s += `<rect width="${W}" height="${H}" fill="${C.bg}"/>`;
  s += txt(24, 30, title, { size: 16, weight: 600 });
  wrap(sub, 92).forEach((ln, k) => { s += txt(24, 52 + k * 17, ln, { size: 12.5, fill: C.muted }); });
  if (f.i !== null) s += `<rect x="${X(f.i) - 3}" y="78" width="${bw + 6}" height="${base - 78}" rx="4" fill="${C.curSoft}"/>`;
  s += `<line x1="24" x2="${W - 24}" y1="${base}" y2="${base}" stroke="${C.line}" stroke-width="1.5"/>`;
  const blocks = f.blocks.slice();
  const openEnd = f.i === null ? n - 1 : f.i;
  for (const st of f.stack) if (st.step > 0) blocks.push({ ...st, end: openEnd, open: true });
  for (const b of blocks) {
    const col = PALETTE[(b.step - 1) % PALETTE.length];
    const x = X(b.start), w = X(b.end) + bw - x, y = Y(b.level), hh = Y(b.parent) - Y(b.level);
    s += `<rect x="${x + 1}" y="${y + 1}" width="${w - 2}" height="${hh - 2}" rx="3" fill="${col}" fill-opacity="${b.open ? 0.3 : 0.5}" stroke="${col}" stroke-width="1.5"${b.open ? ' stroke-dasharray="5 3"' : ''}/>`;
    s += txt(x + w / 2, y + hh / 2 + 5, `Bước ${b.step}`, { anchor: 'middle', weight: 700, size: 13 });
  }
  for (let k = 0; k < n; k++) {
    if (a[k] > 0) s += `<rect x="${X(k)}" y="${Y(a[k])}" width="${bw}" height="${a[k] * unit}" fill="none" stroke="${C.muted}" stroke-dasharray="3 3"/>`;
    s += txt(X(k) + bw / 2, Y(a[k]) - 7, `cần ${a[k]}`, { anchor: 'middle', fill: C.muted, size: 12 });
    s += txt(X(k) + bw / 2, base + 20, `ô ${k + 1}`, { anchor: 'middle', weight: k === f.i ? 700 : 400 });
  }
  const levels = f.stack.map((st) => st.level).join(' → ');
  s += txt(24, base + 52, `Ngăn xếp các nấc (đáy → đỉnh): ${levels}   ·   Số bước: ${f.ans}`, { size: 12.5 });
  s += '</svg>';
  return s;
}
const a = [2, 4, 2, 3, 3];
const bf = brickFrames(a);
for (let i = 0; i < a.length; i++) {
  const last = bf.filter((f) => f.i === i).pop();
  const evs = bf.filter((f) => f.i === i && (f.line === 4 || f.line === 5 || f.line === 6));
  const sub = evs.map((f) => f.msg).join(' ');
  fs.writeFileSync(path.join(OUT, `xay-tuong-o-${i + 1}.svg`), brickSvg(a, last, `Ô ${i + 1}: cần cao ${a[i]}`, sub));
}
const fin = bf[bf.length - 1];
fs.writeFileSync(path.join(OUT, 'xay-tuong-ket-qua.svg'), brickSvg(a, { ...fin, i: null, stack: [{ level: 0, step: 0 }] }, 'Kết quả: 3 bước, các đoạn lồng nhau hoặc rời nhau', 'Bước 1 phủ ô 1..5 dày 2; bước 2 thêm 2 ở ô 2; bước 3 thêm 1 ở ô 4..5.'));
console.log('ok', fs.readdirSync(OUT));
