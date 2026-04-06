const fs = require('fs');

const files = ['Landing.jsx', 'Settings.jsx', 'History.jsx', 'Curator.jsx'];

files.forEach(f => {
  const p = 'src/pages/' + f;
  if (!fs.existsSync(p)) return;
  let d = fs.readFileSync(p, 'utf8');
  // Match the string-based style attribute and convert to React style object
  d = d.replace(/style="font-variation-settings:\s*'FILL'\s*1;"/g, "style={{fontVariationSettings: \"'FILL' 1\"}}");
  fs.writeFileSync(p, d);
});
console.log('Fixed standard styles!');
