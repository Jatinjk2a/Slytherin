const fs = require('fs');
const https = require('https');

const url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzFmZGU0YjQxY2IzNzQ5Yjc4OGVmNGQ0ZjQ1YTY3YTI0EgsSBxChupr5_AwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzEyMDM1NzE5MDMxMjEzMTYzMg&filename=&opi=89354086";

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('stitch-dashboard.html', data);
    console.log('Downloaded stitch-dashboard.html');
  });
}).on('error', (e) => {
  console.error(e);
});
