// Vẽ một khung hình mô phỏng thành SVG tĩnh (dùng trong bài học trên GitHub và trang web).
const C = { bg: '#ffffff', ink: '#1b1d3a', muted: '#5d6188', line: '#dcdff0', accent: '#4338ca', accentSoft: '#e4e3fb',
  cur: '#ea7a12', curSoft: '#fdebd6', ok: '#15803d', okSoft: '#dcf3e3', bad: '#c0392b', badSoft: '#f9e0dc', mark: '#0e7490', markSoft: '#d5eff4', msgBg: '#eef0fb' };
const FILL = { cur: [C.curSoft, C.cur], ok: [C.okSoft, C.ok], bad: [C.badSoft, C.bad], mark: [C.markSoft, C.mark], done: [C.accentSoft, C.accent], dim: ['#f3f4f8', C.line], '': ['#ffffff', C.line] };
const FONT = 'font-family="Be Vietnam Pro, Segoe UI, Arial, sans-serif"';
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const strip = (s) => String(s).replace(/<[^>]+>/g, '');
const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size || 14}" font-weight="${o.weight || 400}" fill="${o.fill || C.ink}" text-anchor="${o.anchor || 'start'}"${o.mono ? ' font-family="JetBrains Mono, Consolas, monospace"' : ''}${o.deco ? ` text-decoration="${o.deco}"` : ''}>${esc(s)}</text>`;
function wrap(s, n) { const out = []; let line = ''; for (const w of strip(s).split(' ')) { if ((line + ' ' + w).trim().length > n) { out.push(line.trim()); line = w; } else line += ' ' + w; } if (line.trim()) out.push(line.trim()); return out; }
function svgFrame(A, f, i, frames) {
  const W = 760; let y = 0; const parts = [];
  // tiêu đề bước + lời giải thích
  const lines = wrap(f.msg || '', 92);
  parts.push(`<rect x="12" y="12" width="${W - 24}" height="${30 + lines.length * 20}" rx="12" fill="${C.msgBg}"/><rect x="12" y="12" width="5" height="${30 + lines.length * 20}" rx="2" fill="${C.accent}"/>`);
  parts.push(T(30, 34, `Bước ${i + 1}/${frames.length}`, { size: 12, weight: 700, fill: C.accent }));
  lines.forEach((ln, k) => parts.push(T(30, 54 + k * 20, ln, { size: 14.5, weight: 600 })));
  y = 12 + 30 + lines.length * 20 + 20;
  if (f.tape) {
    parts.push(T(20, y + 12, 'Dữ liệu vào (con trỏ đọc)', { size: 12, weight: 600, fill: C.muted })); y += 22;
    let x = 20;
    f.tape.tokens.forEach((t, k) => { const w = 12 + String(t).length * 9; if (x + w > W - 20) { x = 20; y += 34; }
      const st = k < f.tape.pos ? ['#f3f4f8', C.line, C.muted] : k === f.tape.pos ? [C.curSoft, C.cur, C.ink] : ['#fff', C.line, C.ink];
      parts.push(`<rect x="${x}" y="${y}" width="${w}" height="26" rx="6" fill="${st[0]}" stroke="${st[1]}" stroke-width="1.5"/>`, T(x + w / 2, y + 18, t, { anchor: 'middle', mono: true, fill: st[2], size: 13 })); x += w + 5; });
    y += 44;
  }
  for (const a of f.arrays || []) {
    parts.push(T(20, y + 12, a.name, { size: 12, weight: 600, fill: C.muted })); y += 20;
    const n = a.values.length, cols = a.cols || n, gap = 5;
    const cw = a.cols ? Math.min(66, (W - 40 - gap * (cols - 1)) / cols) : Math.max(a.width || 44, 14 + Math.max(1, ...a.values.map((v) => String(v).length)) * 10);
    const per = a.cols ? cols : Math.max(1, Math.floor((W - 40 + gap) / (cw + gap)));
    const hasPtr = a.ptr && Object.keys(a.ptr).length, hasIdx = !a.noIdx;
    if (!n) parts.push(T(20, y + 22, '(rỗng)', { size: 13, fill: C.muted }));
    a.values.forEach((v, k) => {
      const r = Math.floor(k / per), c = k % per, x = 20 + c * (cw + gap), yy = y + (hasPtr ? 18 : 0) + r * (40 + (hasIdx ? 18 : 6) + (hasPtr ? 18 : 0));
      const [fill, stroke] = FILL[(a.hl || {})[k] || ''];
      parts.push(`<rect x="${x}" y="${yy}" width="${cw}" height="38" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`);
      parts.push(T(x + cw / 2, yy + 24, v, { anchor: 'middle', mono: true, weight: 600, size: 15, fill: (a.hl || {})[k] === 'bad' ? C.bad : (a.hl || {})[k] === 'dim' ? C.muted : C.ink, deco: (a.hl || {})[k] === 'bad' ? 'line-through' : '' }));
      if (hasIdx) parts.push(T(x + cw / 2, yy + 53, a.labels ? a.labels[k] : k + (a.base || 0), { anchor: 'middle', size: 11, fill: C.muted, mono: !a.labels }));
      const p = Object.entries(a.ptr || {}).filter(([, j]) => j === k).map(([nm]) => nm).join(', ');
      if (p) parts.push(T(x + cw / 2, yy - 6, p + ' ↓', { anchor: 'middle', size: 12, weight: 700, fill: C.cur }));
    });
    const rows = Math.ceil(n / per) || 1;
    y += (hasPtr ? 18 : 0) + rows * (40 + (hasIdx ? 18 : 6) + (hasPtr ? 18 : 0)) + 10;
  }
  if (f.vars && Object.keys(f.vars).length) {
    parts.push(T(20, y + 12, 'Biến', { size: 12, weight: 600, fill: C.muted })); y += 20;
    let x = 20; const prev = frames[i - 1] || {};
    for (const [nm, v] of Object.entries(f.vars)) {
      const s = `${nm} = ${v}`, w = 18 + s.length * 8.6; if (x + w > W - 20) { x = 20; y += 36; }
      const ch = prev.vars && prev.vars[nm] !== v;
      parts.push(`<rect x="${x}" y="${y}" width="${w}" height="28" rx="8" fill="${ch ? C.curSoft : '#f6f7fc'}" stroke="${ch ? C.cur : C.line}" stroke-width="1.5"/>`, T(x + 9, y + 19, s, { mono: true, size: 13 })); x += w + 8;
    }
    y += 42;
  }
  if (f.stack) {
    parts.push(T(20, y + 12, 'Ngăn gọi hàm (trên cùng là hàm đang chạy)', { size: 12, weight: 600, fill: C.muted })); y += 20;
    f.stack.slice().reverse().forEach((s, k) => { parts.push(`<rect x="20" y="${y}" width="${W - 40}" height="28" rx="7" fill="${k === 0 ? C.accentSoft : '#f6f7fc'}" stroke="${k === 0 ? C.accent : C.line}" stroke-width="1.5"/>`, T(32, y + 19, s, { mono: true, size: 13, weight: k === 0 ? 600 : 400 })); y += 33; });
    y += 8;
  }
  if (f.out !== undefined) {
    parts.push(T(20, y + 12, 'Kết quả in ra', { size: 12, weight: 600, fill: C.muted })); y += 20;
    const ls = String(f.out).split('\n');
    parts.push(`<rect x="20" y="${y}" width="${W - 40}" height="${14 + ls.length * 20}" rx="8" fill="${C.okSoft}" stroke="${C.ok}" stroke-width="1.5"/>`);
    ls.forEach((l, k) => parts.push(T(32, y + 22 + k * 20, l, { mono: true, size: 14, weight: 600 })));
    y += 24 + ls.length * 20;
  }
  const H = y + 8;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" ${FONT}><rect width="${W}" height="${H}" rx="14" fill="${C.bg}"/>${parts.join('')}</svg>`;
}
module.exports = { svgFrame };
