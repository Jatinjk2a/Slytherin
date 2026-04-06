const fs = require('fs');

['Signup.jsx', 'PasswordReset.jsx', 'Billing.jsx', 'Landing.jsx', 'Settings.jsx', 'Setup.jsx', 'CodeExplain.jsx', 'Score.jsx'].forEach(f => {
  let p = 'src/pages/' + f;
  if(fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/<!--[\s\S]*?-->/g, '');
    fs.writeFileSync(p, c);
  }
});
