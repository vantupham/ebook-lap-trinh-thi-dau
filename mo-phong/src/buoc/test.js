// Kiểm thử: mọi mẫu và 200 dữ liệu ngẫu nhiên mỗi thuật toán chạy không lỗi, mọi nhãn dòng mã đều tồn tại,
// và kết quả in ra ở khung cuối khớp với lời giải tham chiếu viết độc lập.
const fs = require('fs'), path = require('path');
const { load } = require('./build.js');
const REF = {
  't4-doan-so': ({ x }) => `! ${x}`,
  't4-thang-thua': ({ n, p }) => { const memo = {}; const w = (i) => { if (i in memo) return memo[i]; return (memo[i] = p.some((x) => x <= i && !w(i - x))); }; let s = ''; for (let i = 1; i <= n; i++) s += w(i) ? 'W' : 'L'; return s; },
  't4-grundy': ({ a, p }) => { const memo = new Map(); const w = (st) => { const key = st.slice().sort((x, y) => x - y).join(','); if (memo.has(key)) return memo.get(key); let r = false; for (let i = 0; i < st.length && !r; i++) for (const x of p) if (x <= st[i]) { const nx = st.slice(); nx[i] -= x; if (!w(nx)) { r = true; break; } } memo.set(key, r); return r; }; return w(a) ? 'THẮNG' : 'THUA'; },
  't4-sa': ({ s }) => [...Array(s.length).keys()].sort((a, b) => (s.slice(a) < s.slice(b) ? -1 : 1)).join(' '),
  't4-kasai': ({ s }) => { const S = new Set(); for (let i = 0; i < s.length; i++) for (let j = i + 1; j <= s.length; j++) S.add(s.slice(i, j)); return String(S.size); },
  't4-giao-doan': ({ Q }) => Q.map((r) => { const [ax, ay, bx, by, cx, cy, dx, dy] = r; const minx = (u, v) => [Math.min(u, v), Math.max(u, v)]; const cr = (ox, oy, px, py, qx, qy) => (px - ox) * (qy - oy) - (py - oy) * (qx - ox); const o1 = cr(ax, ay, bx, by, cx, cy), o2 = cr(ax, ay, bx, by, dx, dy), o3 = cr(cx, cy, dx, dy, ax, ay), o4 = cr(cx, cy, dx, dy, bx, by); if (o1 === 0 && o2 === 0) { const [l1, h1] = ax !== bx || cx !== dx ? minx(ax, bx) : minx(ay, by), [l2, h2] = ax !== bx || cx !== dx ? minx(cx, dx) : minx(cy, dy); const [l3, h3] = minx(ay, by), [l4, h4] = minx(cy, dy); const [l5, h5] = minx(ax, bx), [l6, h6] = minx(cx, dx); return Math.max(l5, l6) <= Math.min(h5, h6) && Math.max(l3, l4) <= Math.min(h3, h4) ? 'YES' : 'NO'; } const s = (x) => Math.sign(x); return s(o1) * s(o2) <= 0 && s(o3) * s(o4) <= 0 ? 'YES' : 'NO'; }).join('\n'),
  't4-bao-loi': ({ P }) => { const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); let k = 0; for (const p of P) { let ext = false; let ang = P.filter((r) => r !== p).map((r) => Math.atan2(r[1] - p[1], r[0] - p[0])).sort((a, b) => a - b); for (let i = 0; i < ang.length; i++) { const g = (i + 1 < ang.length ? ang[i + 1] : ang[0] + 2 * Math.PI) - ang[i]; if (g > Math.PI + 1e-9) ext = true; } if (ext) k++; } return String(k); },
  't4-tang-luong': ({ n, e }) => { const m = e.length; let best = Infinity; for (let s = 0; s < 1 << n; s++) { if (!(s & 1) || (s >> (n - 1) & 1)) continue; let c = 0; for (const [a, b, w] of e) if ((s >> (a - 1) & 1) && !(s >> (b - 1) & 1)) c += w; best = Math.min(best, c); } return String(best); },
  't4-cap-ghep': ({ a, b, e }) => { let best = 0; const go = (u, used, k) => { if (u > a) { best = Math.max(best, k); return; } go(u + 1, used, k); for (const [x, y] of e) if (x === u && !used.has(y)) { used.add(y); go(u + 1, used, k + 1); used.delete(y); } }; go(1, new Set(), 0); return String(best); },
  't4-kosaraju': ({ n, e }) => { const R = Array.from({ length: n + 1 }, (_, i) => { const s = new Set([i]), q = [i]; while (q.length) { const u = q.shift(); for (const [a, b] of e) if (a === u && !s.has(b)) { s.add(b); q.push(b); } } return s; }); const lab = Array(n + 1).fill(0); let c = 0; for (let i = 1; i <= n; i++) if (!lab[i]) { c++; for (let j = 1; j <= n; j++) if (R[i].has(j) && R[j].has(i)) lab[j] = c; } return String(c); },
  't4-cau': ({ n, e }) => { const comps = (skip) => { const p = [...Array(n + 1).keys()], f = (x) => p[x] === x ? x : (p[x] = f(p[x])); e.forEach(([a, b], i) => { if (i !== skip) p[f(a)] = f(b); }); let c = 0; for (let i = 1; i <= n; i++) if (f(i) === i) c++; return c; }; const base = comps(-1); let k = 0; e.forEach((_, i) => { if (comps(i) > base) k++; }); return String(k); },
  't4-cht': ({ n, x, s, f }) => { const dp = [0], Fv = [x, ...f]; for (let i = 1; i <= n; i++) { let b = Infinity; for (let j = 0; j < i; j++) b = Math.min(b, dp[j] + s[i - 1] * Fv[j]); dp.push(b); } return String(dp[n]); },
  't4-li-chao': ({ L, X }) => X.map((x) => Math.min(...L.map(([m, b]) => m * x + b))).join('\n'),
  't4-euler': ({ n, e }) => { const adj = Array.from({ length: n + 1 }, () => []); for (const [a, b] of e) { adj[a].push(b); adj[b].push(a); } let t = 0; const vao = [], ra = []; const go = (u, p) => { vao[u] = ++t; for (const v of adj[u]) if (v !== p) go(v, u); ra[u] = t; }; go(1, 0); return [...Array(n).keys()].map((k) => `${vao[k + 1]} ${ra[k + 1]}`).join('\n'); },
  't4-hld': ({ n, e, qa, qb }) => { const adj = Array.from({ length: n + 1 }, () => []); for (const [a, b] of e) { adj[a].push(b); adj[b].push(a); } const d = Array(n + 1).fill(-1); d[qa] = 0; const q = [qa]; while (q.length) { const u = q.shift(); for (const v of adj[u]) if (d[v] < 0) { d[v] = d[u] + 1; q.push(v); } } return String(d[qb] + 1); },
  't4-chia-can': ({ a, ops }) => { const A = a.slice(), o = []; for (const [k, x, y] of ops) { if (k === 1) A[x - 1] = y; else o.push(A.slice(x - 1, y).reduce((s, z) => s + z, 0)); } return o.join('\n'); },
  't4-mo': ({ a, qs }) => qs.map(([l, r]) => new Set(a.slice(l, r + 1)).size).join('\n'),
  't4-lazy': ({ a, ops }) => { const A = a.slice(), o = []; for (const op of ops) { if (op[0] === 1) for (let i = op[1] - 1; i < op[2]; i++) A[i] += op[3]; else o.push(A.slice(op[1] - 1, op[2]).reduce((x, y) => x + y, 0)); } return o.join('\n'); },
  't4-lazy-max': ({ a, ops }) => { const A = a.slice(), o = []; for (const op of ops) { if (op[0] === 1) for (let i = op[1] - 1; i < op[2]; i++) A[i] += op[3]; else o.push(Math.max(...A.slice(op[1] - 1, op[2]))); } return o.join('\n'); },
  't3-ham-tien-to': ({ s }) => { const n = s.length, pi = []; for (let i = 0; i < n; i++) { let b = 0; for (let L = 1; L <= i; L++) if (s.slice(0, L) === s.slice(i - L + 1, i + 1)) b = L; pi.push(b); } if (s.includes('#')) { const m = s.indexOf('#'); return String(pi.filter((x) => x === m).length); } return pi.join(' '); },
  't3-bam-xau': ({ s, B, M, qs }) => { const code = (t) => { let v = 0n; for (const c of t) v = (v * B + BigInt(c.charCodeAt(0) - 96)) % M; return v; }; return qs.map(([a, b, c, d]) => (b - a === d - c && code(s.slice(a - 1, b)) === code(s.slice(c - 1, d))) ? 'YES' : 'NO').join('\n'); },
  't3-chu-so': ({ N }) => { let c = 0; for (let x = 0; x <= N; x++) { const s = String(x); let ok = true; for (let i = 0; i + 1 < s.length; i++) if (s[i] === s[i + 1]) ok = false; if (ok) c++; } return String(c); },
  't3-khong-giam': ({ N }) => { let c = 0; for (let x = 0; x <= N; x++) { const s = String(x); let ok = true; for (let i = 0; i + 1 < s.length; i++) if (s[i] > s[i + 1]) ok = false; if (ok) c++; } return String(c); },
  't3-ghep-cap': ({ n, e }) => { let b = 0; const m = e.length; for (let s = 0; s < 1 << m; s++) { const u = new Set(); let ok = true, c = 0; for (let i = 0; i < m && ok; i++) if (s >> i & 1) { const [a, d] = e[i]; if (u.has(a) || u.has(d)) ok = false; u.add(a); u.add(d); c++; } if (ok) b = Math.max(b, c); } return String(b); },
  't3-doc-lap': ({ n, w, e }) => { let b = 0; for (let s = 0; s < 1 << n; s++) { if (e.some(([a, c]) => (s >> (a - 1) & 1) && (s >> (c - 1) & 1))) continue; let t = 0; for (let i = 0; i < n; i++) if (s >> i & 1) t += w[i + 1]; b = Math.max(b, t); } return String(b); },
  't3-thang-may': ({ n, x, w }) => { let best = n; const go = (rest, k) => { if (!rest.length) { best = Math.min(best, k); return; } const [f, ...o] = rest; const L = o.length; for (let m = 0; m < 1 << L; m++) { let s = f; const nx = []; for (let i = 0; i < L; i++) if (m >> i & 1) s += o[i]; else nx.push(o[i]); if (s <= x) go(nx, k + 1); } }; go(w, 0); return String(best); },
  't3-phan-cong': ({ n, c }) => { let b = Infinity; const p = (used, i, s) => { if (i === n) { b = Math.min(b, s); return; } for (let j = 0; j < n; j++) if (!used[j]) { used[j] = 1; p(used, i + 1, s + c[i][j]); used[j] = 0; } }; p(Array(n).fill(0), 0, 0); return String(b); },
  't3-luy-thua': ({ a, b, p }) => { let r = 1n; for (let i = 0; i < b; i++) r = r * a % p; return String(r); },
  't3-pascal': ({ n, k, m }) => { let c = 1n; for (let i = 0; i < k; i++) c = c * BigInt(n - i) / BigInt(i + 1); return String(c % BigInt(m)); },
  't3-segtree': ({ n, a, ops }) => { const A = a.slice(), o = []; for (const [k, x, y] of ops) { if (k === 1) A[x - 1] = y; else o.push(Math.min(...A.slice(x - 1, y))); } return o.join('\n'); },
  't3-khach-san': ({ h, r }) => { const H = h.slice(); return r.map((x) => { const i = H.findIndex((v) => v >= x); if (i < 0) return 0; H[i] -= x; return i + 1; }).join(' '); },
  't3-fenwick': ({ n, a, ops }) => { const A = a.slice(), o = []; for (const [k, x, y] of ops) { if (k === 1) A[x] = y; else { let s = 0; for (let i = x; i <= y; i++) s += A[i]; o.push(s); } } return o.join('\n'); },
  't3-nghich-the': ({ a }) => { let c = 0; for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] > a[j]) c++; return String(c); },
  't3-duong-kinh': ({ n, e }) => { let b = 0; for (let s = 1; s <= n; s++) { const d = Array(n + 1).fill(-1); d[s] = 0; const q = [s]; while (q.length) { const u = q.shift(); for (const [a, c] of e) for (const [x, y] of [[a, c], [c, a]]) if (x === u && d[y] < 0) { d[y] = d[u] + 1; q.push(y); } } b = Math.max(b, ...d); } return String(b); },
  't3-lca': ({ n, p, qs }) => qs.map(([a, b]) => { const anc = new Set(); for (let x = a; x; x = p[x]) anc.add(x); let y = b; while (!anc.has(y)) y = p[y]; return y; }).join('\n'),
  't3-kruskal': ({ n, e }) => { let best = Infinity; const m = e.length; if (m > 14) return ''; for (let s = 0; s < 1 << m; s++) { let c = 0, k = 0; const p = [...Array(n + 1).keys()], f = (x) => p[x] === x ? x : (p[x] = f(p[x])); for (let i = 0; i < m; i++) if (s >> i & 1) { k++; c += e[i][0]; p[f(e[i][1])] = f(e[i][2]); } if (k !== n - 1) continue; let r = 0; for (let i = 1; i <= n; i++) if (f(i) === i) r++; if (r === 1) best = Math.min(best, c); } return best === Infinity ? 'IMPOSSIBLE' : String(best); },
  't3-topo': ({ n, e }) => { const used = Array(n + 1).fill(false), o = []; for (let s = 0; s < n; s++) { let pick = 0; for (let v = 1; v <= n && !pick; v++) if (!used[v] && e.every(([a, b]) => b !== v || used[a])) pick = v; if (!pick) return 'IMPOSSIBLE'; used[pick] = true; o.push(pick); } return o.join(' '); },
  't3-dijkstra': ({ n, e }) => { const d = Array(n + 1).fill(Infinity); d[1] = 0; for (let it = 0; it < n; it++) for (const [a, b, c] of e) if (d[a] + c < d[b]) d[b] = d[a] + c; return d.slice(1).map((x) => x === Infinity ? -1 : x).join(' '); },
  't3-floyd': ({ n, e }) => { const out = []; for (let s = 1; s <= n; s++) { const d = Array(n + 1).fill(Infinity); d[s] = 0; for (let it = 0; it < n; it++) for (const [a, b, c] of e) { if (d[a] + c < d[b]) d[b] = d[a] + c; if (d[b] + c < d[a]) d[a] = d[b] + c; } out.push(d.slice(1).map((x) => x === Infinity ? -1 : x).join(' ')); } return out.join('\n'); },
  't2-lis': ({ a }) => { const f = a.map(() => 1); for (let i = 0; i < a.length; i++) for (let j = 0; j < i; j++) if (a[j] < a[i]) f[i] = Math.max(f[i], f[j] + 1); return String(Math.max(...f)); },
  't2-lcs': ({ s, t }) => { const L = (i, j) => i === s.length || j === t.length ? 0 : s[i] === t[j] ? 1 + L(i + 1, j + 1) : Math.max(L(i + 1, j), L(i, j + 1)); return String(L(0, 0)); },
  't2-doi-tien-qhd': ({ c, x }) => { const d = Array(x + 1).fill(Infinity); d[0] = 0; for (let s = 1; s <= x; s++) for (const v of c) if (v <= s) d[s] = Math.min(d[s], d[s - v] + 1); return String(d[x] === Infinity ? -1 : d[x]); },
  't2-cai-tui': ({ h, s, x }) => { let b = 0; for (let m = 0; m < 1 << h.length; m++) { let g = 0, p = 0; h.forEach((v, i) => { if (m >> i & 1) { g += v; p += s[i]; } }); if (g <= x) b = Math.max(b, p); } return String(b); },
  't2-dsu': ({ n, ops }) => { const g = [...Array(n + 1).keys()], o = []; const comp = (u) => g[u]; for (const op of ops) { if (op[0] === 1) { const a = g[op[1]], b = g[op[2]]; for (let i = 1; i <= n; i++) if (g[i] === b) g[i] = a; } else if (op[0] === 2) o.push(g[op[1]] === g[op[2]] ? 'YES' : 'NO'); else o.push(g.slice(1).filter((x) => x === g[op[1]]).length); } return o.join('\n'); },
  't2-do-thi-ham': ({ n, s, sau }) => { const seq = [s]; for (let i = 0; i < 2 * n + 2; i++) seq.push(sau[seq[seq.length - 1]]); for (let t = 0; ; t++) { const b = seq.indexOf(seq[t]); if (b < t) return `${b} ${t - b}`; } },
  't2-bfs-luoi': ({ R, C, g }) => { let A, B; g.forEach((r, i) => [...r].forEach((c, j) => { if (c === 'A') A = [i, j]; if (c === 'B') B = [i, j]; })); const d = g.map((r) => [...r].map(() => -1)); d[A[0]][A[1]] = 0; let fr = [A]; while (fr.length) { const nx = []; for (const [i, j] of fr) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const x = i + a, y = j + b; if (x >= 0 && x < R && y >= 0 && y < C && g[x][y] !== '#' && d[x][y] < 0) { d[x][y] = d[i][j] + 1; nx.push([x, y]); } } fr = nx; } return String(d[B[0]][B[1]]); },
  't2-dfs': ({ n, e }) => { const p = [...Array(n + 1).keys()], f = (x) => p[x] === x ? x : (p[x] = f(p[x])); for (const [a, b] of e) p[f(a)] = f(b); let c = 0; for (let i = 1; i <= n; i++) if (f(i) === i) c++; return String(c); },
  't2-min-deque': ({ a, k }) => { const o = []; for (let i = 0; i + k <= a.length; i++) o.push(Math.min(...a.slice(i, i + k))); return o.join(' '); },
  't2-sparse': ({ a, qs }) => qs.map(([l, r]) => Math.min(...a.slice(l - 1, r))).join('\n'),
  't2-xor': ({ a }) => String(a.find((v) => a.filter((w) => w === v).length % 2 === 1)),
  't2-tau-bitset': ({ R, C, g, s }) => { let co = g.map((r) => [...r].map((c) => c === '.')); const D = { E: [0, 1], W: [0, -1], S: [1, 0], N: [-1, 0] }; for (const ch of s) { const ds = ch === '?' ? Object.values(D) : [D[ch]], m = co.map((r) => r.map(() => false)); for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) if (co[i][j]) for (const [di, dj] of ds) { const a = i + di, b = j + dj; if (a >= 0 && a < R && b >= 0 && b < C && g[a][b] === '.') m[a][b] = true; } co = m; } return String(co.flat().filter(Boolean).length); },
  't2-heap': ({ ops }) => { const a = [], o = []; for (const op of ops) { if (op[0] === '+') a.push(op[1]); else { a.sort((x, y) => x - y); o.push(a.shift()); } } return o.join(' '); },
  't2-noi-day': ({ a }) => { const b = a.slice(); let t = 0; while (b.length > 1) { b.sort((x, y) => x - y); const s = b.shift() + b.shift(); t += s; b.push(s); } return String(t); },
  't2-playlist': ({ a }) => { let b = 0; for (let l = 0; l < a.length; l++) for (let r = l; r < a.length; r++) if (new Set(a.slice(l, r + 1)).size === r - l + 1) b = Math.max(b, r - l + 1); return String(b); },
  't2-set': ({ ops }) => { const s = new Set(), o = []; for (const [c, x] of ops) { if (c === '+') s.add(x); else if (c === '-') s.delete(x); else { const c2 = [...s].filter((v) => v >= x); o.push(c2.length ? Math.min(...c2) : -1); } } return o.join('\n'); },
  't2-ngoac': ({ s }) => { let t = s; while (/\(\)|\[\]|\{\}/.test(t)) t = t.replace(/\(\)|\[\]|\{\}/g, ''); return t ? 'NO' : 'YES'; },
  't2-josephus': ({ n }) => { const a = [...Array(n).keys()].map((x) => x + 1), o = []; let i = 0; while (a.length) { i = (i + 1) % a.length; o.push(a.splice(i, 1)[0]); if (a.length) i %= a.length; } return o.join(' '); },
  't0-doc-du-lieu': ({ a }) => String(a.slice(1, a[0] + 1).reduce((x, y) => x + y, 0)),
  't0-doi-giay': (t) => `${Math.floor(t / 3600)} ${Math.floor(t % 3600 / 60)} ${t % 60}`,
  't0-tam-giac': (x) => { const [a, b, c] = [...x].sort((p, q) => p - q); return a + b <= c ? 'KHONG' : a === c ? 'DEU' : a * a + b * b === c * c ? 'VUONG' : a === b || b === c ? 'CAN' : 'THUONG'; },
  't0-ve-mot': (n) => { let d = 0; while (n !== 1) { n = n % 2 ? 3 * n + 1 : n / 2; d++; } return String(d); },
  't0-thong-ke': (a) => { const mx = Math.max(...a), c = (v) => a.filter((x) => x === v).length; let best = 0; for (let v = 0; v <= 10; v++) if (c(v) > c(best)) best = v; return `${mx} ${c(mx)}\n${best}`; },
  't0-doi-xung': (s) => s === [...s].reverse().join('') ? 'YES' : 'NO',
  't0-mat-khau': (s) => s.length >= 8 && /[A-Z]/.test(s) && /[a-z]/.test(s) && /[0-9]/.test(s) ? 'MANH' : 'YEU',
  't0-so-may-man': ([a, b]) => { let d = 0; for (let n = a; n <= b; n++) { const s = String(n); if (s === [...s].reverse().join('') && [...s].reduce((x, y) => x + +y, 0) % 3 === 0) d++; } return String(d); },
  't0-euclid': ([a, b]) => { const g = (x, y) => y ? g(y, x % y) : x; return String(a / g(a, b) * b); },
  't0-sang': (n) => { let c = 0; for (let v = 2; v <= n; v++) { let p = true; for (let d = 2; d * d <= v; d++) if (v % d === 0) p = false; if (p) c++; } return String(c); },
  't0-kenh-tv': ({ n, m, p, a, b }) => { let cur = p, seen = new Set(); for (let st = 0; ; st++) { const i = b.indexOf(cur); if (i < 0) return String(st); if (seen.has(cur)) return '-1'; seen.add(cur); cur = a[i]; } },
  't1-kadane': (a) => { let b = -Infinity; for (let l = 0; l < a.length; l++) { let s = 0; for (let r = l; r < a.length; r++) { s += a[r]; b = Math.max(b, s); } } return String(b); },
  't1-sap-xep-chen': (a) => a.slice().sort((x, y) => x - y).join(' '),
  't1-xep-hang': (a) => { const b = a.slice().sort((x, y) => y[1] - x[1] || (x[0] < y[0] ? -1 : x[0] > y[0] ? 1 : 0)); return b.map((x) => `${1 + b.filter((y) => y[1] > x[1]).length} ${x[0]} ${x[1]}`).join('\n'); },
  't1-tien-to': ({ a, qs }) => qs.map(([l, r]) => a.slice(l - 1, r).reduce((x, y) => x + y, 0)).join('\n'),
  't1-mang-hieu': ({ n, ops }) => { const b = Array(n).fill(0); for (const [l, r, v] of ops) for (let i = l; i <= r; i++) b[i - 1] += v; return b.join(' '); },
  't1-nhi-phan': ({ a, x }) => String(a.filter((v) => v < x).length),
  't1-nhi-phan-dap-an': ({ k, t }) => { let T = 0; while (k.reduce((s, x) => s + Math.floor(T / x), 0) < t) T++; return String(T); },
  't1-cua-so': ({ a, S }) => { let b = 0; for (let l = 0; l < a.length; l++) { let s = 0; for (let r = l; r < a.length; r++) { s += a[r]; if (s <= S) b = Math.max(b, r - l + 1); } } return String(b); },
  't1-hai-dau': ({ a, x }) => { for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] + a[j] === x) return 'FOUND'; return 'IMPOSSIBLE'; },
  't1-thap-ha-noi': (n) => { const m = []; const r = (k, a, b, c) => { if (!k) return; r(k - 1, a, c, b); m.push(`${a} ${b}`); r(k - 1, c, b, a); }; r(n, 1, 3, 2); return m.length + '\n' + m.join('\n'); },
  't1-xay-tuong-de-quy': (a) => { const st = [0]; let ans = 0; for (const x of a) { while (st[st.length - 1] > x) st.pop(); if (st[st.length - 1] < x) { st.push(x); ans++; } } return String(ans); },
  't1-quay-lui': (n) => { let c = 0; const u = Array(n + 1).fill(false), p = []; const r = (k) => { if (k === n) { c++; return; } for (let v = 1; v <= n; v++) if (!u[v] && !(k && Math.abs(v - p[k - 1]) === 1)) { u[v] = true; p[k] = v; r(k + 1); u[v] = false; } }; r(0); return String(c); },
  't1-tau-ngam': ({ R, C, g, s }) => { const D = { E: [0, 1], W: [0, -1], S: [1, 0], N: [-1, 0] }; const ends = new Set(); const go = (i, j, k) => { if (k === s.length) { ends.add(i * C + j); return; } for (const d of (s[k] === '?' ? 'NSEW' : s[k])) { const a = i + D[d][0], b = j + D[d][1]; if (a >= 0 && a < R && b >= 0 && b < C && g[a][b] === '.') go(a, b, k + 1); } }; for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) if (g[i][j] === '.') go(i, j, 0); return String(ends.size); },
  't1-tham-lam': (p) => { let b = 0; const n = p.length; for (let m = 0; m < 1 << n; m++) { const s = p.filter((_, i) => m >> i & 1).sort((x, y) => x[0] - y[0]); if (s.every((x, i) => !i || s[i - 1][1] <= x[0])) b = Math.max(b, s.length); } return String(b); },
};
let bad = 0;
for (const f of fs.readdirSync(path.join(__dirname, 'algo')).sort()) {
  const A = load(fs.readFileSync(path.join(__dirname, 'algo', f), 'utf8'));
  const tags = {}; for (const [l, lines] of Object.entries(A.code)) tags[l] = new Set(lines.flatMap((ln) => { const m = ln.match(/⟦(\w+)⟧\s*$/); return m ? m[1].split('_') : []; }).concat(lines.flatMap((ln) => { const m = ln.match(/⟦(\w+)⟧\s*$/); return m ? [m[1]] : []; })));
  let n = 0, err = 0;
  const inputs = A.samples.map((s) => s[0]).concat(Array.from({ length: 200 }, () => A.random()));
  for (const inp of inputs) {
    let d, fr; try { d = A.parse(inp); fr = A.run(d); } catch (e) { if (/quá lớn/.test(e.message)) continue; err++; if (err < 3) console.log('  LỖI', A.id, JSON.stringify(inp), e.message); continue; }
    n++;
    const last = fr[fr.length - 1];
    if (REF[A.id] && (A.id === 't1-hai-dau' ? (last.out === 'IMPOSSIBLE' ? 'IMPOSSIBLE' : 'FOUND') : last.out) !== REF[A.id](d)) { err++; if (err < 3) console.log('  SAI', A.id, JSON.stringify(inp), last.out, '≠', REF[A.id](d)); }
    for (const x of fr) {
      for (const l of Object.keys(A.code)) if (x.at && !String(x.at).split(' ').some((t) => tags[l].has(t))) { err++; if (err < 3) console.log('  NHÃN', A.id, l, x.at); }
      if (x.ask && !x.ask.choices.map(String).includes(String(x.ask.answer))) { err++; if (err < 3) console.log('  HỎI', A.id, x.ask.q); }
    }
  }
  console.log(`${err ? 'SAI' : 'OK '} ${A.id.padEnd(18)} ${n} dữ liệu`);
  bad += err;
}
console.log('TỔNG SỐ LỖI:', bad);
process.exit(bad ? 1 : 0);
