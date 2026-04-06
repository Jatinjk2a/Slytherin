const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/md:pl-72/g, '');
  content = content.replace(/pl-72/g, '');
  content = content.replace(/ml-64/g, '');
  content = content.replace(/fixed top-0/g, 'relative w-full');
  fs.writeFileSync(file, content);
}

fix('src/pages/Curator.jsx');
fix('src/pages/History.jsx');
fix('src/pages/Settings.jsx');
