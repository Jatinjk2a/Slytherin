const fs = require('fs');

function htmlToJsx(htmlStr, componentName, extractMain = true) {
  let content = htmlStr;

  // Extract from <main> or <body>
  if (extractMain) {
    const mainMatch = content.match(/<main([\s\S]*?)<\/main>/);
    if (mainMatch) {
      // In curator.html, it includes header. In landing it doesn't.
      // But landing we want the whole body minus nav bars maybe? Or the whole body.
      // Actually let's just extract everything inside <body> and let the layout handle dupes, OR just replace class and we'll manually wrap it.
    }
  }

  // extract what's inside <body> </body>
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (bodyMatch) {
    content = bodyMatch[1];
  }

  // Strip scripts/styles
  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  content = content.replace(/class=/g, 'className=');
  content = content.replace(/for=/g, 'htmlFor=');
  content = content.replace(/stroke-width/g, 'strokeWidth');
  content = content.replace(/stroke-dasharray/g, 'strokeDasharray');
  content = content.replace(/stroke-dashoffset/g, 'strokeDashoffset');
  content = content.replace(/stroke-linecap/g, 'strokeLinecap');
  
  // Custom styles found in the files:
  // style="font-variation-settings: 'FILL' 1;"
  content = content.replace(/style="font-variation-settings:\s*'FILL'\s*1;"/g, "style={{fontVariationSettings: \"'FILL' 1\"}}");
  
  // Fix unclosed tags if any (br, hr, input, img). 
  // We'll use a naive regex for standard ones if they aren't closed.
  content = content.replace(/<img([^>]*[^\/])>/g, '<img$1/>');
  content = content.replace(/<input([^>]*[^\/])>/g, '<input$1/>');
  content = content.replace(/<br([^>]*[^\/])>/g, '<br$1/>');
  content = content.replace(/<hr([^>]*[^\/])>/g, '<hr$1/>');

  // For Landing, Settings, History, Curator, they have <aside> for sidebar / nav which we mapped to AppLayout!
  // So we should STRIP <aside ...>...</aside> and <nav class="... fixed ...">...</nav>
  // Because Sidebar is rendering those!
  content = content.replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '');
  // Nav sidebars (like in settings.html: <nav class="fixed left-0... > ... </nav>)
  content = content.replace(/<nav class="fixed left-0[\s\S]*?<\/nav>/gi, '');

  // For Curator, it has a TopAppBar header with "fixed top-0":
  content = content.replace(/<header class="fixed top-0[\s\S]*?<\/header>/gi, '');

  if (componentName === 'Landing' || componentName === 'Login' || componentName === 'Signup' || componentName === 'PasswordReset') {
     // Landing and Login need everything.
     // Re-read full body without stripping navs
     content = bodyMatch[1];
     content = content.replace(/class=/g, 'className=');
     content = content.replace(/for=/g, 'htmlFor=');
     content = content.replace(/stroke-width/g, 'strokeWidth');
     content = content.replace(/stroke-dasharray/g, 'strokeDasharray');
     content = content.replace(/stroke-dashoffset/g, 'strokeDashoffset');
     content = content.replace(/stroke-linecap/g, 'strokeLinecap');
     content = content.replace(/style="font-variation-settings:\s*'FILL'\s*1;"/g, "style={{fontVariationSettings: \"'FILL' 1\"}}");
     content = content.replace(/<img([^>]*[^\/])>/g, '<img$1/>');
     content = content.replace(/<input([^>]*[^\/])>/g, '<input$1/>');
     content = content.replace(/<br([^>]*[^\/])>/g, '<br$1/>');
     content = content.replace(/<hr([^>]*[^\/])>/g, '<hr$1/>');
  }

  // Wrap in JSX
  const jsx = `import React from "react"
import { Link } from "react-router-dom"

export default function ${componentName}() {
  return (
    <>
      ${content}
    </>
  )
}
`;

  fs.writeFileSync('src/pages/' + componentName + '.jsx', jsx);
  console.log('Successfully generated ' + componentName + '.jsx');
}

htmlToJsx(fs.readFileSync('landing.html', 'utf8'), 'Landing', false);
// htmlToJsx(fs.readFileSync('settings.html', 'utf8'), 'Settings', false);
// htmlToJsx(fs.readFileSync('history.html', 'utf8'), 'History', false);
// htmlToJsx(fs.readFileSync('curator.html', 'utf8'), 'Curator', false);
// htmlToJsx(fs.readFileSync('login.html', 'utf8'), 'Login', false);
htmlToJsx(fs.readFileSync('stitch-signup.html', 'utf8'), 'Signup', false);
htmlToJsx(fs.readFileSync('stitch-passwordreset.html', 'utf8'), 'PasswordReset', false);
htmlToJsx(fs.readFileSync('stitch-billing.html', 'utf8'), 'Billing', false);
htmlToJsx(fs.readFileSync('stitch-setup.html', 'utf8'), 'Setup', false);
htmlToJsx(fs.readFileSync('stitch-codeexplain.html', 'utf8'), 'CodeExplain', false);
htmlToJsx(fs.readFileSync('stitch-score.html', 'utf8'), 'Score', false);

