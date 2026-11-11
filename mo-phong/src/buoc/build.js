// Dựng trang mô phỏng một tệp cho mọi thuật toán trong algo/, và (tùy chọn) xuất hình SVG cho bài học.
// Chạy:  node build.js            → tạo mo-phong/<id>.html
//        node build.js --svg      → thêm hình SVG vào thư mục hinh/ của bài học tương ứng
const fs = require('fs'), path = require('path');
const HERE = __dirname, OUT = path.resolve(HERE, '../..'), ROOT = path.resolve(OUT, '..');
const player = fs.readFileSync(path.join(HERE, 'player.html'), 'utf8');
const common = fs.readFileSync(path.join(HERE, 'common.js'), 'utf8').replace(/if \(typeof module[^\n]*\n/, '');
const load = (src) => new Function(common + '\n' + src + '\nreturn ALGO;')();
function main() {
const files = fs.readdirSync(path.join(HERE, 'algo')).filter((f) => f.endsWith('.js')).sort();
const all = [];
for (const f of files) {
  const src = fs.readFileSync(path.join(HERE, 'algo', f), 'utf8');
  const A = load(src);
  all.push(A);
  const html = player.replace('/*TITLE*/', A.title).replace('/*ALGO*/', () => common + '\n' + src);
  fs.writeFileSync(path.join(OUT, A.id + '.html'), html);
}
console.log('Đã tạo', all.length, 'trang mô phỏng.');
  // Mục lục các trang mô phỏng, xếp theo bài học
  const strip = (s) => s.replace(/<[^>]+>/g, '');
  const bai = (A) => (A.lesson.match(/bai-(\d+)-(\d+)/) || []).slice(1).map(Number);
  const rows = all.slice().sort((x, y) => bai(x)[0] - bai(y)[0] || bai(x)[1] - bai(y)[1]).map((A) => {
    const [t, b] = bai(A);
    return `| Bài ${t}.${b} | [${A.title}](${A.id}.html) | ${strip(A.desc)} |`;
  });
  rows.splice(rows.findIndex((r) => /Bài [3-9]\./.test(r)) < 0 ? rows.length : rows.findIndex((r) => /Bài [3-9]\./.test(r)), 0,
    '| Bài 2.4 | [Ngăn xếp đơn điệu](ngan-xep-don-dieu.html) | Chạy từng bước, đổi hướng tìm và kiểu so sánh; chế độ Đoán trước; chế độ Xây tường hiện từng bước thành khối màu. |');
  fs.writeFileSync(path.join(OUT, 'README.md'), `# Trang mô phỏng

Mỗi trang chạy một thuật toán **từng bước** trên dữ liệu của em: mã nguồn được tô sáng đúng dòng đang chạy, mảng và biến đổi màu khi thay đổi. Bật **Đoán trước** để trang hỏi em trước mỗi bước quan trọng.

| Bài | Trang | Em sẽ thấy |
| --- | --- | --- |
${rows.join('\n')}

Phím tắt: **→** bước tiếp, **←** lùi, **dấu cách** tự chạy/dừng.

Trên github.com, tệp HTML chỉ hiện mã nguồn. Hãy mở các trang này trên trang web của bộ sách (GitHub Pages), hoặc tải kho về rồi mở bằng trình duyệt.

**Mã nguồn.** \`src/buoc/\`: \`player.html\` là giao diện chung, \`common.js\` các tiện ích, \`algo/*.js\` mỗi tệp một thuật toán; \`node build.js --svg\` dựng các trang và hình SVG cho bài học; \`node test.js\` kiểm tra mọi thuật toán với 200 dữ liệu ngẫu nhiên, so với lời giải tham chiếu. Trang ngăn xếp đơn điệu có mã riêng trong \`src/\` (\`engine.js\`, \`template.html\`, \`build.py\`).
`);

if (process.argv.includes('--svg')) {
  const { svgFrame } = require('./svg.js');
  for (const A of all) {
    const dir = path.join(OUT, A.lesson, 'hinh');   // A.lesson là đường dẫn tương đối từ mo-phong/
    fs.mkdirSync(dir, { recursive: true });
    for (const old of fs.readdirSync(dir)) if (new RegExp('^' + A.id + '-\\d+\\.svg$').test(old)) fs.unlinkSync(path.join(dir, old));
    const frames = A.run(A.parse(A.samples[0][0]));
    let k = 0;
    frames.forEach((fr, i) => { if (fr.fig) fs.writeFileSync(path.join(dir, `${A.id}-${++k}.svg`), svgFrame(A, fr, i, frames)); });
    console.log(A.id, '→', k, 'hình');
  }
}
}
if (require.main === module) main();
module.exports = { load };
