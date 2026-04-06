const fs = require('fs');
const https = require('https');

const pages = [
  { name: 'landing.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzBiZjNjNGIzNDE3MTRlMjE5ZTdmZDY5YWQwMWZlMGRjEgsSBxChupr5_AwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzEyMDM1NzE5MDMxMjEzMTYzMg&filename=&opi=89354086' },
  { name: 'settings.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzE2YjBjZGYwMDA3YzRhYWNiOWJhNDc4MjA1ZTk5NzM3EgsSBxChupr5_AwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzEyMDM1NzE5MDMxMjEzMTYzMg&filename=&opi=89354086' },
  { name: 'curator.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2YyNjg2YmE2Yjk5ZjRlNzlhZTRmOGY4YjQ1ZjA5NTA2EgsSBxChupr5_AwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzEyMDM1NzE5MDMxMjEzMTYzMg&filename=&opi=89354086' },
  { name: 'history.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzA1NjhhOWYzMmI4MjQ1ZTJhZGJhYjJjNDZjMDI2MGZhEgsSBxChupr5_AwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzEyMDM1NzE5MDMxMjEzMTYzMg&filename=&opi=89354086' },
];

pages.forEach(p => {
  https.get(p.url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => fs.writeFileSync(p.name, data));
  });
});
