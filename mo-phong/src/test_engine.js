const { nearestFrames, brickFrames } = require('./engine.js');
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const ok = { gt: (t,x)=>t>x, lt:(t,x)=>t<x, ge:(t,x)=>t>=x, le:(t,x)=>t<=x };
let bad = 0;
for (let t = 0; t < 3000; t++) {
  const n = rnd(1, 12), h = Array.from({length:n}, () => rnd(0, 6));
  for (const dir of ['left','right']) for (const cmp of ['gt','lt','ge','le']) {
    const f = nearestFrames(h, dir, cmp); const got = f[f.length-1].ans;
    for (let i = 0; i < n; i++) {
      let e = -1;
      if (dir === 'left') { for (let j = i-1; j >= 0; j--) if (ok[cmp](h[j], h[i])) { e = j; break; } }
      else { for (let j = i+1; j < n; j++) if (ok[cmp](h[j], h[i])) { e = j; break; } }
      if (got[i] !== e) { bad++; if (bad < 5) console.log('NEAR', dir, cmp, h, got, i, e); }
    }
    const last = f[f.length-1]; if (last.pushes + last.pops > 2*n) { bad++; console.log('ops'); }
  }
  // brick: so voi loi giai stack chuan + dung lai do cao tu cac khoi
  const a = Array.from({length:n}, () => rnd(0, 5));
  const bf = brickFrames(a); const L = bf[bf.length-1];
  let st=[0], ans=0; for (const x of a){ while(st[st.length-1]>x) st.pop(); if(st[st.length-1]<x){st.push(x);ans++;} }
  if (L.ans !== ans) { bad++; console.log('BRICK', a, L.ans, ans); }
  const hh = Array(n).fill(0);
  for (const b of L.blocks) for (let c = b.start; c <= b.end; c++) hh[c] += b.level - b.parent;
  if (hh.join() !== a.join()) { bad++; console.log('RECON', a, hh); }
  if (L.blocks.length !== ans) { bad++; console.log('NBLOCK'); }
  // kiem tra ho tang (long nhau hoac roi nhau)
  for (const x of L.blocks) for (const y of L.blocks) if (x!==y) {
    const dis = x.end < y.start || y.end < x.start, nest = (x.start<=y.start && y.end<=x.end) || (y.start<=x.start && x.end<=y.end);
    if (!dis && !nest) { bad++; console.log('LAMINAR', a); }
  }
}
console.log('bad =', bad);
const f = nearestFrames([5,3,4,1,6,2], 'left', 'gt'); console.log(f.length, f[f.length-1].ans.map(x=>x+1).join(' '));
